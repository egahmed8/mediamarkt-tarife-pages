import json
import re
import csv
import argparse
import urllib.request
from pathlib import Path

LINK_PREFIX = "https://tarife.mediamarkt.de/tarife/pks/"
OFFERS_FILE = Path("mediamarkt_offers.json")
CSV_FILE = Path("tarife.csv")

# Wenn du die exakte Network-URL aus den DevTools hast: hier eintragen.
# Beispiel: "https://tarife-api2.mediamarkt.de/...."
OFFERS_SOURCE_URL = "https://tarife-api2.mediamarkt.de/v1/section/page/tarife?tenant=mediamarkt&environment=production&restUrl=https:%2F%2Ftarife-api2.mediamarkt.de&cdnUrl=https:%2F%2Fcontent.ekontor24.net%2Fmediamarkt"

# Falls OFFERS_SOURCE_URL leer ist, probiert das Skript diese Kandidaten.
AUTO_SOURCE_URLS = [
    "https://tarife-api2.mediamarkt.de/page?tenant=mediamarkt&environment=production",
]


def extract_bonus(text):
    if not text:
        return 0
    match = re.search(r"(\d+)\s*€", text)
    return int(match.group(1)) if match else 0


def build_link(prefix: str, slug: str) -> str:
    """
    Baut den finalen Angebotslink:
    prefix = "https://tarife.mediamarkt.de/tarife/pks/"
    slug   = "tm-allnet-flat-30gb-24x25-apfrei/"
    Ergebnis:
    https://tarife.mediamarkt.de/tarife/pks/tm-allnet-flat-30gb-24x25-apfrei/
    """
    if not slug:
        return ""
    slug = str(slug).strip()

    # falls doch mal schon ein voller Link drin steht
    if slug.startswith("http://") or slug.startswith("https://"):
        return slug

    # genau ein Slash zwischen prefix und slug
    return prefix.rstrip("/") + "/" + slug.lstrip("/")


def fetch_json(url: str, timeout: int = 20) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json,text/plain,*/*",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        payload = response.read().decode("utf-8", "ignore")
    return json.loads(payload)


def refresh_offers_json() -> bool:
    urls = [OFFERS_SOURCE_URL] if OFFERS_SOURCE_URL else AUTO_SOURCE_URLS

    for url in urls:
        try:
            data = fetch_json(url)
        except Exception:
            continue

        offers = data.get("payload", {}).get("offers")
        if isinstance(offers, list) and offers:
            OFFERS_FILE.write_text(
                json.dumps(data, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            print(f"JSON aktualisiert: {OFFERS_FILE} ({len(offers)} Offers)")
            return True

    print("Kein gueltiges Offer-JSON gefunden - nutze vorhandene Datei.")
    return False


def main(skip_fetch: bool = False):
    if not skip_fetch:
        refresh_offers_json()

    if not OFFERS_FILE.exists():
        print(f"Datei fehlt: {OFFERS_FILE}")
        return

    with OFFERS_FILE.open("r", encoding="utf-8") as f:
        data = json.load(f)

    offers = data.get("payload", {}).get("offers", [])
    rows = []

    for offer in offers:
        tariff = offer.get("tariff") or {}

        name = offer.get("name", "")

        gb = tariff.get("dataVolume", 0)
        monthly = tariff.get("monthlyPrice", 0)
        contract = tariff.get("contractTerm", 24)
        connection_fee = tariff.get("connectionFee", 0)

        coupon = (offer.get("coupon") or {}).get("value", 0)
        eye = (offer.get("eyeCatchers") or {}).get("small2", "")
        wechselbonus = extract_bonus(eye)

        # slug aus JSON holen (bei dir das offerGroupUrl-Feld)
        slug = offer.get("offerGroupUrl", "")
        link = build_link(LINK_PREFIX, slug)

        total_price = round(
            (monthly * contract) - coupon - wechselbonus + connection_fee,
            2
        )

        effective_monthly = round(total_price / contract, 2) if contract else 0

        rows.append({
            "name": name,
            "gb": gb,
            "monthly_price": monthly,
            "contract_months": contract,
            "connection_fee": connection_fee,
            "coupon": coupon,
            "wechselbonus": wechselbonus,
            "total_price": total_price,
            "effective_monthly_price": effective_monthly,
            "link": link
        })

    if not rows:
        print("Keine Offers gefunden.")
        return

    with CSV_FILE.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"CSV erstellt: {CSV_FILE}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--no-fetch",
        action="store_true",
        help="Nur lokale JSON nutzen, ohne Abruf.",
    )
    args = parser.parse_args()
    main(skip_fetch=args.no_fetch)

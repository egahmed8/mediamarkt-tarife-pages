const OFFERS_SOURCE_URL = "https://tarife-api2.mediamarkt.de/v1/section/page/tarife?tenant=mediamarkt&environment=production&restUrl=https:%2F%2Ftarife-api2.mediamarkt.de&cdnUrl=https:%2F%2Fcontent.ekontor24.net%2Fmediamarkt";
const LINK_PREFIX = "https://tarife.mediamarkt.de/tarife/pks/";

const state = {
  headers: [],
  rows: [],
  sortColumn: -1,
  sortDirection: "asc",
};

const reloadCsvBtn = document.getElementById("reloadCsvBtn");
const allowOverwrite = document.getElementById("allowOverwrite");
const fetchOverwriteBtn = document.getElementById("fetchOverwriteBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusEl = document.getElementById("status");
const tableHead = document.querySelector("#csvTable thead");
const tableBody = document.querySelector("#csvTable tbody");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b91c1c" : "#065f46";
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  const headers = rows.shift() || [];
  return {
    headers,
    rows,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeSortValue(value) {
  const text = String(value ?? "").trim();
  if (!text) {
    return { empty: true, isNumber: false, value: "" };
  }

  const numericCandidate = text.includes(",") && !text.includes(".")
    ? text.replace(",", ".")
    : text;
  const parsedNumber = Number(numericCandidate);

  if (!Number.isNaN(parsedNumber) && Number.isFinite(parsedNumber)) {
    return { empty: false, isNumber: true, value: parsedNumber };
  }

  return { empty: false, isNumber: false, value: text.toLowerCase() };
}

function compareRowsByColumn(rowA, rowB, columnIndex, direction) {
  const valueA = normalizeSortValue(rowA[columnIndex]);
  const valueB = normalizeSortValue(rowB[columnIndex]);

  if (valueA.empty && !valueB.empty) {
    return 1;
  }
  if (!valueA.empty && valueB.empty) {
    return -1;
  }

  let result = 0;
  if (valueA.isNumber && valueB.isNumber) {
    result = valueA.value - valueB.value;
  } else {
    result = String(valueA.value).localeCompare(String(valueB.value), "de", {
      numeric: true,
      sensitivity: "base",
    });
  }

  return direction === "asc" ? result : -result;
}

function getDisplayedRows() {
  if (state.sortColumn < 0 || state.sortColumn >= state.headers.length) {
    return state.rows;
  }

  return state.rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const cmp = compareRowsByColumn(left.row, right.row, state.sortColumn, state.sortDirection);
      if (cmp !== 0) {
        return cmp;
      }
      return left.index - right.index;
    })
    .map((entry) => entry.row);
}

function toggleSort(columnIndex) {
  if (state.sortColumn === columnIndex) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sortColumn = columnIndex;
    state.sortDirection = "asc";
  }

  renderTable();
  updateDownloadHref();
}

function renderTable() {
  if (!state.headers.length) {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    return;
  }

  const displayedRows = getDisplayedRows();

  tableHead.innerHTML = `<tr>${state.headers.map((header, index) => {
    const isActive = state.sortColumn === index;
    const indicator = isActive ? (state.sortDirection === "asc" ? " (asc)" : " (desc)") : "";
    const label = `${header}${indicator}`;
    return `<th><button type="button" class="sort-btn${isActive ? " is-active" : ""}" data-sort-index="${index}">${escapeHtml(label)}</button></th>`;
  }).join("")}</tr>`;

  tableHead.querySelectorAll(".sort-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const columnIndex = Number(button.dataset.sortIndex);
      toggleSort(columnIndex);
    });
  });

  tableBody.innerHTML = displayedRows
    .map((row) => {
      const cells = state.headers.map((_, index) => {
        const value = row[index] || "";
        if (value.startsWith("http://") || value.startsWith("https://")) {
          const safeLink = escapeHtml(value);
          return `<td><a href="${safeLink}" target="_blank" rel="noopener noreferrer">Link</a></td>`;
        }
        return `<td>${escapeHtml(value)}</td>`;
      });
      return `<tr>${cells.join("")}</tr>`;
    })
    .join("");
}

function toCsvValue(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function buildCsvText(headers, rows) {
  const allRows = [headers, ...rows];
  return allRows.map((row) => row.map(toCsvValue).join(",")).join("\n") + "\n";
}

function updateDownloadHref() {
  if (!state.headers.length) {
    downloadBtn.removeAttribute("href");
    return;
  }
  const blob = new Blob([buildCsvText(state.headers, getDisplayedRows())], { type: "text/csv;charset=utf-8" });
  downloadBtn.href = URL.createObjectURL(blob);
}

async function loadLocalCsv() {
  setStatus("Lade tarife.csv...");
  const response = await fetch("./tarife.csv?ts=" + Date.now(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`CSV konnte nicht geladen werden (HTTP ${response.status}).`);
  }
  const csvText = await response.text();
  const parsed = parseCsv(csvText);
  state.headers = parsed.headers;
  state.rows = parsed.rows;
  state.sortColumn = -1;
  state.sortDirection = "asc";
  renderTable();
  updateDownloadHref();
  setStatus(`CSV geladen: ${state.rows.length} Zeilen.`);
}

function extractBonus(text) {
  if (!text) {
    return 0;
  }
  const match = String(text).match(/(\d+)\s*€/);
  return match ? Number(match[1]) : 0;
}

function buildLink(slug) {
  if (!slug) {
    return "";
  }
  const slugText = String(slug).trim();
  if (slugText.startsWith("http://") || slugText.startsWith("https://")) {
    return slugText;
  }
  return LINK_PREFIX.replace(/\/+$/, "") + "/" + slugText.replace(/^\/+/, "");
}

function offerToCsvRow(offer) {
  const tariff = offer.tariff || {};
  const monthly = Number(tariff.monthlyPrice || 0);
  const contract = Number(tariff.contractTerm || 24);
  const connectionFee = Number(tariff.connectionFee || 0);
  const coupon = Number((offer.coupon || {}).value || 0);
  const wechselbonus = extractBonus((offer.eyeCatchers || {}).small2 || "");
  const totalPrice = Math.round(((monthly * contract) - coupon - wechselbonus + connectionFee) * 100) / 100;
  const effective = contract ? Math.round((totalPrice / contract) * 100) / 100 : 0;

  return [
    offer.name || "",
    Number(tariff.dataVolume || 0),
    monthly,
    contract,
    connectionFee,
    coupon,
    wechselbonus,
    totalPrice,
    effective,
    buildLink(offer.offerGroupUrl || ""),
  ];
}

async function fetchAndOverwrite() {
  if (!allowOverwrite.checked) {
    return;
  }

  const confirmed = window.confirm("Aktuelle Tabelle wirklich durch frische Fetch-Daten ueberschreiben?");
  if (!confirmed) {
    return;
  }

  setStatus("Hole aktuelle Daten per Fetch...");

  const response = await fetch(OFFERS_SOURCE_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Fetch fehlgeschlagen (HTTP ${response.status}).`);
  }

  const data = await response.json();
  const offers = (((data || {}).payload || {}).offers || []);
  if (!Array.isArray(offers) || offers.length === 0) {
    throw new Error("Keine Offers in der API-Antwort gefunden.");
  }

  state.headers = [
    "name",
    "gb",
    "monthly_price",
    "contract_months",
    "connection_fee",
    "coupon",
    "wechselbonus",
    "total_price",
    "effective_monthly_price",
    "link",
  ];
  state.rows = offers.map(offerToCsvRow);
  state.sortColumn = -1;
  state.sortDirection = "asc";
  renderTable();
  updateDownloadHref();
  setStatus(`Fetch erfolgreich: ${state.rows.length} Zeilen. Ansicht wurde ueberschrieben.`);
}

function setOverwriteEnabled() {
  fetchOverwriteBtn.disabled = !allowOverwrite.checked;
}

reloadCsvBtn.addEventListener("click", async () => {
  try {
    await loadLocalCsv();
  } catch (error) {
    setStatus(error.message, true);
  }
});

allowOverwrite.addEventListener("change", setOverwriteEnabled);

fetchOverwriteBtn.addEventListener("click", async () => {
  try {
    await fetchAndOverwrite();
  } catch (error) {
    setStatus(`${error.message} (CORS moeglich). Dann lokal \"python script.py\" laufen lassen und CSV committen.`, true);
  }
});

(async () => {
  setOverwriteEnabled();
  try {
    await loadLocalCsv();
  } catch (error) {
    setStatus(error.message, true);
  }
})();


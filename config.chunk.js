import{r as f,j as s,P as v}from"./clsx.m.BMDtf1Pe.js";import{g as I,ay as ue,f as q,a2 as Q,a6 as G,ai as d,az as b,aA as ge,aB as fe,aC as xe,af as ye,aD as k,a3 as ve,aE as Te}from"./ModalContext.rGVOVivg.js";import{aB as Re,aC as Ee,aD as Fe,aE as T,aF as K,aG as we,aH as Ce,aI as be,aJ as Ae,aK as y,aL as Pe,aM as c,d as g,aN as x,aO as je,aP as O,aQ as A,aR as D,aS as N,aT as V,aU as Ie,aV as _e,aW as U,aX as M,aY as $,aZ as B,a_ as Se,F as Le}from"./index.B6K6h1rO.js";import{a2 as ke}from"./index.BeIgbrFg.js";const P=(e,t)=>{if(!window.DY||typeof window.DY.API!="function")return;const a=String(t),l={dyType:"filter-items-v1",filterType:{colors:"color",manufacturers:"manufacturer",operatingSystems:"operating_system",storage:"storage_capacity"}[e]||e,...e==="storage"?{filterNumericValue:Number(t)}:{filterStringValue:a}};window.DY.API("event",{name:"Filter Items",properties:l})},J=(e,t)=>e.sort((a,r)=>{const o=t(a),l=t(r);return o===l?0:o>l?1:-1}),X=e=>e.sort((t,a)=>t.idx-a.idx),Oe=(e,t)=>t!=="price"?X(e):J(e,({defaultVariant:a,variants:r})=>r[a].price),De=(e,t)=>t!=="price"?X(e):J(e,({calculations:{totalPrice:a}})=>a),Ne=(e=[])=>Math.min(...e.map(t=>t.stock)),z=(e=[])=>e.map(t=>{if(!t.extendedVariants)return t;const a=Fe(t.extendedVariants);return{...t,stock:a.variant.stock,image:a.variant.images}}),Ve=(e,t,a,r)=>{const o=I.uniqBy(e,Re).map((p,h)=>({...p,idx:h+1,isSoldOut:r?void 0:Math.min(p.stock,Ee(I.values(p.variants)).stock,Ne(z(p.accessories)))<=0,accessories:z(p.accessories)})),l=r?De(o,a):I.orderBy(Oe(o,a),"isSoldOut");return t==="desc"?l.reverse():l};function Ue(){const{state:{items:e,unfilteredItems:t,sortDirection:a,sortByName:r,displayType:o}}=T(),{dispatch:l,state:{activeTariff:p,activeVariantId:h,isListingPage:u}}=K(),[i,m]=f.useState(null),{refetch:R}=ue(i,{enabled:!1}),n=async()=>{const{data:F,data:{hardware:{extendedVariants:w}}}=await R(i),j=w.filter(C=>C.isSelected===!0?C:null)[0];l({type:we,payload:{rootInfo:F,extendedVariants:w}}),l({type:Ce,payload:{calculateExtendTariff:j}}),window.scrollTo({top:0})};f.useEffect(()=>{i&&n()},[i]);const E=!!(e.length>0&&e[0].carrier),se=f.useMemo(()=>Ve(e,a,r,E),[a,r,e,E]),ne=(F,w)=>{if(u)return;if(!E){l({type:be,payload:F}),window.scrollTo({top:0});return}const{carrier:j,urlName:C,url:re}=F,{offerType:ie,offerGroupUrl:oe,manufacturerUrl:le,variant:{color:{name:ce},storage:de,ebootisId:pe},sku:me}=w;window.DY=window.DY||{},window.DY.recommendationContext={...window.DY.recommendationContext||{},data:[me]};const he={carrier:j.toLowerCase().replace(" ","-"),tariff:C||re,offerType:ie,offerGroupUrl:oe,color:ce.toLowerCase(),storage:de,activeVariantId:pe,manufacturer:le};m(he)};return s.jsx(ke,{isLoading:!t.length,items:se,activeItem:E?p:{ebootisId:h},mode:o,isTariff:E,onClick:ne})}var H;function _(){return _=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},_.apply(null,arguments)}const Me=e=>f.createElement("svg",_({xmlns:"http://www.w3.org/2000/svg",width:20,height:18},e),H||(H=f.createElement("path",{d:"M5.639.6a2.51 2.51 0 0 0-2.397 1.804H.677c-.395 0-.677.31-.677.705s.31.705.705.705H3.27C3.552 4.857 4.54 5.62 5.667 5.62a2.52 2.52 0 0 0 2.425-1.805h10.403c.395 0 .705-.31.705-.705a.7.7 0 0 0-.705-.705H8.092C7.753 1.361 6.795.6 5.639.6m3.383 11.841c1.156 0 2.115.762 2.425 1.805h7.048c.395 0 .705.31.705.705s-.31.705-.705.705h-7.02A2.52 2.52 0 0 1 9.05 17.46c-1.128 0-2.114-.761-2.396-1.804H.704A.7.7 0 0 1 0 14.951c0-.395.282-.705.705-.705h5.92a2.51 2.51 0 0 1 2.397-1.805m.028 1.41c-.592 0-1.071.48-1.1 1.1 0 .62.508 1.1 1.1 1.1s1.1-.48 1.1-1.1-.508-1.1-1.1-1.1m5.075-7.612a2.52 2.52 0 0 1 2.425 1.804h1.945c.395 0 .705.31.705.705s-.31.705-.705.705H16.55a2.52 2.52 0 0 1-2.425 1.804c-1.128 0-2.114-.761-2.396-1.804H.705A.7.7 0 0 1 0 8.748c0-.395.282-.705.705-.705h11.024a2.51 2.51 0 0 1 2.396-1.803zm.028 1.41c-.62 0-1.1.479-1.1 1.099s.508 1.1 1.1 1.1 1.1-.48 1.1-1.1-.508-1.1-1.1-1.1zm-8.486-5.64c.592 0 1.1.48 1.1 1.1s-.508 1.1-1.1 1.1-1.1-.48-1.1-1.1.508-1.1 1.1-1.1"}))),$e=d.div`
  display: flex;
  justify-content: space-between;
`,Be=d.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: initial;
  font-weight: bold;
`,ze=d.div`
  margin-right: ${e=>e.theme.space.s}px;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`,He=d.div`
  display: block;
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: #df0100;
  width: 8px;
  height: 8px;
  border-radius: 40px;
`,Ye=d.div`
  display: flex;
  justify-content: flex-end;
`,We=d.div`
  font-weight: normal;
`,qe=d.span`
  display: none;
  font-weight: bold;
  margin-right: 4px;
  white-space: nowrap;

  ${e=>e.theme.mediaQueries.md} {
    display: inline;
  }
`;d.select`
  appearance: none;
  background: none;
  background-color: transparent;
  border: none;
  text-indent: 1px;
  margin-right: ${({theme:{space:e}})=>e.s}px;
  margin-top: ${({theme:{space:e}})=>e.xxs}px;
`;d.div`
  display: none;
  margin-left: 26px;

  ${e=>e.theme.mediaQueries.md} {
    display: flex;
  }
`;const Qe=(e,t)=>t?e.theme.colors.brand.primary:e.theme.colors.shade[3],Z=d.div`
  width: 16px;
  height: 16px;
  display: none;
  position: relative;
  margin: 2px 6px 0;

  &:hover {
    cursor: pointer;
  }

  ${e=>e.theme.mediaQueries.md} {
    display: block;
  }

  > div {
    background-color: ${e=>Qe(e,e.isActive)};
  }
`;d(Z)`
  > div {
    position: absolute;
    width: 7px;
    height: 7px;

    :nth-child(1) {
      top: 0;
      left: 0;
    }
    :nth-child(2) {
      top: 0;
      left: 9px;
    }
    :nth-child(3) {
      top: 9px;
      left: 0;
    }
    :nth-child(4) {
      top: 9px;
      left: 9px;
    }
  }
`;d(Z)`
  > div {
    position: absolute;
    width: 16px;
    height: 7px;
    left: 0;

    :nth-child(1) {
      top: 0;
    }
    :nth-child(2) {
      top: 9px;
    }
  }
`;const L=({sortTitle:e})=>{const{state:{filters:t,sortDirection:a,sortByName:r,displayType:o,collapseFilter:l},dispatch:p}=T(),h=[{label:"Empfehlungen",name:"recommendations",active:r==="recommendations"},{label:"Preis",name:"price",active:r==="price"}];q.find(h,{active:!0});const u=Q();return s.jsxs($e,{children:[s.jsx("div",{children:s.jsxs(Be,{children:[u.lessThan.md&&s.jsxs(ze,{onClick:()=>{p({type:Ae,payload:{collapseFilter:!l}})},children:[s.jsx(Me,{}),Object.keys(t).length>0&&s.jsx(He,{})]}),"Filter"]})}),s.jsx("div",{children:s.jsxs(Ye,{children:[s.jsx(We,{children:s.jsxs(G,{alignItems:"center",children:[s.jsx(qe,{children:e})," ",s.jsx("span",{children:"Empfehlungen"}),!1,!1]})}),!1]})})]})};L.propTypes={sortTitle:v.string};L.defaultProps={sortTitle:"Sortiert nach"};const Ge=()=>{const{state:{facets:{carriers:e,priceRange:t,oneTimePriceFromRange:a,volumeRange:r,speedRange:o,additionalOptions:l,contractTerms:p},isProductDetailInterface:h,shownFacets:u},dispatch:i}=T(),m=h,R=[{key:"filterCarrier",header:"Netz / Anbieter",facet:"carriers",open:!0,content:s.jsx(y,{list:e,onChange:n=>{i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:Pe}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Anbieter:${x(n)}`})}})},{key:"filterContractTerms",header:"Laufzeit",facet:"contractTerms",open:!1,content:s.jsx(y,{list:p,suffix:"Monate",onChange:n=>{i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:je}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Laufzeit:${x(n)}`})}})},{key:"filterPrice",header:"Grundgebühr",facet:"priceRange",open:!1,content:s.jsx(b,{value:t,suffix:"€",onChange:n=>{t.min===n.minVal&&t.max===n.maxVal?i({type:c.REMOVE_FILTER,payload:{filterGroup:n,group:O}}):i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:O}}),g({eventAction:"grab",eventCategory:"Filter",eventLabel:`Preis pro Monat:${A(n)}`})}})},m&&{key:"filterOneTimePriceFrom",header:"Gerätepreis",facet:"oneTimePriceFromRange",open:!1,content:s.jsx(b,{value:a,suffix:"€",onChange:n=>{a.min===n.minVal&&a.max===n.maxVal?i({type:c.REMOVE_FILTER,payload:{filterGroup:n,group:D}}):i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:D}}),g({eventAction:"grab",eventCategory:"Filter",eventLabel:`Einmaliger Gerätepreis:${A(n)}`})}})},{key:"filterVolume",header:"Datenvolumen",facet:"volumeRange",open:!1,content:s.jsx(b,{value:r,suffix:"GB",onChange:n=>{r.min===n.minVal&&r.max===n.maxVal?i({type:c.REMOVE_FILTER,payload:{filterGroup:n,group:N}}):i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:N}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Datenvolumen:${A(n)}`})}})},{key:"filterSpeed",header:"Datengeschwindigkeit",facet:"speedRange",open:!1,content:s.jsx(b,{value:o,suffix:"Mbit/s",onChange:n=>{o.min===n.minVal&&o.max===n.maxVal?i({type:c.REMOVE_FILTER,payload:{filterGroup:n,group:V}}):i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:V}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Datengeschwindigkeit:${A(n)}`})}})},{key:"filterAdditionalOptions",header:"Wunschoptionen",facet:"additionalOptions",open:!1,content:s.jsx(y,{list:l,onChange:n=>{i({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:n,name:Ie}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Wunschoptionen:${x(n)}`})}})}].filter(n=>u[n.facet]);return s.jsx("div",{className:"msd-filter-details__wrapper",children:R.map(n=>s.jsxs("details",{className:"msd-filter-details",open:n.open,children:[s.jsxs("summary",{className:"msd-filter-details__head",children:[s.jsx("span",{className:"title",children:n.header}),s.jsx("span",{className:"arrow"})]}),n.content]},n.key))})},Ke=(e,t)=>e.map((a,r)=>r===t?{...a,selected:!a.selected}:a),ee=({colors:e,onChange:t})=>e.map((a,r)=>s.jsx(_e,{onClick:()=>{const o=Ke(e,r);t?.("colors",o,a)},color:a},a.value));ee.propTypes={onChange:v.func,colors:v.arrayOf(ge)};const Je=()=>{const{state:{facets:{operatingSystems:e,manufacturers:t,colors:a,storage:r},shownFacets:o},dispatch:l}=T(),p=Q(),h=r.sort((i,m)=>i.value<m.value?1:-1),u=[{key:"filterManufacturers",header:"Hersteller",facet:"manufacturers",open:!0,content:s.jsx(y,{list:t,limit:p.lessThan.md?3:t.length,onChange:(i,m)=>{l({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:i,name:U}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Marke:${x(i)}`}),P(U,m?.value)}})},{key:"filterOs",header:"Betriebssystem",facet:"operatingSystems",open:!1,content:s.jsx(y,{list:e,onChange:(i,m)=>{l({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:i,name:M}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Betriebssystem:${x(i)}`}),P(M,m?.value)}})},{key:"filterStorage",header:"Speicherkapazität",facet:"storage",open:!1,content:s.jsx(y,{list:h,onChange:(i,m)=>{l({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:i,name:$}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Speicherkapazität:${x(i)}`}),P($,m?.value)}})},{key:"filterColor",header:"Farbe",facet:"colors",open:!1,content:s.jsx(ee,{colors:a,onChange:(i,m,R)=>{l({type:c.UPDATE_FILTER_GROUP,payload:{filterGroup:m,name:B}}),g({eventAction:"click",eventCategory:"Filter",eventLabel:`Farbe:${x(m)}`}),P(B,R?.value)}})}].filter(i=>o[i.facet]);return s.jsx("div",{className:"msd-filter-details__wrapper",children:u.map(i=>s.jsxs("details",{className:"msd-filter-details",open:i.open,children:[s.jsxs("summary",{className:"msd-filter-details__head",children:[s.jsx("span",{className:"title",children:i.header}),s.jsx("span",{className:"arrow"})]}),i.content]},i.key))})};var Y;function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},S.apply(null,arguments)}const Xe=e=>f.createElement("svg",S({xmlns:"http://www.w3.org/2000/svg",width:12,height:12},e),Y||(Y=f.createElement("path",{fill:"#1F1D1D",fillRule:"evenodd",d:"M11.815.185a.633.633 0 0 1 0 .895L6.894 6l4.92 4.92a.633.633 0 0 1-.894.895L6 6.894l-4.92 4.92a.633.633 0 0 1-.895-.894L5.106 6 .186 1.08A.633.633 0 0 1 1.08.185L6 5.106l4.92-4.92a.633.633 0 0 1 .895 0z"}))),Ze=d(Se)`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: ${({theme:e})=>e.space.xs}px;
  margin-bottom: ${({theme:e})=>e.space.xs}px;
  cursor: pointer;
`,et=d.span`
  margin-right: 0.5em;
`,tt=e=>{switch(e){case"priceRange":return"Preis";case"oneTimePriceFromRange":return"Gerätepreis";case"volumeRange":return"Datenvolumen";case"speedRange":return"Datengeschwindigkeit";case"displayRange":return"Bildschirmdiagonale";default:return e}},W=(e,t,a)=>s.jsxs(Ze,{onClick:()=>a(e,t),children:[s.jsx(et,{children:tt(t)}),s.jsx(Xe,{viewBox:"0 0 16 10"})]},e+t),te=({filters:e,onClick:t})=>Object.keys(e).map(a=>Array.isArray(e[a])?e[a].map(r=>W(a,r.name,t)):W(a,a,t));te.propTypes={filters:fe,onClick:v.func};const at=d(xe)({color:({theme:{colors:e}})=>e.brand.primary,"::after":{fontSize:({theme:{fontSizes:e}})=>`${e[1]}px !important`,marginRight:({theme:{space:e}})=>`${e.xs}px`}}),st=()=>{const{state:{filters:e},dispatch:t}=T(),a=f.useCallback(()=>{t({type:c.RESET_FILTER})},[t]);return q.size(e)?s.jsxs(G,{flexWrap:"wrap",alignItems:"center",mb:"xs",children:[s.jsx(te,{filters:e,onClick:(r,o)=>{t({type:c.REMOVE_FILTER,payload:{group:r,name:o}})}}),s.jsxs("button",{onClick:a,className:"msd-remove-filter-btn",children:[s.jsx(at,{name:"arrow-right"}),"Auswahl zurücksetzen"]})]}):null},nt=d(Te)({"> div > div":{borderTop:({theme:{colors:e}})=>`1px solid ${e.shade[2]}`,paddingTop:({theme:{space:e}})=>`${e.s}px`}}),ae=({variant:e})=>{const t=e==="tariff"?Ge:Je,{state:{isListingPage:a}}=K(),{state:{data:r,showAllFacets:o,collapseFilter:l,activeKeys:p}}=T(),h=a?"listing":"filter";let u=p;return o===!0?u=[...Array(20).keys()].slice(1):o===!1&&(u=[]),r?s.jsxs(ye,{variant:"narrow",id:"filter",mt:[4,4,4,6,6],children:[s.jsx(L,{}),s.jsxs(nt,{mt:[4,4,4,6,6],children:[s.jsx(k,{xs:24,md:8,lg:6,children:s.jsx(t,{activeKey:u,collapseFilter:l})}),s.jsx(k,{xs:24,md:16,lg:18,children:s.jsxs(ve,{mt:["m",null,null,0],children:[s.jsx(st,{}),s.jsx(Ue,{})]})})]})]}):s.jsx(Le,{variant:h,gridWrapper:!0,marginTop:4})};ae.propTypes={variant:v.oneOf(["smartphone","tariff"]).isRequired,queryParams:v.shape({})};ae.defaultProps={queryParams:null};const ct={shownFacets:{hardwareListingPage:{operatingSystems:!0,manufacturers:!0,colors:!0,storage:!0,priceRange:!0,displayRange:!0,accessories:!0},tariffListingPage:{carriers:!0,priceRange:!0,volumeRange:!0,speedRange:!0,additionalOptions:!1,contractTerms:!0},tariffPDP:{operatingSystems:!0,manufacturers:!0,colors:!0,storage:!0,priceRange:!0,displayRange:!0}}};export{ae as F,ct as f};

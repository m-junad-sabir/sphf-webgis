// --- ArcGIS imports ----------------------------------------------------------
const [
    config, Map, MapView, FeatureLayer, GeoJSONLayer, GroupLayer, LayerList,
    Home, Legend, PopupTemplate, Expand, BasemapGallery,
    ScaleBar, Compass, SimpleMarkerSymbol, Point, Graphic,
    Zoom, Query
] = await $arcgis.import([
    "@arcgis/core/config.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/layers/FeatureLayer.js",
    "@arcgis/core/layers/GeoJSONLayer.js",
    "@arcgis/core/layers/GroupLayer.js",
    "@arcgis/core/widgets/LayerList.js",
    "@arcgis/core/widgets/Home.js",
    "@arcgis/core/widgets/Legend.js",
    "@arcgis/core/PopupTemplate.js",
    "@arcgis/core/widgets/Expand.js",
    "@arcgis/core/widgets/BasemapGallery.js",
    "@arcgis/core/widgets/ScaleBar.js",
    "@arcgis/core/widgets/Compass.js",
    "@arcgis/core/symbols/SimpleMarkerSymbol.js",
    "@arcgis/core/geometry/Point.js",
    "@arcgis/core/Graphic.js",
    "@arcgis/core/widgets/Zoom.js",
    "@arcgis/core/rest/support/Query.js"
]);

// =============================================================================
// MAP SETUP
// =============================================================================
const map = new Map({ basemap: "satellite" });

const districtsLayer = new GeoJSONLayer({
    url: "https://www.arcgis.com/sharing/rest/content/items/8fc5f3b81eb5469cb1628903a57a9ea7/data",
    title: "Districts of Pakistan",
    visible: false
});

const boundaryLayer = new GeoJSONLayer({
    url: "https://www.arcgis.com/sharing/rest/content/items/1d46e9fd0f204a3e807b6fe590b8b9c3/data",
    title: "Pakistan Boundary",
    visible: false,
    definitionExpression: "COUNTRY = 'Pakistan'"
});

const dehFeatureLayer = new GeoJSONLayer({
    url: "https://www.arcgis.com/sharing/rest/content/items/8ea72b39982844f7873ad2d529c57bf0/data",
    title: "Deh Administrative Layer",
    popupTemplate: {
        title: "{Deh}",
        content: `
            <b>District:</b> {District}<br>
            <b>Tehsil/Taluka:</b> {Taluka}<br>
            <b>Deh:</b> {Deh}
        `
    }
});

// Village / Mauza child layers
const M1_Abdul_Gaffoor_Jatoi        = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/5f2031c1340145b6b54b33449c5056ca/data", title: "M1 Abdul Gaffoor Jatoi",       visible: true });
const M1_Abdul_Karim_Jatoi          = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/70b69adf88a247da875cbcc8663579e0/data", title: "M1 Abdul Kariim Jatoi",        visible: true });
const M1_Bangul_Jatoi               = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/cdc73404a70949f29e9eb2f0a7e471e3/data", title: "M1 Bangul Jatoi",              visible: true });
const M1_Dadilo_Khan_Jatoi          = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/99ff164c26af41e7ae859548c2a1fa80/data", title: "M1 Dadilo Khan Jatoi",         visible: true });
const M1_Qadir_Pur                  = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/70a5fee21d16449eac3102383eec6889/data", title: "M1 Qadir Pur",                 visible: true });
const M2_Habib_Kot                  = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/65c1b90f9c7547ce8d27ff16fb8b2787/data", title: "M2 Habib Kot",                 visible: true });
const M2_Qazi_Wahan                 = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/2ea0ac8d3a184eafa6a606b11dab21dc/data", title: "M2 Qazi Wahan",                visible: true });
const M3_Jaffer_Dasti               = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/98ee98fd86714378bf197732d3db1ec7/data", title: "M3 Jaffer Dasti",              visible: true });
const M3_Muhammad_Aalam_Shar        = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/8c3448c3ab7e460294c428136d60c347/data", title: "M3 Muhammad Aalam Shar",       visible: true });
const M4_Nandhi_Kal_Wari            = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/d96a0fd3108f4e58b5454992efa4817f/data", title: "M4 Nandhi Kal Wari",           visible: true });
const M4_Teenda                     = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/764be13b9e5144e597bfce54cef6ac6e/data", title: "M4 Teenda",                    visible: true });
const M5_Haji_Ali_Muhammad_Brohi    = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/4e33dda4f48e4b17826c52c21c26560a/data", title: "M5 Haji Ali Muhammad Brohi",   visible: true });
const M5_Juma_Khan_Brohi            = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/f0828f6021264ab280828d91a74e49fa/data", title: "M5 Juma Khan Brohi",           visible: true });
const M5_Loung_Labano               = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/df7b8fa81a3c42e0a039adf013e29939/data", title: "M5 Loung Labano",              visible: true });
const M6_MilitaryForm_QalandarBux   = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/9aa1b945e91e476994f9aff2d9d7de02/data", title: "M6 Military Form QalandarBux", visible: true });
const M7_Mad_Khoso                  = new GeoJSONLayer({ url: "https://www.arcgis.com/sharing/rest/content/items/ca8d8744e4fb4075a1862ca517838ade/data", title: "M7 Mad Khoso",                 visible: true });

// Group layers
const dehkotHabibMahar_M1 = new GroupLayer({ title: "Deh kot Habib Mahar - M1", visible: true, visibilityMode: "independent", layers: [M1_Abdul_Gaffoor_Jatoi, M1_Abdul_Karim_Jatoi, M1_Bangul_Jatoi, M1_Dadilo_Khan_Jatoi] });
const dehkotHabibMahar_M2 = new GroupLayer({ title: "Deh kot Habib Mahar - M2", visible: true, visibilityMode: "independent", layers: [M2_Habib_Kot] });
const dehkotHabibMahar_M3 = new GroupLayer({ title: "Deh kot Habib Mahar - M3", visible: true, visibilityMode: "independent", layers: [M3_Muhammad_Aalam_Shar] });
const dehkotHabibMahar_M4 = new GroupLayer({ title: "Deh kot Habib Mahar - M4", visible: true, visibilityMode: "independent", layers: [M4_Teenda] });
const dehkotHabibMahar_M5 = new GroupLayer({ title: "Deh kot Habib Mahar - M5", visible: true, visibilityMode: "independent", layers: [M5_Haji_Ali_Muhammad_Brohi, M5_Juma_Khan_Brohi] });
const dehqaziwahan_M1     = new GroupLayer({ title: "Deh Qazi Wahan - M1", visible: true, visibilityMode: "independent", layers: [M1_Qadir_Pur] });
const dehqaziwahan_M2     = new GroupLayer({ title: "Deh Qazi Wahan - M2", visible: true, visibilityMode: "independent", layers: [M2_Qazi_Wahan] });
const dehqaziwahan_M3     = new GroupLayer({ title: "Deh Qazi Wahan - M3", visible: true, visibilityMode: "independent", layers: [M3_Jaffer_Dasti] });
const dehqaziwahan_M4     = new GroupLayer({ title: "Deh Qazi Wahan - M4", visible: true, visibilityMode: "independent", layers: [M4_Nandhi_Kal_Wari] });
const dehqaziwahan_M5     = new GroupLayer({ title: "Deh Qazi Wahan - M5", visible: true, visibilityMode: "independent", layers: [M5_Loung_Labano] });
const dehqaziwahan_M6     = new GroupLayer({ title: "Deh Qazi Wahan - M6", visible: true, visibilityMode: "independent", layers: [M6_MilitaryForm_QalandarBux] });
const dehqaziwahan_M7     = new GroupLayer({ title: "Deh Qazi Wahan - M7", visible: true, visibilityMode: "independent", layers: [M7_Mad_Khoso] });

map.addMany([
    boundaryLayer, districtsLayer, dehFeatureLayer,
    dehkotHabibMahar_M1, dehkotHabibMahar_M2, dehkotHabibMahar_M3, dehkotHabibMahar_M4, dehkotHabibMahar_M5,
    dehqaziwahan_M1, dehqaziwahan_M2, dehqaziwahan_M3, dehqaziwahan_M4, dehqaziwahan_M5, dehqaziwahan_M6, dehqaziwahan_M7
]);

// =============================================================================
// MAP VIEW
// =============================================================================
const view = new MapView({
    container: "map",
    map,
    center: [68.456299194, 26.440361376],
    zoom: 9,
    ui: { components: ["attribution"] }
});

// Widgets
view.ui.add(new Zoom({ view }), "top-right");
view.ui.add(new ScaleBar({ view, style: "line", unit: "metric" }), "bottom-left");
view.ui.add(new Home({ view }), "top-right");
view.ui.add(new Compass({ view }), "top-right");

const bgExpand = new Expand({
    view,
    content: new BasemapGallery({ view }),
    expandIcon: "basemap",
    expandTooltip: "Basemap Gallery"
});
view.ui.add(bgExpand, "bottom-right");

const layerList = new LayerList({
    view,
    listItemCreatedFunction: (event) => {
        event.item.panel = { content: "legend", open: false };
    }
});

const layerListExpand = new Expand({
    view,
    content: layerList,
    expandIcon: "layers",
    collapseIcon: "layers",
    expandTooltip: "Show Layer List",
    collapseTooltip: "Hide Layer List",
    expanded: false   // collapsed by default
});
view.ui.add(layerListExpand, "top-right");

// NESPAK watermark
const watermarkNode = document.createElement("div");
watermarkNode.className = "map-nespak-watermark";
watermarkNode.innerHTML = `
    <img src="images/nespaklogo.png" alt="NESPAK" class="logo-nespak-map" onerror="this.style.display='none'">
    <span>Designed by NESPAK</span>
`;
view.ui.add(watermarkNode, "bottom-right");

// =============================================================================
// AUTO POPUP — all GeoJSON layers
// =============================================================================
const systemFields = ["objectid", "globalid", "geometry", "type"];

function formatFieldName(name) {
    return name.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase());
}

function enableAutoPopups(layers) {
    layers.forEach(layer => {
        if (layer.type === "geojson" || layer.type === "feature") {
            layer.when(() => {
                if (!layer.fields || layer.fields.length === 0) return;
                const infos = layer.fields
                    .filter(f => !systemFields.includes(f.name.toLowerCase()))
                    .map(f => ({
                        fieldName: f.name,
                        label: (f.alias && f.alias !== f.name) ? f.alias : formatFieldName(f.name),
                        visible: true
                    }));
                layer.popupTemplate = new PopupTemplate({
                    title: layer.title ? `${layer.title} Details` : "Feature Attributes",
                    content: [{ type: "fields", fieldInfos: infos }]
                });
            }).catch(err => console.error(`Popup error for ${layer.title}:`, err));
        }
    });
}

const allChildLayers = [
    M1_Abdul_Gaffoor_Jatoi, M1_Abdul_Karim_Jatoi, M1_Bangul_Jatoi, M1_Dadilo_Khan_Jatoi, M1_Qadir_Pur,
    M2_Habib_Kot, M2_Qazi_Wahan,
    M3_Jaffer_Dasti, M3_Muhammad_Aalam_Shar,
    M4_Nandhi_Kal_Wari, M4_Teenda,
    M5_Haji_Ali_Muhammad_Brohi, M5_Juma_Khan_Brohi, M5_Loung_Labano,
    M6_MilitaryForm_QalandarBux,
    M7_Mad_Khoso
];
enableAutoPopups([districtsLayer, boundaryLayer, dehFeatureLayer, ...allChildLayers]);

// =============================================================================
// DOM REFERENCES
// =============================================================================
const districtSelect    = document.getElementById('districtSelect');
const tehsilSelect      = document.getElementById('tehsilSelect');
const dehSelect         = document.getElementById('dehSelect');
const villageSelect     = document.getElementById('villageSelect');
const resetBtn          = document.getElementById('resetBtn');
const applyQueryBtn     = document.getElementById('applyQueryBtn');

// Info panel elements
const statDistricts     = document.getElementById('statDistricts');
const statTalukas       = document.getElementById('statTalukas');
const statDehs          = document.getElementById('statDehs');
const statVillages      = document.getElementById('statVillages');
const infoCountHH       = document.getElementById('infoCountHH');
const infoCountPop      = document.getElementById('infoCountPop');
const infoCountFeatures = document.getElementById('infoCountFeatures');
const chartArea         = document.getElementById('chartArea');
const chartBars         = document.getElementById('chartBars');
const tableWrapper      = document.getElementById('tableWrapper');
const tableCountBadge   = document.getElementById('tableCountBadge');
const villageList       = document.getElementById('villageList');
const villageSearchInput = document.getElementById('villageSearchInput');

// =============================================================================
// QUERY HELPERS
// =============================================================================
async function loadDistricts() {
    const q = new Query();
    q.outFields = ["District"];
    q.returnDistinctValues = true;
    q.where = "1=1";
    try {
        const res = await dehFeatureLayer.queryFeatures(q);
        const vals = new Set(res.features.map(f => f.attributes.District).filter(Boolean));
        districtSelect.innerHTML = '<option value="">— Choose District —</option>';
        vals.forEach(v => {
            const o = document.createElement('option');
            o.value = o.textContent = v;
            districtSelect.appendChild(o);
        });
        updateStats({ districts: vals.size });
    } catch (e) { console.error("loadDistricts:", e); }
}

async function loadTehsils(district) {
    const q = new Query();
    q.outFields = ["Taluka"];
    q.returnDistinctValues = true;
    q.where = `District = '${district}'`;
    try {
        const res = await dehFeatureLayer.queryFeatures(q);
        const vals = new Set(res.features.map(f => f.attributes.Taluka).filter(Boolean));
        tehsilSelect.innerHTML = '<option value="">— Choose Taluka —</option>';
        vals.forEach(v => {
            const o = document.createElement('option');
            o.value = o.textContent = v;
            tehsilSelect.appendChild(o);
        });
        updateStats({ talukas: vals.size });
    } catch (e) { console.error("loadTehsils:", e); }
}

async function loadDehs(district, taluka) {
    const q = new Query();
    q.outFields = ["Deh"];
    q.returnDistinctValues = true;
    q.where = `District = '${district}' AND Taluka = '${taluka}'`;
    try {
        const res = await dehFeatureLayer.queryFeatures(q);
        const vals = new Set(res.features.map(f => f.attributes.Deh).filter(Boolean));
        dehSelect.innerHTML = '<option value="">— Choose Deh —</option>';
        vals.forEach(v => {
            const o = document.createElement('option');
            o.value = o.textContent = v;
            dehSelect.appendChild(o);
        });
        updateStats({ dehs: vals.size });
    } catch (e) { console.error("loadDehs:", e); }
}

async function goToExtent(whereClause) {
    try {
        await dehFeatureLayer.load();

        const q = new Query();
        q.where = whereClause;
        q.returnGeometry = true;
        q.outFields = ["*"];
        // Do NOT set outSpatialReference — let the layer return its native SR
        // so goTo() can reproject correctly

        const res = await dehFeatureLayer.queryFeatures(q);

        if (!res.features || res.features.length === 0) {
            console.warn("goToExtent: no features matched:", whereClause);
            return;
        }

        // goTo() with an array of graphics/features uses their geometries and
        // automatically handles projection + calculates a bounding extent
        await view.goTo(res.features, {
            animate: true,
            duration: 600,
            easing: "ease-in-out"
        });

        // After flying to the features, expand the view slightly so edges
        // aren't clipped by the side panels
        if (view.extent) {
            view.goTo(view.extent.expand(1.3), { animate: false });
        }

    } catch (e) {
        console.error("goToExtent error:", e);
    }
}

// =============================================================================
// STATS CARDS (left panel)
// =============================================================================
let _stats = { districts: 0, talukas: 0, dehs: 0, villages: 0 };

function updateStats(partial) {
    Object.assign(_stats, partial);
    statDistricts.textContent = _stats.districts || '—';
    statTalukas.textContent   = _stats.talukas   || '—';
    statDehs.textContent      = _stats.dehs       || '—';
    statVillages.textContent  = _stats.villages   || '—';
}

// =============================================================================
// RIGHT PANEL POPULATION
// =============================================================================
async function populateInfoPanel(whereClause) {
    try {
        await dehFeatureLayer.load();
        const q = new Query();
        q.where = whereClause;
        q.outFields = ["*"];
        q.returnGeometry = false;
        const res = await dehFeatureLayer.queryFeatures(q);
        const features = res.features;

        const count = features.length;
        infoCountFeatures.textContent = count;

        // Attempt to read HH / Population fields if they exist
        let totalHH = 0, totalPop = 0;
        features.forEach(f => {
            const a = f.attributes;
            totalHH  += (a.HH  || a.hh  || a.Households || 0);
            totalPop += (a.Population || a.population || a.Pop || 0);
        });
        infoCountHH.textContent  = totalHH  || '—';
        infoCountPop.textContent = totalPop || '—';

        // Table
        renderTable(features);

        // Chart — count features per District or Taluka
        const groupKey = features.length && features[0].attributes.Taluka ? 'Taluka' : 'District';
        const grouped = {};
        features.forEach(f => {
            const k = f.attributes[groupKey] || 'Unknown';
            grouped[k] = (grouped[k] || 0) + 1;
        });
        renderChart(grouped);

        // Villages list
        const villages = [...new Set(features.map(f => f.attributes.Deh || f.attributes.Village || f.attributes.deh).filter(Boolean))];
        renderVillageList(villages);
        updateStats({ villages: villages.length });

    } catch (e) { console.error("populateInfoPanel:", e); }
}

function renderTable(features) {
    if (!features || features.length === 0) {
        tableWrapper.innerHTML = '<div class="placeholder-inner"><span class="placeholder-icon">🗂️</span><p>No records found</p></div>';
        tableCountBadge.textContent = '0 records';
        return;
    }

    // Pick a curated set of display fields (exclude geometry/system)
    const skipFields = new Set(["objectid", "globalid", "OBJECTID", "GLOBALID", "shape", "Shape"]);
    const firstAttrs = features[0].attributes;
    const fields = Object.keys(firstAttrs).filter(k => !skipFields.has(k)).slice(0, 6);

    const thead = `<tr>${fields.map(f => `<th>${formatFieldName(f)}</th>`).join('')}</tr>`;
    const tbody = features.slice(0, 50).map(feat => {
        const cells = fields.map(f => {
            const v = feat.attributes[f];
            return `<td title="${v ?? ''}">${v ?? '—'}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    tableWrapper.innerHTML = `<table class="attr-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
    tableCountBadge.textContent = `${features.length} record${features.length !== 1 ? 's' : ''}`;
}

function renderChart(groupedData) {
    const entries = Object.entries(groupedData);
    if (entries.length === 0) {
        chartArea.querySelector('.placeholder-inner') && (chartArea.innerHTML = `<div class="placeholder-inner"><span class="placeholder-icon">📈</span><p>No chart data available</p></div>`);
        return;
    }

    // Show bars
    const maxVal = Math.max(...entries.map(e => e[1]));
    chartBars.style.display = 'block';

    // Remove old placeholder
    const placeholder = chartArea.querySelector('.placeholder-inner');
    if (placeholder) placeholder.remove();

    chartBars.innerHTML = entries.map(([label, val]) => {
        const pct = Math.round((val / maxVal) * 100);
        return `
            <div class="chart-bar-row">
                <div class="chart-bar-label" title="${label}">${label}</div>
                <div class="chart-bar-track">
                    <div class="chart-bar-fill" style="width:${pct}%"></div>
                </div>
                <div class="chart-bar-val">${val}</div>
            </div>
        `;
    }).join('');
}

function renderVillageList(names) {
    villageList.innerHTML = '';
    if (!names || names.length === 0) {
        villageList.innerHTML = '<li class="village-list-empty">No villages found</li>';
        return;
    }
    names.sort().forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        li.addEventListener('click', () => {
            goToExtent(`Deh = '${name}'`);
        });
        villageList.appendChild(li);
    });
}

// Village search filter
villageSearchInput.addEventListener('input', function () {
    const term = this.value.toLowerCase();
    villageList.querySelectorAll('li:not(.village-list-empty)').forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
});

// =============================================================================
// DROPDOWN CHANGE HANDLERS
// =============================================================================
loadDistricts();

districtSelect.addEventListener('change', async function () {
    const d = this.value;
    tehsilSelect.innerHTML = '<option value="">— Choose Taluka —</option>';
    dehSelect.innerHTML    = '<option value="">— Choose Deh —</option>';
    villageSelect.innerHTML = '<option value="">— Choose Village —</option>';
    tehsilSelect.disabled = true;
    dehSelect.disabled    = true;
    villageSelect.disabled = true;

    if (!d) {
        dehFeatureLayer.definitionExpression = null;
        view.goTo({ center: [68.5247, 25.8943], zoom: 7 });
        return;
    }

    dehFeatureLayer.definitionExpression = `District = '${d}'`;
    await goToExtent(`District = '${d}'`);
    await loadTehsils(d);
    tehsilSelect.disabled = false;
    await populateInfoPanel(`District = '${d}'`);
});

tehsilSelect.addEventListener('change', async function () {
    const d = districtSelect.value;
    const t = this.value;

    dehSelect.innerHTML    = '<option value="">— Choose Deh —</option>';
    villageSelect.innerHTML = '<option value="">— Choose Village —</option>';
    dehSelect.disabled    = true;
    villageSelect.disabled = true;

    if (!t) {
        dehFeatureLayer.definitionExpression = `District = '${d}'`;
        return;
    }

    dehFeatureLayer.definitionExpression = `District = '${d}' AND Taluka = '${t}'`;
    await goToExtent(`District = '${d}' AND Taluka = '${t}'`);
    await loadDehs(d, t);
    dehSelect.disabled = false;
    await populateInfoPanel(`District = '${d}' AND Taluka = '${t}'`);
});

dehSelect.addEventListener('change', async function () {
    const d  = districtSelect.value;
    const t  = tehsilSelect.value;
    const dh = this.value;

    villageSelect.innerHTML = '<option value="">— Choose Village —</option>';
    villageSelect.disabled  = true;

    if (!dh) {
        dehFeatureLayer.definitionExpression = `District = '${d}' AND Taluka = '${t}'`;
        return;
    }

    dehFeatureLayer.definitionExpression = `District = '${d}' AND Taluka = '${t}' AND Deh = '${dh}'`;
    await goToExtent(`District = '${d}' AND Taluka = '${t}' AND Deh = '${dh}'`);
    await populateInfoPanel(`District = '${d}' AND Taluka = '${t}' AND Deh = '${dh}'`);
});

applyQueryBtn.addEventListener('click', async function () {
    const d  = districtSelect.value;
    const t  = tehsilSelect.value;
    const dh = dehSelect.value;

    let where = "1=1";
    if (d)  where = `District = '${d}'`;
    if (t)  where += ` AND Taluka = '${t}'`;
    if (dh) where += ` AND Deh = '${dh}'`;

    dehFeatureLayer.definitionExpression = where === "1=1" ? null : where;
    if (where !== "1=1") {
        await goToExtent(where);
        await populateInfoPanel(where);
    }
});

resetBtn.addEventListener('click', function () {
    districtSelect.value = '';
    tehsilSelect.innerHTML = '<option value="">— Choose Taluka —</option>';
    dehSelect.innerHTML    = '<option value="">— Choose Deh —</option>';
    villageSelect.innerHTML = '<option value="">— Choose Village —</option>';
    tehsilSelect.disabled  = true;
    dehSelect.disabled     = true;
    villageSelect.disabled = true;

    dehFeatureLayer.definitionExpression = null;
    view.goTo({ center: [68.5247, 25.8943], zoom: 7 });
    view.popup.close();

    // Reset info panel
    infoCountHH.textContent  = '—';
    infoCountPop.textContent = '—';
    infoCountFeatures.textContent = '—';
    tableWrapper.innerHTML   = '<div class="placeholder-inner"><span class="placeholder-icon">🗂️</span><p>Select an area to view records</p></div>';
    tableCountBadge.textContent = '0 records';
    chartBars.style.display  = 'none';
    chartBars.innerHTML      = '';
    villageList.innerHTML    = '<li class="village-list-empty">Query an area to see villages</li>';
    villageSearchInput.value = '';
    updateStats({ districts: 0, talukas: 0, dehs: 0, villages: 0 });
    loadDistricts();
});

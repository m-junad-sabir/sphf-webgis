// --- ArcGIS imports ----------------------------------------------------------
const [
    config, Map, MapView, FeatureLayer,GeoJSONLayer, GroupLayer, LayerList,
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

    // 1. Initialize the ArcGIS Map with a valid basemap style
    const map = new Map({
        basemap: "satellite"
    });

    // Add visualization layers for LayerList
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

    // Add main Deh FeatureLayer for administrative hierarchy
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

    // Adding Deh Child Layers 
    const M1_Abdul_Gaffoor_Jatoi = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/5f2031c1340145b6b54b33449c5056ca/data",
        title: "M1 Abdul Gaffoor Jatoi",
        visible: true
    });
    const M1_Abdul_Karim_Jatoi = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/70b69adf88a247da875cbcc8663579e0/data",
        title: "M1 Abdul Kariim Jatoi",
        visible: true
    });
    const M1_Bangul_Jatoi = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/cdc73404a70949f29e9eb2f0a7e471e3/data",
        title: "M1 Bangul Jatoi",
        visible: true
    });
    const M1_Dadilo_Khan_Jatoi = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/99ff164c26af41e7ae859548c2a1fa80/data",
        title: "M1 Dadilo Khan Jatoi",
        visible: true
    });
    const M1_Qadir_Pur = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/70a5fee21d16449eac3102383eec6889/data",
        title: "M1 Qadir Pur",
        visible: true
    });
    const M2_Habib_Kot = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/65c1b90f9c7547ce8d27ff16fb8b2787/data",
        title: "M2 Habib Kot",
        visible: true
    });
    const M2_Qazi_Wahan = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/2ea0ac8d3a184eafa6a606b11dab21dc/data",
        title: "M2 Qazi Wahan",
        visible: true
    });
    const M3_Jaffer_Dasti = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/98ee98fd86714378bf197732d3db1ec7/data",
        title: "M3 Jaffer Dasti",
        visible: true
    });
    const M3_Muhammad_Aalam_Shar = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/8c3448c3ab7e460294c428136d60c347/data",
        title: "M3 Muhammad Aalam Shar",
        visible: true
    });
    const M4_Nandhi_Kal_Wari = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/d96a0fd3108f4e58b5454992efa4817f/data",
        title: "M4 Nandhi Kal Wari",
        visible: true
    });
    const M4_Teenda = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/764be13b9e5144e597bfce54cef6ac6e/data",
        title: "M4 Teenda",
        visible: true
    });
    const M5_Haji_Ali_Muhammad_Brohi = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/4e33dda4f48e4b17826c52c21c26560a/data",
        title: "M5 Haji Ali Muhammad Brohi",
        visible: true
    });
    const M5_Juma_Khan_Brohi = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/f0828f6021264ab280828d91a74e49fa/data",
        title: "M5 Juma Khan Brohi",
        visible: true
    });
    const M5_Loung_Labano = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/df7b8fa81a3c42e0a039adf013e29939/data",
        title: "M5 Loung Labano",
        visible: true
    });
    const M6_MilitaryForm_QalandarBux = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/9aa1b945e91e476994f9aff2d9d7de02/data",
        title: "M6 Military Form QalandarBux",
        visible: true
    });
    const M7_Mad_Khoso = new GeoJSONLayer({
        url: "https://www.arcgis.com/sharing/rest/content/items/ca8d8744e4fb4075a1862ca517838ade/data",
        title: "M7 Mad Khoso",
        visible: true
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////
    const dehkotHabibMahar_M1 = new GroupLayer({
        title: "Deh kot Habib Mahar - M1",
        visible: true,
        visibilityMode: "independent",
        layers: [M1_Abdul_Gaffoor_Jatoi, M1_Abdul_Karim_Jatoi, M1_Bangul_Jatoi, M1_Dadilo_Khan_Jatoi]

    });

    const dehkotHabibMahar_M2 = new GroupLayer({
        title: "Deh kot Habib Mahar - M2",
        visible: true,
        visibilityMode: "independent",
        layers: [M2_Habib_Kot]
    });

    const dehkotHabibMahar_M3 = new GroupLayer({
        title: "Deh kot Habib Mahar - M3",
        visible: true,
        visibilityMode: "independent",
        layers: [M3_Muhammad_Aalam_Shar]
    });

    const dehkotHabibMahar_M4 = new GroupLayer({
        title: "Deh kot Habib Mahar - M4",
        visible: true,
        visibilityMode: "independent",
        layers: [M4_Teenda]
    });

    const dehkotHabibMahar_M5 = new GroupLayer({
        title: "Deh kot Habib Mahar - M5",
        visible: true,
        visibilityMode: "independent",
        layers: [M5_Haji_Ali_Muhammad_Brohi, M5_Juma_Khan_Brohi]
    });

    const dehqaziwahan_M1 = new GroupLayer({
        title: "Deh Qazi Wahan - M1",
        visible: true,
        visibilityMode: "independent",
        layers: [M1_Qadir_Pur]
    });

    const dehqaziwahan_M2 = new GroupLayer({
        title: "Deh Qazi Wahan - M2",
        visible: true,
        visibilityMode: "independent",
        layers: [M2_Qazi_Wahan]
    });

    const dehqaziwahan_M3 = new GroupLayer({
        title: "Deh Qazi Wahan - M3",
        visible: true,
        visibilityMode: "independent",
        layers: [M3_Jaffer_Dasti]
    });

    const dehqaziwahan_M4 = new GroupLayer({
        title: "Deh Qazi Wahan - M4",
        visible: true,
        visibilityMode: "independent",
        layers: [M4_Nandhi_Kal_Wari]
    });

    const dehqaziwahan_M5 = new GroupLayer({
        title: "Deh Qazi Wahan - M5",
        visible: true,
        visibilityMode: "independent",
        layers: [M5_Loung_Labano]
    });

    const dehqaziwahan_M6 = new GroupLayer({
        title: "Deh Qazi Wahan - M6",
        visible: true,
        visibilityMode: "independent",
        layers: [M6_MilitaryForm_QalandarBux]
    });

    const dehqaziwahan_M7 = new GroupLayer({
        title: "Deh Qazi Wahan - M7",
        visible: true,
        visibilityMode: "independent",
        layers: [M7_Mad_Khoso]
    });

    map.addMany([ boundaryLayer, districtsLayer, dehFeatureLayer,
        dehkotHabibMahar_M1, dehkotHabibMahar_M2, dehkotHabibMahar_M3, dehkotHabibMahar_M4, dehkotHabibMahar_M5,
        dehqaziwahan_M1, dehqaziwahan_M2, dehqaziwahan_M3, dehqaziwahan_M4, dehqaziwahan_M5, dehqaziwahan_M6, dehqaziwahan_M7]);


        // =============================================================================
        // MAP & VIEW
        // =============================================================================
        // const map = new Map({
        //     basemap: "satellite",
        //     layers: [
        //         boundaryLayer, districtsLayer, dehFeatureLayer, M1_Abdul_Gaffoor_Jatoi
        //     ]
        // });
    // 2. Initialize the MapView centered over Sindh, Pakistan
    const view = new MapView({
        container: "map",
        map : map,
        center: [68.456299194, 26.440361376], // [Longitude, Latitude]
        zoom: 9,
        ui: {
            components: ["attribution"] // Remove default zoom so we can position it manually
        }
    });

    // Add Custom Zoom Control to Top-Right Corner (just below the header)
    const zoomWidget = new Zoom({
        view: view
    });
    view.ui.add(zoomWidget, "top-right");

    // Add Scale Bar Tool at Bottom-Left Corner
    const scaleBarExpand = new Expand({ view, content: new ScaleBar({ view, style: "line", unit: "metric" }), expandIcon: "measure-line" });
    view.ui.add(scaleBarExpand, "bottom-left");

    // Add Home Button
    const homeBtn = new Home({
        view: view
    });
    view.ui.add(new Home({ view }), "top-trailing");

    // Add Compass Widget
    const compass = new Compass({
        view: view
    });
    view.ui.add(new Compass({view}), "top-right");

    // Add Basemap Gallery Widget wrapped inside an Expand widget at Bottom-Right Corner
    const basemapGallery = new BasemapGallery({
        view: view
    });

    const bgExpand = new Expand({
        view: view,
        content: basemapGallery,
        expandIcon: "basemap",
        expandTooltip: "Basemap Gallery"
    });
    view.ui.add(bgExpand, "bottom-right");

    // Add Layer List Widget with opacity sliders and legend buttons
    const layerList = new LayerList({
        view: view,
        listItemCreatedFunction: function(event) {
            const item = event.item;
            item.panel = {
                content: "legend",
                open: false
            };

        }
    });

    // const layerListExpand = new Expand({
    //     view: view,
    //     content: layerList,
    //     expandIcon: "layers",
    //     expandTooltip: "Layer List"
    // });
    view.ui.add(layerList, "top-right");

    // 3. Add Custom Floating "Info Desk" Toggle Button Control on Map Top-Left
    const toggleBtnNode = document.createElement("div");
    toggleBtnNode.id = "mapToggleBtnContainer";
    toggleBtnNode.className = "map-toggle-control";
    toggleBtnNode.innerHTML = `<span>QUERY DATA</span>`;

    toggleBtnNode.addEventListener("click", function() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.remove("collapsed");
        toggleBtnNode.classList.add("hidden");
    });

    view.ui.add(toggleBtnNode, "top-left");

    // 4. Close / Cross Button Functionality inside Sidebar
    const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener("click", function() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.add("collapsed");
            toggleBtnNode.classList.remove("hidden");
        });
    }

    // 5. Add NESPAK Logo Watermark to Bottom Right Corner (aligned with bottom controls)
    const watermarkNode = document.createElement("div");
    watermarkNode.className = "map-nespak-watermark";
    watermarkNode.innerHTML = `
        <span>Designed by</span>
        <img src="images/nespaklogo.png" alt="NESPAK Logo" class="logo-nespak-map" onerror="this.style.display='none'">
    `;
    view.ui.add(watermarkNode, "bottom-right");

    // Auto-popup functionality for dynamic layer popups
    function formatFieldName(name) {
        return name
            .replace(/_/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    function enableAutoPopupsForGeoJSON(layers) {
        const systemFields = [
            "objectid", "fid", "globalid", 
            "shape", "shape_length", "shape_area", 
            "geometry", "type"
        ];

        layers.forEach(layer => {
            if (layer.type === "geojson" || layer.type === "feature") {
                layer.when(() => {
                    if (!layer.fields || layer.fields.length === 0) return;

                    const visibleFieldInfos = layer.fields
                        .filter(field => !systemFields.includes(field.name.toLowerCase()))
                        .map(field => {
                            return {
                                fieldName: field.name,
                                label: (field.alias && field.alias !== field.name) 
                                    ? field.alias 
                                    : formatFieldName(field.name),
                                visible: true
                            };
                        });

                    layer.popupTemplate = new PopupTemplate({
                        title: layer.title ? `${layer.title} Details` : "Feature Attributes",
                        content: [{
                            type: "fields",
                            fieldInfos: visibleFieldInfos
                        }]
                    });
                }).catch(err => {
                    console.error(`Error loading fields for layer ${layer.title || layer.id}:`, err);
                });
            }
        });
    }

    // Enable auto-popups for all layers
    enableAutoPopupsForGeoJSON([districtsLayer, boundaryLayer, dehFeatureLayer]);

    // 6. Administrative Hierarchy with FeatureLayer Queries
    const districtSelect = document.getElementById('districtSelect');
    const tehsilSelect = document.getElementById('tehsilSelect');
    const dehSelect = document.getElementById('dehSelect');
    const resetBtn = document.getElementById('resetBtn');

    // Load distinct districts on initialization
    async function loadDistricts() {
        const query = new Query();
        query.outFields = ["District"];
        query.returnDistinctValues = true;
        query.where = "1=1";

        try {
            const result = await dehFeatureLayer.queryFeatures(query);
            const districts = new Set();
            result.features.forEach(feature => {
                if (feature.attributes.District) {
                    districts.add(feature.attributes.District);
                }
            });

            districtSelect.innerHTML = '<option value="">-- Choose District --</option>';
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading districts:", error);
        }
    }

    // Load distinct tehsils for selected district
    async function loadTehsils(districtName) {
        const query = new Query();
        query.outFields = ["Taluka"];
        query.returnDistinctValues = true;
        query.where = `District = '${districtName}'`;

        try {
            const result = await dehFeatureLayer.queryFeatures(query);
            const tehsils = new Set();
            result.features.forEach(feature => {
                if (feature.attributes.Taluka) {
                    tehsils.add(feature.attributes.Taluka);
                }
            });

            tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
            tehsils.forEach(tehsil => {
                const option = document.createElement('option');
                option.value = tehsil;
                option.textContent = tehsil;
                tehsilSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading tehsils:", error);
        }
    }

    // Load distinct dehs for selected tehsil
    async function loadDehs(districtName, tehsilName) {
        const query = new Query();
        query.outFields = ["Deh"];
        query.returnDistinctValues = true;
        query.where = `District = '${districtName}' AND Taluka = '${tehsilName}'`;

        try {
            const result = await dehFeatureLayer.queryFeatures(query);
            const dehs = new Set();
            result.features.forEach(feature => {
                if (feature.attributes.Deh) {
                    dehs.add(feature.attributes.Deh);
                }
            });

            dehSelect.innerHTML = '<option value="">-- Choose Deh --</option>';
            dehs.forEach(deh => {
                const option = document.createElement('option');
                option.value = deh;
                option.textContent = deh;
                dehSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading dehs:", error);
        }
    }

    // Initialize districts
    loadDistricts();

    // District change handler
    districtSelect.addEventListener('change', async function() {
        const selectedDistrict = this.value;
        
        // Reset dependent dropdowns
        tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
        dehSelect.innerHTML = '<option value="">-- Choose Deh --</option>';
        tehsilSelect.disabled = true;
        dehSelect.disabled = true;

        if (!selectedDistrict) {
            dehFeatureLayer.definitionExpression = null;
            view.goTo({ center: [68.5247, 25.8943], zoom: 7 });
            return;
        }

        // Filter layer to selected district
        dehFeatureLayer.definitionExpression = `District = '${selectedDistrict}'`;

        // Query extent and zoom
        const query = new Query();
        query.where = `District = '${selectedDistrict}'`;
        query.returnGeometry = true;
        query.outSpatialReference = view.spatialReference;

        try {
            const result = await dehFeatureLayer.queryExtent(query);
            if (result.extent) {
                view.goTo({ extent: result.extent });
            }
        } catch (error) {
            console.error("Error querying district extent:", error);
        }

        // Load tehsils
        await loadTehsils(selectedDistrict);
        tehsilSelect.disabled = false;
    });

    // Tehsil change handler
    tehsilSelect.addEventListener('change', async function() {
        const selectedDistrict = districtSelect.value;
        const selectedTehsil = this.value;

        // Reset deh dropdown
        dehSelect.innerHTML = '<option value="">-- Choose Deh --</option>';
        dehSelect.disabled = true;

        if (!selectedTehsil) {
            dehFeatureLayer.definitionExpression = `District = '${selectedDistrict}'`;
            return;
        }

        // Filter layer to selected tehsil
        dehFeatureLayer.definitionExpression = `District = '${selectedDistrict}' AND Taluka = '${selectedTehsil}'`;

        // Query extent and zoom
        const query = new Query();
        query.where = `District = '${selectedDistrict}' AND Taluka = '${selectedTehsil}'`;
        query.returnGeometry = true;
        query.outSpatialReference = view.spatialReference;

        try {
            const result = await dehFeatureLayer.queryExtent(query);
            if (result.extent) {
                view.goTo({ extent: result.extent });
            }
        } catch (error) {
            console.error("Error querying tehsil extent:", error);
        }

        // Load dehs
        await loadDehs(selectedDistrict, selectedTehsil);
        dehSelect.disabled = false;
    });

    // Deh change handler
    dehSelect.addEventListener('change', async function() {
        const selectedDistrict = districtSelect.value;
        const selectedTehsil = tehsilSelect.value;
        const selectedDeh = this.value;

        if (!selectedDeh) {
            dehFeatureLayer.definitionExpression = `District = '${selectedDistrict}' AND Taluka = '${selectedTehsil}'`;
            return;
        }

        // Filter layer to specific deh
        dehFeatureLayer.definitionExpression = `District = '${selectedDistrict}' AND Taluka = '${selectedTehsil}' AND Deh = '${selectedDeh}'`;

        // Query extent and zoom
        const query = new Query();
        query.where = `District = '${selectedDistrict}' AND Taluka = '${selectedTehsil}' AND Deh = '${selectedDeh}'`;
        query.returnGeometry = true;
        query.outSpatialReference = view.spatialReference;

        try {
            const result = await dehFeatureLayer.queryExtent(query);
            if (result.extent) {
                view.goTo({ extent: result.extent });
            }
        } catch (error) {
            console.error("Error querying deh extent:", error);
        }
    });

    // Reset button handler
    resetBtn.addEventListener('click', function() {
        districtSelect.value = "";
        tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
        dehSelect.innerHTML = '<option value="">-- Choose Deh --</option>';
        tehsilSelect.disabled = true;
        dehSelect.disabled = true;
        dehFeatureLayer.definitionExpression = null;
        view.goTo({ center: [68.5247, 25.8943], zoom: 7 });
        view.popup.close();
    });
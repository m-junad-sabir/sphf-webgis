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
        basemap: "topo-vector"
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

    map.addMany([districtsLayer, boundaryLayer]);

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
    map.add(dehFeatureLayer);

    // 2. Initialize the MapView centered over Sindh, Pakistan
    const view = new MapView({
        container: "map",
        map: map,
        center: [68.5247, 25.8943], // [Longitude, Latitude]
        zoom: 7,
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
    const scaleBar = new ScaleBar({
        view: view,
        unit: "metric",
        position: "bottom-left"
    });
    view.ui.add(scaleBar, "bottom-left");

    // Add Home Button
    const homeBtn = new Home({
        view: view
    });
    view.ui.add(homeBtn, "top-left");

    // Add Compass Widget
    const compass = new Compass({
        view: view
    });
    view.ui.add(compass, "top-left");

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

            // Add opacity slider
            const opacitySlider = document.createElement("input");
            opacitySlider.type = "range";
            opacitySlider.min = 0;
            opacitySlider.max = 1;
            opacitySlider.step = 0.1;
            opacitySlider.value = item.layer.opacity || 1;
            opacitySlider.style.width = "100%";
            opacitySlider.style.marginTop = "8px";

            opacitySlider.addEventListener("input", function() {
                item.layer.opacity = parseFloat(opacitySlider.value);
            });

            item.actionsSections = [
                [
                    {
                        title: "Toggle Legend",
                        className: "esri-icon-layer-list",
                        action: function() {
                            item.panel.open = !item.panel.open;
                        }
                    }
                ]
            ];

            // Add opacity slider to the item
            setTimeout(() => {
                const container = document.querySelector(`[aria-label="${item.title}"]`);
                if (container && container.parentElement) {
                    container.parentElement.appendChild(opacitySlider);
                }
            }, 100);
        }
    });

    const layerListExpand = new Expand({
        view: view,
        content: layerList,
        expandIcon: "layers",
        expandTooltip: "Layer List"
    });
    view.ui.add(layerListExpand, "top-right");

    // 3. Add Custom Floating "Info Desk" Toggle Button Control on Map Top-Left
    const toggleBtnNode = document.createElement("div");
    toggleBtnNode.id = "mapToggleBtnContainer";
    toggleBtnNode.className = "map-toggle-control";
    toggleBtnNode.innerHTML = `<span>☰ Info Desk</span>`;

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
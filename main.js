// --- ArcGIS imports ----------------------------------------------------------
const [
    config, Map, MapView, FeatureLayer, GroupLayer, LayerList,
    Home, Legend, PopupTemplate, Expand, BasemapGallery,
    ScaleBar, Compass, SimpleMarkerSymbol
] = await $arcgis.import([
    "@arcgis/core/config.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/layers/FeatureLayer.js",
    "@arcgis/core/layers/GroupLayer.js",
    "@arcgis/core/widgets/LayerList.js",
    "@arcgis/core/widgets/Home.js",
    "@arcgis/core/widgets/Legend.js",
    "@arcgis/core/PopupTemplate.js",
    "@arcgis/core/widgets/Expand.js",
    "@arcgis/core/widgets/BasemapGallery.js",
    "@arcgis/core/widgets/ScaleBar.js",
    "@arcgis/core/widgets/Compass.js",
    "@arcgis/core/symbols/SimpleMarkerSymbol.js"
]);

    // 1. Initialize the ArcGIS Map with a valid basemap style
    const map = new Map({
        basemap: "topo-vector"
    });

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

    // 6. Mock Hierarchical Spatial Data
    const spatialHierarchy = {
        sukkur: {
            name: "Sukkur District",
            coords: [68.8574, 27.7052],
            zoom: 10,
            tehsils: {
                sukkur_city: { name: "Sukkur City", coords: [68.8485, 27.7134], zoom: 12 },
                rohri: { name: "Rohri Tehsil", coords: [68.8923, 27.6923], zoom: 12 },
                salehpat: { name: "Salehpat Tehsil", coords: [69.3500, 27.5333], zoom: 11 }
            }
        },
        larkana: {
            name: "Larkana District",
            coords: [68.2043, 27.5562],
            zoom: 10,
            tehsils: {
                larkana_tehsil: { name: "Larkana Tehsil", coords: [68.2043, 27.5562], zoom: 12 },
                ratodero: { name: "Ratodero Tehsil", coords: [68.2889, 27.8033], zoom: 12 },
                dokri: { name: "Dokri Tehsil", coords: [68.0997, 27.3592], zoom: 12 }
            }
        },
        mirpurkhas: {
            name: "Mirpurkhas District",
            coords: [69.0130, 25.5276],
            zoom: 10,
            tehsils: {
                mirpurkhas_tehsil: { name: "Mirpurkhas Tehsil", coords: [69.0130, 25.5276], zoom: 12 },
                digri: { name: "Digri Tehsil", coords: [68.9138, 25.1539], zoom: 12 },
                kot_gulam_muhammad: { name: "Kot Ghulam Muhammad", coords: [69.1333, 25.3167], zoom: 12 }
            }
        }
    };

    let currentGraphics = [];

    function clearGraphics() {
        view.graphics.removeMany(currentGraphics);
        currentGraphics = [];
    }

    const districtSelect = document.getElementById('districtSelect');
    const tehsilSelect = document.getElementById('tehsilSelect');
    const resetBtn = document.getElementById('resetBtn');

    districtSelect.addEventListener('change', function() {
        const selectedDistrictKey = this.value;
        clearGraphics();
        
        tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
        
        if (!selectedDistrictKey) {
            tehsilSelect.disabled = true;
            view.goTo({ center: [68.5247, 25.8943], zoom: 7 });
            return;
        }

        const districtData = spatialHierarchy[selectedDistrictKey];
        view.goTo({ center: districtData.coords, zoom: districtData.zoom });
        
        const point = new Point({
            longitude: districtData.coords[0],
            latitude: districtData.coords[1]
        });

        const markerGraphic = new Graphic({
            geometry: point,
            symbol: {
                type: "simple-marker",
                color: [226, 119, 40],
                outline: { color: [255, 255, 255], width: 2 }
            },
            popupTemplate: {
                title: districtData.name,
                content: "SPHF Housing Zone"
            }
        });

        view.graphics.add(markerGraphic);
        currentGraphics.push(markerGraphic);
        
        view.popup.open({
            features: [markerGraphic],
            location: point
        });

        tehsilSelect.disabled = false;
        for (const [tehsilKey, tehsilObj] of Object.entries(districtData.tehsils)) {
            const option = document.createElement('option');
            option.value = tehsilKey;
            option.textContent = tehsilObj.name;
            tehsilSelect.appendChild(option);
        }
    });

    tehsilSelect.addEventListener('change', function() {
        const selectedDistrictKey = districtSelect.value;
        const selectedTehsilKey = this.value;

        if (!selectedTehsilKey) return;

        const tehsilData = spatialHierarchy[selectedDistrictKey].tehsils[selectedTehsilKey];
        view.goTo({ center: tehsilData.coords, zoom: tehsilData.zoom });

        const point = new Point({
            longitude: tehsilData.coords[0],
            latitude: tehsilData.coords[1]
        });

        const tehsilMarker = new Graphic({
            geometry: point,
            symbol: {
                type: "simple-marker",
                color: [0, 122, 194],
                outline: { color: [255, 255, 255], width: 2 }
            },
            popupTemplate: {
                title: tehsilData.name,
                content: "Tehsil Level Intervention"
            }
        });

        view.graphics.add(tehsilMarker);
        currentGraphics.push(tehsilMarker);

        view.popup.open({
            features: [tehsilMarker],
            location: point
        });
    });

    resetBtn.addEventListener('click', function() {
        districtSelect.value = "";
        tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
        tehsilSelect.disabled = true;
        clearGraphics();
        view.goTo({ center: [68.5247, 25.8943], zoom: 7 });
        view.popup.close();
    });
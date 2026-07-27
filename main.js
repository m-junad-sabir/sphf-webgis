// 1. Initialize the Map centered over Sindh, Pakistan with zoom control placed at topright
const map = L.map('map', {
    zoomControl: false // Disable default position
}).setView([25.8943, 68.5247], 7);

// Add Zoom Control to Top-Right Corner
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Add OpenStreetMap Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add Scale Bar Tool
L.control.scale({
    imperial: false,
    position: 'bottomleft'
}).addTo(map);

// 2. Add Floating Toggle Button Control on Map Top-Left (Hides when opened)
const sidebarToggleControl = L.control({ position: 'topleft' });

sidebarToggleControl.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'map-toggle-control');
    div.id = 'mapToggleBtnContainer';
    div.innerHTML = `<span>☰ Info Desk</span>`;
    
    // Prevent map click propagation when clicking the button
    L.DomEvent.disableClickPropagation(div);

    div.addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('collapsed');
        
        // Hide the toggle button while sidebar is open
        div.classList.add('hidden');
        
        // Smoothly resize map container after transition finishes
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    });

    return div;
};

sidebarToggleControl.addTo(map);

// 3. Close / Cross Button Functionality inside Sidebar (Reveals toggle button when closed)
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const toggleBtnContainer = document.getElementById('mapToggleBtnContainer');
        
        // Collapse sidebar
        sidebar.classList.add('collapsed');
        
        // Show toggle button again when sidebar closes
        if (toggleBtnContainer) {
            toggleBtnContainer.classList.remove('hidden');
        }
        
        // Smoothly resize map container after transition finishes
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    });
}

// Add NESPAK Logo to the Bottom Right Corner of the Map View
const nespakWatermark = L.control({ position: 'bottomright' });

nespakWatermark.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'map-nespak-watermark');
    div.innerHTML = `
        <span>Designed by</span>
        <img src="images/nespaklogo.png" alt="NESPAK Logo" class="logo-nespak-map" onerror="this.style.display='none'">
    `;
    return div;
};

nespakWatermark.addTo(map);

// 4. Mock Hierarchical Spatial Data (Coordinates & Zoom targets)
const spatialHierarchy = {
    sukkur: {
        name: "Sukkur District",
        coords: [27.7052, 68.8574],
        zoom: 10,
        tehsils: {
            sukkur_city: { name: "Sukkur City", coords: [27.7134, 68.8485], zoom: 12 },
            rohri: { name: "Rohri Tehsil", coords: [27.6923, 68.8923], zoom: 12 },
            salehpat: { name: "Salehpat Tehsil", coords: [27.5333, 69.3500], zoom: 11 }
        }
    },
    larkana: {
        name: "Larkana District",
        coords: [27.5562, 68.2043],
        zoom: 10,
        tehsils: {
            larkana_tehsil: { name: "Larkana Tehsil", coords: [27.5562, 68.2043], zoom: 12 },
            ratodero: { name: "Ratodero Tehsil", coords: [27.8033, 68.2889], zoom: 12 },
            dokri: { name: "Dokri Tehsil", coords: [27.3592, 68.0997], zoom: 12 }
        }
    },
    mirpurkhas: {
        name: "Mirpurkhas District",
        coords: [25.5276, 69.0130],
        zoom: 10,
        tehsils: {
            mirpurkhas_tehsil: { name: "Mirpurkhas Tehsil", coords: [25.5276, 69.0130], zoom: 12 },
            digri: { name: "Digri Tehsil", coords: [25.1539, 68.9138], zoom: 12 },
            kot_gulam_muhammad: { name: "Kot Ghulam Muhammad", coords: [25.3167, 69.1333], zoom: 12 }
        }
    }
};

let currentMarkers = [];

function clearMarkers() {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
}

const districtSelect = document.getElementById('districtSelect');
const tehsilSelect = document.getElementById('tehsilSelect');
const resetBtn = document.getElementById('resetBtn');

districtSelect.addEventListener('change', function() {
    const selectedDistrictKey = this.value;
    clearMarkers();
    
    tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
    
    if (!selectedDistrictKey) {
        tehsilSelect.disabled = true;
        map.setView([25.8943, 68.5247], 7);
        return;
    }

    const districtData = spatialHierarchy[selectedDistrictKey];
    map.setView(districtData.coords, districtData.zoom);
    
    const districtMarker = L.marker(districtData.coords)
        .addTo(map)
        .bindPopup(`<b>${districtData.name}</b><br>SPHF Housing Zone`)
        .openPopup();
    currentMarkers.push(districtMarker);

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
    map.setView(tehsilData.coords, tehsilData.zoom);

    const tehsilMarker = L.marker(tehsilData.coords)
        .addTo(map)
        .bindPopup(`<b>${tehsilData.name}</b><br>Tehsil Level Intervention`)
        .openPopup();
    currentMarkers.push(tehsilMarker);
});

resetBtn.addEventListener('click', function() {
    districtSelect.value = "";
    tehsilSelect.innerHTML = '<option value="">-- Choose Tehsil --</option>';
    tehsilSelect.disabled = true;
    clearMarkers();
    map.setView([25.8943, 68.5247], 7);
});
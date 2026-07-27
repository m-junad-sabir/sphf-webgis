Role: Senior WebGIS Developer specializing in ArcGIS Maps SDK for JavaScript.

Task: Implement dynamic cascading dropdown filtering and spatial zoom logic for a Sindh Province administrative hierarchy WebGIS interface (HTML/CSS/JS) using a single Deh FeatureLayer published on ArcGIS Server.

UI Blueprint & Context (based on UI layout):
1. Top Banner: "Geospatial Mapping in Various Districts of Sindh Province" with logos on left and right.
2. Sidebar Panel: Title "Administrative Hierarchy".
   - Dropdown 1: "Select District"
   - Dropdown 2: "Select Tehsil / Taluka"
   - Dropdown 3: "Select Deh" (Add this 3rd level below Tehsil)
   - Action Button: "Reset View"
3. Map Container: Full-height ArcGIS MapView initialized with Esri basemap.

Data Schema Assumption:
The Deh FeatureLayer contains administrative hierarchy attributes: `district_name`, `taluka_name` (or `tehsil_name`), and `deh_name`.
(Replace `YOUR_FEATURE_LAYER_URL_HERE` with my ArcGIS Server FeatureLayer URL).

Technical Requirements:

1. ArcGIS JS API Modules to use:
   - "esri/Map"
   - "esri/views/MapView"
   - "esri/layers/FeatureLayer"
   - "esri/rest/support/Query"

2. Initial Load Logic:
   - Load the single Deh FeatureLayer onto the MapView.
   - Run a distinct attribute query on initialization to populate the "Select District" dropdown with unique values:
     `query.outFields = ["district_name"]`
     `query.returnDistinctValues = true`
     `query.where = "1=1"`

3. Cascading Hierarchy Logic:
   - District Selected:
     * Set `featureLayer.definitionExpression = "district_name = '" + selectedDistrict + "'";`
     * Populate the Tehsil/Taluka dropdown dynamically with distinct values where `district_name = selectedDistrict`.
     * Query feature extent for the selected District and execute `view.goTo(extent)`.
   - Tehsil/Taluka Selected:
     * Set `featureLayer.definitionExpression = "district_name = '" + selectedDistrict + "' AND taluka_name = '" + selectedTaluka + "'";`
     * Populate Deh dropdown dynamically for that specific Taluka.
     * Query feature extent and execute `view.goTo(extent)`.
   - Deh Selected:
     * Filter to specific Deh or highlight it.
     * Zoom to Deh extent with `view.goTo(extent)` and open Popup.

4. Reset View Button:
   - Clear all dropdown selections.
   - Clear layer definition expression: `featureLayer.definitionExpression = null;`
   - Reset map view back to initial Sindh province extent.

5. Code Structure:
   - Standard HTML5 file structure (`index.html`) using Esri CDN JS & CSS references.
   - Embedded or separate `main.js` script containing module imports and async setup functions.
   - Clean, professional CSS matching the sidebar and card layout from the screenshot.

6. Layer URLS:

Main Layer which will be used to present GIs Mapping data in Hierarchy :

https://www.arcgis.com/home/item.html?id=8ea72b39982844f7873ad2d529c57bf0#overview

Separate Layer just for Visualization in Layelist:
Districts of Pakistan
https://www.arcgis.com/home/item.html?id=8fc5f3b81eb5469cb1628903a57a9ea7#overview
Pakistan Boundary Layer:
https://www.arcgis.com/home/item.html?id=1d46e9fd0f204a3e807b6fe590b8b9c3#overview

7. More Features or Widgets to Add in Mapview:

    - set Layer List Actions/listItemCreatedFunction: createOpacitySlider and Legend button for each three layers
    - compass
    - Scalebar
    - Basemap Galllery, already added
    - Default Home Button

Please generate the complete, self-contained HTML, CSS, and JS implementation based on these specifications.
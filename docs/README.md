# U.S. Childcare Cost Analysis Dashboard

This dashboard provides an interactive visualization of childcare costs across the United States.

## Features

- Interactive map visualization of childcare costs by state
- Filtering by state and cost range
- Display of key metrics including average infant care cost, cost burden, and working parents ratio
- Responsive design that works on desktop and mobile devices

## Files

- `index.html` - The main dashboard page (using ES6 modules)
- `simple-dashboard.html` - A simplified version of the dashboard (all-in-one file)
- `dashboard-test.html` - A test page to verify dashboard functionality
- `data/childcare_costs.json` - The data file containing childcare cost information
- `js/dashboard.js` - The main dashboard JavaScript module
- `js/map.js` - The map visualization module
- `js/network.js` - The network visualization module

## How to Use

1. Start a local web server in the `docs` directory:
   ```
   cd docs
   python -m http.server 8000
   ```

2. Open one of the following URLs in your browser:
   - Main dashboard: http://localhost:8000/
   - Simple dashboard: http://localhost:8000/simple-dashboard.html
   - Test page: http://localhost:8000/dashboard-test.html

## Troubleshooting

If you encounter issues with the main dashboard:

1. Try the simple dashboard version at http://localhost:8000/simple-dashboard.html
2. Run the tests at http://localhost:8000/dashboard-test.html to diagnose issues
3. Check the browser console for error messages
4. Verify that the data file is accessible at http://localhost:8000/data/childcare_costs.json

## Known Issues

- The data contains NaN values for Indiana, which are handled by displaying "No data" in the visualization
- Some browsers may have issues with ES6 modules when served from a local file system (use a web server)

## Browser Compatibility

This dashboard works best in modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+ 
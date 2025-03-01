# U.S. Childcare Cost Analysis Dashboard

This project provides an interactive dashboard for analyzing childcare costs across the United States, focusing on the relationship between childcare costs and various socioeconomic factors.

## Project Overview

The dashboard visualizes data related to childcare costs across different states, including:
- Geographic distribution of childcare costs
- Cost variations by age group (infant, toddler, preschool)
- Relationship between childcare costs and working parent ratios
- Cost burden as a percentage of household income

## Features

- **Interactive Map Visualization**: Choropleth map showing childcare costs by state
- **Network Analysis**: Visualizing relationships between costs and socioeconomic factors
- **Debug Dashboard**: Enhanced version with debugging capabilities
- **Simple Dashboard**: Streamlined version for basic visualization
- **Test Pages**: Various test pages to verify functionality

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for running the local server)

### Running the Dashboard Locally

1. Clone this repository:
   ```
   git clone https://github.com/UKOMAL/MS_Childcare_Cost_Analysis_Project.git
   cd MS_Childcare_Cost_Analysis_Project
   ```

2. Start a local HTTP server:
   ```
   cd docs
   python -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

4. The main page will automatically redirect you to the debug dashboard. You can also access:
   - Debug Dashboard: `http://localhost:8000/debug-dashboard.html`
   - Simple Dashboard: `http://localhost:8000/simple-dashboard.html`
   - Test Dashboard: `http://localhost:8000/dashboard-test.html`
   - Plotly Test: `http://localhost:8000/plotly-test.html`

## Project Structure

```
docs/
├── data/
│   └── childcare_costs.json     # Main data file with state-level childcare costs
├── js/
│   ├── dashboard.js             # Main dashboard functionality
│   ├── map.js                   # Map visualization functions
│   └── network.js               # Network visualization functions
├── index.html                   # Main entry point (redirects to debug dashboard)
├── debug-dashboard.html         # Enhanced dashboard with debugging capabilities
├── simple-dashboard.html        # Simplified dashboard
├── dashboard-test.html          # Test page for dashboard functionality
└── plotly-test.html             # Test page for Plotly functionality
```

## Troubleshooting

If you encounter issues with the dashboard:

1. **Check the Debug Dashboard**: The debug dashboard provides detailed logging information that can help identify issues.

2. **Verify Data Loading**: The debug dashboard includes a "Test Data Loading" button to verify that data is being loaded correctly.

3. **Test Plotly Functionality**: Use the Plotly test page to verify that the visualization library is working correctly.

4. **Browser Console**: Check your browser's developer console for any JavaScript errors.

5. **CORS Issues**: If you're experiencing CORS-related errors, make sure you're using the Python HTTP server as described above.

## Known Issues

- Some states may have NaN values for certain metrics, which are handled gracefully by the visualization code.
- The dashboard requires an active HTTP server to function correctly due to CORS restrictions when loading local files.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sourced from the Department of Labor's National Database of Childcare Prices
- Visualization powered by Plotly.js
- Styling with Bootstrap and Font Awesome

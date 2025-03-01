# U.S. Childcare Cost Analysis: A Data-Driven Story
Author: Komal Shahid  
Course: DSC640  
Date: March 2024

## Executive Summary

This interactive dashboard analyzes childcare costs across the United States, providing insights into the financial burden faced by families. The analysis focuses on three key metrics: monthly childcare costs, cost burden as a percentage of income, and working parent ratios.

## Data Visualization Components

### 1. Geographic Cost Distribution Map
![Geographic Map](images/map_visualization.png)

The choropleth map visualization displays:
- Monthly infant care costs by state
- Color gradient indicating cost intensity
- Interactive hover information showing:
  * State name
  * Monthly cost
  * Cost burden percentage
  * Working parent ratio

**Technical Implementation:**
- Uses Plotly.js for interactive mapping
- Implements USA state-level choropleth
- Custom color scale for intuitive cost representation
- Responsive design for various screen sizes

### 2. Network Analysis
![Network Analysis](images/network_visualization.png)

The network visualization reveals:
- Relationships between different cost metrics
- Correlation strengths between:
  * Infant and toddler care costs
  * Cost burden and working parent ratios
  * Geographic proximity effects

**Technical Features:**
- Force-directed graph layout
- Interactive node connections
- Dynamic correlation calculations
- Color-coded relationship strengths

### 3. Cost Flow Analysis
![Cost Flow](images/cost_flow_visualization.png)

The Sankey diagram illustrates:
- Flow of costs between age groups
- Impact on family economics
- Relationship to workforce participation

**Implementation Details:**
- Dynamic data flow representation
- Interactive flow highlighting
- Customizable view options
- Detailed tooltips with statistics

### 4. 3D Analysis
![3D Analysis](images/3d_visualization.png)

The 3D scatter plot shows:
- Multi-dimensional relationships
- Clustering of states by metrics
- Outlier identification

**Technical Aspects:**
- Interactive 3D rotation
- Multiple metric comparisons
- Dynamic filtering capabilities
- Custom viewpoint controls

## Interactive Features

1. **State Selection**
   - Dropdown menu for state filtering
   - All states or individual state view
   - Dynamic data updates

2. **Cost Range Filtering**
   - Adjustable cost range slider
   - Real-time visualization updates
   - Custom range selection

3. **Visualization Switching**
   - Seamless transition between views
   - Consistent data representation
   - Maintained state filtering

## Key Findings

1. **Geographic Variations**
   - Highest costs in coastal states
   - Regional clustering of similar costs
   - Urban vs. rural cost disparities

2. **Economic Impact**
   - Average cost burden: 3.5% of income
   - Working parent ratio correlation
   - State-by-state variation analysis

3. **Age-Based Cost Analysis**
   - Infant care consistently highest
   - Gradual decrease with age
   - State-specific trends

## Technical Implementation

### Data Processing
```python
# Data cleaning and preparation
data.costs[key] = data.costs[key].map(val => 
    isNaN(val) ? null : parseFloat(val.toFixed(2))
)
```

### Visualization Code
```javascript
const mapData = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: locations,
    z: z,
    text: text,
    hoverinfo: 'text',
    colorscale: [
        [0, '#f7fbff'],
        [0.2, '#deebf7'],
        [0.4, '#c6dbef'],
        [0.6, '#9ecae1'],
        [0.8, '#6baed6'],
        [1, '#2171b5']
    ]
}];
```

## Future Enhancements

1. **Additional Features**
   - Time series analysis
   - Predictive modeling
   - Demographic correlations

2. **Technical Improvements**
   - Enhanced performance
   - Additional data sources
   - Mobile optimization

## Works Cited

1. National Database of Childcare Prices
2. U.S. Census Bureau Working Parent Statistics
3. State-Level Economic Indicators

## Appendix: Technical Documentation

### System Requirements
- Modern web browser
- JavaScript enabled
- Minimum screen resolution: 1024x768

### Dependencies
- Plotly.js
- Bootstrap 5.1.3
- Font Awesome 6.0.0

### Installation
```bash
git clone https://github.com/UKOMAL/MS_Childcare_Cost_Analysis_Project.git
cd MS_Childcare_Cost_Analysis_Project
# Open docs/index.html in a web browser
``` 
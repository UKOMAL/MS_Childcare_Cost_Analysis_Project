# Milestone 3: Interactive Dashboard and Visualizations

## Design and Visualization Summary

The Childcare Cost Analysis Dashboard employs a carefully crafted design approach to effectively communicate complex data relationships through six interconnected visualizations. The color schemes were strategically chosen to enhance data interpretation: a Viridis palette for geographic visualizations ensures colorblind accessibility, Set3 qualitative colors distinguish income brackets, and RdBu_r diverging scheme highlights correlation patterns.

The dashboard's 3x2 grid layout creates a natural visual hierarchy, guiding users through the analysis from broad geographic patterns to detailed state-level impacts. Each visualization serves a specific purpose: the choropleth map provides immediate geographic context, while the bubble map overlay adds depth by representing cost burden through size variations. The donut chart simplifies income-level comparisons, and the correlation heatmap reveals intricate relationships between variables using intuitive color gradients.

Interactive elements enhance user engagement through hover tooltips, clickable legends, and zoom capabilities. Typography choices prioritize readability with a consistent hierarchy: 24px for the main title, 16px for section headers, and 12px for detailed text. The generous spacing (15% between subplots) and margins prevent visual clutter while maintaining cohesion.

The technical implementation leverages modern visualization libraries (Plotly, Seaborn) to create both interactive and static elements, ensuring a comprehensive analysis tool that balances sophistication with accessibility. This thoughtful combination of design elements creates an intuitive, informative dashboard that effectively communicates complex childcare cost patterns across multiple dimensions.

## Files Structure

- `code/`
  - `milestone3.py` - Main analysis and visualization code
  - `create_summary_pdf.py` - PDF report generator
- `output/`
  - `dashboard.html` - Interactive dashboard
  - `correlation.png` - Correlation analysis visualization
  - `time_series.png` - Time series analysis
  - `cost_distribution.png` - Cost distribution analysis
  - `state_costs.png` - State-level analysis
- `milestone3_summary.pdf` - Comprehensive design summary and visualizations

## Directory Structure
```
milestone3/
├── code/
│   ├── milestone3.py
│   └── requirements.txt
├── output/
│   ├── interactive_costs.html
│   ├── static_costs.png
│   ├── infographic.png
│   ├── milestone3_report.pdf
│   ├── dashboard.html
│   ├── correlation.png
│   ├── time_series.png
│   ├── cost_distribution.png
│   └── state_costs.png
└── README.md
```

## Setup and Installation
1. Navigate to the code directory:
   ```bash
   cd code
   ```

2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Code
1. From the code directory, run:
   ```bash
   python milestone3.py
   ```

2. The script will generate four output files in the `output` directory:
   - `interactive_costs.html`: Interactive visualization of cost trends
   - `static_costs.png`: Static visualization of cost distributions
   - `infographic.png`: Comprehensive infographic
   - `milestone3_report.pdf`: PDF report documenting all visualizations

## Outputs
1. **Interactive Visualization**
   - Shows childcare cost trends over time
   - Interactive elements for exploring different age groups
   - HTML format for web viewing

2. **Static Visualization**
   - Distribution of childcare costs by age group
   - Clear comparison of cost ranges
   - PNG format for easy sharing

3. **Infographic**
   - Combines multiple visualizations
   - Shows relationships between different factors
   - Comprehensive view of childcare costs

4. **PDF Report**
   - Documents all visualizations
   - Provides context and explanations
   - Professional presentation format 
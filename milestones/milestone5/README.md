# Milestone 5: Final Project Deliverables

This directory contains the final consolidated code and deliverables for the U.S. Childcare Cost Analysis project.

## Files

- `childcare_analysis_visualizations.py`: Consolidated Python code for all visualizations
- `convert_to_pdf.py`: Script to convert HTML files to PDF format
- `requirements.txt`: List of Python dependencies required to run the code

## Generated Files

The following files will be generated when running the scripts:

### Visualizations (HTML & PNG)
- Time Series Analysis
- Geographic Heatmap
- Urban-Rural Comparison
- Cost Distribution
- Correlation Heatmap

### PDFs
- Case Study
- Dashboard
- Individual Visualizations

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Install wkhtmltopdf (required for PDF conversion):
- macOS: `brew install wkhtmltopdf`
- Ubuntu: `sudo apt-get install wkhtmltopdf`
- Windows: Download from https://wkhtmltopdf.org/downloads.html

3. Generate visualizations:
```bash
python childcare_analysis_visualizations.py
```

4. Convert files to PDF:
```bash
python convert_to_pdf.py
```

## Project Structure

```
milestone5/
├── childcare_analysis_visualizations.py
├── convert_to_pdf.py
├── requirements.txt
├── README.md
└── pdfs/
    ├── case_study.pdf
    ├── dashboard.pdf
    └── visualizations/*.pdf
```

## Notes

- All visualizations are generated using Plotly and can be viewed interactively in HTML format
- PDF versions are provided for documentation and presentation purposes
- The code includes comprehensive error handling and data generation functions 
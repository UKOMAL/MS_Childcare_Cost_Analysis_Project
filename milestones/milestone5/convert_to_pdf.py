#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
PDF Conversion Script for Childcare Cost Analysis Project
"""

import os
import pdfkit
from pathlib import Path

def convert_html_to_pdf():
    """Convert HTML files to PDF format."""
    # Define the files to convert
    files_to_convert = {
        '../../docs/enhanced-case-study.html': 'case_study.pdf',
        '../../docs/new-dashboard.html': 'dashboard.pdf',
        'output/html/time_series.html': 'time_series.pdf',
        'output/html/geographic_heatmap.html': 'geographic_heatmap.pdf',
        'output/html/urban_rural_comparison.html': 'urban_rural_comparison.pdf',
        'output/html/cost_distribution.html': 'cost_distribution.pdf',
        'output/html/correlation_heatmap.html': 'correlation_heatmap.pdf'
    }
    
    # Configure PDF options
    options = {
        'page-size': 'Letter',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': 'UTF-8',
        'no-outline': None,
        'enable-local-file-access': None
    }
    
    # Create PDFs directory if it doesn't exist
    pdf_dir = Path('output/pdfs')
    pdf_dir.mkdir(exist_ok=True, parents=True)
    
    # Convert each file
    for html_file, pdf_name in files_to_convert.items():
        try:
            input_path = str(Path(html_file).resolve())
            output_path = str(pdf_dir / pdf_name)
            print(f"Converting {html_file} to {output_path}...")
            pdfkit.from_file(input_path, output_path, options=options)
            print(f"Successfully created {pdf_name}")
        except Exception as e:
            print(f"Error converting {html_file}: {str(e)}")

if __name__ == "__main__":
    convert_html_to_pdf() 
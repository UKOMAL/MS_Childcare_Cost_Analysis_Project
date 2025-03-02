#!/usr/bin/env python3
"""
Generate PDFs for Milestone 5 of the U.S. Childcare Cost Analysis Project.
This script creates PDF versions of the code and visualizations for submission.
"""

import os
import sys
import subprocess
from pathlib import Path
import matplotlib.pyplot as plt
from fpdf import FPDF
from PIL import Image
import glob

def create_code_pdf(code_file, output_pdf):
    """Create a PDF of the Python code file."""
    try:
        # Create PDF
        pdf = FPDF()
        pdf.add_page()
        
        # Set font
        pdf.set_font("Courier", size=10)
        
        # Add title
        pdf.set_font("Arial", 'B', 16)
        pdf.cell(200, 10, "Milestone 5: Childcare Analysis Visualizations Code", ln=True, align='C')
        pdf.ln(10)
        
        # Reset font for code
        pdf.set_font("Courier", size=8)
        
        # Read code file
        with open(code_file, 'r') as f:
            code = f.readlines()
        
        # Add code to PDF
        for line in code:
            # Replace tabs with spaces for better formatting
            line = line.replace('\t', '    ')
            pdf.multi_cell(0, 5, line.rstrip())
        
        # Save PDF
        pdf.output(output_pdf)
        print(f"Created code PDF: {output_pdf}")
        return True
    except Exception as e:
        print(f"Error creating code PDF: {e}")
        return False

def create_visualizations_pdf(images_dir, output_pdf):
    """Create a PDF of all visualization images."""
    try:
        # Get all image files
        image_files = []
        for ext in ['*.png', '*.jpg', '*.jpeg']:
            image_files.extend(glob.glob(os.path.join(images_dir, ext)))
        
        if not image_files:
            print(f"No images found in {images_dir}")
            return False
        
        # Sort images by name
        image_files.sort()
        
        # Create PDF
        pdf = FPDF()
        
        # Add title page
        pdf.add_page()
        pdf.set_font("Arial", 'B', 16)
        pdf.cell(200, 10, "Milestone 5: Childcare Analysis Visualizations", ln=True, align='C')
        pdf.ln(10)
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, "This document contains all visualizations created for the U.S. Childcare Cost Analysis Project.")
        
        # Add each image to a new page
        for img_path in image_files:
            pdf.add_page()
            
            # Get image dimensions
            img = Image.open(img_path)
            width, height = img.size
            
            # Calculate aspect ratio
            aspect = height / width
            
            # Set image width and height to fit page
            img_width = 190
            img_height = img_width * aspect
            
            # If image is too tall, adjust dimensions
            if img_height > 260:
                img_height = 260
                img_width = img_height / aspect
            
            # Add image to PDF
            pdf.image(img_path, x=10, y=10, w=img_width, h=img_height)
            
            # Add caption (filename without extension)
            caption = os.path.basename(img_path).split('.')[0].replace('_', ' ').title()
            pdf.set_y(img_height + 20)
            pdf.set_font("Arial", 'B', 12)
            pdf.cell(0, 10, caption, ln=True, align='C')
        
        # Save PDF
        pdf.output(output_pdf)
        print(f"Created visualizations PDF: {output_pdf}")
        return True
    except Exception as e:
        print(f"Error creating visualizations PDF: {e}")
        return False

def main():
    # Define paths
    current_dir = Path(__file__).parent.absolute()
    code_file = current_dir / "childcare_analysis_visualizations.py"
    images_dir = current_dir / "output" / "images"
    output_dir = current_dir
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Define output PDF files
    code_pdf = output_dir / "shahid_dsc640_milestone5_code.pdf"
    visualizations_pdf = output_dir / "shahid_dsc640_milestone5_visualizations.pdf"
    
    # Create PDFs
    code_success = create_code_pdf(code_file, code_pdf)
    vis_success = create_visualizations_pdf(images_dir, visualizations_pdf)
    
    # Print summary
    if code_success and vis_success:
        print("\nPDF generation completed successfully!")
        print(f"Code PDF: {code_pdf}")
        print(f"Visualizations PDF: {visualizations_pdf}")
    else:
        print("\nPDF generation completed with errors.")

if __name__ == "__main__":
    main() 
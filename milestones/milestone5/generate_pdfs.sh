#!/bin/bash

# Script to generate PDFs for milestone 5 using enscript and ps2pdf

# Set variables
MILESTONE_DIR="$(dirname "$0")"
CODE_FILE="${MILESTONE_DIR}/childcare_analysis_visualizations.py"
OUTPUT_DIR="${MILESTONE_DIR}"
CODE_PDF="${OUTPUT_DIR}/shahid_dsc640_milestone5_code.pdf"
TEMP_PS="/tmp/code_temp.ps"

echo "Generating PDF for Python code..."

# Check if enscript is installed
if ! command -v enscript &> /dev/null; then
    echo "Error: enscript is not installed. Please install it first."
    exit 1
fi

# Check if ps2pdf is installed
if ! command -v ps2pdf &> /dev/null; then
    echo "Error: ps2pdf is not installed. Please install it first."
    exit 1
fi

# Generate PostScript file with syntax highlighting
enscript --color=1 --highlight=python --fancy-header=python --word-wrap --line-numbers -p "${TEMP_PS}" "${CODE_FILE}"

if [ $? -ne 0 ]; then
    echo "Error: Failed to generate PostScript file."
    exit 1
fi

# Convert PostScript to PDF
ps2pdf "${TEMP_PS}" "${CODE_PDF}"

if [ $? -ne 0 ]; then
    echo "Error: Failed to convert PostScript to PDF."
    rm -f "${TEMP_PS}"
    exit 1
fi

# Clean up temporary files
rm -f "${TEMP_PS}"

echo "Successfully generated code PDF: ${CODE_PDF}"

# Now create a PDF of the visualizations
# This part would require additional tools like ImageMagick or a separate script
# For now, we'll just print a message

echo "To generate a PDF of visualizations, please use a tool like ImageMagick or a PDF creation tool."
echo "Example: convert output/images/*.png shahid_dsc640_milestone5_visualizations.pdf"

echo "PDF generation completed." 
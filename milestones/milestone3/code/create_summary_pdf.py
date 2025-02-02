from fpdf import FPDF
import os
from datetime import datetime

class SummaryPDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Childcare Cost Analysis Dashboard - Design Summary', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def create_summary_pdf():
    pdf = SummaryPDF()
    
    # Add title page
    pdf.add_page()
    pdf.set_font('Arial', 'B', 24)
    pdf.cell(0, 20, 'Childcare Cost Analysis', 0, 1, 'C')
    pdf.set_font('Arial', '', 16)
    pdf.cell(0, 10, 'Design Summary and Visualization Choices', 0, 1, 'C')
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, f'Komal Shahid', 0, 1, 'C')
    pdf.cell(0, 10, f'Date: {datetime.now().strftime("%B %d, %Y")}', 0, 1, 'C')
    
    # Design Summary (250-word explanation)
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Design Summary', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    summary_text = """The Childcare Cost Analysis Dashboard employs a carefully crafted design approach to effectively communicate complex data relationships through six interconnected visualizations. The color schemes were strategically chosen to enhance data interpretation: a Viridis palette for geographic visualizations ensures colorblind accessibility, Set3 qualitative colors distinguish income brackets, and RdBu_r diverging scheme highlights correlation patterns.

The dashboard's 3x2 grid layout creates a natural visual hierarchy, guiding users through the analysis from broad geographic patterns to detailed state-level impacts. Each visualization serves a specific purpose: the choropleth map provides immediate geographic context, while the bubble map overlay adds depth by representing cost burden through size variations. The donut chart simplifies income-level comparisons, and the correlation heatmap reveals intricate relationships between variables using intuitive color gradients.

Interactive elements enhance user engagement through hover tooltips, clickable legends, and zoom capabilities. Typography choices prioritize readability with a consistent hierarchy: 24px for the main title, 16px for section headers, and 12px for detailed text. The generous spacing (15% between subplots) and margins prevent visual clutter while maintaining cohesion.

The technical implementation leverages modern visualization libraries (Plotly, Seaborn) to create both interactive and static elements, ensuring a comprehensive analysis tool that balances sophistication with accessibility. This thoughtful combination of design elements creates an intuitive, informative dashboard that effectively communicates complex childcare cost patterns across multiple dimensions."""
    pdf.multi_cell(0, 10, summary_text)
    
    # Design Decisions
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Design Decisions', 0, 1, 'L')
    
    # Color Schemes
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Color Schemes', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    schemes = [
        'Geographic Visualizations: Used Viridis color palette for colorblind-friendly visualization',
        'Income Level Analysis: Implemented Set3 qualitative colors for distinct income brackets',
        'Correlation Analysis: Utilized RdBu_r diverging color scheme for correlations'
    ]
    for scheme in schemes:
        pdf.cell(10, 10, chr(149), 0, 0, 'L')  # bullet point
        pdf.multi_cell(0, 10, scheme)
    
    # Layout and Organization
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Layout and Organization', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    layouts = [
        'Dashboard Structure: 3x2 grid layout for six key visualizations',
        'Spacing: 15% vertical and horizontal spacing between subplots',
        'Margins: Generous margins for text readability'
    ]
    for layout in layouts:
        pdf.cell(10, 10, chr(149), 0, 0, 'L')
        pdf.multi_cell(0, 10, layout)
    
    # Add visualizations
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Visualizations', 0, 1, 'L')
    
    # Add each visualization with description
    visualizations = [
        ('correlation.png', 'Correlation Analysis: Heatmap showing relationships between variables'),
        ('time_series.png', 'Time Series Analysis: Trends in childcare costs over time'),
        ('cost_distribution.png', 'Cost Distribution: Analysis by income levels'),
        ('state_costs.png', 'State Analysis: Geographic distribution of costs')
    ]
    
    for img_file, description in visualizations:
        if os.path.exists(f'../output/{img_file}'):
            pdf.image(f'../output/{img_file}', x=10, y=None, w=190)
            pdf.set_font('Arial', 'I', 10)
            pdf.multi_cell(0, 10, description)
            pdf.ln(5)
    
    # Technical Implementation
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Technical Implementation', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    techs = [
        'Plotly for interactive visualizations',
        'Seaborn for statistical visualizations',
        'Matplotlib for static plots',
        'Pandas for data manipulation'
    ]
    for tech in techs:
        pdf.cell(10, 10, chr(149), 0, 0, 'L')
        pdf.multi_cell(0, 10, tech)
    
    # Save the PDF
    pdf.output('../output/milestone3_summary.pdf')

if __name__ == "__main__":
    create_summary_pdf() 
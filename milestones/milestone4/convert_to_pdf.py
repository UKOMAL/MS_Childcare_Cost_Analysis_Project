from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

def create_pdf():
    # Read markdown content
    with open('shahid_dsc640_milestone4.md', 'r', encoding='utf-8') as file:
        content = file.read()

    # Create the PDF document
    doc = SimpleDocTemplate(
        "shahid_dsc640_milestone4.pdf",
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )

    # Get styles
    styles = getSampleStyleSheet()
    
    # Create custom styles
    custom_title = ParagraphStyle(
        name='CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        spaceAfter=30,
        alignment=1  # Center alignment
    )
    
    custom_heading2 = ParagraphStyle(
        name='CustomHeading2',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=12
    )
    
    custom_heading3 = ParagraphStyle(
        name='CustomHeading3',
        parent=styles['Heading3'],
        fontSize=12,
        spaceAfter=10
    )
    
    custom_metadata = ParagraphStyle(
        name='CustomMetadata',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=6,
        alignment=1  # Center alignment
    )

    # Create story (content)
    story = []

    # Process content
    sections = content.split('\n## ')
    
    # Add title and header info
    header_info = sections[0].split('\n')
    story.append(Paragraph(header_info[0].replace('# ', ''), custom_title))
    
    # Process metadata (author, course, etc.)
    for line in header_info[1:]:
        if line.strip():
            # Remove asterisks and clean up the line
            clean_line = line.replace('**', '').strip()
            story.append(Paragraph(clean_line, custom_metadata))
    story.append(Spacer(1, 20))

    # Add visualizations after Executive Summary
    visualization_paths = [
        '../output/static_costs.png',
        '../output/infographic.png',
        '../output/network_viz.png',
        '../output/bubble_viz.png',
        '../output/sankey_viz.png',
        '../output/3d_viz.png'
    ]

    # Process remaining sections
    for section in sections[1:]:
        if section.strip():
            # Split into title and content
            parts = section.split('\n', 1)
            if len(parts) == 2:
                title, content = parts
                
                # Add section title
                story.append(Paragraph(title, custom_heading2))
                
                # Process subsections
                subsections = content.split('\n### ')
                
                # Add main section content
                main_content = subsections[0].strip()
                paragraphs = main_content.split('\n')
                for p in paragraphs:
                    if p.strip():
                        story.append(Paragraph(p.strip(), styles['Normal']))
                
                # Add visualizations after Executive Summary section
                if "Executive Summary" in title:
                    story.append(Spacer(1, 20))
                    story.append(Paragraph("Key Visualizations", custom_heading2))
                    for viz_path in visualization_paths:
                        if os.path.exists(viz_path):
                            img = Image(viz_path, width=6*inch, height=4*inch)
                            story.append(img)
                            story.append(Spacer(1, 12))
                
                story.append(Spacer(1, 12))
                
                # Process subsections
                for subsection in subsections[1:]:
                    sub_parts = subsection.split('\n', 1)
                    if len(sub_parts) == 2:
                        sub_title, sub_content = sub_parts
                        story.append(Paragraph(sub_title, custom_heading3))
                        
                        paragraphs = sub_content.strip().split('\n')
                        for p in paragraphs:
                            if p.strip():
                                story.append(Paragraph(p.strip(), styles['Normal']))
                        story.append(Spacer(1, 12))

    # Build PDF
    doc.build(story)

if __name__ == "__main__":
    create_pdf() 
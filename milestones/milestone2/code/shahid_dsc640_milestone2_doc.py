import markdown
from weasyprint import HTML, CSS
import base64
import os

def create_final_document():
    # Read the markdown content
    with open('../Shahid_DSC640_Milestone2.md', 'r') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content)
    
    # Add visualization sections
    visualization_html = """
    <h2>Generated Visualizations</h2>
    
    <h3>Interactive Dashboard Mock-ups</h3>
    <p>The following visualizations demonstrate the planned components of our interactive dashboard:</p>
    <div class="dashboard-mockups">
        <iframe src="dashboard_map.html" width="100%" height="600px"></iframe>
        <iframe src="dashboard_trends.html" width="100%" height="600px"></iframe>
        <iframe src="dashboard_comparison.html" width="100%" height="600px"></iframe>
    </div>
    
    <h3>Social Media Video Storyboard Visuals</h3>
    <p>Sample frames from our planned social media video series:</p>
    <div class="social-media-mockups">
        <img src="social_media_1.png" alt="Social Media Visual 1" style="max-width: 100%;">
        <img src="social_media_2.png" alt="Social Media Visual 2" style="max-width: 100%;">
    </div>
    
    <h3>Infographic Series Mock-ups</h3>
    <p>Initial designs for our infographic series:</p>
    <div class="infographic-mockups">
        <img src="infographic_1.png" alt="Infographic 1" style="max-width: 100%;">
        <img src="infographic_2.png" alt="Infographic 2" style="max-width: 100%;">
    </div>
    """
    
    # Combine content
    full_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }}
            h1 {{ color: #2c3e50; }}
            h2 {{ color: #34495e; margin-top: 30px; }}
            h3 {{ color: #7f8c8d; }}
            img {{ max-width: 100%; margin: 20px 0; }}
            .dashboard-mockups, .social-media-mockups, .infographic-mockups {{
                margin: 30px 0;
            }}
        </style>
    </head>
    <body>
        {html_content}
        {visualization_html}
    </body>
    </html>
    """
    
    # Save as PDF
    HTML(string=full_html).write_pdf(
        '../Shahid_DSC640_Milestone2.pdf',
        stylesheets=[CSS(string='@page { size: letter; margin: 1in }')]
    )

if __name__ == "__main__":
    create_final_document()
    print("Final document generated successfully!") 
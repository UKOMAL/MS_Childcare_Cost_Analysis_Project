from PIL import Image
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.utils import ImageReader

def combine_images_to_pdf():
    # Path to images and output PDF
    image_dir = 'output/images'
    output_pdf = 'output/pdfs/milestone5_visualizations.pdf'
    
    # Ensure output directory exists
    os.makedirs('output/pdfs', exist_ok=True)
    
    # Get list of image files
    image_files = [f for f in os.listdir(image_dir) if f.endswith('.png')]
    image_files.sort()  # Sort files alphabetically
    
    # Create PDF
    c = canvas.Canvas(output_pdf, pagesize=landscape(letter))
    width, height = landscape(letter)
    
    # Add each image to the PDF
    for img_file in image_files:
        img_path = os.path.join(image_dir, img_file)
        img = Image.open(img_path)
        
        # Calculate aspect ratio
        aspect = img.width / img.height
        
        # Calculate dimensions to fit on page while maintaining aspect ratio
        if aspect > width/height:
            # Image is wider than page aspect ratio
            new_width = width - 40
            new_height = new_width / aspect
        else:
            # Image is taller than page aspect ratio
            new_height = height - 40
            new_width = new_height * aspect
        
        # Center the image on the page
        x = (width - new_width) / 2
        y = (height - new_height) / 2
        
        # Draw the image
        c.drawImage(ImageReader(img_path), x, y, width=new_width, height=new_height)
        
        # Add title
        title = img_file.replace('_', ' ').replace('.png', '').title()
        c.setFont("Helvetica", 14)
        c.drawCentredString(width/2, height-20, title)
        
        c.showPage()
    
    c.save()
    print(f"PDF created successfully at {output_pdf}")

if __name__ == '__main__':
    combine_images_to_pdf() 
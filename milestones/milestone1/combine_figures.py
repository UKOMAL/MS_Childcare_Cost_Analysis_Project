from PIL import Image
import os

def combine_images_to_pdf(image_files, output_pdf):
    """Combine multiple PNG files into a single PDF."""
    # Open all images
    images = []
    for image_file in image_files:
        if image_file.endswith('.png'):
            img = Image.open(image_file)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            images.append(img)
    
    if images:
        # Save the first image as PDF with the remaining images appended
        images[0].save(
            output_pdf,
            save_all=True,
            append_images=images[1:],
            resolution=300
        )
        print(f"Created PDF: {output_pdf}")
    else:
        print("No PNG files found to combine.")

if __name__ == "__main__":
    # List of image files to combine
    image_files = [
        'childcare_costs_map.png',
        'cost_distribution.png',
        'cost_trends.png',
        'urban_rural_comparison.png'
    ]
    
    # Output PDF file
    output_pdf = "milestone1_figures.pdf"
    
    # Combine images into PDF
    combine_images_to_pdf(image_files, output_pdf) 
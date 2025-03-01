# U.S. Childcare Cost Analysis Dashboard

This project provides an interactive dashboard for visualizing and analyzing childcare costs across the United States. The dashboard includes various visualizations and data insights to help understand the financial impact of childcare on families.

## Features

- Interactive U.S. map showing childcare costs by state
- Bar chart comparison of costs across states
- Cost comparison across different care types (infant, toddler, preschool)
- Cost vs. family budget burden analysis
- Key insights and statistics
- Data export functionality (CSV)

## Project Structure

- `docs/` - Main directory for all web files (for GitHub Pages)
  - `index.html` - Home page with redirects
  - `new-dashboard.html` - Main dashboard interface
  - `js/` - JavaScript files
    - `new-dashboard.js` - Main dashboard functionality
  - `js-test.html` - Test page for verifying JavaScript loading

## Viewing the Dashboard

The dashboard and case study are hosted on GitHub Pages and can be accessed at:
- Dashboard: [https://ukomal.github.io/MS_Childcare_Cost_Analysis_Project/docs/complete-dashboard.html](https://ukomal.github.io/MS_Childcare_Cost_Analysis_Project/docs/complete-dashboard.html)
- Case Study: [https://ukomal.github.io/MS_Childcare_Cost_Analysis_Project/docs/enhanced-case-study.html](https://ukomal.github.io/MS_Childcare_Cost_Analysis_Project/docs/enhanced-case-study.html)

### Alternative Access Methods

If GitHub Pages is not working properly, you can access the dashboard using these alternative methods:

1. **Local Access**: Download the repository and open the HTML files directly in your browser
2. **Web Server**: Host the files on any web server (Apache, Nginx, etc.)
3. **Static Site Hosting**: Deploy to Netlify, Vercel, or similar services

## Local Development

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/UKOMAL/MS_Childcare_Cost_Analysis_Project.git
   ```
2. Navigate to the project directory
3. Open the `docs/new-dashboard.html` file directly in your web browser

## Technologies Used

- HTML5, CSS3, JavaScript
- Bootstrap 5 for responsive layout
- Plotly.js for interactive visualizations
- Font Awesome for icons

## Troubleshooting

If you encounter issues with the dashboard:

1. **Browser Console**: Check for error messages (F12 or right-click > Inspect > Console)
2. **Test Page**: Visit the `js-test.html` page to verify JavaScript loading
3. **CORS Issues**: If accessing locally, some browsers restrict loading local files. Use a local server:
   ```
   cd docs
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000/new-dashboard.html`
4. **Clear Cache**: Try clearing your browser cache or using incognito/private mode

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data is simulated for educational purposes
- Created as part of DSC640 course at Bellevue University

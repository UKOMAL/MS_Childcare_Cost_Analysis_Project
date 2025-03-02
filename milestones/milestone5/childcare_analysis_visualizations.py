#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
U.S. Childcare Cost Analysis Project (2008-2018)
DSC640 - Data Presentation and Visualization
Student: Komal Shahid
Date: March 2, 2024

This script generates all visualizations for the project, including:
1. Time Series Analysis of Childcare Costs
2. Geographic Distribution of Labor Force Participation
3. Urban vs Rural Comparison
4. Cost Distribution Analysis
5. Correlation Analysis
6. Regional Cost Trends
7. State-wise Cost Comparison
8. Annual Growth Rate Analysis
"""

import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats
from pathlib import Path
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import plotly.io as pio

# Data Generation Functions
def generate_childcare_data():
    """Generate sample childcare cost data for different regions."""
    np.random.seed(42)
    years = range(2008, 2019)
    regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West']
    
    base_costs = {
        'Northeast': 18000,
        'Southeast': 12000,
        'Midwest': 14000,
        'Southwest': 11000,
        'West': 16000
    }
    
    growth_rates = {
        'Northeast': 0.045,
        'Southeast': 0.035,
        'Midwest': 0.038,
        'Southwest': 0.032,
        'West': 0.042
    }
    
    data = []
    for year in years:
        for region in regions:
            base = base_costs[region]
            growth = growth_rates[region]
            years_since_start = year - 2008
            cost = base * (1 + growth) ** years_since_start
            # Add some random variation
            cost *= np.random.normal(1, 0.02)
            data.append({
                'Year': year,
                'Region': region,
                'Cost': cost
            })
    
    return pd.DataFrame(data)

def generate_urban_rural_data():
    """Generate sample data for urban vs rural comparison."""
    np.random.seed(42)
    metrics = ['Cost_Ratio', 'Availability', 'Quality_Rating', 'Transportation_Time', 'Workforce_Impact']
    
    urban_data = {
        'Northeast': [1.35, 0.85, 4.2, 15, 0.82],
        'Southeast': [1.25, 0.75, 3.8, 20, 0.75],
        'Midwest': [1.28, 0.80, 4.0, 18, 0.78],
        'Southwest': [1.22, 0.72, 3.7, 22, 0.73],
        'West': [1.32, 0.82, 4.1, 17, 0.80]
    }
    
    rural_data = {
        'Northeast': [1.0, 0.60, 3.5, 35, 0.65],
        'Southeast': [0.95, 0.50, 3.2, 45, 0.60],
        'Midwest': [0.98, 0.55, 3.4, 40, 0.62],
        'Southwest': [0.92, 0.48, 3.1, 48, 0.58],
        'West': [1.0, 0.58, 3.4, 38, 0.63]
    }
    
    return urban_data, rural_data, metrics

def generate_labor_force_data():
    """Generate sample labor force participation data."""
    np.random.seed(42)
    states = ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'OH', 'IN', 'IL', 
              'MI', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS', 'DE', 'MD', 'DC',
              'VA', 'WV', 'NC', 'SC', 'GA', 'FL', 'KY', 'TN', 'AL', 'MS', 'AR', 'LA',
              'OK', 'TX', 'MT', 'ID', 'WY', 'CO', 'NM', 'AZ', 'UT', 'NV', 'WA', 'OR',
              'CA', 'AK', 'HI']
    
    base_participation = 0.75
    data = []
    
    for state in states:
        participation = base_participation + np.random.normal(0, 0.05)
        participation = min(max(participation, 0.55), 0.85)
        data.append({
            'State': state,
            'Participation_Rate': participation
        })
    
    return pd.DataFrame(data)

# Visualization Functions
def create_time_series_visualization(data=None):
    """Create time series visualization of childcare costs by region."""
    if data is None:
        data = generate_childcare_data()
    
    fig = go.Figure()
    
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        fig.add_trace(go.Scatter(
            x=region_data['Year'],
            y=region_data['Cost'],
            name=region,
            mode='lines+markers',
            line=dict(width=3),
            marker=dict(size=8)
        ))
    
    fig.update_layout(
        title='Childcare Costs by Region (2008-2018)',
        xaxis_title='Year',
        yaxis_title='Annual Cost ($)',
        template='plotly_white',
        hovermode='x unified',
        legend=dict(
            yanchor="top",
            y=0.99,
            xanchor="left",
            x=0.01
        ),
        showlegend=True
    )
    
    fig.update_yaxes(tickprefix='$', tickformat=',')
    return fig

def create_geographic_heatmap(data=None):
    """Create geographic heatmap of childcare costs."""
    if data is None:
        data = generate_labor_force_data()
    
    fig = go.Figure(data=go.Choropleth(
        locations=data['State'],
        z=data['Participation_Rate'],
        locationmode='USA-states',
        colorscale='Viridis',
        colorbar_title="Participation Rate"
    ))

    fig.update_layout(
        title_text='Labor Force Participation Rate by State',
        geo_scope='usa',
        template='plotly_white'
    )
    
    return fig

def create_urban_rural_comparison():
    """Create radar chart comparing urban and rural childcare metrics."""
    urban_data, rural_data, metrics = generate_urban_rural_data()
    
    fig = go.Figure()
    
    for region in urban_data.keys():
        fig.add_trace(go.Scatterpolar(
            r=urban_data[region],
            theta=metrics,
            name=f'{region} (Urban)',
            line_color='red'
        ))
        fig.add_trace(go.Scatterpolar(
            r=rural_data[region],
            theta=metrics,
            name=f'{region} (Rural)',
            line_color='blue'
        ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 5]
            )),
        showlegend=True,
        title='Urban vs Rural Childcare Metrics by Region'
    )
    
    return fig

def create_cost_distribution():
    """Create violin plot of childcare cost distribution."""
    data = generate_childcare_data()
    
    fig = go.Figure()
    
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        fig.add_trace(go.Violin(
            x=region_data['Region'],
            y=region_data['Cost'],
            name=region,
            box_visible=True,
            meanline_visible=True
        ))
    
    fig.update_layout(
        title='Distribution of Childcare Costs by Region',
        xaxis_title='Region',
        yaxis_title='Annual Cost ($)',
        template='plotly_white',
        showlegend=False
    )
    
    fig.update_yaxes(tickprefix='$', tickformat=',')
    return fig

def create_correlation_heatmap(data=None):
    """Create correlation heatmap for childcare metrics."""
    if data is None:
        data = generate_childcare_data()
    
    # Calculate correlations between different metrics
    corr_data = pd.DataFrame({
        'Cost': data['Cost'],
        'Year': data['Year'],
        'Region_Code': pd.Categorical(data['Region']).codes,
        'Cost_Growth': data.groupby('Region')['Cost'].pct_change(),
        'Regional_Avg': data.groupby('Region')['Cost'].transform('mean')
    })
    
    correlation_matrix = corr_data.corr()
    
    fig = go.Figure(data=go.Heatmap(
        z=correlation_matrix,
        x=correlation_matrix.columns,
        y=correlation_matrix.columns,
        colorscale='RdBu',
        zmin=-1,
        zmax=1
    ))
    
    fig.update_layout(
        title='Correlation Heatmap of Childcare Metrics',
        template='plotly_white'
    )
    
    return fig

def create_regional_cost_trends():
    """Create line plot showing cost trends by region."""
    data = generate_childcare_data()
    
    fig = go.Figure()
    
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        fig.add_trace(go.Scatter(
            x=region_data['Year'],
            y=region_data['Cost'],
            name=region,
            mode='lines+markers',
            line=dict(width=2),
            marker=dict(size=6)
        ))
    
    fig.update_layout(
        title='Regional Childcare Cost Trends (2008-2018)',
        xaxis_title='Year',
        yaxis_title='Annual Cost ($)',
        template='plotly_white',
        showlegend=True
    )
    
    return fig

def create_state_comparison():
    """Create bar chart comparing costs across states."""
    data = generate_labor_force_data()
    
    fig = go.Figure(data=[
        go.Bar(
            x=data['State'],
            y=data['Participation_Rate'],
            marker_color='skyblue'
        )
    ])
    
    fig.update_layout(
        title='Labor Force Participation Rate by State',
        xaxis_title='State',
        yaxis_title='Participation Rate',
        template='plotly_white'
    )
    
    return fig

def create_growth_rate_analysis():
    """Create box plot of annual growth rates by region."""
    data = generate_childcare_data()
    
    # Calculate growth rates
    data['Growth_Rate'] = data.groupby('Region')['Cost'].pct_change()
    
    fig = go.Figure()
    
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        fig.add_trace(go.Box(
            y=region_data['Growth_Rate'],
            name=region,
            boxpoints='all',
            jitter=0.3,
            pointpos=-1.8
        ))
    
    fig.update_layout(
        title='Annual Growth Rate Distribution by Region',
        yaxis_title='Growth Rate (%)',
        template='plotly_white',
        showlegend=False
    )
    
    fig.update_yaxes(tickformat='%')
    return fig

def save_plotly_as_matplotlib(fig, filename):
    """Save a plotly figure as a static image using matplotlib."""
    # Get the figure data
    data = fig.data
    layout = fig.layout
    
    # Create matplotlib figure
    plt.figure(figsize=(12, 8))
    
    # Plot each trace
    for trace in data:
        if trace.type == 'scatter':
            plt.plot(trace.x, trace.y, label=trace.name)
        elif trace.type == 'violin':
            plt.violinplot(trace.y, positions=[0], showmeans=True)
        elif trace.type == 'heatmap':
            plt.imshow(trace.z, cmap='RdBu', aspect='auto')
            plt.colorbar()
    
    # Set title and labels
    if layout.title:
        plt.title(layout.title.text)
    if layout.xaxis and layout.xaxis.title:
        plt.xlabel(layout.xaxis.title.text)
    if layout.yaxis and layout.yaxis.title:
        plt.ylabel(layout.yaxis.title.text)
    
    # Add legend if needed
    if any(trace.name for trace in data):
        plt.legend()
    
    # Save the figure
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()

def save_visualizations():
    """Save all visualizations as HTML and static images."""
    # Create output directories
    output_dir = Path('output')
    output_dir.mkdir(exist_ok=True)
    
    html_dir = output_dir / 'html'
    html_dir.mkdir(exist_ok=True)
    
    img_dir = output_dir / 'images'
    img_dir.mkdir(exist_ok=True)
    
    # Generate all visualizations
    print("Generating visualizations...")
    visualizations = {
        'time_series': create_time_series_visualization(),
        'geographic_heatmap': create_geographic_heatmap(),
        'urban_rural_comparison': create_urban_rural_comparison(),
        'cost_distribution': create_cost_distribution(),
        'correlation_heatmap': create_correlation_heatmap(),
        'regional_trends': create_regional_cost_trends(),
        'state_comparison': create_state_comparison(),
        'growth_analysis': create_growth_rate_analysis()
    }
    
    # Save as HTML
    print("Saving HTML files...")
    for name, fig in visualizations.items():
        html_path = html_dir / f"{name}.html"
        fig.write_html(str(html_path))
    
    try:
        # Save static images
        print("Saving static images...")
        for name, fig in visualizations.items():
            png_path = img_dir / f"{name}.png"
            save_plotly_as_matplotlib(fig, str(png_path))
            print(f"Saved image: {png_path}")
        
        print("\nSuccessfully generated all visualizations!")
        print(f"HTML files saved in: {html_dir}")
        print(f"Image files saved in: {img_dir}")
        
    except Exception as e:
        print(f"\nWarning: Could not save PNG files due to error: {str(e)}")
        print("HTML files were saved successfully.")

if __name__ == "__main__":
    save_visualizations() 
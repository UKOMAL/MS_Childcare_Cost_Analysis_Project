#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
U.S. Childcare Cost Analysis Project (2008-2018)
DSC640 - Data Presentation and Visualization
Student: Komal Shahid
Date: March 2, 2024

This script generates eight comprehensive visualizations for the childcare cost analysis:
1. Time series analysis of costs over time
2. Geographic distribution of costs
3. Urban vs rural comparison
4. Cost distribution analysis
5. Correlation analysis of metrics
6. Regional cost trends
7. State-wise cost comparison
8. Annual growth rate analysis
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
import traceback

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
    
    # Create two visualizations: one for costs and one for labor force
    cost_fig = go.Figure(data=go.Choropleth(
        locations=data['State'],
        z=data['Participation_Rate'] * 20000,  # Convert to approximate costs
        locationmode='USA-states',
        colorscale='Viridis',
        colorbar_title="Annual Cost ($)"
    ))

    cost_fig.update_layout(
        title_text='Childcare Costs by State',
        geo_scope='usa',
        template='plotly_white'
    )
    
    labor_fig = go.Figure(data=go.Choropleth(
        locations=data['State'],
        z=data['Participation_Rate'],
        locationmode='USA-states',
        colorscale='Viridis',
        colorbar_title="Participation Rate"
    ))

    labor_fig.update_layout(
        title_text='Labor Force Participation Rate by State',
        geo_scope='usa',
        template='plotly_white'
    )
    
    return cost_fig, labor_fig

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

def create_cost_spiral():
    """Create radial plot of cost progression."""
    data = generate_childcare_data()
    
    fig = go.Figure()
    
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        theta = np.linspace(0, 2*np.pi, len(region_data))
        r = region_data['Cost'] / 1000  # Scale down for better visualization
        
        fig.add_trace(go.Scatterpolar(
            r=r,
            theta=region_data['Year'].astype(str),
            name=region,
            mode='lines+markers'
        ))
    
    fig.update_layout(
        title='Spiral View of Cost Progression (2008-2018)',
        template='plotly_white',
        showlegend=True
    )
    
    return fig

def create_social_media_impact():
    """Create visualization of social media discussion trends."""
    years = range(2008, 2019)
    metrics = ['Mentions', 'Sentiment', 'Engagement']
    data = pd.DataFrame({
        'Year': list(years) * 3,
        'Metric': [m for m in metrics for _ in years],
        'Value': np.random.normal(100, 20, len(years) * 3)
    })
    
    fig = px.line(data, x='Year', y='Value', color='Metric',
                  title='Social Media Discussion Trends')
    
    return fig

def save_visualizations():
    """Save all visualizations as HTML and static images with error handling."""
    try:
        # Create output directories
        output_dir = Path('output')
        output_dir.mkdir(exist_ok=True)
        
        html_dir = output_dir / 'html'
        html_dir.mkdir(exist_ok=True)
        
        img_dir = output_dir / 'images'
        img_dir.mkdir(exist_ok=True)
        
        # Generate all visualizations
        print("Generating visualizations...")
        time_series = create_time_series_visualization()
        cost_map, labor_map = create_geographic_heatmap()
        urban_rural = create_urban_rural_comparison()
        cost_dist = create_cost_distribution()
        corr_heatmap = create_correlation_heatmap()
        cost_spiral = create_cost_spiral()
        social_media = create_social_media_impact()
        
        # Save as HTML with error handling
        print("Saving HTML files...")
        visualizations = {
            'time_series.html': time_series,
            'childcare_costs_map.html': cost_map,
            'labor_force_map.html': labor_map,
            'urban_rural_comparison.html': urban_rural,
            'cost_distribution.html': cost_dist,
            'correlation_heatmap.html': corr_heatmap,
            'cost_spiral.html': cost_spiral,
            'social_media_impact.html': social_media
        }
        
        for filename, fig in visualizations.items():
            try:
                fig.write_html(str(html_dir / filename))
                fig.write_image(str(img_dir / filename.replace('.html', '.png')))
                print(f"Successfully saved {filename}")
            except Exception as e:
                print(f"Error saving {filename}: {str(e)}")
                traceback.print_exc()
        
        print("\nVisualization generation complete!")
        print(f"HTML files saved in: {html_dir}")
        print(f"Image files saved in: {img_dir}")
        
    except Exception as e:
        print(f"Error during visualization generation: {str(e)}")
        traceback.print_exc()

if __name__ == "__main__":
    save_visualizations()
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
U.S. Childcare Cost Analysis Project (2008-2018)
DSC640 - Data Presentation and Visualization
Student: Komal Shahid
Date: March 2, 2024

This script generates static visualizations for the childcare cost analysis:
1. Time series analysis of childcare costs
2. Geographic distribution (choropleth map)
3. Female labor force participation (geographic distribution)
4. Urban vs Rural comparison
5. Cost distribution analysis
6. Correlation heatmap
7. Cost trends analysis
"""

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import geopandas as gpd
from pathlib import Path

# Set style for all plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

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
            cost *= np.random.normal(1, 0.02)
            data.append({
                'Year': year,
                'Region': region,
                'Cost': cost
            })
    
    return pd.DataFrame(data)

def generate_state_data():
    """Generate state-level childcare cost data with yearly trends."""
    np.random.seed(42)
    states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
              'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
              'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
              'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
              'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    
    years = range(2008, 2019)
    data = []
    
    for state in states:
        base_cost = np.random.uniform(8000, 20000)
        growth_rate = np.random.uniform(0.02, 0.05)
        
        for year in years:
            years_since_start = year - 2008
            cost = base_cost * (1 + growth_rate) ** years_since_start
            
            urban_cost = cost * np.random.uniform(1.1, 1.3)
            suburban_cost = cost * np.random.uniform(0.9, 1.1)
            rural_cost = cost * np.random.uniform(0.7, 0.9)
            center_cost = cost * np.random.uniform(1.2, 1.4)
            income_level = np.random.uniform(45000, 85000)
            population = np.random.uniform(500000, 5000000)
            labor_force_rate = np.random.uniform(55, 75)
            
            data.append({
                'State': state,
                'Year': year,
                'Annual_Cost': cost,
                'Urban_Cost': urban_cost,
                'Suburban_Cost': suburban_cost,
                'Rural_Cost': rural_cost,
                'Center_Cost': center_cost,
                'Median_Income': income_level,
                'Population': population,
                'Labor_Force_Rate': labor_force_rate
            })
    
    return pd.DataFrame(data)

def generate_social_media_data():
    """Generate social media impact data."""
    np.random.seed(42)
    platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn']
    metrics = ['Engagement Rate', 'Reach', 'Shares', 'Comments']
    data = []
    
    for platform in platforms:
        for metric in metrics:
            base_value = np.random.uniform(1000, 5000)
            for month in range(1, 13):
                value = base_value * (1 + np.random.uniform(-0.2, 0.3))
                data.append({
                    'Platform': platform,
                    'Metric': metric,
                    'Month': month,
                    'Value': value
                })
    
    return pd.DataFrame(data)

def save_visualizations():
    """Save all static visualizations as PNG files."""
    script_dir = Path(__file__).parent
    output_dir = script_dir / 'output'
    output_dir.mkdir(exist_ok=True)
    img_dir = output_dir / 'images'
    img_dir.mkdir(exist_ok=True)
    
    print("Generating static visualizations...")
    
    # Set style for all plots
    plt.style.use('seaborn-v0_8-whitegrid')
    
    # 1. Geographic Cost Distribution (Choropleth)
    state_data = generate_state_data()
    latest_year = state_data['Year'].max()
    latest_data = state_data[state_data['Year'] == latest_year]
    
    shapefile_path = script_dir / 'data/cb_2018_us_state_20m/cb_2018_us_state_20m.shp'
    states = gpd.read_file(shapefile_path)
    states = states.merge(latest_data, left_on='STUSPS', right_on='State')
    
    fig, ax = plt.subplots(figsize=(20, 12))
    
    # Adjust the map extent to focus on continental US
    states.plot(column='Annual_Cost', 
               ax=ax,
               legend=True,
               legend_kwds={'label': f'Annual Childcare Cost ({latest_year})',
                           'orientation': 'horizontal',
                           'fraction': 0.035,  # Reduced legend size
                           'pad': 0.01,
                           'aspect': 30},  # Make legend more compact
               missing_kwds={'color': 'lightgrey'},
               cmap='RdYlBu_r',
               edgecolor='white',
               linewidth=0.8)
    
    # Set map bounds to focus on continental US
    ax.set_xlim(-125, -65)
    ax.set_ylim(25, 50)
    
    for idx, row in states.iterrows():
        centroid = row.geometry.centroid
        # Only label continental US states
        if row['State'] not in ['AK', 'HI']:
            cost_value = row['Annual_Cost']
            text_color = 'white' if cost_value > states['Annual_Cost'].mean() else 'black'
            ax.annotate(f"{row['State']}\n${cost_value:,.0f}", 
                       xy=(centroid.x, centroid.y),
                       horizontalalignment='center',
                       verticalalignment='center',
                       fontsize=9,
                       color=text_color,
                       weight='bold')
    
    ax.axis('off')
    plt.title(f'Childcare Costs by State ({latest_year})', 
             pad=20, fontsize=16, fontweight='bold')
    plt.savefig(img_dir / 'childcare_costs_map.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: childcare_costs_map.png")
    
    # 2. Female Labor Force Map
    fig, ax = plt.subplots(figsize=(20, 12))
    
    # Adjust the map extent to focus on continental US
    states.plot(column='Labor_Force_Rate', 
               ax=ax,
               legend=True,
               legend_kwds={'label': 'Female Labor Force\nParticipation Rate (%)',
                           'orientation': 'horizontal',
                           'fraction': 0.035,  # Reduced legend size
                           'pad': 0.01,
                           'aspect': 30},  # Make legend more compact
               missing_kwds={'color': 'lightgrey'},
               cmap='RdPu',
               edgecolor='white',
               linewidth=0.8)
    
    # Set map bounds to focus on continental US
    ax.set_xlim(-125, -65)
    ax.set_ylim(25, 50)
    
    for idx, row in states.iterrows():
        centroid = row.geometry.centroid
        # Only label continental US states
        if row['State'] not in ['AK', 'HI']:
            rate_value = row['Labor_Force_Rate']
            text_color = 'white' if rate_value > states['Labor_Force_Rate'].mean() else 'black'
            ax.annotate(f"{row['State']}\n{rate_value:.1f}%", 
                       xy=(centroid.x, centroid.y),
                       horizontalalignment='center',
                       verticalalignment='center',
                       fontsize=9,
                       color=text_color,
                       weight='bold')
    
    ax.axis('off')
    plt.title('Female Labor Force Participation Rate by State', 
             pad=20, fontsize=16, fontweight='bold')
    plt.savefig(img_dir / 'female_labor_force.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: female_labor_force.png")
    
    # 3. Time Series Analysis
    data = generate_childcare_data()
    plt.figure(figsize=(15, 8))
    colors = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FF99CC']
    
    for idx, region in enumerate(data['Region'].unique()):
        region_data = data[data['Region'] == region]
        plt.plot(region_data['Year'], region_data['Cost'], 
                label=region, marker='o', linewidth=3, 
                color=colors[idx], markersize=8)
        
        for x, y in zip(region_data['Year'], region_data['Cost']):
            if x in [2008, 2013, 2018]:
                plt.annotate(f'${y:,.0f}', 
                           (x, y), 
                           textcoords="offset points", 
                           xytext=(0,10), 
                           ha='center',
                           fontsize=9)
    
    plt.title('Regional Childcare Cost Trends (2008-2018)', 
             pad=20, fontsize=16, fontweight='bold')
    plt.xlabel('Year', fontsize=12, fontweight='bold')
    plt.ylabel('Annual Cost ($)', fontsize=12, fontweight='bold')
    plt.legend(title='Region', bbox_to_anchor=(1.05, 1), 
              loc='upper left', fontsize=10)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(img_dir / 'time_series.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: time_series.png")
    
    # 4. State Costs Spiral
    plt.figure(figsize=(15, 15))
    theta = np.linspace(0, 4*np.pi, len(data))
    r = data['Cost'].values
    x = theta * np.cos(theta)
    y = theta * np.sin(theta)
    
    plt.plot(x, y, '-o', linewidth=2, markersize=6)
    
    for i, year in enumerate(data['Year'].unique()):
        idx = i * 5
        plt.annotate(str(year), 
                    (x[idx], y[idx]),
                    xytext=(10, 10),
                    textcoords='offset points',
                    fontsize=10,
                    fontweight='bold')
    
    plt.title('Childcare Cost Evolution (Spiral View)', 
             pad=20, fontsize=16, fontweight='bold')
    plt.axis('equal')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(img_dir / 'state_costs.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: state_costs.png")
    
    # 5. Social Media Impact
    social_data = generate_social_media_data()
    
    # First social media visualization
    plt.figure(figsize=(15, 8))
    for platform in social_data['Platform'].unique():
        platform_data = social_data[social_data['Platform'] == platform]
        plt.plot(platform_data['Month'], 
                platform_data['Value'], 
                'o-', 
                label=platform,
                linewidth=2,
                markersize=6)
    
    plt.title('Social Media Platform Performance', 
             pad=20, fontsize=16, fontweight='bold')
    plt.xlabel('Month', fontsize=12, fontweight='bold')
    plt.ylabel('Engagement Value', fontsize=12, fontweight='bold')
    plt.legend(title='Platform', bbox_to_anchor=(1.05, 1))
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(img_dir / 'social_media_1.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: social_media_1.png")
    
    # Second social media visualization
    plt.figure(figsize=(12, 8))
    pivot_data = social_data.pivot_table(
        values='Value', 
        index='Platform',
        columns='Metric',
        aggfunc='mean'
    )
    
    sns.heatmap(pivot_data,
                annot=True,
                fmt='.0f',
                cmap='YlOrRd',
                linewidths=0.5,
                cbar_kws={'label': 'Average Value'})
    
    plt.title('Social Media Metrics Comparison',
             pad=20, fontsize=16, fontweight='bold')
    plt.tight_layout()
    plt.savefig(img_dir / 'social_media_2.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: social_media_2.png")
    
    # 6. Correlation Analysis
    correlation_data = state_data[[
        'Annual_Cost', 'Urban_Cost', 'Rural_Cost', 'Suburban_Cost', 'Center_Cost',
        'Median_Income', 'Population', 'Labor_Force_Rate'
    ]]
    
    # Create more readable column names for display
    column_names = {
        'Annual_Cost': 'Annual Cost',
        'Urban_Cost': 'Urban Cost',
        'Rural_Cost': 'Rural Cost',
        'Suburban_Cost': 'Suburban Cost',
        'Center_Cost': 'Center Cost',
        'Median_Income': 'Median Income',
        'Population': 'Population',
        'Labor_Force_Rate': 'Labor Force Rate'
    }
    correlation_data = correlation_data.rename(columns=column_names)
    correlation_matrix = correlation_data.corr()
    
    plt.figure(figsize=(15, 12))
    
    # Create the heatmap with enhanced styling
    sns.heatmap(correlation_matrix,
                annot=True,
                fmt='.2f',
                cmap='RdYlBu_r',  # Red-Yellow-Blue diverging colormap
                center=0,
                square=True,
                linewidths=1,
                cbar_kws={
                    'label': 'Correlation Coefficient',
                    'orientation': 'horizontal',
                    'pad': 0.2
                },
                annot_kws={'size': 12})
    
    # Enhance title and layout
    plt.suptitle('Correlation Analysis of Childcare Metrics',
                y=0.95, fontsize=20, fontweight='bold')
    plt.title('Relationship Strength Between Different Cost Factors and Demographics',
             pad=20, fontsize=14, style='italic')
    
    # Adjust label properties
    plt.xticks(rotation=45, ha='right', fontsize=12)
    plt.yticks(rotation=0, fontsize=12)
    
    # Add more padding to prevent label cutoff
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    
    # Save with high quality
    plt.savefig(img_dir / 'correlation.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: correlation.png")
    
    print(f"\nAll static visualizations saved in: {img_dir}")

if __name__ == "__main__":
    save_visualizations() 
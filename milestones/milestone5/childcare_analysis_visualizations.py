#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
U.S. Childcare Cost Analysis Project (2008-2018)
DSC640 - Data Presentation and Visualization
Student: Komal Shahid
Date: March 2, 2024

This script generates visualizations for the childcare cost analysis:
1. Time series analysis of childcare costs
2. Geographic distribution (choropleth map)
3. Female labor force participation
"""

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from pathlib import Path
import geopandas as gpd

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
    """Generate state-level childcare cost data."""
    np.random.seed(42)
    # US state abbreviations
    states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
              'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
              'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
              'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
              'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    
    data = []
    for state in states:
        base_cost = np.random.uniform(8000, 20000)
        data.append({
            'State': state,
            'Annual_Cost': base_cost
        })
    
    return pd.DataFrame(data)

def save_visualizations():
    """Save all visualizations as static images."""
    output_dir = Path('output')
    output_dir.mkdir(exist_ok=True)
    
    img_dir = output_dir / 'images'
    img_dir.mkdir(exist_ok=True)
    
    print("Generating visualizations...")
    
    # 1. Time Series Analysis
    data = generate_childcare_data()
    plt.figure(figsize=(12, 8))
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        plt.plot(region_data['Year'], region_data['Cost'], 
                label=region, marker='o', linewidth=2)
    plt.title('Childcare Costs by Region (2008-2018)', pad=20, fontsize=14)
    plt.xlabel('Year', fontsize=12)
    plt.ylabel('Annual Cost ($)', fontsize=12)
    plt.legend(title='Region', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(img_dir / 'time_series.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: time_series.png")
    
    # 2. Geographic Distribution (Choropleth)
    state_data = generate_state_data()
    # Load US states shapefile from local file
    states = gpd.read_file('data/cb_2018_us_state_20m/cb_2018_us_state_20m.shp')
    states = states.merge(state_data, left_on='STUSPS', right_on='State')
    
    fig, ax = plt.subplots(figsize=(20, 12))
    states.plot(column='Annual_Cost', 
               ax=ax,
               legend=True,
               legend_kwds={'label': 'Annual Cost ($)',
                           'orientation': 'horizontal',
                           'fraction': 0.046,
                           'pad': 0.04},
               missing_kwds={'color': 'lightgrey'},
               cmap='YlOrRd')
    
    # Add state labels
    for idx, row in states.iterrows():
        # Get the centroid of each state
        centroid = row.geometry.centroid
        # Add state abbreviation
        ax.annotate(row['State'], xy=(centroid.x, centroid.y),
                   horizontalalignment='center', verticalalignment='center',
                   fontsize=8, color='black')
    
    ax.axis('off')
    plt.title('Childcare Costs by State (2018)', pad=20, fontsize=16)
    plt.savefig(img_dir / 'childcare_costs_map.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: childcare_costs_map.png")
    
    # 3. Female Labor Force Participation
    years = range(2008, 2019)
    participation_rate = [65.5, 64.8, 64.2, 63.9, 63.7, 63.5, 63.2, 63.0, 62.8, 62.7, 62.5]
    
    plt.figure(figsize=(12, 8))
    plt.plot(years, participation_rate, marker='o', linewidth=2, color='#FF69B4')
    plt.fill_between(years, participation_rate, alpha=0.2, color='#FF69B4')
    
    plt.title('Female Labor Force Participation Rate (2008-2018)', pad=20, fontsize=14)
    plt.xlabel('Year', fontsize=12)
    plt.ylabel('Participation Rate (%)', fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(img_dir / 'female_labor_force.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: female_labor_force.png")
    
    print(f"\nAll image files saved in: {img_dir}")

if __name__ == "__main__":
    save_visualizations() 
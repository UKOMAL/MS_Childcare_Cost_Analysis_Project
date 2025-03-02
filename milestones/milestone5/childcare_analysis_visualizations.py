#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
U.S. Childcare Cost Analysis Project (2008-2018)
DSC640 - Data Presentation and Visualization
Student: Komal Shahid
Date: March 2, 2024

This script generates eight visualizations for the childcare cost analysis:
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
import seaborn as sns
import matplotlib.pyplot as plt
from pathlib import Path

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

def save_visualizations():
    """Save all visualizations as static images."""
    # Create output directory
    output_dir = Path('output')
    output_dir.mkdir(exist_ok=True)
    
    img_dir = output_dir / 'images'
    img_dir.mkdir(exist_ok=True)
    
    # Generate all visualizations
    print("Generating visualizations...")
    
    # Time series
    data = generate_childcare_data()
    plt.figure(figsize=(12, 8))
    for region in data['Region'].unique():
        region_data = data[data['Region'] == region]
        plt.plot(region_data['Year'], region_data['Cost'], label=region, marker='o')
    plt.title('Childcare Costs by Region (2008-2018)')
    plt.xlabel('Year')
    plt.ylabel('Annual Cost ($)')
    plt.legend()
    plt.grid(True)
    plt.savefig(img_dir / 'time_series.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: time_series.png")
    
    # Geographic heatmap
    labor_data = generate_labor_force_data()
    plt.figure(figsize=(12, 8))
    plt.bar(labor_data['State'], labor_data['Participation_Rate'])
    plt.title('Labor Force Participation Rate by State')
    plt.xlabel('State')
    plt.ylabel('Participation Rate')
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.savefig(img_dir / 'geographic_heatmap.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: geographic_heatmap.png")
    
    # Urban-Rural comparison
    urban_data, rural_data, metrics = generate_urban_rural_data()
    plt.figure(figsize=(12, 8))
    angles = np.linspace(0, 2*np.pi, len(metrics), endpoint=False)
    angles = np.concatenate((angles, [angles[0]]))  # complete the circle
    
    for region in urban_data.keys():
        values_urban = urban_data[region]
        values_rural = rural_data[region]
        values_urban = np.concatenate((values_urban, [values_urban[0]]))
        values_rural = np.concatenate((values_rural, [values_rural[0]]))
        plt.polar(angles, values_urban, label=f'{region} (Urban)')
        plt.polar(angles, values_rural, label=f'{region} (Rural)')
    
    plt.title('Urban vs Rural Childcare Metrics by Region')
    plt.legend(bbox_to_anchor=(1.2, 1))
    plt.savefig(img_dir / 'urban_rural_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: urban_rural_comparison.png")
    
    # Cost distribution
    cost_data = generate_childcare_data()  # Get fresh data
    plt.figure(figsize=(12, 8))
    sns.violinplot(data=cost_data, x='Region', y='Cost')
    plt.title('Distribution of Childcare Costs by Region')
    plt.xlabel('Region')
    plt.ylabel('Annual Cost ($)')
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.savefig(img_dir / 'cost_distribution.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: cost_distribution.png")
    
    # Correlation heatmap
    corr_data = pd.DataFrame({
        'Cost': cost_data['Cost'],
        'Year': cost_data['Year'],
        'Region_Code': pd.Categorical(cost_data['Region']).codes,
        'Cost_Growth': cost_data.groupby('Region')['Cost'].pct_change(),
        'Regional_Avg': cost_data.groupby('Region')['Cost'].transform('mean')
    })
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr_data.corr(), annot=True, cmap='RdBu', center=0, vmin=-1, vmax=1)
    plt.title('Correlation Heatmap of Childcare Metrics')
    plt.savefig(img_dir / 'correlation_heatmap.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: correlation_heatmap.png")
    
    # Regional trends
    plt.figure(figsize=(12, 8))
    for region in cost_data['Region'].unique():
        region_data = cost_data[cost_data['Region'] == region]
        plt.plot(region_data['Year'], region_data['Cost'], label=region, marker='o')
    plt.title('Regional Childcare Cost Trends (2008-2018)')
    plt.xlabel('Year')
    plt.ylabel('Annual Cost ($)')
    plt.legend()
    plt.grid(True)
    plt.savefig(img_dir / 'regional_trends.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: regional_trends.png")
    
    # State comparison
    plt.figure(figsize=(15, 8))
    plt.bar(labor_data['State'], labor_data['Participation_Rate'])
    plt.title('Labor Force Participation Rate by State')
    plt.xlabel('State')
    plt.ylabel('Participation Rate')
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.savefig(img_dir / 'state_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: state_comparison.png")
    
    # Growth rate analysis
    growth_data = generate_childcare_data()  # Get fresh data
    growth_data['Growth_Rate'] = growth_data.groupby('Region')['Cost'].pct_change()
    growth_data = growth_data.dropna(subset=['Growth_Rate'])
    
    plt.figure(figsize=(12, 8))
    sns.boxplot(data=growth_data, x='Region', y='Growth_Rate')
    plt.title('Annual Growth Rate Distribution by Region')
    plt.xlabel('Region')
    plt.ylabel('Growth Rate (%)')
    plt.grid(True)
    plt.savefig(img_dir / 'growth_analysis.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("Saved: growth_analysis.png")
    
    print(f"\nAll image files saved in: {img_dir}")

if __name__ == "__main__":
    save_visualizations() 
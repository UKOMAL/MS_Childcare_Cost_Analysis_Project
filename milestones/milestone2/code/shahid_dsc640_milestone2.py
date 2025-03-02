import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import seaborn as sns

# Generate sample data
np.random.seed(42)

# Sample data for states
states = ['CA', 'NY', 'TX', 'FL', 'IL', 'MA', 'WA', 'OR', 'CO', 'AZ']
urban_costs = np.random.normal(1500, 200, len(states))
rural_costs = np.random.normal(900, 150, len(states))
years = range(2015, 2024)
trend_data = {
    'Year': list(years) * len(states),
    'State': sorted(states * len(years)),
    'Cost': np.random.normal(1200, 300, len(years) * len(states)) * 
            np.linspace(1, 1.5, len(years) * len(states))  # Increasing trend
}

# Create DataFrame
df_trend = pd.DataFrame(trend_data)
df_comparison = pd.DataFrame({
    'State': states,
    'Urban_Cost': urban_costs,
    'Rural_Cost': rural_costs
})

# 1. Interactive Dashboard Mock-ups

# Choropleth map
def create_choropleth():
    fig = go.Figure(data=go.Choropleth(
        locations=df_comparison['State'],
        z=df_comparison['Urban_Cost'],
        locationmode='USA-states',
        colorscale='Viridis',
        colorbar_title="Monthly Cost ($)"
    ))
    fig.update_layout(
        title_text='Average Monthly Childcare Costs by State',
        geo_scope='usa',
    )
    fig.write_html("dashboard_map.html")

# Time series plot
def create_time_series():
    fig = px.line(df_trend, x='Year', y='Cost', color='State',
                 title='Childcare Cost Trends (2015-2023)')
    fig.write_html("dashboard_trends.html")

# Urban vs Rural comparison
def create_comparison_bar():
    fig = go.Figure(data=[
        go.Bar(name='Urban', x=states, y=urban_costs),
        go.Bar(name='Rural', x=states, y=rural_costs)
    ])
    fig.update_layout(
        title='Urban vs Rural Childcare Costs by State',
        barmode='group'
    )
    fig.write_html("dashboard_comparison.html")

# 2. Social Media Video Storyboard Visualizations

def create_social_media_visuals():
    # Create eye-catching visualizations for social media
    plt.style.use('default')
    
    # Visualization 1: Cost Burden
    plt.figure(figsize=(10, 6))
    plt.bar(states, urban_costs/40, color='#FF6B6B')
    plt.title('Weekly Salary Hours Needed for Childcare\nby State', pad=20)
    plt.ylabel('Hours of Work Needed (at median wage)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('social_media_1.png')
    
    # Visualization 2: Cost Growth
    plt.figure(figsize=(10, 6))
    sns.lineplot(data=df_trend, x='Year', y='Cost', hue='State')
    plt.title('The Rising Cost of Childcare\n(2015-2023)', pad=20)
    plt.ylabel('Monthly Cost ($)')
    plt.tight_layout()
    plt.savefig('social_media_2.png')

# 3. Infographic Series Mock-ups

def create_infographic_elements():
    # State Comparison Infographic
    plt.figure(figsize=(12, 8))
    sns.barplot(data=df_comparison, x='State', y='Urban_Cost', 
                color='#4A90E2')
    plt.title('Average Monthly Childcare Costs\nAcross Major States', pad=20)
    plt.ylabel('Monthly Cost ($)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('infographic_1.png')
    
    # Urban-Rural Divide Infographic
    plt.figure(figsize=(12, 8))
    width = 0.35
    plt.bar(np.arange(len(states)) - width/2, urban_costs, width, 
            label='Urban', color='#FF6B6B')
    plt.bar(np.arange(len(states)) + width/2, rural_costs, width, 
            label='Rural', color='#4ECDC4')
    plt.title('Urban vs Rural Childcare Cost Divide', pad=20)
    plt.xlabel('States')
    plt.ylabel('Monthly Cost ($)')
    plt.xticks(np.arange(len(states)), states, rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.savefig('infographic_2.png')

if __name__ == "__main__":
    # Generate all visualizations
    create_choropleth()
    create_time_series()
    create_comparison_bar()
    create_social_media_visuals()
    create_infographic_elements()
    print("All visualizations generated successfully!") 
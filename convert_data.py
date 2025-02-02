import pandas as pd
import json
import os

def convert_data_to_json():
    # Load the data from milestone3
    df = pd.read_csv('../milestone3/data/childcare_costs.csv')
    
    # Create data structures for different visualizations
    data = {
        'states': {
            'locations': df['State'].unique().tolist(),
            'costs': {
                'infant': df.groupby('State')['Infant Care Cost'].mean().to_dict(),
                'toddler': df.groupby('State')['Toddler Care Cost'].mean().to_dict(),
                'preschool': df.groupby('State')['Preschool Cost'].mean().to_dict()
            },
            'income': df.groupby('State')['Median Household Income'].mean().to_dict(),
            'population': df.groupby('State')['Total Population'].mean().to_dict()
        },
        'timeSeries': {
            'years': df['Year'].unique().tolist(),
            'trends': {
                'infant': df.groupby('Year')['Infant Care Cost'].mean().to_dict(),
                'toddler': df.groupby('Year')['Toddler Care Cost'].mean().to_dict(),
                'preschool': df.groupby('Year')['Preschool Cost'].mean().to_dict()
            }
        },
        'network': {
            'nodes': [
                {'id': 'infant_cost', 'label': 'Infant Care Cost'},
                {'id': 'toddler_cost', 'label': 'Toddler Care Cost'},
                {'id': 'preschool_cost', 'label': 'Preschool Cost'},
                {'id': 'household_income', 'label': 'Household Income'},
                {'id': 'population', 'label': 'Population'}
            ],
            'edges': [
                {'from': 'infant_cost', 'to': 'toddler_cost', 'value': df['Infant Care Cost'].corr(df['Toddler Care Cost'])},
                {'from': 'toddler_cost', 'to': 'preschool_cost', 'value': df['Toddler Care Cost'].corr(df['Preschool Cost'])},
                {'from': 'infant_cost', 'to': 'preschool_cost', 'value': df['Infant Care Cost'].corr(df['Preschool Cost'])},
                {'from': 'household_income', 'to': 'infant_cost', 'value': df['Median Household Income'].corr(df['Infant Care Cost'])},
                {'from': 'household_income', 'to': 'population', 'value': df['Median Household Income'].corr(df['Total Population'])}
            ]
        }
    }
    
    # Calculate cost burden for each state
    for state in data['states']['locations']:
        state_data = df[df['State'] == state]
        avg_cost = state_data['Infant Care Cost'].mean()
        avg_income = state_data['Median Household Income'].mean()
        data['states']['cost_burden'] = {state: (avg_cost / avg_income) * 100 for state in data['states']['locations']}
    
    # Ensure docs/data directory exists
    os.makedirs('docs/data', exist_ok=True)
    
    # Save to JSON file
    with open('docs/data/childcare_costs.json', 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    convert_data_to_json() 
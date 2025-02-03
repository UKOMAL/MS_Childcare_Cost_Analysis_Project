import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('data/nationaldatabaseofchildcareprices.xlsx')

# Process data for visualization
state_data = df.groupby('State_Abbreviation').agg({
    'MCInfant': 'mean',
    'MCToddler': 'mean',
    'MCPreschool': 'mean',
    'MHI_2018': 'mean',
    'TotalPop': 'mean',
    'H_Under6_BothWork': 'sum'
}).reset_index()

# Calculate additional metrics
state_data['Annual_Cost_Infant'] = state_data['MCInfant'] * 12
state_data['Cost_Burden'] = (state_data['Annual_Cost_Infant'] / state_data['MHI_2018']) * 100
state_data['Working_Parent_Ratio'] = (state_data['H_Under6_BothWork'] / state_data['TotalPop']) * 100

# Create the final data structure
visualization_data = {
    'states': state_data['State_Abbreviation'].tolist(),
    'costs': {
        'infant': state_data['MCInfant'].round(2).tolist(),
        'toddler': state_data['MCToddler'].round(2).tolist(),
        'preschool': state_data['MCPreschool'].round(2).tolist()
    },
    'metrics': {
        'annual_cost': state_data['Annual_Cost_Infant'].round(2).tolist(),
        'cost_burden': state_data['Cost_Burden'].round(2).tolist(),
        'working_parent_ratio': state_data['Working_Parent_Ratio'].round(2).tolist()
    }
}

# Save to JSON file
with open('docs/data/childcare_costs.json', 'w') as f:
    json.dump(visualization_data, f) 
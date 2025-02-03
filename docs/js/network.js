// Initialize the network visualization
function initNetwork(data) {
    if (!data) {
        console.error('No data provided for network visualization');
        return;
    }

    try {
        // Create nodes from the data
        const nodes = [
            { id: 'infant_cost', label: 'Infant Care Cost', value: Math.max(...data.costs.infant) },
            { id: 'toddler_cost', label: 'Toddler Care Cost', value: Math.max(...data.costs.toddler) },
            { id: 'preschool_cost', label: 'Preschool Cost', value: Math.max(...data.costs.preschool) },
            { id: 'cost_burden', label: 'Cost Burden', value: Math.max(...data.metrics.cost_burden) },
            { id: 'working_parents', label: 'Working Parents', value: Math.max(...data.metrics.working_parent_ratio) }
        ];

        // Calculate correlations for edges
        const edges = [
            { from: 'infant_cost', to: 'toddler_cost', value: calculateCorrelation(data.costs.infant, data.costs.toddler) },
            { from: 'toddler_cost', to: 'preschool_cost', value: calculateCorrelation(data.costs.toddler, data.costs.preschool) },
            { from: 'infant_cost', to: 'cost_burden', value: calculateCorrelation(data.costs.infant, data.metrics.cost_burden) },
            { from: 'cost_burden', to: 'working_parents', value: calculateCorrelation(data.metrics.cost_burden, data.metrics.working_parent_ratio) }
        ];

        // Create the network visualization
        const sankeyData = [{
            type: 'sankey',
            orientation: 'h',
            node: {
                pad: 15,
                thickness: 30,
                line: {
                    color: 'black',
                    width: 0.5
                },
                label: nodes.map(n => n.label),
                color: nodes.map(() => getRandomColor())
            },
            link: {
                source: edges.map(e => nodes.findIndex(n => n.id === e.from)),
                target: edges.map(e => nodes.findIndex(n => n.id === e.to)),
                value: edges.map(e => Math.abs(e.value) * 100),
                color: edges.map(e => getEdgeColor(e.value))
            }
        }];

        const layout = {
            title: 'Childcare Cost Relationships Network',
            font: { size: 12 },
            height: 600,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        };

        Plotly.newPlot('mainViz', sankeyData, layout);
    } catch (error) {
        console.error('Error creating network visualization:', error);
        document.getElementById('mainViz').innerHTML = '<div class="alert alert-danger">Error creating network visualization</div>';
    }
}

// Calculate correlation between two arrays
function calculateCorrelation(array1, array2) {
    const n = array1.length;
    if (n !== array2.length || n === 0) return 0;

    const mean1 = array1.reduce((a, b) => a + b) / n;
    const mean2 = array2.reduce((a, b) => a + b) / n;

    const variance1 = array1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / n;
    const variance2 = array2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / n;

    const covariance = array1.reduce((a, b, i) => a + (b - mean1) * (array2[i] - mean2), 0) / n;

    return covariance / Math.sqrt(variance1 * variance2);
}

// Get random color for nodes
function getRandomColor() {
    const colors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Get edge color based on correlation value
function getEdgeColor(correlation) {
    const value = Math.abs(correlation);
    return `rgba(31, 119, 180, ${value})`;
}

// Update network based on filters
function updateNetwork(selectedState, costRange, data) {
    if (!data || !selectedState) return;

    try {
        const filteredData = filterDataByState(data, selectedState);
        initNetwork(filteredData);
    } catch (error) {
        console.error('Error updating network:', error);
    }
}

// Filter data by state
function filterDataByState(data, selectedState) {
    if (selectedState === 'all') return data;

    const stateIndex = data.states.indexOf(selectedState);
    if (stateIndex === -1) return data;

    return {
        states: [data.states[stateIndex]],
        costs: {
            infant: [data.costs.infant[stateIndex]],
            toddler: [data.costs.toddler[stateIndex]],
            preschool: [data.costs.preschool[stateIndex]]
        },
        metrics: {
            annual_cost: [data.metrics.annual_cost[stateIndex]],
            cost_burden: [data.metrics.cost_burden[stateIndex]],
            working_parent_ratio: [data.metrics.working_parent_ratio[stateIndex]]
        }
    };
}

// Create force-directed graph
function createForceGraph(nodes, edges) {
    const trace = {
        x: nodes.map(n => n.x),
        y: nodes.map(n => n.y),
        mode: 'markers+text',
        type: 'scatter',
        name: 'Nodes',
        text: nodes.map(n => n.label),
        textposition: 'bottom center',
        marker: {
            size: nodes.map(n => n.value * 2),
            color: nodes.map(n => n.color || 'blue'),
            line: {
                width: 1
            }
        }
    };

    const layout = {
        title: 'Force-Directed Network Graph',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false
        },
        height: 600
    };

    Plotly.newPlot('mainViz', [trace], layout);
}

// Calculate node positions using force-directed algorithm
function calculateNodePositions(nodes, edges) {
    // This is a simplified force-directed layout calculation
    // In a real implementation, you would use a proper force-directed algorithm
    nodes.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / nodes.length;
        node.x = Math.cos(angle);
        node.y = Math.sin(angle);
    });

    return nodes;
}

// Add edge traces to the network visualization
function addEdgeTraces(nodes, edges) {
    edges.forEach(edge => {
        const source = nodes.find(n => n.id === edge.from);
        const target = nodes.find(n => n.id === edge.to);

        const trace = {
            x: [source.x, target.x],
            y: [source.y, target.y],
            mode: 'lines',
            line: {
                width: edge.value * 5,
                color: 'gray'
            },
            hoverinfo: 'text',
            text: `Correlation: ${edge.value.toFixed(2)}`,
            showlegend: false
        };

        Plotly.addTraces('mainViz', trace);
    });
} 
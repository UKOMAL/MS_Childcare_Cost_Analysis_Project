// Initialize network visualization
function initNetwork(data) {
    if (!data || !data.costs || !data.metrics) {
        console.error('Invalid data structure for network visualization');
        return;
    }

    try {
        const nodes = [
            { id: 'infant', label: 'Infant Care', value: Math.max(...data.costs.infant.filter(x => !isNaN(x))) },
            { id: 'toddler', label: 'Toddler Care', value: Math.max(...data.costs.toddler.filter(x => !isNaN(x))) },
            { id: 'preschool', label: 'Preschool', value: Math.max(...data.costs.preschool.filter(x => !isNaN(x))) },
            { id: 'burden', label: 'Cost Burden', value: Math.max(...data.metrics.cost_burden.filter(x => !isNaN(x))) },
            { id: 'working', label: 'Working Parents', value: Math.max(...data.metrics.working_parent_ratio.filter(x => !isNaN(x))) }
        ];

        const edges = [
            { from: 'infant', to: 'toddler', value: Math.abs(calculateCorrelation(data.costs.infant, data.costs.toddler)) },
            { from: 'toddler', to: 'preschool', value: Math.abs(calculateCorrelation(data.costs.toddler, data.costs.preschool)) },
            { from: 'infant', to: 'burden', value: Math.abs(calculateCorrelation(data.costs.infant, data.metrics.cost_burden)) },
            { from: 'burden', to: 'working', value: Math.abs(calculateCorrelation(data.metrics.cost_burden, data.metrics.working_parent_ratio)) }
        ];

        const trace = {
            type: 'scatter',
            mode: 'markers+text',
            x: nodes.map(node => node.value * Math.random()),  // Random x positions
            y: nodes.map(node => node.value * Math.random()),  // Random y positions
            text: nodes.map(node => node.label),
            textposition: 'bottom center',
            hoverinfo: 'text',
            marker: {
                size: nodes.map(node => Math.min(node.value, 50)),  // Cap the size
                color: nodes.map((_, i) => `hsl(${(i * 360) / nodes.length}, 70%, 50%)`),
                line: { width: 2, color: '#ffffff' }
            }
        };

        const edgeTraces = edges.map(edge => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            return {
                type: 'scatter',
                mode: 'lines',
                x: [fromNode.value * Math.random(), toNode.value * Math.random()],
                y: [fromNode.value * Math.random(), toNode.value * Math.random()],
                line: {
                    width: edge.value * 5,  // Scale line width by correlation
                    color: 'rgba(150,150,150,0.5)'
                },
                hoverinfo: 'text',
                text: `Correlation: ${edge.value.toFixed(2)}`
            };
        });

        const layout = {
            title: 'Childcare Cost Network Analysis',
            showlegend: false,
            hovermode: 'closest',
            margin: { t: 50, l: 50, r: 50, b: 50 },
            xaxis: { showgrid: false, zeroline: false, showticklabels: false },
            yaxis: { showgrid: false, zeroline: false, showticklabels: false },
            width: 800,
            height: 600
        };

        Plotly.newPlot('mainViz', [trace, ...edgeTraces], layout);
        console.log('Network visualization created successfully');
    } catch (error) {
        console.error('Error creating network visualization:', error);
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error creating network visualization. Please check the console for details.</div>';
    }
}

// Calculate correlation between two arrays
function calculateCorrelation(array1, array2) {
    // Filter out NaN values
    const validPairs = array1.map((val, idx) => [val, array2[idx]])
        .filter(pair => !isNaN(pair[0]) && !isNaN(pair[1]));
    
    if (validPairs.length < 2) return 0;
    
    const x = validPairs.map(pair => pair[0]);
    const y = validPairs.map(pair => pair[1]);
    
    const n = x.length;
    const mean1 = x.reduce((a, b) => a + b) / n;
    const mean2 = y.reduce((a, b) => a + b) / n;
    
    const variance1 = x.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / n;
    const variance2 = y.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / n;
    
    if (variance1 === 0 || variance2 === 0) return 0;
    
    const covariance = x.reduce((a, b, i) => a + (b - mean1) * (y[i] - mean2), 0) / n;
    return covariance / Math.sqrt(variance1 * variance2);
}

// Update network based on filters
function updateNetwork(selectedState, costRange, data) {
    if (!data || !data.states) return;

    try {
        let filteredData = {...data};
        
        if (selectedState !== 'all') {
            const stateIndex = data.states.indexOf(selectedState);
            if (stateIndex !== -1) {
                Object.keys(filteredData.costs).forEach(key => {
                    filteredData.costs[key] = [filteredData.costs[key][stateIndex]];
                });
                Object.keys(filteredData.metrics).forEach(key => {
                    filteredData.metrics[key] = [filteredData.metrics[key][stateIndex]];
                });
            }
        }

        // Filter by cost range
        const maxCost = parseFloat(costRange);
        const validIndices = filteredData.costs.infant
            .map((cost, i) => (!isNaN(cost) && cost <= maxCost ? i : -1))
            .filter(i => i !== -1);

        Object.keys(filteredData.costs).forEach(key => {
            filteredData.costs[key] = validIndices.map(i => filteredData.costs[key][i]);
        });
        Object.keys(filteredData.metrics).forEach(key => {
            filteredData.metrics[key] = validIndices.map(i => filteredData.metrics[key][i]);
        });

        initNetwork(filteredData);
    } catch (error) {
        console.error('Error updating network:', error);
    }
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

// Export the functions
export {
    initNetwork,
    updateNetwork,
    calculateCorrelation,
    getRandomColor,
    getEdgeColor,
    createForceGraph,
    calculateNodePositions,
    addEdgeTraces
}; 
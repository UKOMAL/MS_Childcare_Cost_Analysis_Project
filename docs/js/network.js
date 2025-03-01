// Initialize network visualization
function initNetwork(data) {
    if (!data || !data.costs || !data.metrics) {
        console.error('Invalid data structure for network visualization');
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error: Invalid or missing data for network visualization</div>';
        return;
    }

    try {
        console.log('Creating network visualization with data:', data);
        
        // Create nodes with normalized values
        const nodes = createNodes(data);
        console.log('Created nodes:', nodes);
        
        // Create edges with correlations
        const edges = createEdges(data, nodes);
        console.log('Created edges:', edges);
        
        // Calculate node positions
        const positionedNodes = calculateNodePositions(nodes);
        console.log('Calculated node positions:', positionedNodes);
        
        // Create main node trace
        const nodeTrace = createNodeTrace(positionedNodes);
        
        // Create edge traces
        const edgeTraces = createEdgeTraces(positionedNodes, edges);
        
        // Create layout
        const layout = {
            title: {
                text: 'Childcare Cost Network Analysis',
                font: {
                    size: 24,
                    color: '#2c3e50'
                }
            },
            showlegend: false,
            hovermode: 'closest',
            margin: { t: 50, l: 50, r: 50, b: 50 },
            xaxis: { 
                showgrid: false, 
                zeroline: false, 
                showticklabels: false,
                range: [-1.5, 1.5]
            },
            yaxis: { 
                showgrid: false, 
                zeroline: false, 
                showticklabels: false,
                range: [-1.5, 1.5]
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            autosize: true,
            height: 600
        };
        
        // Plot with config
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            toImageButtonOptions: {
                format: 'png',
                filename: 'childcare_network_analysis',
                height: 800,
                width: 1200,
                scale: 2
            }
        };

        Plotly.newPlot('mainViz', [nodeTrace, ...edgeTraces], layout, config)
            .then(() => console.log('Network visualization created successfully'))
            .catch(err => {
                console.error('Error plotting network:', err);
                document.getElementById('mainViz').innerHTML = 
                    '<div class="alert alert-danger">Error plotting network. Please check the console for details.</div>';
            });
    } catch (error) {
        console.error('Error creating network visualization:', error);
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error creating network visualization. Please check the console for details.</div>';
    }
}

// Create nodes with normalized values
function createNodes(data) {
    const getMaxValue = (arr) => Math.max(...arr.filter(x => !isNaN(x)));
    
    return [
        {
            id: 'infant',
            label: 'Infant Care',
            value: getMaxValue(data.costs.infant),
            color: '#1f77b4'
        },
        {
            id: 'toddler',
            label: 'Toddler Care',
            value: getMaxValue(data.costs.toddler),
            color: '#ff7f0e'
        },
        {
            id: 'preschool',
            label: 'Preschool',
            value: getMaxValue(data.costs.preschool),
            color: '#2ca02c'
        },
        {
            id: 'burden',
            label: 'Cost Burden',
            value: getMaxValue(data.metrics.cost_burden),
            color: '#d62728'
        },
        {
            id: 'working',
            label: 'Working Parents',
            value: getMaxValue(data.metrics.working_parent_ratio),
            color: '#9467bd'
        }
    ];
}

// Create edges with correlations
function createEdges(data, nodes) {
    return [
        {
            from: 'infant',
            to: 'toddler',
            value: Math.abs(calculateCorrelation(data.costs.infant, data.costs.toddler))
        },
        {
            from: 'toddler',
            to: 'preschool',
            value: Math.abs(calculateCorrelation(data.costs.toddler, data.costs.preschool))
        },
        {
            from: 'infant',
            to: 'burden',
            value: Math.abs(calculateCorrelation(data.costs.infant, data.metrics.cost_burden))
        },
        {
            from: 'burden',
            to: 'working',
            value: Math.abs(calculateCorrelation(data.metrics.cost_burden, data.metrics.working_parent_ratio))
        }
    ];
}

// Create node trace
function createNodeTrace(nodes) {
    return {
        type: 'scatter',
        mode: 'markers+text',
        x: nodes.map(node => node.x),
        y: nodes.map(node => node.y),
        text: nodes.map(node => node.label),
        textposition: 'bottom center',
        hoverinfo: 'text',
        hovertext: nodes.map(node => 
            `${node.label}<br>Value: ${node.value.toFixed(2)}`
        ),
        marker: {
            size: nodes.map(node => Math.min(40, Math.max(20, node.value / 10))),
            color: nodes.map(node => node.color),
            line: { width: 2, color: '#ffffff' }
        }
    };
}

// Create edge traces
function createEdgeTraces(nodes, edges) {
    return edges.map(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        return {
            type: 'scatter',
            mode: 'lines',
            x: [fromNode.x, toNode.x],
            y: [fromNode.y, toNode.y],
            line: {
                width: Math.max(1, edge.value * 10),
                color: `rgba(150,150,150,${Math.max(0.2, edge.value)})`
            },
            hoverinfo: 'text',
            hovertext: `Correlation: ${edge.value.toFixed(2)}`
        };
    });
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

// Calculate node positions using circular layout
function calculateNodePositions(nodes) {
    const radius = 1;
    return nodes.map((node, i) => {
        const angle = (2 * Math.PI * i) / nodes.length;
        return {
            ...node,
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        };
    });
}

// Update network based on filters
function updateNetwork(selectedState, costRange, data) {
    if (!data || !data.costs || !data.metrics) {
        console.error('Invalid data for network update');
        return;
    }
    
    try {
        console.log('Updating network with:', { selectedState, costRange });
        
        // Filter data based on state selection
        let filteredData = {...data};
        if (selectedState !== 'all') {
            const stateIndex = data.states.indexOf(selectedState);
            if (stateIndex !== -1) {
                filteredData = {
                    states: [data.states[stateIndex]],
                    costs: {
                        infant: [data.costs.infant[stateIndex]],
                        toddler: [data.costs.toddler[stateIndex]],
                        preschool: [data.costs.preschool[stateIndex]]
                    },
                    metrics: {
                        cost_burden: [data.metrics.cost_burden[stateIndex]],
                        working_parent_ratio: [data.metrics.working_parent_ratio[stateIndex]]
                    }
                };
            }
        }
        
        // Reinitialize network with filtered data
        initNetwork(filteredData);
    } catch (error) {
        console.error('Error updating network:', error);
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error updating network visualization. Please check the console for details.</div>';
    }
}

// Export the functions
export {
    initNetwork,
    updateNetwork
}; 
// Initialize network visualization
function initNetwork(data) {
    if (!data || !data.costs || !data.metrics) {
        console.error('Invalid data structure for network visualization');
        document.getElementById('networkViz').innerHTML = 
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
            height: 450
        };

        Plotly.newPlot('networkViz', [nodeTrace, ...edgeTraces], layout)
            .then(() => console.log('Network visualization created successfully'))
            .catch(err => {
                console.error('Error plotting network:', err);
                document.getElementById('networkViz').innerHTML = 
                    '<div class="alert alert-danger">Error plotting network. Please check the console for details.</div>';
            });
    } catch (error) {
        console.error('Error creating network visualization:', error);
        document.getElementById('networkViz').innerHTML = 
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

// Create edges between nodes
function createEdges(data, nodes) {
    const edges = [];
    const nodeIds = nodes.map(n => n.id);
    
    // Calculate correlations between all pairs of metrics
    for (let i = 0; i < nodeIds.length; i++) {
        for (let j = i + 1; j < nodeIds.length; j++) {
            const source = nodeIds[i];
            const target = nodeIds[j];
            
            // Get data arrays for correlation
            const sourceData = source.startsWith('cost') ? 
                data.costs[source.split('_')[1]] :
                data.metrics[source];
            const targetData = target.startsWith('cost') ?
                data.costs[target.split('_')[1]] :
                data.metrics[target];
            
            // Calculate correlation
            const correlation = calculateCorrelation(sourceData, targetData);
            
            if (!isNaN(correlation)) {
                edges.push({
                    from: source,
                    to: target,
                    value: correlation
                });
            }
        }
    }
    
    return edges;
}

// Calculate node positions in a circular layout
function calculateNodePositions(nodes) {
    const radius = 1;
    const angleStep = (2 * Math.PI) / nodes.length;
    
    return nodes.map((node, i) => ({
        ...node,
        x: radius * Math.cos(i * angleStep),
        y: radius * Math.sin(i * angleStep)
    }));
}

// Create node trace for plotting
function createNodeTrace(nodes) {
    return {
        x: nodes.map(n => n.x),
        y: nodes.map(n => n.y),
        mode: 'markers+text',
        type: 'scatter',
        marker: {
            size: nodes.map(n => Math.sqrt(n.value) * 20),
            color: nodes.map(n => n.color),
            line: {
                color: 'white',
                width: 1
            }
        },
        text: nodes.map(n => n.label),
        textposition: 'top center',
        hoverinfo: 'text',
        hovertext: nodes.map(n => `${n.label}<br>Value: ${n.value.toFixed(2)}`)
    };
}

// Create edge traces for plotting
function createEdgeTraces(nodes, edges) {
    return edges.map(edge => {
        const source = nodes.find(node => node.id === edge.from);
        const target = nodes.find(node => node.id === edge.to);
        
        if (!source || !target) {
            console.error('Edge references unknown node:', edge);
            return null;
        }
        
        // Calculate edge width based on correlation strength
        const width = Math.max(1, Math.abs(edge.value) * 8);
        
        // Determine color based on positive/negative correlation
        const color = edge.value >= 0 ? 'rgba(44, 160, 44, 0.7)' : 'rgba(214, 39, 40, 0.7)';
        
        return {
            x: [source.x, target.x],
            y: [source.y, target.y],
            mode: 'lines',
            line: {
                width: width,
                color: color
            },
            hoverinfo: 'text',
            hovertext: `${source.label} → ${target.label}<br>Correlation: ${edge.value.toFixed(2)}`,
            type: 'scatter'
        };
    }).filter(trace => trace !== null);
}

// Calculate correlation between two arrays
function calculateCorrelation(array1, array2) {
    if (array1.length !== array2.length) return NaN;
    
    const n = array1.length;
    const mean1 = array1.reduce((a, b) => a + b, 0) / n;
    const mean2 = array2.reduce((a, b) => a + b, 0) / n;
    
    const variance1 = array1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / n;
    const variance2 = array2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / n;
    
    const covariance = array1.reduce((a, b, i) => a + (b - mean1) * (array2[i] - mean2), 0) / n;
    
    return covariance / Math.sqrt(variance1 * variance2);
}

// Update network based on filters
function updateNetwork(selectedState) {
    if (!DASHBOARD_DATA || !DASHBOARD_DATA.costs || !DASHBOARD_DATA.metrics) {
        console.error('Invalid data for network update');
        return;
    }
    
    try {
        console.log('Updating network with:', { selectedState });
        
        // Filter data based on state selection
        let filteredData = {...DASHBOARD_DATA};
        if (selectedState !== 'all') {
            const stateIndex = DASHBOARD_DATA.states.indexOf(selectedState);
            if (stateIndex !== -1) {
                filteredData = {
                    states: [DASHBOARD_DATA.states[stateIndex]],
                    costs: {
                        infant: [DASHBOARD_DATA.costs.infant[stateIndex]],
                        toddler: [DASHBOARD_DATA.costs.toddler[stateIndex]],
                        preschool: [DASHBOARD_DATA.costs.preschool[stateIndex]]
                    },
                    metrics: {
                        cost_burden: [DASHBOARD_DATA.metrics.cost_burden[stateIndex]],
                        working_parent_ratio: [DASHBOARD_DATA.metrics.working_parent_ratio[stateIndex]]
                    }
                };
            }
        }
        
        // Reinitialize network with filtered data
        initNetwork(filteredData);
    } catch (error) {
        console.error('Error updating network:', error);
        document.getElementById('networkViz').innerHTML = 
            '<div class="alert alert-danger">Error updating network visualization. Please check the console for details.</div>';
    }
}

// Export the functions
export {
    initNetwork,
    updateNetwork
}; 
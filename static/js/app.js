d3.json('./static/data/samples.json').then(({ names }) => {

    names.forEach(id => {
        d3.select('select').append('option').text(id);
    });

    optionChanged();
});

const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json('./static/data/samples.json').then(({ metadata,samples }) => {

        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h6').text(`${key.toUpperCase()}:¨${val}`)
        });
        console.log(sample);

        let { otu_ids, otu_labels, sample_values} = sample;

        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x=>`OTU ${x}`),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation:'h'
            }
          ];
          
          Plotly.newPlot('bar', data);

        var bubbles = [
            {
                x: otu_ids,
                y: sample_values,
                mode: 'markers',
                marker: {
                    color: otu_ids,
                    size: sample_values,
                    colorscale: 'Viridis'
                },
                text: otu_labels
            }
        ];

        var layout = {
            title: `Sample Values vs. OTU IDs for Sample ${choice}`,
            xaxis: { title: 'OTU IDs' },
            yaxis: { title: 'Sample Values' }
        };

        Plotly.newPlot('bubble', bubbles, layout);

        let age = meta.age;

            var dataGauge = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: age,
                title: { text: "Age" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                axis: { range: [null, 100] },
                steps: [
                    { range: [0, 25], color: "lightgray" },
                    { range: [25, 50], color: "gray" },
                    { range: [50, 75], color: "darkgray" },
                    { range: [75, 100], color: "black" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: age
                }
                }
            }
            ];

            var layoutGauge = { width: 600, height: 450, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', dataGauge, layoutGauge);
        

//             let wfreq = meta.wfreq;

// var dataGauge2 = [
//   {
//     domain: { x: [0, 1], y: [0, 1] },
//     value: wfreq,
//     title: { text: "Weekly Washing Frequency" },
//     type: "indicator",
//     mode: "gauge+number",
//     gauge: {
//       axis: { range: [null, 9], tickmode: 'array', tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
//       steps: [
//         { range: [0, 1], color: "lightgray" },
//         { range: [1, 2], color: "gray" },
//         { range: [2, 3], color: "lightgray" },
//         { range: [3, 4], color: "gray" },
//         { range: [4, 5], color: "lightgray" },
//         { range: [5, 6], color: "gray" },
//         { range: [6, 7], color: "lightgray" },
//         { range: [7, 8], color: "gray" },
//         { range: [8, 9], color: "lightgray" }
//       ],
//       threshold: {
//         line: { color: "red", width: 4 },
//         thickness: 0.75,
//         value: wfreq
//       }
//     }
//   }
// ];

// var layoutGauge2 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
// Plotly.newPlot('gauge2', dataGauge2, layoutGauge2);
        





        
        
    });
}
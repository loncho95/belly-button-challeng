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
        

        
        
    });
}
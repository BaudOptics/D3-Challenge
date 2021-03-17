// @TODO: YOUR CODE HERE!
//setting svg width and height
let svgWidth = 1000;
let svgHeight = 600;

//setting up a margin so I can have axis titles later
let chartMargin = {
    top: 30,
    right: 40,
    bottom: 100,
    left: 100
};

//setting the chart width and height
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//appending the svg wrapper to the html
let scatter = d3.select('#scatter')
            .append('svg')
            .attr('width',svgWidth)
            .attr('height',svgHeight);

//appending a chartgroup
let chartGroup = scatter.append('g')
                    .attr('transform',`translate(${chartMargin.left}, ${chartMargin.top})`);

//importing data from csv
let data = d3.csv('./assets/data/data.csv').then(data => {
    console.log(data);

    //casting the data as numbers
    data.forEach(data=>{
        //data for the x axis
        data.age = +data.age;
        data.income = +data.income;
        data.poverty = +data.poverty;
        //data for the y axis
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    //creating a variable for circle radius so that 
    //the max values don't get clipped circles
    let radius = 15;
    //creating scale functions
    console.log(d3.min(data, data=>data.age))
    let ageScale = d3.scaleLinear()
                         .domain([20, d3.max(data, data=>data.age)])
                         .range([0,chartWidth]);

    console.log(d3.min(data, data=>data.income))
    let incomeScale = d3.scaleLinear()
                        .domain([30000, d3.max(data, data => data.income)])
                        .range([0,chartWidth]);

    console.log(d3.min(data, data=>data.poverty))
    let povertyScale = d3.scaleLinear()
                         .domain([8, d3.max(data, data => data.poverty)])
                         .range([0,chartWidth]);

    console.log(d3.min(data, data=>data.healthcare))
    let healthcareScale = d3.scaleLinear()
                         .domain([4, d3.max(data, data => data.healthcare)])
                         .range([chartHeight,0]);

    console.log(d3.min(data, data=>data.obesity))
    let obesityScale = d3.scaleLinear()
                         .domain([20, d3.max(data, data => data.obesity)])
                         .range([chartHeight,0]);

    console.log(d3.min(data, data=>data.smokes))
    let smokesScale = d3.scaleLinear()
                         .domain([9, d3.max(data, data => data.smokes)])
                         .range([chartHeight,0]);

    //creating axes
    let ageAxis = d3.axisBottom(ageScale)
    let incomeAxis = d3.axisBottom(incomeScale)
    let povertyAxis = d3.axisBottom(povertyScale)
    let healthcareAxis = d3.axisLeft(healthcareScale)
    let obesityAxis = d3.axisLeft(obesityScale)
    let smokesAxis = d3.axisLeft(smokesScale)

    //appending axes to the chart
    chartGroup.append('g')
              .attr('transform',`translate(0, ${chartHeight})`)
              .call(povertyAxis);
    chartGroup.append('g')
              .call(healthcareAxis);

    //creating circles!
    let circlesGroup = chartGroup.selectAll('circle')
                                 .data(data)
                                 .enter()
                                 .append('circle')
                                 .attr('cx', data => povertyScale(data.poverty))
                                 .attr('cy', data => healthcareScale(data.healthcare))
                                 .attr('r',`${radius}`)
                                 .classed('stateCircle',true)
                                 

    let states = chartGroup.selectAll('.aText')
                            .data(data)
                            .enter()
                            .append('text')
                            .attr('x',data => povertyScale(data.poverty))
                            .attr('y',data => healthcareScale(data.healthcare)+(radius/3))
                            .classed('aText', true)
                            .text(data => data.abbr);

    //creating axis labels
    chartGroup.append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 0 - chartMargin.left + 40)
              .attr('x', 0 - (chartHeight / 2))
              .attr('dy', '1em')
              .attr('class', 'axisText')
              .text('Lacks Healthcare (%)')
    chartGroup.append('text')
              .attr('transform',`translate(${chartWidth/2},${chartHeight + chartMargin.top + 30})`)
              .attr('class','axisText')
              .text('Poverty Level')
});
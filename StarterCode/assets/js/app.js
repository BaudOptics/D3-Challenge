// @TODO: YOUR CODE HERE!
//setting svg width and height
let svgWidth = 1000;
let svgHeight = 600;

//setting up a margin so I can have axis titles later
let chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

//setting the chart width and height
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//appending the svg wrapper to the html
let scatter = d3.select('#scatter')
            .append('svg')
            .attr('width',chartWidth)
            .attr('height',chartHeight);

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
    let ageScale = d3.scaleLinear()
                         .domain([0, d3.max(data, data=>data.age)])
                         .range([0,chartWidth - radius]);

    let incomeScale = d3.scaleLinear()
                        .domain([0, d3.max(data, data => data.income)])
                        .range([0,chartWidth - radius]);

    let povertyScale = d3.scaleLinear()
                         .domain([0, d3.max(data, data => data.poverty)])
                         .range([0,chartWidth - radius]);

    let healthcareScale = d3.scaleLinear()
                         .domain([0, d3.max(data, data => data.healthcare)])
                         .range([chartHeight,0]);

    let obesityScale = d3.scaleLinear()
                         .domain([0, d3.max(data, data => data.obesity)])
                         .range([chartHeight,0]);

    let smokesScale = d3.scaleLinear()
                         .domain([0, d3.max(data, data => data.smokes)])
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
              .call(incomeAxis);
    chartGroup.append('g')
              .call(healthcareAxis);

    //creating circles!
    let circlesGroup = chartGroup.selectAll('circle')
                                 .data(data)
                                 .enter()
                                 .append('circle')
                                 .attr('cx', data => incomeScale(data.income))
                                 .attr('cy', data => healthcareScale(data.healthcare))
                                 .attr('r','10')
                                 .attr('fill','blue')
                                 .attr('opacity','.5')

                     circlesGroup.append('text')
                                 .attr('dx',data => incomeScale(data.income))
                                 .attr('dy',data => healthcareScale(data.healthcare))
                                 .text(data => data.abbr);

    //creating labels
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
              .text('Average Household Income')
});
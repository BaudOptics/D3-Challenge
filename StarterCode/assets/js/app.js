// @TODO: YOUR CODE HERE!
//setting svg width and height
let svgWidth = 1000;
let svgHeight = 800;

//setting up a margin so I can have axis titles later
let chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

//setting the chart width and height
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight = chartMargin.top = chartMargin.bottom;

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

    //creating scale functions
    let ageScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d=>data.age)])
                         .range([0,chartWidth]);

    let incomeScale = d3.scaleLinear()
                        .domain([0, d3.max(data => data.income)])
                        .range([0,chartWidth]);

    let povertyScale = d3.scaleLinear()
                         .domain([0, d3.max(data => data.poverty)])
                         .range([0,chartWidth]);

    let healthcareScale = d3.scaleLinear()
                         .domain([0, d3.max(data => data.healthcare)])
                         .range([0,chartHeight]);

    let obesityScale = d3.scaleLinear()
                         .domain([0, d3.max(data => data.obesity)])
                         .range([0,chartHeight]);

    let smokesScale = d3.scaleLinear()
                         .domain([0, d3.max(data => data.smokes)])
                         .range([0,chartHeight]);

    //creating axes
    let bottomAxis = d3.axisBottom(ageScale)
    let leftAxis = d3.axisLeft(healthcareScale)

    //appending axes to the chart
    chartGroup.append('g')
              .attr('transform',`translate(0, ${chartHeight})`)
              .call(bottomAxis);
    chartGroup.append('g')
              .call(leftAxis);

});
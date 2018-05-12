

var svgWidth = 960;
var svgHeight = 500;


  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  var svg = d3
  .select('body')
  .select("#content")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append group
    var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv('insurance_poverty_new.csv',function(error,response){
      if(error) throw error;
      console.log(response);
      response.forEach(function(data){
          data.above_poverty=+data.above_poverty;
          data.health_insurance=+data.health_insurance;

      })
    
    console.log(response.map(d=>d.health_insurance));
      // create scale
    // var xScale=d3.scaleLinear()
    //   .domain(d3.extent(response,d=>d.above_poverty))
    //   .range([0,width]);

    // var xScale=d3.scaleLinear()
    //   .domain([0.5,1])
    //   .range([0,width]);     
    var xScale=d3.scaleLinear()
                    .domain([d3.min(response,d=>d.above_poverty)*0.95,d3.max(response,d=>d.above_poverty)*1])
                    .range([0,width]);
    
    console.log(xScale(1));
    var yScale=d3.scaleLinear()
                    .domain([d3.min(response,d=>d.health_insurance)*0.95,d3.max(response,d=>d.health_insurance)*1])
                    .range([height,0]);
    // var yScale=d3.scaleLinear()
    //               .domain(d3.extent(response,d=>d.health_insurance))
    //               .range([height,0]);
    // var yScale=d3.scaleLinear()
    //               .domain([0.7,1])
    //               .range([height,0]);
    
    
    //append circle group
  
    var circlesGroup = chartGroup.selectAll("circle")
    .data(response)
    .enter()
    .append("circle")
    .attr("cx", d=> xScale(d.above_poverty))
    .attr("cy", d => yScale(d.health_insurance))
    .attr("r", "10")
    .attr("fill", "blue")
    .style("opacity", 0.5)
    .style('stroke','black');

    
    // append text group
    var textGroup = chartGroup.selectAll('text')
    .data(response)
    .enter()
    .append('text')
    .attr('x',d=>xScale(d.above_poverty))
    .attr('dx',0)
    .attr('dy',3)
    .attr("text-anchor", "middle")
    .attr('y',d=>yScale(d.health_insurance))
    .text(d=>d.state_abb)
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
    .attr("fill", "white");

    console.log(textGroup);
    //create x axis
    var bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0%"));
    
    var leftAxis = d3.axisLeft(yScale).tickFormat(d3.format('.0%')); 
    
    // Add bottomAxis
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(leftAxis);
      
    // append x axis labe
    var xLabel = chartGroup.append('text')
                .attr('transform',`translate(${0.5*width},${height+35})`)
                .style("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .text("Household above poverty %");
    
    var yLabel = chartGroup.append('text')
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .text("Houseold with health insurance %");      

    // for (var i=0;i<response.length;i++){
    //   console.log(response[i].state_abb);
    //   console.log(i);

    // }
  });
  

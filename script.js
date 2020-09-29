  // Scatterplot
  d3.csv('cities.csv', d3.autoType).then(data=>{
    console.log('cities', data);
    data = data.filter(d=>d.eu==true);
    console.log('only european cities', data);
    d3.select('.city-count').text("Number of Cities: " + data.length)
    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
		  .append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", data=>data.x)
      .attr("cy", data=>data.y)
      .attr("r", function(data){
        if (data.population <= 1000000){
          return 4;
        } 
        else{
          return 8; 
      }
    })

   newdata = data.sort(function(a,b){ return b.population - a.population;})
  
    svg.selectAll("text")
      .data(newdata.slice(0,10))
      .enter()
      .append("text")
      .text(data => data.country)
      .attr("x", data => (data.x))
      .attr("y", data => (data.y - 12))
      .attr("font-size", 11)
      .attr("text-anchor", "middle");
  })



// Bar Chart
d3.csv('buildings.csv', d3.autoType).then(data=>{
  console.log('buildings', data);
  data = data.sort(function(a,b){ return b.height_px - a.height_px; });
  console.log('buildings sorted by height', data);
  const width = 500;
  const height = 500;
  const svg = d3.select('.building-plot')
    .append('svg')
    .attr('width', width)
    .attr('height', height)



    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "lightgray")
    .attr("height", 30)
    .attr("width", function(d){return d.height_px})
    .attr("x", 130)
    .attr("y", function (d, i){
        return (i * 31) + 50;
    })
    .on("click", function(data, d){
      document.querySelector('#picture').innerHTML =  "<img src= "https://gracesacco.github.io/VisualizationFinalLabThree/img/"  + d.image + "\">";
      document.querySelector('#buildingName').innerHTML = d.building;
      document.querySelector('#country').innerHTML = 'Country: ' + d.country;
      document.querySelector('#city').innerHTML = 'City: ' + d.city;
      document.querySelector('#height').innerHTML = 'Height (in feet): ' + d.height_ft;
      document.querySelector('#year').innerHTML = 'Year: ' + d.completed;
    })

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(data){ return (data.height_px) + 125})
      .attr("y", function (d, i){
        return (i * 31) + 70
        })
      .text(function(d){return d.height_ft})
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

    svg.selectAll("text.building")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 125)
      .attr("y", function (d,i){
          return (i * 31) + 70
      })
      .text(function(data){return data.building})
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("class", "text.labels")
})

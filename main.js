// initialize constants for frme and visualization dimension for vis1
const FRAME_HEIGHT = 300;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// create FRAME1 for vis1
const FRAME1 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

var xScale1,yScale1,xScale2,yScale2
// function build_scatter_plot() builds a scatter plot {
function build_scatter_plot() {

  d3.csv("data/iris.csv").then((data) => {
    
    // max values for axis 
    const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });
    const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
    
    // Define scale functions that maps our data values 
    // (domain) to pixel values (range)
     xScale1 = d3.scaleLinear() 
                    .domain([0, (MAX_X1) + 1]) // add some padding  
                    .range([0, VIS_WIDTH]);  
    yScale1 = d3.scaleLinear() 
                    .domain([0, (MAX_Y1 + 1)]) // add some padding  
                    .range([VIS_HEIGHT, 0]);  


    // use X_SCALE and Y_SCALE to plot our points on FRAME1
    FRAME1.selectAll("circle")  
        .data(data) // passed from .then  
        .enter()       
        .append("circle")
          .attr("cx", (d) => { return (xScale1(d.Petal_Length) + MARGINS.left); }) 
          .attr("cy",  (d) => { return (yScale1(d.Sepal_Length) + MARGINS.top); }) 
          .attr("r", 3)
          .attr("class", "point")
          .style("fill", (d) => { if(d.Species == "setosa"){return "pink"} if (d.Species == "versicolor") {return "orange"} else {return "purple"}})
          .style("opacity", .5)
    
    
    FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
          "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(xScale1).ticks(5)) 
          .attr("font-size", '20px'); 
      
      FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
          "," + (MARGINS.top) + ")") 
          .call(d3.axisLeft(yScale1).ticks(5)) 
          .attr("font-size", '20px'); 

          
        });
    }

  build_scatter_plot();

// create FRAME2 for vis2
const FRAME2 = d3.select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame"); 

// function build_scatter_plot() builds a scatter plot {
function build_scatter_plot_2() {
        d3.csv("data/iris.csv").then((data) => {
          
          // max values for axis 
          const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });
          const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
          
          // Define scale functions that maps our data values 
          // (domain) to pixel values (range)
          xScale2 = d3.scaleLinear() 
                          .domain([0, (MAX_X1) + 1]) // add some padding  
                          .range([0, VIS_WIDTH]);  
           yScale2 = d3.scaleLinear() 
                          .domain([0, (MAX_Y1 + 1)]) // add some padding  
                          .range([VIS_HEIGHT, 0]);
      
      
          // use X_SCALE and Y_SCALE to plot our points on FRAME1
          FRAME2.selectAll("circle")  
              .data(data) // passed from .then  
              .enter()       
              .append("circle")
                .attr("cx", (d) => { return (xScale2(d.Petal_Width) + MARGINS.left); }) 
                .attr("cy",  (d) => { return (yScale2(d.Sepal_Width) + MARGINS.top); }) 
                .attr("r", 3)
                .attr("class", "point")
                .style("fill", (d) => { if(d.Species == "setosa"){return "pink"} if (d.Species == "versicolor") {return "orange"} else {return "purple"}})
                .style("opacity", .5)
                
            FRAME2.append("g") 
                .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
                .call(d3.axisBottom(xScale2).ticks(5)) 
                .attr("font-size", '20px'); 
            
            FRAME2.append("g") 
                .attr("transform", "translate(" + MARGINS.left + 
                "," + (MARGINS.top) + ")") 
                .call(d3.axisLeft(yScale2).ticks(5)) 
                .attr("font-size", '20px'); 
                
              });
          }


   build_scatter_plot_2(); 

// create FRAME3 for vis3
const FRAME3 = d3.select("#vis3")
.append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame"); 

const labels = ["setosa", "versicolor", "virginica"]
function build_bar_plot() {
      // define scales for the x and y axes
      const xScale3 = d3.scaleBand()
        .domain(labels)
        .range([VIS_WIDTH-MARGINS.bottom, 0])
        .paddingInner(0.1);

      const yScale3 = d3.scaleLinear() 
        .domain([0, 50]) // add some padding  
        .range([VIS_HEIGHT, 0]); 
    
      // create the bars
      const bars = FRAME3.selectAll(".bar")
        .data(labels)
        .enter()
        .append("rect")
          .attr("class", "bar")
          .attr('id',d=>d)
          .attr("x", (d) => {return xScale3(d) + MARGINS.left})
          .attr("y", 50)
          .attr("width", xScale3.bandwidth())
          .attr("height", VIS_HEIGHT)
          .attr("fill", (d) => {if (d == "setosa") {return "pink"} if (d == "versicolor") {return "orange"} else {return "purple"}});

    FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
            "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(xScale3).ticks(3)) 
            .attr("font-size", '15px'); 
    
    FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
            "," + (MARGINS.bottom) + ")") 
            .call(d3.axisLeft(yScale3).ticks(5)) 
            .attr("font-size", '20px'); 
        
        }
  build_bar_plot()

d3.csv("data/iris.csv").then((data) => {
          
          // max values for axis 
          const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });
          const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
          
          // Define scale functions that maps our data values 
          // (domain) to pixel values (range)
          const X_SCALE1 = d3.scaleLinear() 
                          .domain([0, (MAX_X1) + 1]) // add some padding  
                          .range([0, VIS_WIDTH]);  
          const Y_SCALE1 = d3.scaleLinear() 
                          .domain([0, (MAX_Y1 + 1)]) // add some padding  
                          .range([VIS_HEIGHT, 0]); 


const brush = d3.brush()
  .extent([[0, 0], [FRAME_WIDTH, FRAME_HEIGHT]])
  .on("start brush end", brushed)
  
  console.log('x2',xScale2)


FRAME2.append("g")
  .call(brush);

function brushed(event) {
    const selection = event.selection;
   
    if (selection) {
     
      const [[x0, y0], [x1, y1]] = selection;
      let orignX0=xScale2.invert(x0-MARGINS.left)
      let orignY0=yScale2.invert(y0-MARGINS.top)
      let orignX1=xScale2.invert(x1-MARGINS.left)
      let orignY1=yScale2.invert(y1-MARGINS.top)

      let PetalW=[orignX0,orignX1]
      let SepalW=[orignY1,orignY0]
      let speciesSelected=[]
      
      //highlight vis 2
      d3.select("#vis2")
        .selectAll("circle")
        .style("opacity", d => {
        
          let selected=d.Petal_Width>=PetalW[0]&&d.Petal_Width<=PetalW[1]&&
                        d.Sepal_Width>=SepalW[0]&&d.Sepal_Width<=SepalW[1]
          
          if (selected&&speciesSelected.lastIndexOf(d.Species)===-1 ) 
          speciesSelected.push(d.Species)
        if (selected) return 1
        else return .5
      });

      //highlight vis 2
      d3.select("#vis1")
        .selectAll("circle")
        .style("opacity", d => {
        
        let selected=d.Petal_Width>=PetalW[0]&&d.Petal_Width<=PetalW[1]&&
                      d.Sepal_Width>=SepalW[0]&&d.Sepal_Width<=SepalW[1]
        if (selected) return 1
        else return .5
      });

      d3.select("#vis3")
        .selectAll(".bar")
        .style("opacity", d => {
          // console.log(d,speciesSelected)
          if(speciesSelected.indexOf(d)===-1) return .3
          else return 1
      });

     
    }}
  

})
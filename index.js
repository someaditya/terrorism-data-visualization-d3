//Data Visualization of Terrorism in India using D3

map = L.map('heatmap-canvas').setView([21.7679,78.8718], 5);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 23,
  }).addTo(map);

var heat = L.heatLayer(0,{
      radius: 15,
      blur: 15, 
      maxZoom: 10,
    }).addTo(map);


showHeatmap(1977,2016)
bargraph(1977,2016);
linechart()
chorddiagram()
sankeydiagram()

var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  
  return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();


function showHeatmap(low,high)
{

var array = [];
map.removeLayer(heat);
d3.csv("data/datafinal.csv", function(data) {

//console.log(data)
//

for(var i = 0; i < data.length; i++) {
  if (data[i].iyear>=low && data[i].iyear<=high) 
   {
  
    array.push([parseFloat(data[i].latitude),parseFloat(data[i].longitude),parseFloat(data[i].nkill)*0.3]);
  
   }
}

  //console.log(array)
  heat = L.heatLayer(array,{
      radius: 15,
      blur: 18, 
      maxZoom: 10,
    }).addTo(map);

});
  



}


function showBars()
{

  if (document.getElementById("myList").value == "yr1") {
      //svg.remove();
      bargraph(1977,1979)
      showHeatmap(1977,1979)
  }
  else if (document.getElementById("myList").value == "yr2") {
      //svg.remove();
     
      bargraph(1980,1989)
      showHeatmap(1980,1989)
  }
  else if (document.getElementById("myList").value == "yr3") {

      bargraph(1990,1998)
      showHeatmap(1990,1998)
  }
  else if (document.getElementById("myList").value == "yr4") {

      bargraph(1999,2003)
      showHeatmap(1999,2003)
  }
  else if (document.getElementById("myList").value == "yr5") {
     
      bargraph(2004,2014)
      showHeatmap(2004,2014)
  }
  else
  {
    bargraph(2014,2016)
    showHeatmap(2014,2016)
  }
}




function bargraph(low,high)
{

var svg1 = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg1.attr("width") - margin.left - margin.right,
    height = +svg1.attr("height") - margin.top - margin.bottom

svg1.selectAll("*").remove();

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg1.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/datafinal.csv", function(error, csv_data) { 
    var data = d3.nest()
    .key(function(d) { return d.iyear;})
    .rollup(function(d) { 
     return {
      kill: d3.sum(d, function(g) {return parseInt(g.nkill); }),
      wound: d3.sum(d, function(g) {return parseInt(g.nwound); })
     };
    })
    .entries(csv_data);
  console.log(JSON.stringify(data));
  
  data.forEach(function(d) { 
  d.iyear = d.key;
  //console.log("Year"+d.iyear);
  d.kills = d.value["kill"]+d.value["wound"];
  //console.log("Kills"+d.values)
  });

  x.domain(data.map(function(d) { return d.iyear; }));
  y.domain([0, d3.max(data, function(d) { return (d.kills); })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks())
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Fatalities");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.iyear); })
      .attr("y", function(d) { return y(d.kills); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.kills); });
      .style({fill: randomColor});
});
}


function chorddiagram()
{

  var data = [['Lashkar-E-Toiba','Police',124]
,['Lashkar-E-Toiba','Military',45]
,['Lashkar-E-Toiba','Government',4]
,['Lashkar-E-Toiba','Educational Institute',3]
,['Lashkar-E-Toiba','Unknowns',4]
,['Lashkar-E-Toiba','Non-State',7]
,['Communist Party Of India (Maoists)','Police',310]
,['Communist Party Of India (Maoists)','Private Citizens',42]
,['Communist Party Of India (Maoists)','Transportation',5]
,['Communist Party Of India (Maoists)','Government',20]
,['Communist Party Of India (Maoists)','Business',2]
,['Sikh Extremists','Religious Figures',5]
,['Sikh Extremists','Police',220]
,['Sikh Extremists','Military',124]
,['Sikh Extremists','Transportation',4]
,['Sikh Extremists','Unknowns',35]
,['Sikh Extremists','Business',7]
,['United Liberation Front of Assam (ULFA)','Police',93]
,['United Liberation Front of Assam (ULFA)','Military',11]
,['United Liberation Front of Assam (ULFA)','Government',8]
,['United Liberation Front of Assam (ULFA)','Non-State',22]
,['United Liberation Front of Assam (ULFA)','Business',0]
,['Peoples War Group','Police',29]
,['Peoples War Group','Military',19]
,['Peoples War Group','Private Citizens',3]
,['Peoples War Group','Unknowns',27]
,['Peoples War Group','Non-State',10]
,['National Democratic Front of Bodoland','Police',20]
,['National Democratic Front of Bodoland','Military',4]
,['National Democratic Front of Bodoland','Business',2]
,['National Democratic Front of Bodoland','Government',3]
,['National Democratic Front of Bodoland','Transportation',12]
,['Hizbul Mujahiddin','Police',27]
,['Hizbul Mujahiddin','Military',12]
,['Hizbul Mujahiddin','Government',3]
,['Hizbul Mujahiddin','Private Citizens',4]
,['Hizbul Mujahiddin','Unknowns',16]
,['Maoists','Police',78]
,['Maoists','Military',3]
,['Maoists','Business',2]
,['Maoists','Private Citizens',29]
,['Maoists','Government',8]
,['Garo National Liberation Army','Police',49]
,['Garo National Liberation Army','Military',17]
,['Garo National Liberation Army','Private Citizens',11]
,['Garo National Liberation Army','Educational Institute',1]
,['Garo National Liberation Army','Non-State',31]
,['National Socialist Council of Nagaland','Police',32]
,['National Socialist Council of Nagaland','Military',15]
,['National Socialist Council of Nagaland','Transportation',6]
,['National Socialist Council of Nagaland','Business',2]
,['National Socialist Council of Nagaland','Government',3]
,['Police','Lashkar-E-Toiba',51]
,['Police','Sikh Extremists',211]
,['Police','United Liberation Front of Assam (ULFA)',23]
,['Police','Peoples War Group',2]
,['Police','National Democratic Front of Bodoland',2]
,['Police','Hizbul Mujahiddin',2]
,['Police','Maoists',131]
,['Police','Garo National Liberation Army',43]
,['Police','National Socialist Council of Nagaland',22]
,['Police','Communist Party Of India (Maoists)',320]
,['Military','Lashkar-E-Toiba',471]
,['Military','Sikh Extremists',310]
,['Military','United Liberation Front of Assam (ULFA)',45]
,['Military','Peoples War Group',22]
,['Military','National Democratic Front of Bodoland',32]
,['Military','Hizbul Mujahiddin',51]
,['Military','Maoists',2]
,['Military','Garo National Liberation Army',17]
,['Military','National Socialist Council of Nagaland',3]
,['Military','Communist Party Of India (Maoists)',4]
,['Private Citizens','Communist Party Of India (Maoists)',0]
];

var colors = {
"Lashkar-E-Toiba":         "#da4480"
,"Communist Party Of India (Maoists)":    "#5ab449"
,"Sikh Extremists":    "#7f5acd"
,"United Liberation Front of Assam (ULFA)":        "#aab740"
,"Peoples War Group": "#ce58c0"
,"National Democratic Front of Bodoland":        "#50a26e"
,"Hizbul Mujahiddin": "#d1434b"
,"Maoists":      "#45c0bc"
,"Garo National Liberation Army":"#ce5929"
,"National Socialist Council of Nagaland": "#4e7bda"
,"Police":  "#d49d3c"
,"Private Citizens":   "#6660a3"
,"Transportation":    "#7b853c"
,"Military":     "#b58dde"
,"Government":     "#97622e"
,"Religious Figures":   "#609dd6"
,"Business":      "#e29074"
,"Educational Institute":        "#9c4b88"
,"Non-State":  "#ab505f"
,"Unknowns":   "#dc85b6"
};

var sortOrder =[
"Lashkar-E-Toiba"
,"Communist Party Of India (Maoists)"
,"Sikh Extremists"
,"United Liberation Front of Assam (ULFA)"
,"Peoples War Group"
,"National Democratic Front of Bodoland"
,"Hizbul Mujahiddin"
,"Maoists"
,"Garo National Liberation Army"
,"National Socialist Council of Nagaland"
,"Police"
,"Military"
,"Private Citizens",
,"Transportation"
,"Government"
,"Religious Figures"
,"Business"
,"Educational Institute"
,"Non-State"
,"Unknowns"
];

function sort(a,b){ return d3.ascending(sortOrder.indexOf(a),sortOrder.indexOf(b)); }

var ch = viz.ch().data(data)
      .padding(.01)
      .sort(sort)
    .innerRadius(430)
    .outerRadius(450)
    .duration(1000)
    .chordOpacity(0.3)
    .labelPadding(.03)
      .fill(function(d){ return colors[d];});

var width=1200, height=1100;

var svg3 = d3.select("body").append("svg").attr("height",height).attr("width",width);

svg3.append("g").attr("transform", "translate(600,550)").call(ch);

// adjust height of frame in bl.ocks.org
d3.select(self.frameElement).style("height", height+"px").style("width", width+"px"); 
}


function linechart()
{


var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1400 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.iyear); })
    .y(function(d) { return y(d.nkill); });

var valueline2 = d3.line()
    .x(function(d) { return x(d.iyear); })
    .y(function(d) { return y(d.nwound); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
  

d3.csv("data/datafinal.csv", function(error, csv_data) {
  if (error) throw error;
  
  var data = d3.nest()
    .key(function(d) { return d.iyear;})
    .rollup(function(d) { 
    return {
      kill: d3.sum(d, function(g) {return parseInt(g.nkill); }),
      wound: d3.sum(d, function(g) {return parseInt(g.nwound); })
     };
    })
    .entries(csv_data);
  console.log(JSON.stringify(data));
  // format the data
  data.forEach(function(d) {
      d.iyear = d.key;
      d.nkill = d.value["kill"];
      d.nwound = d.value["wound"];
      //console.log(d.nkill)
  });
  

  // Scale the range of the data
  x.domain(data.map(function(d) { return d.iyear; }));
  y.domain([0, d3.max(data, function(d) { return d.nwound; })]);


  
    // Add the X Axis
  svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg2.append("g")
       .call(d3.axisLeft(y))
       .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
       .attr("text-anchor", "end")
       .text("Fatalities");
  

  
  // Add the valueline path.
  svg2.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  svg2.append("path")
      .data([data])
      .style("stroke", "red")
      .attr("class", "line")
      .attr("d", valueline2);

 	svg2.append("text")
		.attr("transform", "translate(" + (width) + "," + y(data[data.length-1].nkill) + ")")
		.attr("dy", ".71em")
		.attr("text-anchor", "start")
		.style("fill", "steelblue")
		.text("Killed");

	svg2.append("text")
		.attr("transform", "translate(" + (width) + "," + y(data[data.length-1].nwound) + ")")
		.attr("dy", ".71em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("Wounded");



});

}





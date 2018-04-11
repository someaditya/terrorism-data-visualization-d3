map2 = L.map('heatmap-canvas').setView([21.7679,78.8718], 5);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 23,
  }).addTo(map2);

var heat = L.heatLayer(0,{
      radius: 15,
      blur: 15, 
      maxZoom: 10,
    }).addTo(map2);


showHeatmap(1977,2016);
bargraph(1977,2016);
//chorddiagram()


function showHeatmap(low,high)
{

var array = [];
map2.removeLayer(heat);
d3.csv("http://localhost/datafinal.csv", function(data) {

//console.log(data)
//

for(var i = 0; i < data.length; i++) {
  if (data[i].iyear>=low && data[i].iyear<=high) 
   {
  
    array.push([parseFloat(data[i].latitude),parseFloat(data[i].longitude),parseFloat(data[i].nkill)*0.3]);
  
   }
}

  console.log(array)
  heat = L.heatLayer(array,{
      radius: 15,
      blur: 18, 
      maxZoom: 10,
    }).addTo(map2);

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
      sankeydiagram();
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

d3.csv("http://localhost/datafinal.csv", function(d) {
 
 if (d.iyear>=low && d.iyear<=high) {
    d.nkill = +d.nkill;
    return d;
  }
  
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.iyear; }));
  y.domain([0, d3.max(data, function(d) { return d.nkill; })]);

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
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.iyear); })
      .attr("y", function(d) { return y(d.nkill); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.nkill); });
});

}


function chorddiagram()
{

  d3.csv('http://localhost/datafinal.csv', function (error, data) {
        var mpr = chordMpr(data);

        mpr
          .addValuesToMap('gname')
          .setFilter(function (row, a, b) {
            return (row.gname === a.name && row.target1 === b.name)
          })
          .setAccessor(function (recs, a, b) {
            if (!recs[0]) return 0;
            return +recs[0].years;
          });
        drawChords(mpr.getMatrix(), mpr.getMap());
      });
      //*******************************************************************
      //  DRAW THE CHORD DIAGRAM
      //*******************************************************************
      function drawChords (matrix, mmap) {
        var w = 980, h = 800, r1 = h / 2, r0 = r1 - 100;

        var fill = d3.scale.category10();

        var chord = d3.layout.chord()
            .padding(.02)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending);

        var arc = d3.svg.arc()
            .innerRadius(r0)
            .outerRadius(r0 + 20);

        var svg = d3.select("#diagram").append("svg")
            .attr("width", w)
            .attr("height", h)
          .append("svg:g")
            .attr("id", "circle")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

            svg.append("circle")
                .attr("r", r0 + 20);

        var rdr = chordRdr(matrix, mmap);
        chord.matrix(matrix);

        var g = svg.selectAll("g.group")
            .data(chord.groups())
          .enter().append("svg:g")
            .attr("class", "group")
            .on("mouseover", mouseover)
            .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

        g.append("svg:path")
            .style("stroke", "none")
            .style("fill", function(d) { return fill(d.index); })
            .attr("d", arc);

        g.append("svg:text")
            .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (r0 + 26) + ")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) { return rdr(d).gname; });

          var chordPaths = svg.selectAll("path.chord")
                .data(chord.chords())
              .enter().append("svg:path")
                .attr("class", "chord")
                .style("stroke", function(d) { return d3.rgb(fill(d.target.index)).darker(); })
                .style("fill", function(d) { return fill(d.target.index); })
                .attr("d", d3.svg.chord().radius(r0))
                .on("mouseover", function (d) {
                  d3.select("#tooltip")
                    .style("visibility", "visible")
                    .html(chordTip(rdr(d)))
                    .style("top", function () { return (d3.event.pageY - 100)+"px"})
                    .style("left", function () { return (d3.event.pageX - 100)+"px";})
                })
                .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

          function chordTip (d) {
            var p = d3.format(".0%"), q = d3.format("0d")
            return "Chord info:<br/>"
              + q(d.svalue) + " years overlap with " + d.sname + " and " + d.tname
          }

          function groupTip (d) {
            var guru = d.gname, q = d3.format("0d");

            switch (guru) {
              case "g1": return "Guru Nanak"; //+ " lived for 70 years";
                  break;
              case "g2": return "Guru Angad"; // + " lived for 48 years";
                  break;
              case "g3": return "Guru Amar Das"; // + " lived for 95 years";
                  break;
              case "g4": return "Guru Ram Das"; // + " lived for 47 years";
                  break;
              case "g5": return "Guru Arjun Dev"; // + " lived for 43 years";
                  break;
              case "g6": return "Guru Har Gobind"; // + " lived for 49 years";
                  break;
              case "g7": return "Guru Har Rai"; // + " lived for 31 years";
                  break;
              case "g8": return "Guru Har Krishan"; // + " lived for 8 years";
                  break;
              case "g9": return "Guru Tegh Bahadar"; // + " lived for 54 years";
                  break;
              case "g10": return "Guru Gobind Singh"; // + " lived for 42 years";
                  break;
              default : return d.gname;

            }
          }

          function mouseover(d, i) {
            d3.select("#tooltip")
              .style("visibility", "visible")
              .html(groupTip(rdr(d)))
              .style("top", function () { return (d3.event.pageY - 80)+"px"})
              .style("left", function () { return (d3.event.pageX - 130)+"px";})

            chordPaths.classed("fade", function(p) {
              return p.source.index != i
                  && p.target.index != i;
            });
          }
      }

}



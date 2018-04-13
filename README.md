# Terrorism Data Visualization using D3
Terrorism is a global menace in which thousands of people around globe lose their lives everyday, this project tries to visualize the countless terrorist attacks that occurred in India over the last 30 years co related with the Government Tenures.This project makes use of the Global Terrorism Database maintained by University of Maryland and D3, a Javascript Library created by Mike Bostock was used for the Visualization. Several visualization tools like Heatmap, Chord Diagram, Line Chart were used in this project.

## Requirements
- Leaflet (http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js)
- Leaflet-Heat (http://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js)
- D3.js V4 (http://d3js.org/d3.v4.min.js)
- Viz js (http://vizjs.org/viz.v1.1.0.min.js)
- Sankey js (https://github.com/d3/d3-sankey)


## Data 
The Global Terrorism Database (GTD) is an open-source database including information on terrorist events around the world from 1970 through 2016 (with additional annual updates planned for the future). .Currently it is the most comprehensive unclassified database on terrorist events in the world, it includes information on more than 83,000 bombings, 18,000 assassinations, and 11,000 kidnappings since 1970 and also information on at least 45 variables for each case, with more recent incidents including information on more than 120 variables. 
https://www.start.umd.edu/gtd/
![GTD Logo](/image/worldmap.png)


## Pre-processing
For this project, the Data that was only needed was the Terrorist Activities that occurred in India between 1977 to 2016. For this purpose the data-set was filtered and narrowed down to only events taken place in India.Further it was found that there are many blank values in the Data-set which was very crucial towards the visualization. For example, all the rows which was having blank latitude and longitude information was removed for the Heatmap Visualization. Further, There were many blank values for the Killed and Wounded data , which was set to zero. Finally the data set contained around 10823 rows of data i.e terrorist events which was used for visualization.Some of the major attacks like the 20/11 Mumbai Attacks had to be dropped due to blank geographical information.

## Visualization
There are lot of tools available in the market like Tableu or Qlikview but D3 was chosen for this project considering its in depth capability of visualization. D3.js is a JavaScript library for producing dynamic, interactive data visualizations in web browsers. It makes use of the widely implemented SVG, HTML5, and CSS standards. It was developed by Mike Bostock, Jason Davies, Jeffrey Heer, Vadim Ogievetsky, and community. In this project various visualization techniques were used such as Leaflet and Heatmaps, Bar Diargram , Multi Line Charts and Chord Diagrams.

##### 1. Heatmaps
Heatmaps are an excellent visualization tool. So in this project the Leaflet.js and its corresponding Heatmap Library were used over Open Street Maps to achieve the desired results.In this project the first heatmap is created using all the Terrorist kills from 1977-2016, and it changes further with user inputs through the drop down.So, the user can really see how the pattern of Terrorist attacks changed over time throughout the span of India.Leaflet Heatmap Library (https://github.com/Leaflet/Leaflet.heat).

![Terror Heatmap](/image/terrorheat.png)


##### 2. Chord Diagram
A chord diagram in D3.js, is a graphical method of displaying the inter-relationships between data in a matrix. Here in the visualization the attempt was made to create the relationships between the Terrorist Groups and the Terrorist Targets.As the dataset is too big to establish such relationship, the author's previous work \URL{https://www.kaggle.com/someadityamandal/terror-attacks-in-india-a-political-analysis} was unitized for this visualization. The top ten terrorist groups and top ten terrorist targets were fetched and a new list was created. Then based on this list further the count of attacks were generated using queries and a new data was created. The attack counts of the armed forces (police and military) was created using the media reports. This Chord Diagram shows how the Terrorist Groups attack the Armed Forces and they are counter attacked by the armed forces, the continuous relationship between the stakeholders in this menace. D3 Block (https://bl.ocks.org/mbostock/4062006).

![Terror Heatmap](/image/chord.png)


##### 3. Bar Graph
This simple bar chart was constructed from the CSV file storing the frequency of killings in terrorist attack over the year. The chart employs conventional margins and a number of D3 features such as d3-dsv for parse tab-separated values, d3-format - number formatting, d3-scale - position encodings and d3-axis - axes.For this visualization only the two attributes were utilized year(iyear) and number of killed (nkill).D3 block (https://bl.ocks.org/mbostock/3885304).

##### 4. Line Chart Multiseries
This was written using d3.js v4 ,simple graph demonstrating the display of multiple lines. So for the x-axis the year (iyear) which represents the year of activity was chosen. And for the y axis two lines were chosen one representing the number of person killed (nkill) and another representing the number of person wounded(nwound). Both these attributes were used to create two valuelines which was further appended to the SVG as an attribute. D3 Block (https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f).







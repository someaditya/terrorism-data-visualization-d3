# Terrorism Data Visualization using D3
Terrorism is a global menace in which thousands of people around globe lose their lives everyday, this project tries to visualize the countless terrorist attacks that occurred in India over the last 30 years co related with the Government Tenures.This project makes use of the Global Terrorism Database maintained by University of Maryland and D3, a Javascript Library created by Mike Bostock was used for the Visualization. Several visualization tools like Heatmap, Chord Diagram, Line Chart were used in this project.

## Data 
The Global Terrorism Database (GTD) is an open-source database including information on terrorist events around the world from 1970 through 2016 (with additional annual updates planned for the future). .Currently it is the most comprehensive unclassified database on terrorist events in the world, it includes information on more than 83,000 bombings, 18,000 assassinations, and 11,000 kidnappings since 1970 and also information on at least 45 variables for each case, with more recent incidents including information on more than 120 variables. 
https://www.start.umd.edu/gtd/

## Pre-processing
For this project, the Data that was only needed was the Terrorist Activities that occurred in India between 1977 to 2016. For this purpose the data-set was filtered and narrowed down to only events taken place in India.Further it was found that there are many blank values in the Data-set which was very crucial towards the visualization. For example, all the rows which was having blank latitude and longitude information was removed for the Heatmap Visualization. Further, There were many blank values for the Killed and Wounded data , which was set to zero. Finally the data set contained around 10823 rows of data i.e terrorist events which was used for visualization.Some of the major attacks like the 20/11 Mumbai Attacks had to be dropped due to blank geographical information.

## Visualization
There are lot of tools available in the market like Tableu or Qlikview but D3 was chosen for this project considering its in depth capability of visualization. D3.js is a JavaScript library for producing dynamic, interactive data visualizations in web browsers. It makes use of the widely implemented SVG, HTML5, and CSS standards. It was developed by Mike Bostock, Jason Davies, Jeffrey Heer, Vadim Ogievetsky, and community. In this project various visualization techniques were used such as Leaflet and Heatmaps, Bar Diargram , Multi Line Charts and Chord Diagrams.

##### 1. Heatmaps
Heatmaps are an excellent visualization tool. So in this project the Leaflet.js and its corresponding Heatmap Library were used over Open Street Maps to achieve the desired results.In this project the first heatmap is created using all the Terrorist kills from 1977-2016, and it changes further with user inputs through the drop down.So, the user can really see how the pattern of Terrorist attacks changed over time throughout the span of India.
Leaflet Heatmap Library https://github.com/Leaflet/Leaflet.heat

![Yelp Logo](/image/terrorheat.png)

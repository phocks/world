/* globals d3 */ 
// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

const width = 400,
      height = 400;

const svg = d3.select('#map')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const url = "https://cdn.glitch.com/9df3cdd3-6a84-457e-8a74-ed2fb96f9017%2Fcustom.geo.json?1504520743459";

d3.json(url, function(error, geojson) {
  const projection = d3.geoOrthographic()
    .fitSize([width, height], geojson);
  
  const path = d3.geoPath()
    .projection(projection);
  
  const geoPath = svg
    .append('path')
    .attr('d', path(geojson));
  
  let rotation = 0;
  
  setInterval(function() {
    rotation--;
    projection.rotate([rotation, 0, 0]);
    geoPath.attr('d', path(geojson));
  }, 100)
});

function buildCharts(sample){
d3.json("samples.json").then((data) => {
//BAR GRAPH
    var samples = data.samples;
    var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = samplesArray[0];
    
    var elements = [result]
    
    var sortedID = elements.sort((a,b) => b.sample_values - a.sample_values).reverse();
    var topMostID = sortedID;
    var topTenID = topMostID.map(otu_finder => otu_finder.otu_ids);
    var top_ten_array = topTenID[0].slice(0,10)
    top_ten_array = top_ten_array.map(i => 'OTU ' + i)

    var topTenVal = topMostID.map(otu_finder => otu_finder.sample_values);

    var trace = {
        y: top_ten_array,
        x: topTenVal[0].slice(0,10),
        type: "bar",
        orientation: 'h',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }]
    };
    var data = [trace];
    Plotly.newPlot("bar", data);

//BUBBLE GRAPH
console.log(elements)
    var trace1 = {
        x: elements[0].otu_ids,
        y: elements[0].sample_values,
        mode: 'markers',
        marker: {
        colorscale: 'Rainbow',
        size: elements[0].sample_values
        }
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'Marker Size',
        showlegend: false,

    };
    
    Plotly.newPlot('bubble', data);
});
}



function buildMetadata(sample) {
d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    //ID
    var id_label = "id: ";
    PANEL.append("h6").text(id_label.concat(result.id));
    //Ethnicity
    var eth_label = "ethncity: ";
    PANEL.append("h6").text(eth_label.concat(result.ethnicity));
    //gender
    var gender_label = "gender: ";
    PANEL.append("h6").text(gender_label.concat(result.gender));
    //age
    var age_label = "age: ";
    PANEL.append("h6").text(age_label.concat(result.age));
    //location
    var loc_label = "location: ";
    PANEL.append("h6").text(loc_label.concat(result.location));
    //bbtype
    var bb_label = "bbtype: ";
    PANEL.append("h6").text(bb_label.concat(result.bbtype));
    //wfreq
    var wfreq_label = "wfreq: ";
    PANEL.append("h6").text(wfreq_label.concat(result.wfreq));

    
});
}



function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    
    buildMetadata(940);
    buildCharts(940);
})}
  
init();

















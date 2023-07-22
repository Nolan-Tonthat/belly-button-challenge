// Use the D3 to read samples.json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(sample => sample.names.map(sample => d3.select("#selDataset").append("option").text(sample)))

function Charts(sample_id)
{
    d3.json(url)
    .then(function(sample)
    {
        // Samples for selected id
        let data = sample.samples.find(sample => sample.id == sample_id)
        //console.log(data)

        // All and Top 10 Sample values for selected id
        let sampleVal = data.sample_values
         //console.log(sampleVal)
        let topTen_samples = sampleVal.slice(0,10).reverse()
        //console.log(topTen_samples)
        
        // All and Top Ten OTU Ids for selected id
        let otuIds = data.otu_ids
        //console.log(otuIds)
        let topTen_otuIds = otuIds.slice(0,10).reverse().map(sample => "OTU "+ sample)
        //console.log(topTen_otuIds)
        
        // All and Top Ten OTU labels for selected id
        let otuLabels = data.otu_labels
        //console.log(otuLabels)
        let topTen_otuLabels = otuLabels.slice(0,10).reverse()
        //console.log(topTen_otuLabels)

        // Metadata for selected id
        let metadata = sample.metadata.find(sample => sample.id == sample_id)
        //console.log(metadata)

        //bar chart trace
        let bartrace = 
        {
            x:topTen_samples,
            y:topTen_otuIds,
            text:topTen_otuLabels,
            type:"bar",
            orientation:"h",
           
        }

        let bardata = [bartrace]
        
        //bar chart layout
        let barlayout = 
        {
            title:"Top Ten Bacterial Species (OTUs) by Abundance"
        }
        
        Plotly.newPlot("bar",bardata,barlayout)



        // Populate the Demographic Info for the selected id
        let info = d3.select("#sample-metadata").html("")
        let newInfo = info.append("text")
        for ([x,y] of Object.entries(metadata))
        {
            newInfo.append("small").text(`${x}: ${y}`).append("br")
        }

        // Plotly bubble chart trace
        let bubbletrace = 
        {
            x:otuIds,
            y:sampleVal,
            mode: "markers",
            marker:
            {
              size:sampleVal,
              color:otuIds,
              colorscale:"Earth"
            },
            text:otuLabels
        }
      
        let bubbledata = [bubbletrace];
        
        //Plotly bubble chart layout
        let bubblelayout = 
        {
            title: "All Bacterial Species Found in Selected Test Subject (Radius = Abundance)",
            xaxis:
            {
              title:
                {
                  text:"OTU ID"
                }
            },
            showlegend: false,
            height: 900,
            width: 1200
        }
        
        Plotly.newPlot("bubble",bubbledata,bubblelayout)

    })
}

// Dashboard defaults to initial id in dataset
Charts("940")

// Repopulate dashboard based on user selection
function optionChanged(x)
{
    Charts(x)
}
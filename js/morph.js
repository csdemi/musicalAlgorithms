//////////////////////////////////////////////////////////graph start //////////////////////////////////

google.load("visualization", "1", {'packages':['corechart']});

var bool = 0;
var sliderVal = 1;
var targetData;
var startingData;
var morphToSong;

function openMorphGraph()
{
	// Set callback to run when API is loaded
	google.setOnLoadCallback(function() 
	{
		update();
		console.log("fire");
	});

	loadFile(getTargetdata);
}

function update() 
{
	var slider = document.getElementById('slide');
	sliderVal = slider.value;	
	drawVisualization();
}

//Using function to update targetData with callback using asynchronous
function getTargetdata(data)
{
	targetData = data;
}

function startingData()
{
	startingData = new Array();

	for (var i = 0; i < 200; i++) 
	{
		startingData[i] = Math.floor(Math.random()*200);
	}
}
	
//asynchronous function with callback
function loadFile(callback)
{
	var file;
	var reader; 

	//Need to be set to server location
	if (morphToSong == "Beethoven's 9th")
	{
		file = "../morph/trueBeethoven";
	}
	else
	{
		file = "../morph/finlandia"
	}
	
	if (window.XMLHttpRequest) 
	{ // Mozilla, Safari, ...
		reader = new XMLHttpRequest();
	} 
	else if (window.ActiveXObject) 
	{ // IE 8 and older
		reader = new ActiveXObject("Microsoft.XMLHTTP");
	}

	reader.onreadystatechange = function ()
	{
		var MaxNoteCount = 2000;
		if(reader.readyState === 4)
		{
			if(reader.status === 200 || reader.status == 0)
			{
				var data = reader.responseText.split("\n");
				data = data.slice(0,data.length-2);

				var newData = new Array();
				for(i=0; i < MaxNoteCount; i++)
				{
					newData[i] = data[i % data.length];
				}

				callback(newData);
			}
		}
	}
	reader.open("GET", file, true);
	reader.send(null);
}
	
function setStartData(inVal, morphTarget) 
{
	startingData = inVal;
	morphToSong = morphTarget;
}

// Called when the Visualization API is loaded.
function drawVisualization() 
{
	// Instantiate our graph object.
	var graph = new google.visualization.LineChart(document.getElementById('mygraph'));

	var morphVal;
	var data = new google.visualization.DataTable();
	data.addColumn('number');
	data.addColumn('number', "Beethoven's 9th");
	data.addColumn('number', 'Voice Data');

	var textData = "";

	for (var i = 0; i < startingData.length; i++) 
	{
		morphVal = Math.floor((parseInt(targetData[i]) - parseInt(startingData[i]))*(sliderVal/100) + parseInt(startingData[i]));
		textData += morphVal+",";

		data.addRow([i+20,
		parseInt(targetData[i]),
		parseInt(morphVal) ]);
	}
	textData = textData.substring(0, textData.length - 1)
	document.getElementById("morphBox").value = textData;

	// specify options
	var options = 	{ width: "100%", allowHtml: true,
					  lines: [ { color: "#0075BE", style: "dot" },
					  		   { color: "#FF5506", style: "dot",} ],
					  chartArea: { width: "100%", height: "75%"},
		   			  'legend': {'position': 'bottom'}
	};
	
	graph.draw(data, options);
}
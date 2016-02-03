/*
This file contains all the functions pertaining to processing and opening utilities.
*/

//elem will be the voicepanel passed in, such that the utilities can target specific voices

//applies the changes to the appropriate text box

var voiceNumber; //Keep track of which voice we're working with

function accept(utilTextArea, homeID) {
	var homeText = $("#"+ homeID + "" + voiceNumber);
	
	homeText.val(utilTextArea.value.split(","));
	
	$(".pitchInputUtility-modal").modal("hide");
	
}

function openPitchInputUtilities(voiceNum){
	
	var homeText = $("#areaPitch" + voiceNum); //This is the text box for the voice we're working with
	var utilText = $("#pitchInputUtilityBox"); //This is the text box in the pop-up modal(the utility)
	
	voiceNumber = voiceNum;
	
	//Migrate contents of the panel's text to the util text box
	utilText.val(homeText.val().split(","));
	
	$(".pitchInputUtility-modal").modal("show");
	//$(".pitchInputUtility-modal").data("voice-num", $elem.attr("id"));
	
}

//Reverses the order of the notes. Pretty simple.
function reverseNotes(textArea) {
	var array = textArea.value.split(",");
	
	array.reverse();
	
	textArea.value = array;
}

//Inverts the notes with respect to the middle value between minimum and maximum.
//That is, the minimum note should become maximum, and vice versa.
//The notes are less-affected the closer to the middle they are.
function invert(textArea) {
	var array = textArea.value.split(",");
	var max = 0;
	var min = 1000;
	var note;
	
	//Calculate middle value to invert around
	for(var i = 0; i < array.length; i++) {
		note = parseInt(array[i]);
		if(note > max)
			max = note;
			
		if(note < min)
			min = note;
	}
	
	//var mid = Math.round((max+min)/2); //everything will be inverted around this value
	var mid = (max+min)/2.0;
	for(i = 0; i < array.length; i++) {
		var dif = Math.abs(parseInt(array[i])-mid);
		if(parseInt(array[i]) > mid)
			array[i] = Math.round(mid-dif);
		else
			array[i] = Math.round(mid+dif);
	}
	
	textArea.value = array;
}
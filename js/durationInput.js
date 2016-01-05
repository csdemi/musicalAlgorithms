
$(document).ready(function(){

// This is called when the algorithm is changed.
	$('.duration_input').on('change', '[id^=dInput_set]', function() {	
	    var voiceArray = GetVoiceArray();
	    
	    var $parentId = $(this).closest('div[id]');
		var $area = $parentId.find('[id^=dAreaMap]');
		var $selectionBox = $parentId.find('[id^=dInput_set]');	
		var $selected = $selectionBox.find("option:selected");
		var voiceNumber = getVoiceNumber($parentId);
		 
		if($selected.text() == "Custom")
		{
		    $area.prop("readonly", false);
		    $area.val("");
		    
		    $area.val(populateDurationCustomText(voiceArray[voiceNumber - 1].originalPitchArray.length));
		    
		}
		else if($selected.text() !=  "Custom")
		{
		    $area.prop("readonly", true);
		}
		
		call_duration($selected.text(), voiceArray[voiceNumber - 1].originalPitchArray.length, $area.attr('id'), voiceArray[voiceNumber - 1]);
		call_dur_Mapping($parentId, voiceNumber);
		SetVoiceArray(voiceArray);
		
		updateTooltipVals($parentId);
	});
	
	//This function fills the durationInput textbox with the appropriate number of notes (1 by default) in order to match the number of notes in the pitch section.
	function populateDurationCustomText(noteCount) {
		var noteString = "";
			for(var i = 0; i < noteCount - 1; i++)
			{
				noteString += 1 + ",";
			}
			
			
			if(noteCount > 0)
			{
				noteString += "1";
			}
		return noteString;
		
	}//end function
    // The func below is called when the text area is played with.
    // this method down is crashing somewhere around the call_duration call.
    // this needs deleted VVVVVVV Was on('change', '[id^=dIput_set], [id^=dAreaMap]'
	$('.duration_input').on('change', '[id^=dAreaMap]', function() {
	    var voiceArray = GetVoiceArray();
	 
	    var $parentId = $(this).closest('div[id]');
		var currVoiceNum = getVoiceNumber($parentId);
		var $area = $parentId.find('[id^=dAreaMap]');	
		var $selected = $parentId.find("option:selected");
		tooltip($parentId);

		if($selected.text() == "Custom")
		{
			$area.prop("readonly", false);
			//alert("text area is editable");
		}
		else
		{
			$area.prop("readonly", true);
			//alert("text area is not editable");
		}

		validatePanel($area, getVoiceNumber($parentId));
		var $noteCount = getNoteCount($area);
	    //call_pitch($selected.text(),$noteCount,$area.attr('id')); old version.
		/**/call_duration($selected.text(), voiceArray[currVoiceNum -1].originalDurationArray.length, $area.attr('id'), voiceArray[currVoiceNum - 1]);
		SetVoiceArray(voiceArray);
		var $pitId = $('#input_set' + currVoiceNum).closest('div[id]');
		var $pitArea = $pitId.find('[id^=areaPitch]');
		var $pitSelection = $pitId.find("option:selected");//.find('[id^=dInput_Set]');
		validatePanel($area, getVoiceNumber($parentId));
		//call_pitch($pitSelection.text(),$noteCount,$pitArea.attr('id'));
		
		var $range = $(".duration_mapping").closest('div[id]').find('[id^=dRange]');
		var $to = $(".duration_mapping").closest('div[id]').find('[id^=dTo]');
		dWriteRangeOut($range.val(),$to.val(),currVoiceNum);
		call_dur_Mapping($(this).closest('div[id]'),currVoiceNum);
		call_pitch_Mapping($(this).closest('div[id]'),currVoiceNum);// this may not be needed

		updateDurationMappingData($parentId,currVoiceNum);
		updateTooltipVals($parentId);
	});


	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=durPitchInfo]');
		var $input = $parentId.find('[id^=dInput_set]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}		
});

function durationInput(numberOfVoice) {
    for (var voiceCount = 1; voiceCount <= numberOfVoice; voiceCount++) {
        var $voice = "\
		<div id='dPitchPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
					<label>Input Set:</label>\
					<select id='dInput_set"+ voiceCount + "' name='inputSet' >\
					<option>Quarter Notes</option>\
					<option>Sine</option>\
					<option>Fibonacci</option>\
					<option>Integers</option>\
					<option>Pascal</option>\
					<option>Phi</option>\
					<option>Pi</option>\
					<option>Powers</option>\
					<option>E Constant</option>\
					<option>Custom</option>\
				</select>\
				<img id='durPitchInfo"+ voiceCount + "'> \
				<label>Input:</label><br>\
				<textarea readonly id='dAreaMap"+ voiceCount + "'></textarea>\
			</fieldset>\
		</div>\
		";
        $(".duration_input").append($voice);
    }
}

	
	
	


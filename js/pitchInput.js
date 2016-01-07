
$(document).ready(function(){	
	//This event gets thrown when the selected input algorithm changes (there is no on input event for listboxes, so this method had to be created)
	$('.pitch_input').on('change', '[id^=input_set]', function() {//pitch_input
	    /**/var voiceArray = GetVoiceArray();// this was added.
	 
	    var $parentId = $(this).closest('div[id]');
		var $countId = $parentId.find('[id^=note_count]');
		var $area = $parentId.find('[id^=areaPitch]');	
		var $selectionBox = $parentId.find('[id^=input_set]');	
		var $selected = $selectionBox.find("option:selected");
		var voiceNumber = getVoiceNumber($parentId); //All of this stuff is needed for logic.
        /* 
        This shows and hides the fields for the DNA and Protein by checking what the option is in the dropdown menu.
        If the option is DNA then it will toggle on the areas and display the current values of the items. This area will allow 
        the user to customize the values to the letters and then convert all the letters in the input area to numerical data 
        that will be used to play music.
        */
        var $dnaLabel = $('#dna');
        var $sequenceInput =$('#sequence');
        if($selected.text()=="DNA")
        {
            $dnaLabel.show();
            $sequenceInput.show();
        }
        else
        {
            $dnaLabel.hide();
            $sequenceInput.hide();
            
        }

        
		if ($selected.text() == "Custom") {
		    $area.prop("readonly", false);
		    $area.val("");
			//Possibly make text box blank here instead of new method
		}
		else {
			$area.prop("readonly", true);
		}


		validatePanel($area, getVoiceNumber($parentId));

		var $durId = $('#dInput_set'+voiceNumber).closest('div[id]');
		var $durArea = $durId.find('[id^=dAreaMap]');
		var $durSelectionBox = $durId.find('[id^=dInput_set]');
		var $durSelection = $durSelectionBox.find("option:selected");
		
	/**/	call_pitch($selected.text(),$countId.val(),$area.attr('id'),voiceArray[voiceNumber-1]);// this works. 		//Gets the appropriate numbers from selected algorithm and fills text box with the right amount.
	/**/	call_duration($durSelection.text(),$countId.val(),$durArea.attr('id'),voiceArray[voiceNumber - 1]); // this works.
	// I am thinking that I don't want this stuff in here. Needs to be removed...
		updatePitchMapData($parentId,voiceNumber);
		updateTooltipVals($parentId);
		updateDurationMapTooltip($parentId);
	});

	//This event gets thrown when the text area (container for note values) is changed. This should only happen after user types with Custom enabled.
	$('.pitch_input').on('change', '[id^=areaPitch]', function () {// pitch_input
	    /**/ var voiceArray = GetVoiceArray();
	    // I think this is only happening when one moves on to the next window.
	    var $parentId = $(this).closest('div[id]');
		var $countId = $parentId.find('[id^=note_count]');
		var $area = $parentId.find('[id^=areaPitch]');	
		var $selectionBox = $parentId.find('[id^=input_set]');	
		var $selected = $selectionBox.find("option:selected");
		var voiceNumber = getVoiceNumber($parentId);
		var $durId = $('#dInput_set'+voiceNumber).closest('div[id]');
		var $durArea = $durId.find('[id^=dAreaMap]');
		var $durSelectionBox = $durId.find('[id^=dInput_set]');
		var $durSelection = $durSelectionBox.find("option:selected");
		
		tooltip($parentId);
		
		if($durSelection.text() == "Custom") { //We want to make sure that if duration input is on custom, the number of default values is kept in line with pitch input
			$durArea.val(populateDurationCustomText(getTextAreaData($('#areaPitch'+voiceNumber)).length));
		}
		
		validatePanel($area, getVoiceNumber($parentId));
		
		call_pitch($selected.text(), $countId.val(), $area.attr('id'), voiceArray[voiceNumber - 1]);
	    call_duration($durSelection.text(),$countId.val(),$durArea.attr('id'), voiceArray[voiceNumber-1]);

		updatePitchMapData($parentId,voiceNumber);
		updateTooltipVals($parentId);
		updateDurationMapTooltip($parentId);
	})
	
	//This event gets thrown when the note count changes, it gets thrown as the user types.
	$('.pitch_input').on('input', '[id^=note_count]', function() {// pitch_input	
	    /**/ var voiceArray = GetVoiceArray();

	    var $parentId = $(this).closest('div[id]');
		var $countId = $parentId.find('[id^=note_count]');
		var $area = $parentId.find('[id^=areaPitch]');	
		var $selectionBox = $parentId.find('[id^=input_set]');	
		var $selected = $selectionBox.find("option:selected");
		var voiceNumber = getVoiceNumber($parentId);
		var $durId = $('#dInput_set'+voiceNumber).closest('div[id]');
		var $durArea = $durId.find('[id^=dAreaMap]');
		var $durSelectionBox = $durId.find('[id^=dInput_set]');
		var $durSelection = $durSelectionBox.find("option:selected");
		
		tooltip($parentId);
		noteCountTest($countId);
		
		if($durSelection.text() == "Custom") { //We want to make sure that if duration input is on custom, the number of default values is kept in line with pitch input
			$durArea.val(populateDurationCustomText($countId.val()));
		}
		
		validatePanel($area, getVoiceNumber($parentId));

		call_pitch($selected.text(),$countId.val(),$area.attr('id'), voiceArray[voiceNumber - 1]); 	
		call_duration($durSelection.text(),$countId.val(),$durArea.attr('id'), voiceArray[voiceNumber - 1]);
		
		updatePitchMapData($parentId,voiceNumber);
		updateTooltipVals($parentId);
		updateDurationMapTooltip($parentId);
	});
    

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=pitchInfo]');
		var $input = $parentId.find('[id^=input_set]');		
		var $selected = $input.find("option:selected");
		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}		
	//Ensures that the note count is not higher than the cap (2000) or less than zero
	function noteCountTest($countId){
		var maxNoteCount = 2000;
		var defaultCount = 24;
		var noteVal = $countId.val();	

		if(noteVal < 0 || noteVal > maxNoteCount){
			$countId.val(defaultCount);
		}
	}
	
	//NOTE: THIS FUNCTION ALSO EXISTS IN durationInput.js, BUT FOR SOME REASON THE FUNCTION IS NOT GLOBAL.
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
    
});

function pitchInput(numberOfVoice) {
    for (var voiceCount = 1; voiceCount <= numberOfVoice; voiceCount++) {
        var $voice = "\
		<div id='pitchPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
				<label for='inputSet'>Input Set:</label>\
					<select id='input_set"+ voiceCount + "' name='inputSet' >\
					<option>Sine</option>\
					<option>Fibonacci</option>\
					<option>Integers</option>\
					<option>Pascal</option>\
					<option>Phi</option>\
					<option>Pi</option>\
					<option>Powers</option>\
					<option>E Constant</option>\
					<option>Custom</option>\
                    <option>DNA</option>\
				</select>\
				<img id='pitchInfo"+ voiceCount + "'> \
				<label>Note Count:</label>\
				<input type='text' id='note_count"+ voiceCount + "'></input><br>\
                <label id='dna' style='display:none'>Sequence</label>\
                <textarea id='sequence' style='display:none'"+ voiceCount + "'></textarea><br>\
				<label>Input:</label><br>\
				<textarea readonly id='areaPitch"+ voiceCount + "'></textarea><br>\
			</fieldset>\
		</div>\
		";
        $(".pitch_input").append($voice);
    }
}




	
	
	


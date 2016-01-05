
function updateDurationMapTooltip($parent){	
	var voiceNum = getVoiceNumber($parent);
	var $textArea =  $("#dAreaMap"+voiceNum);
	var targetArea = $("#dMapArea"+voiceNum);

	targetArea.popover("hide");
	targetArea.attr("data-content","<textarea readonly>"+$textArea.val()+"</textarea>");	
}


function updateDurationMappingData($durrationInputParentId,voiceNumber){
	var $parentId =  $(".duration_mapping").closest('div[id]');
	
	var $range = $parentId.find('[id^=dRange]');
	var $to = $parentId.find('[id^=dTo]');

	dWriteRangeOut($range.val(),$to.val(),voiceNumber);
	call_dur_Mapping($durrationInputParentId,voiceNumber);
	call_pitch_Mapping($durrationInputParentId,voiceNumber);
}


$(document).ready(function(){

	$('.duration_mapping').on('change', '[id^=dCompressType],[id^=dRange],[id^=dTo]', function() {	
		var $parentId =  $(this).closest('div[id]');
		testRangeValues($parentId);
		printLocalMap($parentId);
		tooltip($parentId);
	});

	$('.duration_mapping').on('click', '[id^=dModify]', function() {
		var $parentId =  $(this).closest('div[id]');
		replaceDurationValue($parentId);
	});

    // this is ran when the duration mapping is changed from division to log and mod.
	function printLocalMap($parentId){
	    var voiceArray = GetVoiceArray();
	    var currVoiceNum = getVoiceNumber($parentId);
	  
		var $compressChoice = $parentId.find("option:selected");
		var $range = $parentId.find('[id^=dRange]');
		var $to = $parentId.find('[id^=dTo]');
		var $currArea = $parentId.find('[id^=dMapArea]');
		var normalizeChoice = normalizeFactory.createNormalizer($compressChoice.text());//factory
		musicNormalize.setAlgorithm(normalizeChoice);
	
		voiceArray[currVoiceNum - 1].durationMappingArray = musicNormalize.normalize(voiceArray[currVoiceNum - 1].originalDurationArray, $range.val(), $to.val());
       
		mapWriteOutput($currArea.attr("id"), voiceArray[currVoiceNum - 1].durationMappingArray);
		SetVoiceArray(voiceArray);
	}

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=durMapInfo]');
		var $input = $parentId.find('[id^=dCompressType]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}

	function testRangeValues($parentId){
		var $range = $parentId.find('[id^=dRange]');
		var $to = $parentId.find('[id^=dTo]');

			
		if((isNaN(parseInt($range.val())) || isNaN(parseInt($range.val()))) || 
		(($range.val() < 0) || ($to.val() < $range.val()) || ($to.val() > 9))){
			$range.val(0);
			$to.val(6);
		}
	}

});

function durationMapping(numberOfVoice) {
    for (var voiceCount = 1; voiceCount <= numberOfVoice; voiceCount++) {
        var $voice = "\
		<div id='dMappingPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
				<label>Mapping using:</label>\
				<select id='dCompressType"+ voiceCount + "'>\
					<option>Division</option>\
					<option>Logarithmic</option>\
					<option>Modulo</option>\
				</select>\
				<img id='durMapInfo"+ voiceCount + "'> \
				<br /><label>Range:</label><input type='number' id='dRange"+ voiceCount + "' name='Range'>\
				<label>to:</label><input type='number' id='dTo"+ voiceCount + "' name='to'>\
				<img  id='dRangeImg"+ voiceCount + "'>\
				<br /><label>Output:</label>\
				<textarea readonly id='dMapArea"+ voiceCount + "'></textarea>\
				<fieldset>\
					<legend>Modifications</legend>\
					<label>Replace all:</label><input type='text' id='dModiAll"+ voiceCount + "' >\
					<label>with:</label><input type='text' id='dModiWith"+ voiceCount + "'>\
					<br /><button type='button' id='dModify"+ voiceCount + "' value='Modify'>Modify Output</button>\
				</fieldset>\
			</fieldset>\
		</div>\
		";
        $(".duration_mapping").append($voice);
    }
}


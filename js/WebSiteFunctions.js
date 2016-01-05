// JavaScript source code
////////////////////////////////////////////////inputs
//start global ************************************************************************************************

var voices;

function SetVoiceArray(aList)// this is so data can be passed around
{
    voices = aList;
}

function GetVoiceArray() 
{
    return voices;
}

function ClearOriginalDurationArray(voiceList)
{
    voiceList.originalDurationArray = new Array();
}

function ClearOriginalPitchArray(voiceList)
{
    voiceList.originalPitchArray = new Array();
}

function defaultData(voiceArray) {
    defaultPitch_Input(voiceArray);
    defaultDuration_Input(voiceArray);
}

function defaultPitch_Input(voiceArray) {
    $('[id^=pitchPanel]').each(function (i) {//default load  for Pitch_Input and Pitch_Mapping
        i++;
        var $voiceNum = $(this);
        var grandParent = $voiceNum.closest('div[class]').attr("class").split(" ")[0];

        var $nCount = $voiceNum.find('[id^=note_count]');
        var $area = $voiceNum.find('[id^=areaPitch]');
        //pitch_input
        call_pitch("Sine", 24, $area.attr('id'),voiceArray[i-1]);// this is where the data gets loaded.
        SetVoiceArray(voiceArray);
        // the voice array was added.
        PrintNoteCount($nCount.attr('id'), voiceArray[i-1].originalPitchArray.length);
        //pitch_mapping
        writeRangeOut(1, 88, i);
        call_pitch_Mapping($voiceNum, i);
    });
}

/*
    This prints the note count in the Pitch Input Panel.
*/
function PrintNoteCount($textArea, data) { // text area is passed in as text. should be the text area itself
    $("#" + $textArea).val(data);
}

function defaultDuration_Input(voiceArray) {
    $('[id^=dPitchPanel]').each(function (i) {//default load for Duration_Input and Duration_Mapping
        i++;
        var $voiceNum = $(this);
        //var grandParent = $voiceNum.closest('div[class]').attr("class").split(" ")[0];;

        var $idName = $voiceNum.attr("id");
        var $area = $voiceNum.find('[id^=dAreaMap]');

        //duration_input
        call_duration("Quarter Notes", 24, $area.attr('id'),voiceArray[i-1]);//not reflecting duration input 

        //duration_mapping
        dWriteRangeOut(0, 6, i);
        call_dur_Mapping($voiceNum, i);
    });
}

function call_duration(userChoice, noteCount, areaN, currentVoiceObject)
{
    /*var selectedAlgorithm = algorithmFactory.createSequence(userChoice);//get from user
    musicAlgorithms.setAlgorithm(selectedAlgorithm);
    //var currData = musicAlgorithms.getValues(noteCount); // this is where we can store the data.
    currentVoiceObject.originalDurationArray = musicAlgorithms.getValues(noteCount);
   */
    if (userChoice != "Custom") {
        var selectedAlgorithm = algorithmFactory.createSequence(userChoice);//get from user
        musicAlgorithms.setAlgorithm(selectedAlgorithm);
        //var currData = musicAlgorithms.getValues(noteCount); // this is where we can store the data.
        currentVoiceObject.originalDurationArray = musicAlgorithms.getValues(noteCount);
        mapWriteOutput(areaN, currentVoiceObject.originalDurationArray);
    }
    else if(userChoice == "Custom")
    {
        var TextData = document.getElementById(areaN).value;
        ParseCustomDurationData(TextData, currentVoiceObject);
    }
}

function call_pitch(userChoice, noteCount, areaN, currentVoiceObject) {// areaN = text area to write to, section?
    // currentVoice was added.
    var selectedAlgorithm = algorithmFactory.createSequence(userChoice);//get from user
    musicAlgorithms.setAlgorithm(selectedAlgorithm);
    currentVoiceObject.originalPitchArray = musicAlgorithms.getValues(noteCount);
    // okay this is working, but you need to increase the count
    
    if (userChoice != "Custom") {
        // on custom, this is called after the initial change. I need to parse the text and add it to the array.
        mapWriteOutput(areaN, currentVoiceObject.originalPitchArray); // this prints to the text box.
    }
    else if(userChoice == "Custom")
    {
        var TextData = document.getElementById(areaN).value;
        ParseCustomPitchData(TextData, currentVoiceObject);
    }
}

function ParseCustomDurationData(text, voicelist)
{
    voicelist.originalDurationArray = text.split(",");
}

function ParseCustomPitchData(text, voicelist)
{
    voicelist.originalPitchArray = text.split(",");
}

function writeNoteCount(count, areaN) {// what is this for? Not necessary
    $(".pitch_input #" + areaN).val(count);
}

function mapWriteOutput($textArea, data) { // text area is passed in as text. should be the text area itself
    $("#" + $textArea).val(data);
}

function getNoteCount(textArea) {
    var voiceNum = getVoiceNumber(textArea);
    return $('#note_count' + voiceNum).val();;
}

//This grabs values out of the text box, strips negatives and and spaces, and splits by the comma delimiter.
function getTextAreaData(textArea) {

    var value = textArea.val(); //value is a String
    if (value.length > 0) {
        value = value.replace(/,,/g, '');
        value = value.split(",").map(Number); //value is now an array
        var newData = new Array();

        for (var i = 0; i < value.length; i++) {
            if (!isNaN(value[i]))
                newData.push(value[i]);
        }

        return newData;
    }
    else {
        value = [];
        return value;
    }
}

function getDataArray(textArea) {
    var $noteCount = $("#note_count" + getVoiceNumber(textArea));

    var value = textArea.val();
    value = value.replace(/,,/g, '');
    value = value.split(",").map(Number);

    return value.slice(0, $noteCount.val());
}

function validatePanel(textArea, voiceNum) {
    validateTextArea(textArea);
    validateNoteCount(textArea, voiceNum);
}

//This function checks the values in the text area
function validateTextArea(textArea) {
    var data = getTextAreaData(textArea);
    var newData = new Array();
    var isValid = true; //Not sure if this value actually does anything --Evan
    for (var i = 0; i < data.length; i++) {
        if (isNaN(data[i])) {
            isValid = false;
        }
        else {
            newData.push(data[i]);
        }
    }
    printArray(textArea, newData);
}

function validateNoteCount(textArea, voiceNum) { 	//check the text area against the note count box
    var data = getTextAreaData(textArea); 			//Grabs stuff from text box
    var $inputBox = $("#note_count" + voiceNum); 		//Grabs stuff from the note count

    if ($inputBox.val() != data.length) 				//If the note count does not match the length of data from the text box...
    {
        var pitchInputCount = getTextAreaData($('#areaPitch' + voiceNum)).length; //the true length of the text area(the number of notes)
        var durationInputCount = getTextAreaData($('#dAreaMap' + voiceNum)).length;

        //Make sure note count doesn't exceed cap
        if (pitchInputCount > 2000) {
            pitchInputCount = 2000;
        }
        if (durationInputCount > 2000) {
            durationInputCount = 2000;
        }
        var pitchSelection = $('#input_set' + voiceNum + '').find('option:selected').text(); //[CHANGED]
        var durationSelection = $('#dInput_set' + voiceNum).find('option:selected').text();

        if (pitchSelection == "Custom" && durationSelection == "Custom") {
            if (pitchInputCount < durationInputCount)
                $inputBox.val(pitchInputCount);
            else
                $inputBox.val(durationInputCount);
        }
        else if (pitchSelection == "Custom" && durationSelection != "Custom") {
            $inputBox.val(pitchInputCount);
        }
        else if (pitchSelection != "Custom" && durationSelection == "Custom") {
            $inputBox.val(durationInputCount);
        }

    }
}

function printArray(textArea, data) {
    var csv = "";
    for (var i = 0; i < data.length - 1; i++) {
        csv += data[i] + ",";
    }
    if (data.length > 0) {
        csv += data[data.length - 1];
        textArea.val(csv);
    }
    else {
        textArea.text();
    }
}

function getVoiceNumber($parentId) {
    var $idName = $parentId.attr("id");
    return $idName.substring($idName.length - 1, $idName.length); //returns voice number
}
//pitch input

////////////////////////////////////////////////////////////////////end inputs/////////////////////////
//start mapping area
// this is done when the website is initiated.
function call_pitch_Mapping($parentId, voiceNum) { //$voiceNum makes no sense. currVoice should be voiceNum
    var voiceArray = GetVoiceArray();
    //var $noteCount = $parentId.find('[id^=note_count]');
    //	validatePanel($("#areaPitch"+voiceNum), voiceNum);
    var $algorithmChosen = $parentId.find('[id^=input_set]');
    var $selectedUserChoice = $("#input_set").find("option:selected");;//$algorithmChosen.find("option:selected");
    //current voice for mapping
    var $currMapPanel = $("#mappingPanel" + voiceNum);
    var $selectedMapPanel = $currMapPanel.find('[id^=compressType]');
    var $compressChoice = $selectedMapPanel.find("option:selected");
    var $range = $currMapPanel.find('[id^=range]');
    var $to = $currMapPanel.find('[id^=to]');
    var $currArea = $currMapPanel.find("#mapArea" + voiceNum);
    var selectedAlgorithm = algorithmFactory.createSequence($selectedUserChoice.text());
    musicAlgorithms.setAlgorithm(selectedAlgorithm);
    var normalizeChoice = normalizeFactory.createNormalizer($compressChoice.text());//factory
    musicNormalize.setAlgorithm(normalizeChoice);
    
    voiceArray[voiceNum - 1].pitchMappingArray = musicNormalize.normalize(voiceArray[voiceNum - 1].originalPitchArray, $range.val(), $to.val());
    SetVoiceArray(voiceArray);

    mapWriteOutput($currArea.attr("id"), voiceArray[voiceNum - 1].pitchMappingArray);// need changed
    doScaleOptions(voiceNum);
}
//2,7,1,8,2,8,1,8,2,8,4,5,9,0,4,5,2,3,5,3,6,0,2,8
function call_dur_Mapping($parentId, currVoice) {
    //	validatePanel($("#dAreaMap"+currVoice), currVoice);
    var voiceArray = GetVoiceArray();
    var $noteCount = $("#note_count" + currVoice);
    var $algorithmChosen = $parentId.find('[id^=dInput_set]');
    var $selectedUserChoice = $algorithmChosen.find("option:selected");
    //current voice for mapping
    var $currMapPanel = $("#dMappingPanel" + currVoice);
    var $selectedMapPanel = $currMapPanel.find('[id^=dCompressType]');
    var $compressChoice = $selectedMapPanel.find("option:selected");
    var $range = $currMapPanel.find('[id^=dRange]');
    var $to = $currMapPanel.find('[id^=dTo]');
    var $currArea = $currMapPanel.find("#dMapArea" + currVoice);
    var selectedAlgorithm = algorithmFactory.createSequence($selectedUserChoice.text());
    musicAlgorithms.setAlgorithm(selectedAlgorithm);
    var normalizeChoice = normalizeFactory.createNormalizer($compressChoice.text());//factory
    musicNormalize.setAlgorithm(normalizeChoice);
    //var currData = getDataArray($("#dAreaMap" + currVoice));//musicAlgorithms.getValues($noteCount.val());//get value from Input
    //var transformedData = musicNormalize.normalize(currData, $range.val(), $to.val());
    voiceArray[currVoice - 1].durationMappingArray = musicNormalize.normalize(voiceArray[currVoice - 1].originalDurationArray, $range.val(), $to.val());
    SetVoiceArray(voiceArray);
   
    mapWriteOutput($currArea.attr("id"), voiceArray[currVoice - 1].durationMappingArray);
}

/*
This function prints the range in PitchMapping panel
*/
function writeRangeOut(range, to, i) {
    var $currMapPanel = $('#mappingPanel' + i);
    var $range = $currMapPanel.find('[id^=range]');
    var $to = $currMapPanel.find('[id^=to]');
    $range.val(range);
    $to.val(to);
}

function dWriteRangeOut(range, to, i) {
    var $currMapPanel = $('#dMappingPanel' + i);
    var $range = $currMapPanel.find('[id^=dRange]');
    var $to = $currMapPanel.find('[id^=dTo]');
    $range.val(range);
    $to.val(to);
}



//end mapping area

//Used in Pitch_mapping and Duration_mapping
function replacePitchValue($parentId) {
    var $textArea = $parentId.find("textarea");
    var currentData = $textArea.val().split(",");

    var $inputList = $parentId.find("input");
    var $range = $inputList.filter(function () {
        return this.id.match(/[Rr]ange\d+$/);
    });
    var $to = $inputList.filter(function () {
        return this.id.match(/[Tt]o\d+$/);
    });


    var $modiAll = $inputList.filter(function () {
        return this.id.match(/[Mm]odiAll\d+$/);
    });
    var $modiWith = $inputList.filter(function () {
        return this.id.match(/[Mm]odiWith\d+$/);
    });



    var fieldCheck = !isNaN(parseInt($modiAll.val())) && !isNaN(parseInt($modiWith.val()));
    var replaceValInlist = -1 < currentData.indexOf($modiAll.val());


    var withinRange = (parseInt($range.val()) - 1 <= parseInt($modiAll.val()) && parseInt($modiAll.val()) <= parseInt($to.val())) && (((parseInt($range.val())) <= parseInt($modiWith.val()) || parseInt($modiWith.val()) === 0) && parseInt($modiWith.val()) <= parseInt($to.val()))
    
    var voiceArray = GetVoiceArray();
    var voiceNumber = getVoiceNumber($parentId);

    if (fieldCheck && replaceValInlist && withinRange) {

        for (var i = 0; i < voiceArray[voiceNumber - 1].pitchMappingArray.length; i++) {
            if (voiceArray[voiceNumber - 1].pitchMappingArray[i] == parseInt($modiAll.val())) {
                voiceArray[voiceNumber - 1].pitchMappingArray[i] = parseInt($modiWith.val())
            }
        }

        SetVoiceArray(voiceArray);
        mapWriteOutput($textArea.attr("id"), voiceArray[voiceNumber - 1].pitchMappingArray);
      
        doScaleOptions(voiceNumber);/* This takes the mapArea id,
            which has a number at the end of the textArea.attr('id') that is associated
            with the voice that is being modified. This gets split into a char array and 
            since the voice number is at the end of the array, we can send the voice id to 
            do scales options method which allows the pitch mapping to be updated in the
            scale options tab.*/

    }
    else {
        showWarning($parentId, fieldCheck, replaceValInlist, withinRange);
    }

}

function replaceDurationValue($parentId) {
    var $textArea = $parentId.find("textarea");
    var currentData = $textArea.val().split(",");

    var $inputList = $parentId.find("input");
    var $range = $inputList.filter(function () {
        return this.id.match(/[Rr]ange\d+$/);
    });
    var $to = $inputList.filter(function () {
        return this.id.match(/[Tt]o\d+$/);
    });


    var $modiAll = $inputList.filter(function () {
        return this.id.match(/[Mm]odiAll\d+$/);
    });
    var $modiWith = $inputList.filter(function () {
        return this.id.match(/[Mm]odiWith\d+$/);
    });



    var fieldCheck = !isNaN(parseInt($modiAll.val())) && !isNaN(parseInt($modiWith.val()));
    var replaceValInlist = -1 < currentData.indexOf($modiAll.val());


    var withinRange = (parseInt($range.val()) - 1 <= parseInt($modiAll.val()) && parseInt($modiAll.val()) <= parseInt($to.val())) && (((parseInt($range.val())) <= parseInt($modiWith.val()) || parseInt($modiWith.val()) === 0) && parseInt($modiWith.val()) <= parseInt($to.val()))

    var voiceArray = GetVoiceArray();
    var voiceNumber = getVoiceNumber($parentId);

    if (fieldCheck && replaceValInlist && withinRange) {

        for (var i = 0; i < voiceArray[voiceNumber - 1].durationMappingArray.length; i++) {
            if (voiceArray[voiceNumber - 1].durationMappingArray[i] == parseInt($modiAll.val())) {
                voiceArray[voiceNumber - 1].durationMappingArray[i] = parseInt($modiWith.val())
            }
        }

        SetVoiceArray(voiceArray);
        mapWriteOutput($textArea.attr("id"), voiceArray[voiceNumber - 1].durationMappingArray);
    }
    else {
        showWarning($parentId, fieldCheck, replaceValInlist, withinRange);
    }

}

function showWarning($parentId, fieldCheck, replaceValInlist, withinRange) {
    //	alert(fieldCheck+","+replaceValInlist+","+withinRange);
    var $button = $parentId.find("button");

    if (!fieldCheck) {
        $button.attr("data-content", "Please fill \"Modifications\" section with a value to modify output values.");

    }
    else {
        if (!replaceValInlist) {
            $button.attr("data-content", "The value you are replacing is not found in the output value list.");
        }


        if (!withinRange) {
            $button.attr("data-content", "Please make sure your values are within range.");
        }

    }

    $button.popover("show");
    setTimeout(function () { $button.popover("hide") }, 3500);
}


function updateTooltipVals($parent) {
    var targetArea;
    var $textArea = $parent.find("textarea");
    var $textAreaId = $textArea.attr("id");
    var voiceCount = getVoiceNumber($parent);

    if ("areaPitch" === $textAreaId.substring(0, $textAreaId.length - 1)) {
        targetArea = "mapArea" + voiceCount;
    }
    else {
        targetArea = "dMapArea" + voiceCount;
    }

    //	alert($textAreaId+","+targetArea+":"+$textArea.val());

    $("#" + targetArea).popover("hide");
    $("#" + targetArea).attr("data-content", "<textarea readonly>" + $textArea.val() + "</textarea>");
}


function disableAllVoices(boolean) {
    var voicePanels = $('textarea,select,[id^=modify],[id^=dModify],[id^=note_count],[id^=range],[id^=to],[id^=dRange],[id^=dTo],[id^=modiAll],[id^=modiWith],[id^=dModiAll],[id^=dModiWith],.player-play');

    if (boolean) {
        voicePanels.prop('disabled', true);
    }
    else {
        voicePanels.prop('disabled', false);
    }
}
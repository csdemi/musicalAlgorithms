var $MacroPanel;
function biologyLoader($panel)
{
    $MacroPanel = $panel;
    var $TextBox = $panel.find('[id^=areaPitch]');// This gets the Text Box
    var $Algorithm = $panel.find('[id^=input_set]');// This locates the algorithm drop down menu.
    var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
    var $NoteCount = $panel.find('[id^=note_count]');
    var voiceNumber = getVoiceNumber($panel);// This identifies the specific panel that is to be effected.
    var $accordion = $panel.find('[id=accordion]');

    voiceArray[voiceNumber - 1].originalPitchArrayAlgorithm = $SelectedAlgorithm.text();// may not be needed.

    var $dnaLabel = $panel.find('[id^=dna]');//Finds the DNA label so we can display the Sequence label
    var $sequenceInput = $panel.find('[id^=sequence]');//Finds the type of sequence that is going on
    var $textAreaInput = $panel.find('[id^=areaPitch]');//Finds the ID for the AreaText to clear it when DNA/RNA/Proteins ect are choosen

    var $letterA = $panel.find('[id^=A]');//Label for the letter A so we can show and hide it as needed
    var $letterT = $panel.find('[id^=T]');
    var $letterU = $panel.find('[id^=U]');
    var $letterG = $panel.find('[id^=G]');
    var $letterC = $panel.find('[id^=C]');

    var $letterAText = $panel.find('[id^=letterAText]');//The text area for the letter A so we can change values if the user wants to.
    var $letterTText = $panel.find('[id^=letterTText]');
    var $letterUText = $panel.find('[id^=letterUText]');
    var $letterCText = $panel.find('[id^=letterCText]');
    var $letterGText = $panel.find('[id^=letterGText]');

    var $extra = $panel.find('[name^=extra]');

    var $buttonConvert = $panel.find('[id^=convert]');
    var $radioButtonDuplicate = $panel.find('[id^=duplicates]');
    var $duplicateLabel = $panel.find('[id^=countDuplicateRadio]');
    var $radioButtonCodons = $panel.find('[id^=codons]');
    var $codonLabel = $panel.find('[id^=codonsRadio]');

    var $defaultRadio = $panel.find('[id^=default]');
    var $defaultRadioLabel = $panel.find('[id^=defaultRadio]');
    var $displayPanels = $panel.find('[id^=panels]');
  
    $NoteCount.prop('readonly', true);

    $dnaLabel.show();
    $sequenceInput.show();

    $displayPanels.show();
    $defaultRadio.show();
    $defaultRadioLabel.show();

    $textAreaInput.val("");
    $NoteCount.val("");

    $accordion.show();

    $letterA.show();
    $letterC.show();
    $letterG.show();

    $letterAText.show();
    $letterCText.show();
    $letterGText.show();

    $buttonConvert.show();
    $radioButtonDuplicate.show();
    $duplicateLabel.show();
    $radioButtonCodons.show();
    $codonLabel.show();

    if ($SelectedAlgorithm.text() == "DNA")
    {
        $letterT.show();
        $letterU.hide();

        $letterTText.show();
        $letterUText.hide();

        $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalDNASequence);

        voiceArray[voiceNumber - 1].biology.GenericDataArray = $sequenceInput.val().split(",");

        $NoteCount.val(voiceArray[voiceNumber - 1].biology.GenericDataArray.length);

        $letterAText.val(voiceArray[voiceNumber - 1].biology.dnaValues[0]);
        $letterTText.val(voiceArray[voiceNumber - 1].biology.dnaValues[1]);
        $letterCText.val(voiceArray[voiceNumber - 1].biology.dnaValues[2]);
        $letterGText.val(voiceArray[voiceNumber - 1].biology.dnaValues[3]);

        dnaSequenceConversion(voiceNumber);
        update(voiceNumber);

        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
    }

    else if ($SelectedAlgorithm.text() == "RNA")
    {
        $letterT.hide();
        $letterU.show();

        $letterTText.hide();
        $letterUText.show();

        $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalRNASequence);

        voiceArray[voiceNumber - 1].biology.GenericDataArray = $sequenceInput.val().split(",");

        $NoteCount.val(voiceArray[voiceNumber - 1].biology.GenericDataArray.length);

        $letterAText.val(voiceArray[voiceNumber - 1].biology.rnaValues[0]);
        $letterUText.val(voiceArray[voiceNumber - 1].biology.rnaValues[1]);
        $letterCText.val(voiceArray[voiceNumber - 1].biology.rnaValues[2]);
        $letterGText.val(voiceArray[voiceNumber - 1].biology.rnaValues[3]);

        rnaSequenceConversion(voiceNumber);
        update(voiceNumber);

        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
    }

    else if ($SelectedAlgorithm.text() == "Protein")
    {
        $accordion.hide();

        $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalProteinSequence);

        voiceArray[voiceNumber - 1].biology.GenericDataArray = $sequenceInput.val().split(",");

        $NoteCount.val(voiceArray[voiceNumber - 1].biology.GenericDataArray.length);

        proteinSequenceConversion(voiceNumber);
        update(voiceNumber);

        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
    }
}

/*
    This deals with editing the text field
*/
$('.pitch_input').on('change', '[id^=sequence]', function ()
{
    var $panel = $(this).closest('div[id]');
    var $NoteCount = $MacroPanel.find('[id^=note_count]');
    var $TextBox = $MacroPanel.find('[id^=areaPitch]');
    var $sequenceInput = $panel.find('[id^=sequence]');
    var $Algorithm = $MacroPanel.find('[id^=input_set]');
    var $SelectedAlgorithm = $Algorithm.find("option:selected");

    var voiceNumber = getVoiceNumber($panel);

    var $letterAText = $panel.find('[id^=letterAText]');//The text area for the letter A so we can change values if the user wants to.
    var $letterTText = $panel.find('[id^=letterTText]');
    var $letterUText = $panel.find('[id^=letterUText]');
    var $letterCText = $panel.find('[id^=letterCText]');
    var $letterGText = $panel.find('[id^=letterGText]');

    if ($SelectedAlgorithm.text() == "DNA")
    {
        CanidateArray = $sequenceInput.val().split(",");
    
        voiceArray[voiceNumber - 1].biology.GenericDataArray = CanidateArray;

        $NoteCount.val(voiceArray[voiceNumber - 1].biology.GenericDataArray.length);

        $TextBox.val("");

        voiceArray[voiceNumber - 1].biology.userSequenceArray = new Array();

        $letterAText.val(voiceArray[voiceNumber - 1].biology.dnaValues[0] = $letterAText.val());
        $letterTText.val(voiceArray[voiceNumber - 1].biology.dnaValues[1] = $letterTText.val());
        $letterCText.val(voiceArray[voiceNumber - 1].biology.dnaValues[2] = $letterCText.val());
        $letterGText.val(voiceArray[voiceNumber - 1].biology.dnaValues[3] = $letterGText.val());

        dnaSequenceConversion(voiceNumber);
   
        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
      
        update(voiceNumber);
    }

    else if($SelectedAlgorithm.text() == "RNA")
    {
        CanidateArray = $sequenceInput.val().split(",");
        voiceArray[voiceNumber - 1].biology.GenericDataArray = CanidateArray;

        $NoteCount.val(voiceArray[voiceNumber - 1].biology.GenericDataArray.length);
        $TextBox.val("");

        voiceArray[voiceNumber - 1].biology.userSequenceArray = new Array();

        $letterAText.val(voiceArray[voiceNumber - 1].biology.rnaValues[0] = $letterAText.val());
        $letterUText.val(voiceArray[voiceNumber - 1].biology.rnaValues[1] = $letterUText.val());
        $letterCText.val(voiceArray[voiceNumber - 1].biology.rnaValues[2] = $letterCText.val());
        $letterGText.val(voiceArray[voiceNumber - 1].biology.rnaValues[3] = $letterGText.val());
        
        rnaSequenceConversion(voiceNumber);
        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
        update(voiceNumber);
    }

    else if ($SelectedAlgorithm.text() == "Protein")
    {
        CanidateArray = $sequenceInput.val().split(",");
        voiceArray[voiceNumber - 1].biology.GenericDataArray = CanidateArray;

        $NoteCount.val(voiceArray[voiceNumber - 1].biology.GenericDataArray.length);
        $TextBox.val("");
        
        voiceArray[voiceNumber - 1].biology.userSequenceArray = new Array();
      
        proteinSequenceConversion(voiceNumber);
        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);

        update(voiceNumber);
    }
});

$('.pitch_input').on('click', '[id^=convert]', function ()
{
    var $panel = $(this).closest('div[id]');
    var $extra = $panel.find('[name^=extra]');
    var $TextBox = $MacroPanel.find('[id^=areaPitch]');

    var $Algorithm = $MacroPanel.find('[id^=input_set]');
    var $SelectedAlgorithm = $Algorithm.find("option:selected");

    var voiceNumber = getVoiceNumber($panel);
   
    var $letterAText = $panel.find('[id^=letterAText]');//The text area for the letter A so we can change values if the user wants to.
    var $letterTText = $panel.find('[id^=letterTText]');
    var $letterUText = $panel.find('[id^=letterUText]');
    var $letterCText = $panel.find('[id^=letterCText]');
    var $letterGText = $panel.find('[id^=letterGText]');

    var $radioButtonDuplicate = $panel.find('[id^=duplicates]');
    var $duplicateLabel = $panel.find('[id^=countDuplicateRadio]');
    var $radioButtonCodons = $panel.find('[id^=codons]');
    var $codonLabel = $panel.find('[id^=codonsRadio]');

    var $defaultRadio = $panel.find('[id^=default]');
    var $defaultRadioLabel = $panel.find('[id^=defaultRadio]');

    if ($SelectedAlgorithm.text() == "DNA")
    {
        voiceArray[voiceNumber - 1].biology.dnaValues[0] = $letterAText.val();
        voiceArray[voiceNumber - 1].biology.dnaValues[1] = $letterTText.val();
        voiceArray[voiceNumber - 1].biology.dnaValues[2] = $letterCText.val();
        voiceArray[voiceNumber - 1].biology.dnaValues[3] = $letterGText.val();
    }
    else if ($SelectedAlgorithm.text() == "RNA")
    {
        voiceArray[voiceNumber - 1].biology.rnaValues[0] = $letterAText.val();
        voiceArray[voiceNumber - 1].biology.rnaValues[1] = $letterUText.val();
        voiceArray[voiceNumber - 1].biology.rnaValues[2] = $letterCText.val();
        voiceArray[voiceNumber - 1].biology.rnaValues[3] = $letterGText.val();
    }

    if ($extra[1].checked == true)
    {
        var value = [];

        if (voiceArray[voiceNumber - 1].biology.GenericDataArray.length % 3 == 0)
        {
            var counter = 3;
            var sequence = "";

            for (var i = 0; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length + 1; i++)
            {
                if (counter === 0)
                {
                    counter = 3;
                    value.push(ValueConversion(sequence,voiceNumber));
                    sequence = "";
                }

                sequence += voiceArray[voiceNumber - 1].biology.GenericDataArray[i];
                counter--;
            }

            voiceArray[voiceNumber - 1].biology.userSequenceArray = value;
            $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
           
        }
        else
        {
            alert("Please add more letters to the sequence.");
        }
    }
        //THIS IS COUNTING DUPLICATES
    else if ($extra[2].checked == true)
    {
        voiceArray[voiceNumber - 1].biology.userSequenceArray = [];

        for (var i = 0, j = 1; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++, j++)
        {
            var counter = 1;
            while (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == voiceArray[voiceNumber - 1].biology.GenericDataArray[j])
            {
                counter++;
                i++;
                j++;
            }

            voiceArray[voiceNumber - 1].biology.userSequenceArray.push(counter);
        }
   
        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
    }
        //THIS IS SINGLE BASE CONVERSIONS
    else
    {
        if (voiceArray[voiceNumber - 1].originalPitchArrayAlgorithm == "DNA")
        {
            dnaSequenceConversion(voiceNumber);
        }

        else if (voiceArray[voiceNumber - 1].originalPitchArrayAlgorithm == "RNA")
        {
            rnaSequenceConversion(voiceNumber);
        }

        $TextBox.val(voiceArray[voiceNumber - 1].biology.userSequenceArray);
    }
  
    update(voiceNumber);
});

function biologyDestructor($panel)
{
    var $TextBox = $panel.find('[id^=areaPitch]');// This gets the Text Box
    var $Algorithm = $panel.find('[id^=input_set]');// This locates the algorithm drop down menu.
    var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
    var $NoteCount = $panel.find('[id^=note_count]');
    var voiceNumber = getVoiceNumber($panel);// This identifies the specific panel that is to be effected.
    var $accordion = $panel.find('[id=accordion]');

    var $dnaLabel = $panel.find('[id^=dna]');//Finds the DNA label so we can display the Sequence label
    var $sequenceInput = $panel.find('[id^=sequence]');//Finds the type of sequence that is going on
    var $textAreaInput = $panel.find('[id^=areaPitch]');//Finds the ID for the AreaText to clear it when DNA/RNA/Proteins ect are choosen

    var $letterA = $panel.find('[id^=A]');//Label for the letter A so we can show and hide it as needed
    var $letterT = $panel.find('[id^=T]');
    var $letterU = $panel.find('[id^=U]');
    var $letterG = $panel.find('[id^=G]');
    var $letterC = $panel.find('[id^=C]');

    var $letterAText = $panel.find('[id^=letterAText]');//The text area for the letter A so we can change values if the user wants to.
    var $letterTText = $panel.find('[id^=letterTText]');
    var $letterUText = $panel.find('[id^=letterUText]');
    var $letterCText = $panel.find('[id^=letterCText]');
    var $letterGText = $panel.find('[id^=letterGText]');

    var $extra = $panel.find('[name^=extra]');

    var $buttonConvert = $panel.find('[id^=convert]');
    var $radioButtonDuplicate = $panel.find('[id^=duplicates]');
    var $duplicateLabel = $panel.find('[id^=countDuplicateRadio]');
    var $radioButtonCodons = $panel.find('[id^=codons]');
    var $codonLabel = $panel.find('[id^=codonsRadio]');

    var $defaultRadio = $panel.find('[id^=default]');
    var $defaultRadioLabel = $panel.find('[id^=defaultRadio]');
    var $displayPanels = $panel.find('[id^=panels]');

    $dnaLabel.hide();

    $sequenceInput.hide();
    $displayPanels.hide();

    $letterA.hide();
    $letterT.hide();
    $letterU.hide();
    $letterC.hide();
    $letterG.hide();

    $letterAText.hide();
    $letterUText.hide();
    $letterTText.hide();
    $letterCText.hide();
    $letterGText.hide();

    $defaultRadio.hide();
    $defaultRadioLabel.hide();

    $accordion.hide();

    $buttonConvert.hide();

    $radioButtonCodons.hide();
    $radioButtonDuplicate.hide();

    $codonLabel.hide();

    $duplicateLabel.hide();
}

function ValueConversion(codone,voiceNumber)
{
    var i = 0;
    var tempValue = "";
    
    var $Algorithm = $MacroPanel.find('[id^=input_set]');// This locates the algorithm drop down menu.
    var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
    if($SelectedAlgorithm.text()=="DNA")
    {
        for (i; i < codone.length; i++)
        {
            if (codone[i] == "A")
            {
                tempValue += ""+voiceArray[voiceNumber-1].biology.dnaValues[0];
            }

            else if (codone[i] == "T")
            {
                tempValue +=""+ voiceArray[voiceNumber-1].biology.dnaValues[1];
            }

            else if (codone[i] == "C")
            {
                tempValue +=""+ voiceArray[voiceNumber-1].biology.dnaValues[2];
            }

            else if (codone[i] == "G")
            {
                tempValue += ""+voiceArray[voiceNumber-1].biology.dnaValues[3];
            }
        }
    }
    else if($SelectedAlgorithm.text()=="RNA"){
        for (i; i < codone.length; i++)
        {
            if (codone[i] == "A")
            {
                tempValue += ""+voiceArray[voiceNumber-1].biology.rnaValues[0];
            }

            else if (codone[i] == "C")
            {
                tempValue +=""+ voiceArray[voiceNumber-1].biology.dnaValues[2];
            }

            else if (codone[i] == "G")
            {
                tempValue += ""+voiceArray[voiceNumber-1].biology.dnaValues[3];
            }

            else if (codone[i] == "U")
            {
                tempValue +=""+ voiceArray[voiceNumber-1].biology.rnaValues[1];
            }
        }
    }

    return +tempValue;
}

function dnaSequenceConversion(voiceNumber)
{
    for (var i = 0; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++)
    {
        if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "A")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.dnaValues[0];
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "T")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.dnaValues[1];
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "C")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.dnaValues[2];
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "G")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.dnaValues[3];
        }
    }
}

function rnaSequenceConversion(voiceNumber) {

    for ( var i = 0; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++)
    {
        if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "A")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.rnaValues[0];
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "U")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.rnaValues[1];
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "C")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.rnaValues[2];
        }

        else
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.rnaValues[3];
        }
    }
}

function proteinSequenceConversion(voiceNumber)
{
    for (var i = 0; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++)
    {
        if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "W")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[0] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "F")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[1] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "L")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[2] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "I")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[3] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "M")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[4] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "Y")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[5] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "V")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[6] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "C")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[7] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "P")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[8] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "T")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[9] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "A")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[10] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "S")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[11] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "Q")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[12] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "N")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[13] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "G")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[14] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "H")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[15] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "R")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[16] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "E")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[17] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "D")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[18] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }

        else if (voiceArray[voiceNumber - 1].biology.GenericDataArray[i] == "K")
        {
            voiceArray[voiceNumber - 1].biology.userSequenceArray[i] = voiceArray[voiceNumber - 1].biology.proteinValues[19] * voiceArray[voiceNumber - 1].biology.conversionValue;
        }
    }
}

function update(voiceNumber)
{
    voiceArray[voiceNumber - 1].originalPitchArray = voiceArray[voiceNumber - 1].biology.userSequenceArray;

    UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
    UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

    UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
    UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);
    UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
    LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
    LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

    updateTooltipVals($MacroPanel);
    updateDurationMapTooltip($MacroPanel);
    updatePitchMapTooltip($MacroPanel);
}

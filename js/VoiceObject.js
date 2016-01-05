// JavaScript source code
function VoiceObject(id)
{
    this.VoiceID = id; // Integer.

    this.originalPitchArray = new Array(); // Integer
    this.originalDurationArray = new Array(); // Integer
    this.pitchMappingArray = new Array(); // Integer
    this.durationMappingArray = new Array(); // Integer
    this.FinalPitchArray = new Array(); // Integer
    this.instrument = "";
    this.instrumentString = "";

    this.muted = false;
}


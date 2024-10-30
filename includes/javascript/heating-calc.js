var CalcCode = document.getElementById("heatingcalc").innerHTML;

if (CalcCode.indexOf("href=\"http://www.watkinshire.co.uk/heater-hire/") == -1) {
	document.getElementById("heatingcalc").innerHTML = "";
}
else {
	if (CalcCode.indexOf("nofollow") > -1) {
		document.getElementById("heatingcalc").innerHTML = "";
	}
}

function HeatingIsNumeric(IntText) {
	var ValidChars = "0123456789.-";
	var IsNumber = true;
	var Char;
	
	for (LoopChar = 0; LoopChar < IntText.length && IsNumber == true; LoopChar++) { 
		Char = IntText.charAt(LoopChar); 
		
		if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
	}
	
	if (IntText.length == 0) {
		IsNumber = false;
	}
	
	return IsNumber;
}

function HeatingRoundInt(Int, DecPoints) {
	if (!DecPoints) return Math.round(Int);
	
	if (Int == 0) {
		var Decimals = "";
		for(var LoopDec = 0; LoopDec < DecPoints; LoopDec++) Decimals += "0";
		return "0."+Decimals;
	}

	var Exponent = Math.pow(10,DecPoints);
	var NewInt = Math.round((Int * Exponent)).toString();
	NewInt = NewInt.slice(0,-1 * DecPoints) + "." + NewInt.slice(-1 * DecPoints);
	
	if (NewInt.charAt(0) == ".") {
		NewInt = "0" + NewInt;
	}
	
	return NewInt;
}

function HeatingCalculateVolume(Length, Width, HeightEaves, HeightApex, Volume) {
	LengthCheck = HeatingIsNumeric(document.getElementById(Length).value);
	WidthCheck = HeatingIsNumeric(document.getElementById(Width).value);
	HeightEavesCheck = HeatingIsNumeric(document.getElementById(HeightEaves).value);
	HeightApexCheck = HeatingIsNumeric(document.getElementById(HeightApex).value);
	
	if (LengthCheck == true && WidthCheck == true && HeightEavesCheck == true) {
		if (HeightApexCheck == true) {
			document.getElementById(Volume).value = ((document.getElementById(Length).value * document.getElementById(Width).value * (document.getElementById(HeightApex).value - document.getElementById(HeightEaves).value) / 2) + (document.getElementById(Length).value * document.getElementById(Width).value * document.getElementById(HeightEaves).value));
		}
		else {
			document.getElementById(Volume).value = (document.getElementById(Length).value * document.getElementById(Width).value * document.getElementById(HeightEaves).value);
		}
	}
	else {
		document.getElementById(Volume).value = "";
	}
	
	HeatingCalculateArea('HeatingVolume','HeatingTempExternal','HeatingTempRequired','HeatingInsulationGrade','HeatingInsulationFactor','HeatingHeatingDuty');
}

function HeatingCalculateArea(Volume, External, Required, Grade, Factor, Duty) {
	VolumeCheck = HeatingIsNumeric(document.getElementById(Volume).value);
	ExternalCheck = HeatingIsNumeric(document.getElementById(External).value);
	RequiredCheck = HeatingIsNumeric(document.getElementById(Required).value);
	GradeCheck = HeatingIsNumeric(document.getElementById(Grade).value);
	
	if (VolumeCheck == true && ExternalCheck == true && RequiredCheck == true && GradeCheck == true) {
		document.getElementById(Duty).value = Math.round(document.getElementById(Volume).value * (document.getElementById(Required).value - document.getElementById(External).value) * document.getElementById(Grade).value * 4 / 3412);
		
		var HeaterName = new Array("IR3kw / 230volt Infra-red Heater", "Rhino TQ/IR3kw / 230volt Infra-red Heater", "DE3kw / 110volt Electric Heater", "DE3kw / 230volt Electric Heater", "DE9kw / 415volt Electric Heater", "DE15kw / 415volt Electric Heater", "DE18kw / 415volt Electric Heater", "DE18kw Electic Event Heater", "DE42kw / 415volt Electric Heater", "MH44 Direct Fired Heater", "MH60 Indirect Fired Heater", "MH65 Indirect Fired Heater", "MH110 Indirect Fired Heater", "SH150 Site Heater / Integral Fuel Tank", "MH170 Series 1 Indirect Fired Heater", "MH170 Series 2 Indirect Fired Heater", "SH170 Site Heater / Integral Fuel Tank", "MH680 Indirect Fired Heater", "MH300 Series 1 Indirect Fired Heater", "MH300 Series 2 Indirect Fired Heater", "MH500 Indirect Fired Heater");
		var HeaterValue = new Array(3, 3, 3, 3, 9, 15, 18, 18, 42, 44, 60, 65, 110, 150, 170, 170, 170, 200, 300, 300, 500);
		var Recommend = "";
		
		for (LoopHeater = 0; LoopHeater <= 20; LoopHeater++) {
			if ((document.getElementById(Duty).value / HeaterValue[LoopHeater]) >= 1) {
				Recommend = "<p>We recommend:<br />" + Math.ceil(document.getElementById(Duty).value / HeaterValue[LoopHeater]) + " x " + HeaterName[LoopHeater] + " (" + HeaterValue[LoopHeater] + "Kw Rating Per Unit)</p>";
			}
		}
		
		document.getElementById("Heatingresults").innerHTML = Recommend;
	}
}
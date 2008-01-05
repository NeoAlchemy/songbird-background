window.opener.backgroundPrefServiceObserver.unregister();

function preview()
{
	var backgroundPrefObj = { 
		image : document.getElementById("background-imagepicker").value, 
		color : document.getElementById("background-colorpicker").color, 
		faceplateOpacity: document.getElementById("background-faceplate-opaque").value, 
		servicesOpacity: document.getElementById("background-service-opaque").value, 
		useColor: !(document.getElementById("disable-color").checked), 
		useImage: !(document.getElementById("disable-image").checked)
	};

	window.opener.backgroundPrefServiceObserver.setPrefrences(backgroundPrefObj);
	window.opener.backgroundPrefServiceObserver.updatePreferenceObj();
}

function apply()
{
	preview();
	window.opener.backgroundPrefServiceObserver.register();
	self.close();
	
}

function startup()
{
	var bgPrefObj = window.opener.backgroundPrefServiceObserver.getPreferenceObj();
	document.getElementById("background-imagepicker").value = bgPrefObj.image;
	document.getElementById("background-colorpicker").color = bgPrefObj.color;
	document.getElementById("background-faceplate-opaque").value = bgPrefObj.faceplateOpacity;
	document.getElementById("background-service-opaque").value = bgPrefObj.servicesOpacity;
	document.getElementById("disable-color").checked = !bgPrefObj.useColor;
	document.getElementById("disable-image").checked = !bgPrefObj.useImage;
}

window.addEventListener("load", startup, false);
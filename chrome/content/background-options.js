window.opener.backgroundPrefServiceObserver.unregister();

function preview()
{
	var backgroundPrefObj = { 
		image : document.getElementById("background-imagepicker").value, 
		color : document.getElementById("background-colorpicker").color, 
		menuColor : document.getElementById("background-menucolorpicker").color,
		faceplateOpacity: document.getElementById("background-faceplate-opaque").value, 
		servicesOpacity: document.getElementById("background-service-opaque").value, 
		rightSidebarOpacity: document.getElementById("background-rightSidebar-opaque").value,
		contentOpacity: document.getElementById("background-content-opaque").value,
		bottomPlaylistOpacity: document.getElementById("background-bottomPlaylist-opaque").value,
		useColor: !(document.getElementById("disable-color").checked), 
		useMenuColor: !(document.getElementById("disable-menuColor").checked),
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
	document.getElementById("background-menucolorpicker").color = bgPrefObj.menuColor;
	document.getElementById("background-faceplate-opaque").value = bgPrefObj.faceplateOpacity;
	document.getElementById("background-service-opaque").value = bgPrefObj.servicesOpacity;
	document.getElementById("background-rightSidebar-opaque").value = bgPrefObj.rightSidebarOpacity;
	document.getElementById("background-content-opaque").value = bgPrefObj.contentOpacity;
	document.getElementById("background-bottomPlaylist-opaque").value = bgPrefObj.bottomPlaylistOpacity;
	document.getElementById("disable-color").checked = !bgPrefObj.useColor;
	document.getElementById("disable-menuColor").checked = !bgPrefObj.useMenuColor;
	document.getElementById("disable-image").checked = !bgPrefObj.useImage;
}

window.addEventListener("load", startup, false);
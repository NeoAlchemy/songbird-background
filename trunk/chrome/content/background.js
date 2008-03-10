var backgroundPrefObj = { image : "", 
						   color : "", 
						   menuColor : "",
						   faceplateOpacity: "", 
						   servicesOpacity: "", 
						   useColor: false,
						   useImage: false,
						   useMenuColor: false
						 };

var backgroundPrefServiceObserver =
{
	register: function() {
		var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		this._backgroundBranch = prefService.getBranch("background.");
		this._backgroundBranch.QueryInterface(Components.interfaces.nsIPrefBranch2);
		this._backgroundBranch.addObserver("", this, false);
	},
	
	unregister: function()	{
		if (!this._backgroundBranch) return;
		this._backgroundBranch.removeObserver("", this);
	},
	
	setPrefrences: function(backgroundPrefObj)	{
		this._backgroundBranch.setCharPref("image", backgroundPrefObj.image);
		this._backgroundBranch.setCharPref("color", backgroundPrefObj.color);
		this._backgroundBranch.setCharPref("menuColor", backgroundPrefObj.menuColor);
		this._backgroundBranch.setCharPref("opacity.faceplate", backgroundPrefObj.faceplateOpacity);
		this._backgroundBranch.setCharPref("opacity.services", backgroundPrefObj.servicesOpacity);
		this._backgroundBranch.setBoolPref("useColor", backgroundPrefObj.useColor);
		this._backgroundBranch.setBoolPref("useMenuColor", backgroundPrefObj.useMenuColor);
		this._backgroundBranch.setBoolPref("useImage", backgroundPrefObj.useImage);
	},
	
	updatePreferenceObj: function() {
		backgroundPrefServiceObserver.getPreferenceObj();
		updateBackground(backgroundPrefObj);
	},
	
	getPreferenceObj: function() {
		backgroundPrefObj.image = this._backgroundBranch.getCharPref("image");
		backgroundPrefObj.color = this._backgroundBranch.getCharPref("color");
		backgroundPrefObj.menuColor = this._backgroundBranch.getCharPref("menuColor");
		backgroundPrefObj.faceplateOpacity = this._backgroundBranch.getCharPref("opacity.faceplate");
		backgroundPrefObj.servicesOpacity = this._backgroundBranch.getCharPref("opacity.services");
		backgroundPrefObj.useColor = this._backgroundBranch.getBoolPref("useColor");
		backgroundPrefObj.useMenuColor = this._backgroundBranch.getBoolPref("useMenuColor");
		backgroundPrefObj.useImage = this._backgroundBranch.getBoolPref("useImage");
		return backgroundPrefObj;
	},
		
	observe: function(aSubject, aTopic, aData)	{
		if (aTopic != "nsPref:changed") return;
		backgroundPrefServiceObserver.updatePreferenceObj();
	}
}

var styleSheetUtility = 
{
	init : function() {
		var styleSheetList = document.styleSheets;
		for (var i=0;i<styleSheetList.length;i++) {
			if (styleSheetList.item(i).href == "chrome://background/skin/background.css")
				this._backgroundStyleSheet = styleSheetList.item(i);
		}
	},
	
	deleteAllRules: function() {
		var ruleCount = this._backgroundStyleSheet.cssRules.length
		for (var i=0;i<ruleCount;i++) {
			this._backgroundStyleSheet.deleteRule(0);
		}
	},
	
	insertAllRules: function(cssRules) {
		var ruleCount = cssRules.length;
		for (var i=0; i < ruleCount; i++) {
			this._backgroundStyleSheet.insertRule(cssRules[i], i);
		}
	}
	
}

function updateBackground(bgPrefObj)
{
	var rule_index = 0;
	var cssRules = new Array();
	if (bgPrefObj.useColor ) {
		cssRules[rule_index] = "#mainplayer { background-color: " + bgPrefObj.color + " !important;}";
	}
	else if (bgPrefObj.useImage) {
		cssRules[rule_index] = "#mainplayer { background-image: url('" + bgPrefObj.image + "') !important; background-repeat : repeat;}";
	}
	else {
		cssRules[rule_index] = "#mainplayer {}";
	}
	if (bgPrefObj.useMenuColor ) {
		cssRules[++rule_index] = "menu > label { color: " + bgPrefObj.menuColor + " !important;}";
		cssRules[++rule_index] = "#sb-sys-title-title { color: " + bgPrefObj.menuColor + " !important;}";
	}
	cssRules[++rule_index] = "#faceplate { opacity: " + bgPrefObj.faceplateOpacity + " !important;}";
	cssRules[++rule_index] = "#miniplayer_box { opacity: " + bgPrefObj.faceplateOpacity + " !important;}";
	cssRules[++rule_index] = "#servicepane_box { opacity: " + bgPrefObj.servicesOpacity + " !important;}";
		
	styleSheetUtility.deleteAllRules();
	styleSheetUtility.insertAllRules(cssRules);
}





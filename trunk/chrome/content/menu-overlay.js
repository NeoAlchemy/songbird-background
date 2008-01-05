function onStartup()
{
	styleSheetUtility.init();
	backgroundPrefServiceObserver.register();
	backgroundPrefServiceObserver.updatePreferenceObj();
}

function backgroundOptionsOnCommand()
{
	window.openDialog('chrome://background/content/background-options.xul',
					  'bgOptions',
					  'centerscreen,chrome,extrachrome,menubar' +
						'resizable,scrollbars,status,toolbar,titlebar')
}



window.addEventListener("load", onStartup, false);

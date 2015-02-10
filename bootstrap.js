
const {classes: Cc, interfaces: Ci, utils: Cu}=Components

Cu.import("resource://gre/modules/Services.jsm")
Cu.import("resource://gre/modules/AddonManager.jsm")

/* ******************************************* vars *********************************************** */

const prefsPrefix="extensions.bookmarks_sidebar_qwe."
const chromeRoot="bookmarks-sidebar"
const buttonProps={
	id:"bookmarks-sidebar-button",
	className:"toolbarbutton-1 chromeclass-toolbar-additional",
	label:"Bookmarks Sidebar",
	tooltip:"Bookmarks Sidebar"
}

var $,self=this,prefs={}
const prefNames=["firstRun","addBranch","installReason","uninstallReason","startupReason","shutdownReason",
				"buttonPos","currentSet","currentSetAfter","savedCurrentSet"]
for(var p of prefNames) prefs[p]=prefsPrefix+p

const reasons=["","APP_STARTUP","APP_SHUTDOWN","ADDON_ENABLE","ADDON_DISABLE","ADDON_INSTALL","ADDON_UNINSTALL","ADDON_UPGRADE","ADDON_DOWNGRADE"]
const styleSheets=["chrome://"+chromeRoot+"/skin/style.css"]

/* ***************************************** main functions ************************************************* */

function install(data,reason){
	pref(prefs.installReason,reasons[reason])
	if(reason==ADDON_INSTALL) pref(prefs.firstRun, true) 
}
 
function startup(data,reason){
	pref(prefs.startupReason,reasons[reason])
	AddonManager.getAddonByID(data.id, function(addon){
		include(addon, "content/lib.js")
		include(addon, "content/ui.js")
		include(addon, "content/main.js")
		
		if(reason==ADDON_ENABLE) pref(prefs.firstRun, true)						//after the extension was disabled
		
		let styleSheetService= Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService)
			for (let i=0,len=styleSheets.length;i<len;i++){
			let styleSheetURI=Services.io.newURI(styleSheets[i], null, null)
			styleSheetService.loadAndRegisterSheet(styleSheetURI, styleSheetService.AUTHOR_SHEET)
		} 
		eachWindow(loadIntoWindow)												//ui building function
		Services.ww.registerNotification(windowWatcher)
	})
}

function shutdown(data,reason){
	pref(prefs.shutdownReason,reasons[reason])
	if(reason==ADDON_DISABLE){
		Services.ww.unregisterNotification(windowWatcher)
		eachWindow(unloadFromWindow)												//ui destroying function
	}
	else if(reason==APP_SHUTDOWN)
		pref(prefs.savedCurrentSet,$("nav-bar").attr("currentset")) 
}

/* ****************************************** add functions ************************************************ */

function include(addon, path){													//load scripts
	Services.scriptloader.loadSubScript(addon.getResourceURI(path).spec, self)
}

function pref(name,value){														//get/set prefs
	if(value===undefined){
		switch(Services.prefs.getPrefType(name)){
			case 0:return null
			case 32:return Services.prefs.getCharPref(name)
			case 64:return Services.prefs.getIntPref(name)
			case 128:return Services.prefs.getBoolPref(name)
		}
	}
	if(value==="") Services.prefs.clearUserPref(name)
	else{
		switch(typeof value){
			case "boolean":Services.prefs.setBoolPref(name,value);return
			case "number":Services.prefs.setIntPref(name,value);return
			default:Services.prefs.setCharPref(name,value)
		}
	}
}

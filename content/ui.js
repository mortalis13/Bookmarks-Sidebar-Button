
/* ***************************************** ui change *******************************************/

function addToolbarButton(w,props,command,firstRun){
	var $=w.$,alert=w.alert
	$.init(w.document)
	
	var button=$("<toolbarbutton>")
	button.attr("id",props.id)
	button.attr("class",props.className)
	button.attr("label",props.label)
	button.attr("tooltiptext",props.tooltip)
	
	button.attr("group","sidebar")												//options to link with built-in bookmarks-sidebar functionality		
	button.attr("type","checkbox")												//ex.: Ctrl-B opens sidebar and checks	
	button.attr("observes","viewBookmarksSidebar")								//this button (which is of checkbox type)
	
	var toolbox=$("navigator-toolbox")											//add to customization palette
	if(toolbox) toolbox.palette.appendChild(button)
																				//without next instructions you'll have to see the button there
	var toolbar=$("nav-bar")
	if(toolbar){
		var currentset=pref(prefs.savedCurrentSet)
		if(currentset===null){
			firstRun=true
			currentset=toolbar.attr("currentset")
		}
		currentset=currentset.split(",")										//toolbar buttons order
		
		var buttonPos=currentset.indexOf(props.id)										//find this button id in the current order
		var before=null
		
		if(firstRun){															//first run of extension	
			pref(prefs.addBranch,true)
			before=null
		}else{
			pref(prefs.addBranch,false)
			if(buttonPos==-1) return button											//if the button isn't in the toolbar (it has to be in the palette) don't change anything
			if(buttonPos!=currentset.length-1){
				i=buttonPos+1
				while(i<=currentset.length && currentset[i]){
					before=$(currentset[i++])
					if(before) break
				}
			}																		//show the button where it was from previous session
		}
		toolbar.insertItem(props.id, before)										//insert (id) before (element)
	}
	return button																	//get the button to add other attributes
}

function removeToolbarButton(window){
	var toolbar=window.document.getElementById("nav-bar")
	for(var i=1;i<arguments.length;i++){
		var id=arguments[i].id
		toolbar.currentSet=toolbar.currentSet.replace(","+id,"").replace(id+",","")		//find the button id in the list and remove (if the button is there)
	}
}

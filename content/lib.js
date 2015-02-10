
var ElementMethods={
	attr:function(name,value){
		if(!value) return this.getAttribute(name)													//get/set		
		this.setAttribute(name,value)
	},
	append:function(child){
		this.appendChild(child)
		return child
	},
	remove:function(){
		this.parentNode.removeChild(this)
	},
	bind:function(event,handler){
		this.addEventListener(event,handler,false)
	},
	css:function(style){
		for(var rule of style){
			var rule=rule.split(":")
			var prop=rule[0]
			var val=rule[1]
			this.style.setProperty(prop,val)
		}
	}
}
	
function setShortFunctions(w){
	var document=w.document
	var $=function(selector){
		var document=$.document
		if(selector[0]=="<") return document.createElement(selector.substr(1,selector.length-2))		//$("<button>")
		if(selector.nodeType && selector.nodeType===1) return selector									//$(element)
		if(!/\w/.test(selector[0])) return document.querySelector(selector)								//$(".class")
		return document.getElementById(selector)														//$(id)
	}
	
	$.init=function(document){
		$.document=document
	}
	w.$=$
	self.$=$
	for(var m in ElementMethods) w.Element.prototype[m]=ElementMethods[m]								//element.attr(name,val)
}

function addShortFunctions(elements){
	var els
	if(elements instanceof Array)
		els=elements
	else
		els=[elements]
	for(var el in els)
		for(var m in ElementMethods)
			els[el][m]=ElementMethods[m]
}

function clearUserPrefs(){
	for(var p in prefs) pref(prefs[p],"")
}

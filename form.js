if(typeof window.forms === "undefined"){
	window.forms = {};
}
forms.list = {};
forms.create = function(options){
	if(typeof options !== "object"){
		options = {};
	}
	if(typeof options.id !== "string"){
		options.id = APP.html.new();
	}
	var form = document.createElement("form");
	form.setAttribute("id", options.id);
	form.addEventListener("change", function(){
		if(typeof options.data === "function"){
			var data = forms.get(this.id, options.data());
		} else{
			var data = forms.get(this.id, options.data);
		}
		if(typeof options.onchange === "function"){
			options.onchange(data, options.data);
		}
	});
	forms.list[form.id] = {};
	forms.list[form.id].dom = form;
	return form;
};
forms.update = function(formId, data){
	var form = document.getElementById(formId);
	if(!form){
		return;
	}
	for(var i = 0; i < form.length; i++){
		var ob = form[i].name.split(".");		
		var scope = data;
		for(var o = 0; o < ob.length; o++){
			if(ob[o] == ""){
				continue;
			}
			if(typeof scope[ob[o]] === "undefined"){
				scope[ob[o]] = {};
			}
			if(o == (ob.length - 1)){
				switch(form[i].getAttribute("type")){
					case "checkbox":
						if(typeof form[i].checked !== "undefined"){
							form[i].checked = scope[ob[o]];
						}
						break;
					default:
						if(typeof form[i].value !== "undefined"){
							if(typeof scope[ob[o]] === "string" || typeof scope[ob[o]] === "number"){
								if(form[i].getAttribute("price")){
									form[i].value = scope[ob[o]].toPrice("$ ");
								} else{
									form[i].value = scope[ob[o]];
								}
							} else{
								console.warn(typeof scope[ob[o]] + " value", o, ob[o], scope);
							}
							
						}
				}
			} else{
				scope = scope[ob[o]];
			}
		}
	}
};
// Get the form data and update array
forms.get = function(formId, data){
	if(typeof data !== "object"){
		data = {};
	}
	var form = document.getElementById(formId);
	for(var i = 0; i < form.length; i++){
		var ob = form[i].name.split(".");		
		var scope = data;
		for(var o = 0; o < ob.length; o++){
			if(ob[o] == ""){
				continue;
			}
			if(typeof scope[ob[o]] === "undefined"){
				scope[ob[o]] = {};
			}
			if(o == (ob.length - 1)){
				switch(form[i].getAttribute("type")){
					case "checkbox":
						scope[ob[o]] = form[i].checked;
						break;
					default:
						scope[ob[o]] = form[i].value;
				}
			} else{
				scope = scope[ob[o]];
			}
		}
	}
	return data;
};
forms.input = function(options){
	if(typeof options !== "object"){
		options = {};
	}
	var input = document.createElement("input");
	if(typeof options.class === "object"){
		for(var i = 0; i < options.class.length; i++){
			input.classList.add(options.class[i]);
		}
	} else if(typeof options.class === "string"){
		input.classList.add(options.class);
	}
	if(typeof options.name === "string"){
		input.setAttribute("name", options.name);
	}
	if(typeof options.type === "string"){
		input.setAttribute("type", options.type);
	}
	if(typeof options.disabled === "boolean" && options.disabled){
		input.setAttribute("readonly", true);
	}
	if(typeof options.price === "boolean" && options.price){
		input.setAttribute("price", true);
	}
	if(typeof options.placeholder === "string"){
		input.setAttribute("placeholder", options.placeholder);
	}
	input.addEventListener("focus", function(){
		this.select();
	});
	if(typeof options.label !== "undefined"){
		return forms.elements.label(options.label, input);
	}
	return input;
};
forms.getinput = function(formId, object){
	// get the input for the object
	var form = document.getElementById(formId);
	for(var i = 0; i < form.length; i++){
		if(form[i].name === object){
			return form[i];
		}
	}
	return false;
};
forms.elements = {
	label: function(label, child){
		var div = document.createElement("div");
		div.appendChild((function(){
			var lbl = document.createElement("label");
			if(typeof label === "string"){
				lbl.appendChild(document.createTextNode(label));
			} else if(typeof lbl === "object"){
				lbl.appendChild(label);
			}
			return lbl
		})());
		div.appendChild(child);
		return div;
	},
	input: forms.input,
	textarea: function(options){
		options = typeof options === "object" ? options : {};
		var textarea = document.createElement("textarea");
		if(typeof options.id === "string"){
			textarea.setAttribute("id", options.id);
		}
		if(typeof options.name === "string"){
			textarea.setAttribute("name", options.name);
		}
		if(typeof options.classList === "object"){
			for(var i = 0; i < options.classList.length; i++){
				textarea.classList.add(options.classList[i]);
			}
		}
		if(typeof options.value === "string"){
			textarea.setAttribute("value", options.value);
		}
		if(typeof options.placeholder === "string"){
			textarea.setAttribute("placeholder", options.placeholder);
		}
		return textarea;
	},
	select: function(options){
		options = typeof options === "object" ? options : {};
		var select = document.createElement("select");
		if(typeof options.id === "string"){
			select.setAttribute("id", options.id);
		}
		if(typeof options.name === "string"){
			select.setAttribute("name", options.name);
		}
		if(typeof options.classList === "object"){
			for(var i = 0; i < options.classList.length; i++){
				select.classList.add(options.classList[i]);
			}
		}
		if(typeof options.items === "object"){
			for(var i = 0; i < options.items.length; i++){
				select.appendChild(forms.elements.select_option(options.items[i]));
			}
		}
		if(typeof options.value === "string"){
			select.setAttribute("value", options.value);
		}
		return select;
	},
	select_option: function(options){
		options = typeof options === "object" ? options : {};
		var option = document.createElement("option");
		if(typeof options.classList === "object"){
			for(var i = 0; i < options.classList.length; i++){
				option.classList.add(options.classList[i]);
			}
		}
		if(typeof options.value === "string"){
			option.setAttribute("value", options.value);
		}
		if(typeof options.text === "string"){
			option.appendChild(document.createTextNode(options.text));
		}
		return option;
	}
};
function TerminusURLLoader(ui, val){
	this.ui = ui;
	this.val = val;
	this.url_input = false;
	this.key_input = false;
}

TerminusURLLoader.prototype.getLabelDOM = function(){
	return document.createTextNode("Connect");
}

TerminusURLLoader.prototype.getFormFieldDOM = function(ip, fname, ltxt, pholder){
	var sci = document.createElement("div");
	sci.setAttribute("class", "terminus-form-field terminus-field-"+fname);
	var lab = document.createElement("span");
	lab.setAttribute("class", "terminus-form-label terminus-form-field-label terminus-label-"+fname);
	lab.appendChild(document.createTextNode(ltxt))
	ip.setAttribute("type", "text");
	ip.setAttribute("placeholder", pholder);
	sci.appendChild(lab);
	sci.appendChild(ip);
	return sci;
}

TerminusURLLoader.prototype.getAsDOM = function(){
	var scd = document.createElement("div");
	scd.setAttribute("class", "terminus-form terminus-url-loader");
	var stit = document.createElement("H2");
	stit.setAttribute("class", "terminus-form-header terminus-connect-header");
	stit.appendChild(document.createTextNode("Connect To Terminus Server"));
	scd.appendChild(stit);
	this.url_input = document.createElement("input");
	this.url_input.setAttribute("class", "terminus-form-value terminus-form-url terminus-form-field-input");
	if(this.val){
		this.url_input.value = this.val;
	}	
	scd.appendChild(this.getFormFieldDOM(this.url_input, "connect", "URL", "Terminus DB URL"));
	this.key_input = document.createElement("input");
	this.key_input.setAttribute("class", "terminus-form-value terminus-value");
	scd.appendChild(this.getFormFieldDOM(this.key_input, "connect", "Key", "Server API Key"));
	var loadbuts = document.createElement("div");
	loadbuts.setAttribute("class", "terminus-control-buttons");
	var loadbut = document.createElement("button");
	loadbut.setAttribute("class", "terminus-control-button terminus-url-load");
	loadbut.appendChild(document.createTextNode("Connect"));
	var self = this;
	loadbut.addEventListener("click", function(){
		if(self.url_input.value){
			self.ui.load(self.url_input.value, self.key_input.value);
		}
	});
	loadbuts.appendChild(loadbut);
	scd.appendChild(loadbuts);
	return scd;
}

function HTMLRangeViewer(options){
	this.commas = (options && options.commas ? options.commas : true);
	this.css = "terminus-literal-value terminus-literal-value-range " + ((options && options.css) ?  options.css : "");
	this.delimiter = (options && options.delimiter ? options.delimiter : false);
}

HTMLRangeViewer.prototype.getDOM = function(renderer, dataviewer){
	var value = renderer.value();
	var vals = FrameHelper.parseRangeValue(value, this.delimiter);
	var d = document.createElement("span");
	d.setAttribute("class", this.css);
	var rvals = document.createElement("span");
	rvals.setAttribute("class", "terminus-range-value-left");
	var svals = document.createElement("span");
	svals.setAttribute("class", "terminus-range-value-right");
	var x = (this.commas ? FrameHelper.numberWithCommas(vals[0]) : vals[0]);
	var tnode = document.createTextNode(x);
	rvals.appendChild(tnode);
	d.appendChild(rvals);	
	if(vals.length == 2){
		d.appendChild(getRangeSymbolDOM());
		var x2 = (this.commas ? FrameHelper.numberWithCommas(vals[1]) : vals[1]);
		var t2node = document.createTextNode(x2);
		svals.appendChild(t2node);
		d.appendChild(svals);	
	}
	return d;
}

function getRangeSymbolDOM(){
	var d = document.createElement("span");
	d.setAttribute("class", "terminus-range-indicator");
	d.setAttribute("title", "The value is uncertain, it lies somewhere in this range");
	d.appendChild(document.createTextNode(" ... "));
	return d;
}

function HTMLRangeEditor(options){
	this.commas = (options && options.commas ? options.commas : true);
	this.css = "terminus-literal-value terminus-literal-value-range " + ((options && options.css) ?  options.css : "");
	this.delimiter = (options && options.delimiter ? options.delimiter : false);
}

HTMLRangeEditor.prototype.getDOM = function(renderer, dataviewer){
	var value = renderer.value();
	var vals = FrameHelper.parseRangeValue(value, this.delimiter);
	var d = document.createElement("span");
	d.setAttribute("class", this.css);
	var rvals = document.createElement("span");
	var svals = document.createElement("span");
	var data1 = (vals.length > 0 ? vals[0] : "");
	var data2 = (vals.length > 1 ? vals[1] : "");
	var firstip = document.createElement("input");
	firstip.setAttribute('type', "text");
	firstip.setAttribute('size', 16);
	if(data1){
		firstip.value = data1;
	}
	var secondip = document.createElement("input");
	secondip.setAttribute('type', "text");
	secondip.setAttribute('size', 16);
	if(data2){
		this.showing_range = true;
		secondip.value = data2;
	}
	rvals.appendChild(firstip);
	d.appendChild(rvals);	
	if(this.showing_range){
		svals.appendChild(getRangeSymbolDOM());
		svals.appendChild(secondip);
	}
	d.appendChild(svals);	
	var but = document.createElement("button");
	but.setAttribute("class", "terminus-change-range");
	var txt = this.showing_range ? "Change to Simple Value" : "Change to Uncertain Range";
	but.appendChild(document.createTextNode(txt));
	d.appendChild(but);	
	var self = this;
	but.addEventListener("click", function(){
		if(self.showing_range){
			self.showing_range = false;
			secondip.value = "";				
			FrameHelper.removeChildren(svals);
		}
		else {
			self.showing_range = true;
			secondip.value = "";				
			svals.appendChild(getRangeSymbolDOM());
			svals.appendChild(secondip);
		}
		var txt = self.showing_range ? "Change to Simple Value" : "Change to Uncertain Range";
		but.innerText = txt;
		changeHandler();
	});
	var changeHandler = function(){
		if(self.showing_range && secondip.value){
			if(firstip.value) renderer.set("[" + firstip.value + "," + secondip.value + "]");				
			else renderer.set(secondip.value);				
		}
		else {
			renderer.set(firstip.value);
		}
	}
	firstip.addEventListener("change", changeHandler);
	secondip.addEventListener("change", changeHandler);
	return d;
}

RenderingMap.registerViewerForTypes("HTMLRangeViewer", "Range Viewer", ["xdd:integerRange", "xdd:decimalRange"]);
RenderingMap.registerEditorForTypes("HTMLRangeEditor", "Range Editor", ["xdd:integerRange", "xdd:decimalRange"]);

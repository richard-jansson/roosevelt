/*
Copyright (C) 2018  Richard Jansson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

*/
var ufos=[];
var sinks=[];


function reset(e){
	delete e.set;
	renderufo(e,e.original_alphabet,e.num_columns)
}

function hide(e){
//	e.toggle();
	// FIXME makes faulty assumption that there's a wrapper parent element
	e.parent().toggle();

	if(e.hidden == undefined || !e.hidden) e.hidden=true;
	else e.hidden=false;
}

function output(msg){
	for(var i in sinks){
		var tname=sinks[i][0].tagName;
		if(tname == "TEXTAREA" || tname == "INPUT"){
//			sinks[i].val(sinks[i].val()+msg);
			textareainsert(sinks[i][0], msg);
		}else{
			sinks[i].html(sinks[i].html()+msg);
		}
	}

	// FIXME proper on change hook
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])
}

function keydown(e){
	e.stopImmediatePropagation();
}
// global key up
function keyup(e){
	e.stopImmediatePropagation();
	var propagate=true;
	for(var i in ufos){
		var ufo=ufos[i];

		if(e.key==ufo.hide){
			hide(ufo);
			propagate=false;
		}

		if(ufo.hidden===true) continue;

		if(typeof(ufo.bindings[e.key])!="undefined"){
			var quadn=ufo.bindings[e.key];

			select(ufo,quadn);
			propagate=false;
		}

		if(e.key==ufo.rst){
			reset(ufo)
			propagate=false;
		}
	}

	if(!propagate){
		$("#output").html( $("#output").html()+e.key);
	}

	return propagate;
}

// select quad n on ufo enabled element e
function select(e,n){
	if(e.set==undefined) e.set=e.original_alphabet;
	
	// if symbol print it out
	if(typeof(e.set[n])=="string"){
		console.log("output:" + e.set[n]);			
		output(e.set[n]);
		reset(e);
	}else if(typeof(e.set[n])=="object"){
		// array means that it's a quad, update acordingly and render again 
		if(e.set[n].length!=undefined){
			e.set=e.set[n];
			renderufo(e,e.set,e.num_columns);
		}else if(e.set[n].c){
			output(e.set[n].c)
			reset(e)
		}else{
			throw "unsupported symbol";
		}
	}
}

function __recurse_render(e,set,ncol){
	if(set.length != "undefined"){
		// render quad 
		for(var k in set){

		}
	}else {
	}

	e.insert(ne);
}


// Render / initialize ufo element
// e - jQuery object representing DOM element
// s - set i.e.   
function renderufo(e,set,ncol){
	// clear any previous content
	e.html("");

	// iterate quads, rows and symbols create DOM element for each and insert into DOM tree
		var qe=$("<quad></quad>",{style:"width:"+(w-5)+"%;margin-right:"+4+"%"});
	var qn=0;
	var w=100/ncol;
	for(var k in set){
		var quad=set[k];
		var qe=$("<quad></quad>",{style:"width:"+(w-5)+"%;margin-right:"+4+"%"});

		var rn=0;
		var sw=100/ncol;
		if(quad.length<ncol) sw=100/quad.length;

		for(var k in quad){
				var sym=quad[k];
				var se=$("<sym></sym>",{style:"width:"+sw+"%"});
				if(typeof(sym)=="string"){
					se.html(sym);
				}else if(typeof(sym)=="object"){
					if(sym.n==undefined) throw "Must specify name / n, in quad #"+qn;
					se.html(sym.n);
				}else{
					throw "unsupported element in quad #"+qn;
				}
				qe.append(se);
		}
		qn++;
		e.append(qe);
	}
}

function bindufokeys(el,keys,rst,hide){
//	console.log(keys);	
	el.bindings={};

	for(var k in keys){
		var key=keys[k];

		el.bindings[key]=k;
	}
	
	el.rst=rst;
	el.hide=hide;
}

function syncmathjax(){
	var inp="$$"+$("#mathjaxsrc").val()+"$$";
	var dst=$("#mathjaxdst");

	dst.html(inp);

	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

// called on javascript ready function
// i.e. when dom is set up and all
$(document).ready(function(){
	$(document).keypress(function(e){
		if(!keyup(e)){
			e.stopPropagation();
			e.preventDefault();
		}
	});

	// shift works differently for some reason??
	$(document).keyup(function(e){
		for(var i in ufos){
			var ufo=ufos[i];

			if(e.key==ufo.rst) reset(ufo)
		}
	});

	// find ufo element and render them 

	// Make the keyboard draggable 
	// the wrapper div also sets up borders 
	// and styling via style.css
	$(".ufowrap").each(function(){
		$(this).draggable();	
		$(this).resizable();
	});

	$("ufo").each(function(){
		// check that element is set up properly
		var alphabet_name,alphabet,num_columns;
		var bind_sel_quad_string;
		var bind_reset;
		var bind_hide;
		var bind_sel_quad;
		var e=$(this);
		// for debugging purposes present object in developer view
		console.log(e[0]);
		// Boring sanity checks for parameters
		try {

			if(typeof(e.attr("num_columns"))=="undefined") throw "Element has no ncolumns attribute";
			num_columns=e.attr("num_columns");
			if(parseInt(num_columns)==NaN || parseInt(num_columns)!=parseFloat(num_columns)) throw "num_columns has to be an integer";
			if(typeof(e.attr("alphabet"))=="undefined") throw "Element has no alphabet attribute";
			alphabet_name =e.attr("alphabet");
			if(typeof(alphabets[alphabet_name])=="undefined") throw "Undefined alphabet "+alphabet_name+", specify in alphabet.js";
			alphabet=alphabets[alphabet_name];
		} catch (e){
			$(this).addClass("warn");
			$(this).html(e);
		}

		// save the original alphabet
		e.original_alphabet=alphabet;
		e.num_columns=num_columns;

		renderufo($(this),alphabet,num_columns);


		// Bind keys seperatly 
		try {
			if(typeof(e.attr("bind_select_quad"))=="undefined") 
				throw "No attribute bind_select_quad, expected javasript array consisting of strings of keys to be bound for each quad"
			bind_sel_quad_string=e.attr("bind_select_quad")
			bind_sel_quad=JSON.parse(bind_sel_quad_string)
			if(typeof(bind_sel_quad_string.length)=="undefined") throw "bind_select_quad must be an array"

			if(typeof(e.attr("bind_reset"))=="undefined") 
				throw "No attribute bind_reset, key to reset to original view";
			bind_reset=e.attr("bind_reset")

			if(typeof(e.attr("bind_hide"))=="undefined") 
				throw "No attribute bind_hide, key to reset to original view";
			bind_hide=e.attr("bind_hide")
		} catch (e){
			$(this).addClass("warn")
			$(this).html(e)
		}

		bindufokeys(e,bind_sel_quad,bind_reset,bind_hide)

		// keep track of all the ufos
		ufos.push(e);
	});

	// set up desitinations to which the data will be output, marked by the ufodest attribute in html 
	$("[ufodest]").each(function(){ sinks.push($(this)) })
});

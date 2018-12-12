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
var inline=false;

var domcache=[];
var domcache_root=false;

var locked=true;

function is_array(o){
	if(typeof(o)=="object" && o.length!=undefined) return true;
	return false;
}

function __empty_sym(){
	var se=$("<sym></sym>",{class:"empty"});
	se.html(".");

	return se;
}

// handle symbol 
function __sym_to_html(s){
	var se=$("<sym></sym>");

	if(s.length>3) se.addClass("long");
	if(s==undefined){
		se.html(""); 
		se.addClass("undefined");
	}
	else se.html("$$"+s+"$$");

	return se;
}

function symo(key){
	if(typeof(key)=="undefined"){
		return {label:__empty_sym(key),output:key};
	}
	else if(typeof(key)=="string"){
		return {label:__sym_to_html(key),output:key};
	}else if(typeof(key)=="object" && key.c){
		return {label:__sym_to_html(key.n),output:key.c};
	}else{
		throw "Faulty symbol: "+key;
	}
}

// Quadrant object 
function __quad_setlabel(lbl){
	var qp=$("<quadp></quadp>",{style:"width:100%"});
	var lem=$("<klm></klm>");
	lem.html(lbl);
	qp.append(lem);

	this.el.append(qp);
}

function __quad_add(e){ this.el.append(e); }
function __quad_render(){ return this.el; }

function quado(w,qmr){
	var el=$("<quad></quad>",{style:"width:"+(w-qmr-1)+"%;margin-right:"+qmr+"%"});
	el.quad_margin_right=qmr;

	return {el: el,
			label:__quad_setlabel,
			add:__quad_add,
			render:__quad_render};
}

function update(){
	var divout=$("#divout");
	var math=divout[0];

	MathJax.Hub.Queue(["Typeset",MathJax.Hub,math])
}


function updatequads(path,dom){
	var sym=$("ufo");
	$("ufo").hide();
	$(".loading").show();
	var math=sym[0];

	locked=true;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,math])

	MathJax.Hub.Queue(function(){
		if(typeof(path)=="undefined") domcache_root=dom;
		else domcache[path]=dom;
		console.log("mathjax complete!");
		locked=false;
		$(".loading").hide();
		$("ufo").show();
	});
}

function reset(e){
	delete e.set;
	delete e.path;
	renderufo(e,e.original_alphabet,e.num_columns)
}

function hide(e){
//	e.toggle();
	// FIXME makes faulty assumption that there's a wrapper parent element
	e.parent().toggle();

	if(e.hidden == undefined || !e.hidden) e.hidden=true;
	else e.hidden=false;
}
function output_inline(msg,ishtml){
	console.log("output inline!");	
// fixme with selection!!
	if(!ishtml){
		inline.val(msg);
	}else{
		var par=inline.parent();
		var n=$(msg);

		par.replaceWith(n);

		inline=null;
/*		par.insertAfter(n);
		par.remove();
		*/
//		par.html(msg);
//		var math=MathJax.Hub.getAllJax("MathOutput")[0];
//		MathJax.Hub.Queue("Te
		var math=$("#divout").find("math");
		// tex annotation 
		math.find("annotation").remove();
		
		$("#divout").html("<math>"+math.html()+"</math>");

		MathJax.Hub.Queue(["Typeset",MathJax.Hub])
	}
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

// make class for edit inline??
function saveinput(){
	tmp=$(this);
	var cnt=$(this).val();
	$(this).parent().html(cnt);
}

function editinline(e){
	if(inline) return;
	if(e.target.childElementCount!=0) return;
	var el=$(e.target);
	var cnt=el.html();
	var inp=$("<input/>",{type:"text",value:cnt,mathml:true});
	inp.focusout(saveinput);
	el.html("");
	el.append(inp);

	inline=inp;
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

		// FIXME rst also should handle multiple keybindings
		if(typeof(ufo.hide)=="object"){
			for(var k in ufo.hide){
				if(ufo.hide[k] == e.key){
					hide(ufo);
					propagate=false;
				}
			}
		}else{
			if(e.key==ufo.hide){
				hide(ufo);
				propagate=false;
			}
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

	if(typeof(e.path)=="undefined") e.path=[n];
	else e.path.push(n);

	console.log("PATH:");
	console.log(e.path);
	
	if(is_array(e.set[n])){
		e.set=e.set[n];
		renderufo(e,e.set,e.num_columns);
	}else{
		var symbol=new symo(e.set[n]);
		output(symbol.output);
		reset(e);
	}
}


function ufobar(){
	var c=$("<ufobar>&nbsp;</ufobar>");
	return c;
}

// Recurse over the current set and return a DOM element to be rendered by web engine 
function __set_to_dom(e,set,ncol,lvl){
	var w = set.length<ncol ? 100 / set.length : 100 / ncol;
	var qmr=parseInt(e.quad_margin_right);

	for(var k in set){
		var quad=set[k];

		var qo=new quado(w,qmr); 

		// Add label for key, on first level  
		if(!lvl) qo.label(e.keys[k]);

		var qe=qo.render();

		// non leaf node  
		if(lvl<=1){
			if(is_array(quad)) __set_to_dom(qe,quad,ncol,lvl+1);
			else qe.append(new symo(quad).label);
		}else{
			qe.append(new symo().label);
		}

		e.append(qo.render());
	}
	return qe;
}

// Render / initialize ufo element
// e - jQuery object representing DOM element
// s - set i.e.   
function renderufo(e,set,ncol){
	// clear any previous content in ufo element
	e.html("");

	e.append(ufobar());

	// the element tree that we'll insert into the active DOM tree
	var dom;

	if(typeof(e.path)=="undefined" && domcache_root!=false) {
		// The rendering have been made already, so we'll just serve it from our cache
		console.log("Cache hit");
		dom=domcache_root;
		e.append(dom);
		return;
	}
	else if(e.path!=undefined && typeof(domcache[e.path])!="undefined"){
		console.log("Cache hit");
		dom=domcache[e.path];
		e.append(dom);
		return;
	}else{
		// Get the dom tree as translated from our internal representation 
		dom=__set_to_dom(e,set,ncol,0);
	}
	// insert the dom either from cache or freshly genereated
	e.append(dom);
	update();
	// Ask MathJax to render the symbols in the keyboard into nice looking representation
	// also once the rendering is done store it within the cache for future use 
	updatequads(e.path,e.children());
	return;
}

function bindufokeys(el,keys,rst,hide){
//	console.log(keys);	
	el.bindings={};

	for(var k in keys){
		var key=keys[k];

		el.bindings[key]=k;
	}
	
	// check if rst is given as json object 
	try {
		var t=JSON.parse(hide);
		el.hide=t;
	} catch{
		el.hide=hide;
	}

	el.rst=rst;
}

function syncmathjax(){
	var inp="$$"+$("#mathjaxsrc").val()+"$$";
	var dst=$("#mathjaxdst");

	dst.html(inp);

	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function clickdeeper(tgt){
	if(tgt[0].tagName=="QUAD") quad=tgt;
	else tgt=tgt.parents("quad");

	if(tgt.parents("quad").length==0) return;

	var depth=tgt.parents("quad").length;

	pars=tgt.parents("quad");
	par=pars.eq(depth-1);
	ind=par.index();
	
	// FIXME support several ufos 
	select(ufos[0],ind);
}

function ufoclick(e){
	if(locked) return;
	var tgt=$(e.target);
	if(tgt.parents("sym").length==0){
		clickdeeper(tgt);
		return;
	}
	par=tgt.parents("sym");
	// check depth 
	var depth=tgt.parents("quad").length;
	if(depth==2){
		quad=par.parent();	
		tquad=quad.parent();
		var ind=quad.index();
		var tind=tquad.index();
		// FIXME only support one ufo element
		select(ufos[0],tind);
		select(ufos[0],ind-1);
	}else{
		clickdeeper(tgt);	
	}
			 
}

// called on javascript ready function
// i.e. whe dom is set upeand all
$(document).ready(function(){
	// standard editing should also trigger redrawing of glyphs
	$("textarea").bind("input propertychange",function(e){
		out=$("#divout")
		console.log(e)
		out.html("$$"+e.target.value+"$$")
		MathJax.Hub.Queue(["Typeset",MathJax.Hub])
	})

	var ta=$("textarea");
	var start="\\int_{0}^{2π}\sin^2(x)dx=0\\\\\r";
	ta.html(start);
	out=$("#divout")
	out.html("$$"+start+"$$")
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])
						

	$(document).keypress(function(e){
		if(!keyup(e)){
			e.stopPropagation();
			e.preventDefault();
		}
	});

	// shift works differently for some reason??
	$(document).keyup(function(e){
		if(locked) return;
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
	
	$("ufo").click(ufoclick);

	$("ufo").each(function(){
		// check that element is set up properly
		var alphabet_name,alphabet,num_columns,num_rows;
		var bind_sel_quad_string;
		var bind_reset;
		var bind_hide;
		var bind_sel_quad;
		var e=$(this);
		var quad_margin_right=4;
		var inline=false;

		// styling
		try {
			if(typeof(e.attr("quad_margin_right"))!="undefined"){
				quad_margin_right=e.attr("quad_margin_right");
				if(parseInt(quad_margin_right)==NaN || parseInt(quad_margin_right)!=parseFloat(quad_margin_right)) throw "quad_margin_right has to be an integer";
			}
		} catch (e){
			$(this).addClass("warn");
			$(this).html(e);
		}
		// Boring sanity checks for parameters
		try {
			if(typeof(e.attr("inline"))!="undefined" && e.attr("inline")=="yes"){
				$("#divout").click(editinline);
			}
			// rows
			if(typeof(e.attr("num_rows"))=="undefined") throw "Element has no num_rows attribute";
			num_rows=e.attr("num_rows");
			if(parseInt(num_rows)==NaN || parseInt(num_rows)!=parseFloat(num_rows)) throw "num_rows has to be an integer";

			// columns
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
	
		tree=maketree(alphabet,num_rows,num_columns);

		// save the original alphabet
		e.original_alphabet=tree;
		e.num_columns=num_columns;
		e.keys=bind_sel_quad;
		e.quad_margin_right=quad_margin_right;

		renderufo(e,tree,num_columns);

		// keep track of all the ufos
		ufos.push(e);
	});

	// set up desitinations to which the data will be output, marked by the ufodest attribute in html 
	$("[ufodest]").each(function(){ sinks.push($(this)) })
});

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
}

function output(msg){
	for(var i in sinks){
		var tname=sinks[i][0].tagName;
		if(tname == "textare" || tname == "INPUT"){
			sinks[i].val(sinks[i].val()+msg);
		}else{
			sinks[i].html(sinks[i].html()+msg);
		}
	}
}

// global key up
function keyup(e){
	for(var i in ufos){
		var ufo=ufos[i];

		if(typeof(ufo.bindings[e.key])!="undefined"){
			var quadn=ufo.bindings[e.key];

			select(ufo,quadn);
		}

		if(e.key==ufo.rst) reset(ufo)
		if(e.key==ufo.hide) hide(ufo);
	}

}

// select quad n on ufo enabled element e
function select(e,n){
	console.log("select quad: "+n +" on ");
	console.log(e);

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
		}
		else{
			throw "not supported yet";
		}
	}
}

// Render / initialize ufo element
// e - jQuery object representing DOM element
// s - set i.e.   
function renderufo(e,set,ncol){
	// clear any previous content
	e.html("");

	// iterate quads, rows and symbols create DOM element for each and insert into DOM tree
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
		
//		console.log(k + " "+key);

		el.bindings[key]=k;
	}
	
	el.rst=rst;
	el.hide=hide;
}

// called on javascript ready function
// i.e. when dom is set up and all
$(document).ready(function(){
	// bind keypresses globaly 
	$(document).keyup(keyup);

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

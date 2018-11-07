// Render / initialize ufo element
// e - jQuery object representing DOM element
// s - set i.e.   
function renderufo(e,set,ncol){
	// clear any previous content

	// iterate quads, rows and symbols create DOM element for each and insert into DOM tree
	var qn=0;
	var w=100/ncol;
	for(var k in set){
		var quad=set[k];
		var qe=$("<quad></quad>",{style:"width:"+w+"%"});

		var rn=0;
		for(var k in quad){
			var row=quad[k];
			var re=$("<row></row>");
			var sw=100/row.length;
			for(var k in row){
				var sym=row[k];
				var se=$("<sym></sym>",{style:"width:"+sw+"px"});
				if(typeof(sym)=="string"){
					se.html(sym);
				}else{
					throw "unsupported element in quad #"+qn+" row #"+rn;
				}
				re.append(se);
			}
			rn++;
			qe.append(re);
		}
		qn++;
		e.append(qe);
	}
}

function bindufokeys(el,keys){
	console.log(keys);	

	for(var k in keys){
		var key=keys[k];

	}
}

// called on javascript ready function
// i.e. when dom is set up and all
$(document).ready(function(){
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

		renderufo($(this),alphabet,num_columns);

		// Bind keys seperatly 
		try {
			if(typeof(e.attr("bind_select_quad"))=="undefined") 
				throw "No attribute bind_select_quad, expect javasript array consisting of strings of keys to be bound for each quad"
			bind_sel_quad_string=e.attr("bind_select_quad")
			bind_sel_quad_string=JSON.parse(bind_sel_quad_string)
			if(typeof(bind_sel_quad_string.length)=="undefined") throw "bind_select_quad must be an array"

		} catch (e){
			$(this).addClass("warn")
			$(this).html(e)
		}

		bindufokeys(e,bind_sel_quad_string,alphabet)
	});
});

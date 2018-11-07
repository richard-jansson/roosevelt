// Helper functions 

// insert into textarea 
function textareainsert(el,msg){
	var org=el.value;
	var s=el.selectionStart;
	var e=el.selectionEnd;
	
	el.value=org.substr(0,s)+msg+org.substr(e);

	// FIXME proper on change hook
	$("#divout").html("$$"+ el.value+"$$");
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])
}

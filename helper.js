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

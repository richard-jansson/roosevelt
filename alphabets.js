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
var alphabets=[];

// https://math-demo.abitti.fi/sv
// https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode

alphabets["math"] = 

	["α","β","γ",
	"x","y","z",
	"a","b","c",
	"u","v",
	"π","λ","ω",
	"η",
	"0",",",".",
	"1","2","3",
	"4","5", "6",,
	"7","8","9",
	"f(x)",
	"f'(x)",
	// FIXME how to format?
	"f\"&nbsp;(x)",
	"dx",
	"dy",
	{n:"dx/dy",c:"\\frac{dx}{dy}",m:"<mfrac><mi>a</mi><mi>b</mi></mfrac>"},
	{n:"∫",c:"\\int"},
	{n:"<xs>a</xs><br/><sm>∫</sm><br/><xs>b</xs>",c:"\\int_{a}^{b}"},
	{n:"∑",c:"\\sum"},
	{n:"<xs>a</xs><br/><sm>∑</sm><br/><xs>b</xs>",c:"\\sum_{a}^{b}"},
	 "²",
	"³",
	"^",
	"=",
	"+",
	"-",
	// how to differentiate between divisions??
	"/",
	{n:"/",c:"\\frac{a}{b}"},
	"(",
	")",
	// How to display in understandable way, add alt??
	{n:"x<sub>y<sub>",c:"x_{y}",alt:"subscript"},
	{n:"x<sub>0<sub>",c:"x_{0}",alt:"subscript"},
	{n:"x<sub>1<sub>",c:"x_{1}",alt:"subscript"},
	{n:"x<sub>2<sub>",c:"x_{2}",alt:"subscript"},
	{n:"⏎",c:"\\\\\r\n"},
	{n:"√",c:'\\sqrt{}'},
	// FIXME possible to get a better latex rendering, https://tex.stackexchange.com/questions/49043/nice-looking-p-th-roots#49045
	{n:"n√",c:'\\sqrt[n]{}'},
	"^" ,
	"ln(x)",
	"log(x)",
	"↔",
	"↔",
	 "·","±","∞",
	 "²",
	"³",
	"½","⅓","≠",
	"≈","&lt","&gt","≤","≧",
	"∢","|","‖","→",
	"⇔",
	"⇒",
	"⇐",
	"sin(x)",
	"cos(x)",
	"tan(x)",
	{ n:"sin<sup>-1</sup>(x)",c: "sin^{-1}(x)"},
	{ n:"cos<sup>-1</sup>(x)",c: "cos^{-1}(x)"},
	"∈","ℤ","ℝ","ℂ",
	"P","T","Δ","ρ",
	"kJ","kg","K","°","l","min","cm",
	"W","kW","mW","MW",
	"R","I","U","V","Ω","A",

	"½","⅜",
	{n:"x",c:"\\vec{x}"}
	];

alphabets["matho"] = ["α","β","γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ",
	"0","1","2","3",
	"4","5","6","7",
	"8","9",
	",",".",
	"+","-","*","/",
	 "·","±","∞",
	 "²",
	"³",
	"½","⅓","≠",
	"≈","&lt","&gt","≤",
	"∢","|","‖","→",
	"f(x)",
	"f'(x)",
	"f''(x)",
	"dx","dy",
	{n:"dx/dy",c:"\\frac{dx}{dy}"},
	"∈","ℤ","ℝ","ℂ",
	"=","[","]","[]",
	"|","||","","",
	"(",")","()","∈",
	{n:"∑",c:"\\sum"},
	{n:"<xs>a</xs><br/><sm>∑</sm><br/><xs>b</xs>",c:"\\sum_{a}^{b}"},
	{n:"∫",c:"\\int"},
	{n:"<xs>a</xs><br/><sm>∫</sm><br/><xs>b</xs>",c:"\\int_{a}^{b}"},
	{n:"∑",c:"\\sum"},
	{n:"<xs>a</xs><br/><sm>∑</sm><br/><xs>b</xs>",c:"\\sum_{a}^{b}"},
	{n:"∫",c:"\\int"},
	{n:"<xs>a</xs><br/><sm>∫</sm><br/><xs>b</xs>",c:"\\int_{a}^{b}"},
	{n:"sin",c:"\\sin{x}"},
	{n:"cos",c:"\\cos{x}"},
	{n:"tan",c:"\\tan{x}"},
	{n:"√",c:'\\sqrt{}'},"^" ,"↔",
	{n:"/",c:"\\frac{a}{b}"},
	{n:"⏎",c:"\\\\\r\n"},
	["→","⇒", "γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ",
	],
// The deep one
	"α","β","γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ", 
	"α","β","γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ", 
	"α","β","γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ" 
	]


if(typeof(exports)!="undefined") exports.raw = raw;

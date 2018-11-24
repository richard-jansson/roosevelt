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

	[
	// 4x3 cell one
	"0","1","2","4",
	"5","6","7","8",
	"9","0",",",".",

	"α","β","γ",'Δ',
	"ρ","π","σ","λ",
	"μ","Ω","φ","σ",
	
	"\\frac{a}{b}",
	"/","+","-",
	"*",
	"\\cdot",
	"=",
	"≈",
	"&lt","&gt","≤","≧",
	"\\int",
	"\\int_{a}^{b}",
	"\\frac{dx}{dy}",
	"dx","dy",
	"f(x)","f'(x)","f''(x)",
	"\\sum", "\\sum_{a}^{b}", "\\prod", "\\prod_{a}^{b}",

	"x^2",
	"x^3",
	"x^y",
	"\\sqrt{x}",
	"\\sqrt[3]{x}",
	"\\sqrt[n]{x}",
	"\\log{x}",
	"\\log_n{x}",

	"\\lim_{x \\to y}",
	"\\to",
	"\\infty",
	"",

	"\\sin(x)",
	"\\cos(x)",
	"\\tan(x)",
	"",


	"\\sin^{-1}(x)",
	"\\cos^{-1}(x)",
	"\\tan^{-1}(x)",
	"",
	"\\theta","\\phi","\\pi","2\\pi",


// http://w2.syronex.com/jmr/tex/texsym.old.html
	"\\equiv","\\approx","\\simeq","\\neq",
	"\\geq","\\leq","<",">",
	"\\Rightarrow","\\Leftarrow","\\Leftrightarrow","",

	"\\exists","\\forall", "\\in","\\notin",
	"\\cap","\\cup","\\supset","\\subset",
	"\\emptyset","\\mathbb{Z}",
	"\\mathbb{R}",
	"\\mathbb{C}",

	{n:"⏎",c:"\\\\\r\n"},
	"\\begin{matrix}1&0\\\\1&0\\end{matrix}",
	"\\begin{bmatrix}1&0\\\\1&0\\end{bmatrix}",
	"\\begin{pmatrix}1&0\\\\1&0\\end{pmatrix}",
	"\\begin{vmatrix}1&0\\\\1&0\\end{vmatrix}",
			  "\\det{\\begin{vmatrix}1&0\\\\1&0\\end{vmatrix}}","\\left\(","\\right)",
	"\\vec{a}", "\\vec{b}", "\\vec{v}", "\\vec{g}"
	
	,"x_{y}","x_{0}","x_{1}","x_{2}",
	"P","T",
	"kJ","kg","K","°","l","min","cm",
	"W","kW","mW","MW",
	"R","I","U","V","Ω","A","",
	"",
	// will end up in two step layer 
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
	"α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","ς","τ","υ","φ","φ","ψ","ω",
	"Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"
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

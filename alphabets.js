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

alphabets["math"] = [
	// Quad {0,0]
	["α","β","γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ",
	],
	// Quad {1,0}
	[
	"0","1","2","3",
	"4","5","6","7",
	"8","9",",",".",
	"+","-","*","/"],
	// might want to consider to match these utf-8 symbols to latex commands
	[ "·","±","∞","²",
	"³","½","⅓","≠",
	"≈","&lt","&gt","≤",
	"∢","|","‖","→"],

	[
	"∈","ℤ","ℝ","ℂ",
	"=","[","]","[]",
	"|","||","","",
	"(",")","()","∈"
	],

	// n - what is displayed 
	// c - what is inserted

	[
	{n:"∑",c:"\\sum"},{n:"<xs>a</xs><br/><sm>∑</sm><br/><xs>b</xs>",c:"\\sum_{a}^{b}"},
	{n:"∫",c:"\\int"},{n:"<xs>a</xs><br/><sm>∫</sm><br/><xs>b</xs>",c:"\\int_{a}^{b}"},
	{n:"∑",c:"\\sum"},{n:"<xs>a</xs><br/><sm>∑</sm><br/><xs>b</xs>",c:"\\sum_{a}^{b}"},
	{n:"∫",c:"\\int"},{n:"<xs>a</xs><br/><sm>∫</sm><br/><xs>b</xs>",c:"\\int_{a}^{b}"},
	{n:"sin",c:"\\sin{x}"},{n:"cos",c:"\\cos{x}"},{n:"tan",c:"\\tan{x}"}

	],
	[{n:"√",c:'\\sqrt{}'},"^" ,"↔",{n:"/",c:"\\frac{a}{b}"}],
	[{n:"⏎",c:"\\\\\r\n"}],

	["→","⇒", "γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ",
	],

	["α","β","γ","Δ",
	"x","y","z","a",
	"b","c","d","e",
	"π","ρ","δ","μ",
	],
]

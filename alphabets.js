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
	[{n:"√",c:'\\sqrt{}'},"^" ],

	[{n:"⏎",c:"\\\\\r\n"}],

	[{n:"∑",c:"\\sum"},{n:"∫",c:"\\int"},{n:"<xs>a</xs><br/><sm>∫</sm><br/><xs>b</xs>",c:"\\int_{a}^{b}"}],

	["→","⇒"]
]

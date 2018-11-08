# Roosevelt 
Write math on a computer in a less painful manner. 

Youtube for demo: 

[PQ formula](https://youtu.be/LHp7HCPdexk)
[Narrated](https://youtube.com/video/vGuWZdh7EQk)


Every grid is bound to keys below, see configuration for changing the default. 

1 2 3 4  

q w e r  

a s d f  

z x c v 


The keyboard has a state, describing how far into the tree the user has selected. 

Turns out that this gives us the possibility to have quite a few symbols with very few keypresses. As basic math tells you 12 to the power of two gives us 144 options. 


## Demo

# Configuration 
There are two ways which the program is configured. 

## Bindings

For keybindings, edit the index.html file find the ufo element and edit. 

bind\_select\_quad, argument should be a JSON / javascript array of strings, which correspond to the key attribute on a javascript event object.
bind\_reset, 	Reset the field 
bind\_hide, 	Key that will toggle visibility of keyboard. 

## Set / alphabet 

Currently what we are doing is to enter math, more specifically to map our keyboard grid system to latex commands. Even though Roosevelt makes use of the MathJAX system which supports, ASCIIMath, MathML & Latex. 

## Libraries 

With the help of some really good libraries a lot of functionality which is crucial to the experience have been implemented quickly. 

## jQuery 
DOM manipulation, bindings etcetera. Well tested.   
[jquery.com](https://jquery.com/)

## jQuery UI 
- dragging the keyboard around on the screen 
- resizing it, note that there's a bug in the south east corner 

[jqueryui.com](https://jqueryui.com/)

## Math Jax 
Really good library for presenting math formulas. Enables support for the following, more or less out of the box. 

- Latex support 
- copy paste 
- doesn't use images

[mathjax.org](https://mathjax.org)

## Previous efforts
[Old version in C for linux, broken windows version exists](https://github.com/richard-jansson/veta
)

Math tests in nationwide tests in Finland is about to be computerized. A program that's a part of this suite can be found here. 

[math-demo.abitti.fi/](https://math-demo.abitti.fi/)


# Boring stuff
Released under GPL 2.0, see  license.txt

Copyright (C) 2018  Richard Jansson

No warranty what so ever.

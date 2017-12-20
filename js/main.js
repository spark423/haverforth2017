// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var words = {"circle": circle, "redcircle": redcircle, "line": line, "triangle": triangle, "rectangle": rectangle, "+": plus, "-": minus, "*": multiply, "/": divide, "dup": dup, "drop": drop, "swap": swap, "over": over, "rot": rot, "nip": nip, "tuck": tuck, ">": leftInequality, "<": rightInequality, "=": equal};
var shapes = ["circle", "triangle", "rectangle", "redcircle", "line"]

/** 
 * Your thoughtful comment here.
 */
 //7. I placed a debugger line in my while loop inside of repl function. Along with a log of the array I am building up inside the loop, the debugger 
 // allows me to step through the loop one iteration at a time and log and witness if my array is being updated in the expected manner before it is 
 // parsed and passed on to my template function that will apply the operations in the aforementioned array one at a time using a for loop. 
 // It is very convenient to be able to debug the backend code in a console side by side with the output of the front-end html.

 //8. Redoing the project in Javascript has allowed me to connect my forth-related operations with a more frontward facing user interface, which provided
 // new perspectives regarding front-end minded coding by having to consider an extra layer in terms of making data visible and presentable 
 // to the user on the front-end side.

 //  The lack of types has made debugging difficult at times and led me into mistakes that could have been easily avoided or prevented
 // had there been strict type enforcement. A good example would be when I initially applied an array method (.incldudes) on the variable 
 // words detailed above, which led to an error in my process function.

 //  While I may be biased due to my frequent use of Javascript, I find the lack of types convenient as it helps me speed of the process of building
 // out the general layout of my project and ironing out how the various functions feed into one another.

 //  Similar to how I employed class specific methods to class instance objects in C++, I employed many object specific methods for arrays such as .pop()
 // and .includes(). I was able to implement the concept of closures in my JS project when I nested anonymous functions in the click methods for 
 // html components like the reset button. 
class Stack {
  constructor() {
    this.stack = [];
    this.size = 0;
  }
  // Getter
  // Method
  push(newTop) {
    this.stack.push(newTop);
    this.size += 1;
  }

  pop() {
  	this.stack.pop();
  	this.size -= 1;
  }

}

class observableStack extends Stack {
	constructor() {
		super();
		this.handlers = [];
	}

	register(observer) {
		this.handlers.push(observer)
	}

	push(newTop) {
    this.stack.push(newTop);
    this.size += 1;
    this.handlers.forEach(function(observer){observer()})
	}

	pop() {
  	var oldTop = this.stack.pop();
  	this.size -= 1;
    this.handlers.forEach(function(observer){observer()})
    return oldTop 
	}
}

function validif(array) {
	var ifcounter = 0;
	var elsecounter = 0;
	var endifcounter = 0;
	for (var i=0; i<array.length; i++) {
		if (array[i] === "if") {
			ifcounter += 1;
		}
		if (array[i] === "else") {
			elsecounter += 1;
		}
		if (array[i] === "endif") {
			endifcounter += 1;
		}
	}
	return ifcounter > 0 && elsecounter > 0 && endifcounter > 0 && ifcounter === elsecounter && elsecounter === endifcounter;
}

function elsematcher(array) {
	var i = 0
	var ifcounter = 0
	var elsecounter = 0
	while (!(ifcounter > 0 && elsecounter >0 && ifcounter === elsecounter)) {
		if (array[i] === "if") {
			ifcounter += 1
		}
		if (array[i] === "else") {
			elsecounter += 1
		}
		i += 1
	}
	return i-1;
}

function endifmatcher(array) {
	var i = 0
	var ifcounter = 0
	var endifcounter = 0
	while (!(ifcounter > 0 && endifcounter > 0 && ifcounter === endifcounter)) {
		if (array[i] === "if") {
			ifcounter += 1
		}
		if (array[i] === "endif") {
			endifcounter += 1
		}
		i += 1
	}
	return i-1;
}


function iftemplate(stack, procedures, terminal, ctx) {
	var ifindex = procedures.indexOf("if");
	var elseindex = elsematcher(procedures);
	var endifindex = endifmatcher(procedures);
	var conditions = procedures.slice(0,ifindex);
	var ifstatement = procedures.slice(ifindex+1,elseindex);
	var elsestatement = procedures.slice(elseindex+1,endifindex);
	var postif = procedures.slice(endifindex+1);
	template(stack, conditions, terminal, ctx);
	var condition = stack.pop();
	if (condition === -1) {
		template(stack, ifstatement, terminal, ctx);
	} else {
		template(stack, elsestatement, terminal, ctx);
	}
	template(stack, postif, terminal, ctx);
}

function template(stack, procedures, terminal, ctx) {
	if (procedures.includes("if")) {
		iftemplate(stack, procedures, terminal, ctx)
	} else {
    for (var i=0; i<procedures.length; i++) {
      process(stack, procedures[i], terminal, ctx)
    }
	}
}

function circle(stack, terminal, ctx) {
	if (stack.length < 3) {
		print(terminal, "Not enough elements on the stack!");
	} else {
		console.log("here")
    var first = stack.pop();
    var second = stack.pop();
    var third = stack.pop();
    ctx.fillStyle = 'white';    
    ctx.beginPath();
    ctx.arc(second, third, first, 0, 2* Math.PI);
    ctx.fill();
    ctx.stroke();
  }	
}


function redcircle(stack, terminal, ctx) {
	if (stack.length < 3) {
		print(terminal, "Not enough elements on the stack!");
	} else {
    var first = stack.pop();
    var second = stack.pop();
    var third = stack.pop();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(second, third, first, 0, 2* Math.PI);
    ctx.fill();
  }	
}

function triangle(stack, terminal, ctx) {
	if (stack.length < 6) {
		print(terminal, "Not enough elements on the stack!");
	} else {
    var first = stack.pop();
    var second = stack.pop();
    var third = stack.pop();
    var fourth = stack.pop();
    var fifth = stack.pop();
    var sixth = stack.pop();		
		ctx.beginPath()
		ctx.moveTo(first, second);
		ctx.lineTo(third, fourth);
		ctx.lineTo(fifth, sixth);
		ctx.closePath();
		ctx.stroke();  
	}
}

function rectangle(stack,terminal,ctx) {
	if (stack.length < 8) {
		print(terminal, "Not enough elements on the stack!");
	} else {
    var first = stack.pop();
    var second = stack.pop();
    var third = stack.pop();
    var fourth = stack.pop();
    var fifth = stack.pop();
    var sixth = stack.pop();
    var seventh = stack.pop();
    var eighth = stack.pop();
		ctx.beginPath()
		ctx.moveTo(first, second);
		ctx.lineTo(third, fourth);
		ctx.lineTo(fifth, sixth);
		ctx.lineTo(seventh, eighth);		
		ctx.closePath();
		ctx.stroke();  
	}	
}

function line(stack, terminal, ctx) {
	if (stack.length < 4) {
		print(terminal, "Not enough elements on the stack!");
	} else {
    var first = stack.pop();
    var second = stack.pop();
    var third = stack.pop();
    var fourth = stack.pop();
		ctx.beginPath()
		ctx.moveTo(first, second);
		ctx.lineTo(third, fourth);
		ctx.closePath();
		ctx.stroke();  
	}	
}

function plus(stack, terminal) {
	if (stack.length < 2) {
		print(terminal, "Not enough elements on the stack!");
	} else {
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first+second);
  }
}

function minus(stack, terminal) {
  if (stack.length < 2) {
    print(terminal, "Not enough elements on the stack!");
  } else {
    var first = stack.pop();
    var second = stack.pop();
    stack.push(second-first);
  }      
}

function multiply(stack, terminal) {
	if (stack.length < 2) {
    print(terminal, "Not enough elements on the stack!");
  } else {
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first*second);
  }
}

function divide(stack, terminal) {
	if (stack.length < 2) {
    print(terminal, "Not enough elements on the stack!");
  } else {
    var first = stack.pop();
    var second = stack.pop();
    stack.push(second/first);
  }
}

function dup(stack, terminal) {
    if (stack.length < 1) {
      print(terminal, "Not enough elements on the stack!")
    } else {
    	var top = stack.pop();
      stack.push(top);
      stack.push(top);
    }
}

function drop(stack, terminal) {
    if (stack.length < 1) {
        print(terminal, "Not enough elements on the stack!");
    } else {
        stack.pop()
    }    
}

function swap(stack, terminal) {
    if (stack.length < 2) {
        print(terminal, "Not enough elements on the stack!");
    } else {
        var oldtop = stack.pop()
        var newtop = stack.pop()
        stack.push(oldtop)
        stack.push(newtop)
    }    
}

function over(stack, terminal) {
    if (stack.length < 2) {
        print(terminal, "Not enough elements on the stack!");
    } else {
        stack.push(stack[stack.length-2])
    }    
}

function rot(stack,terminal) {
    if (stack.length < 3) {
        print(terminal, "Not enough elements on the stack!");
    } else {
        var oldtop = stack.pop()
        var secondtop = stack.pop()
        var newtop = stack.pop()
        stack.push(secondtop)
        stack.push(oldtop)
        stack.push(newtop)
    }        
}

function leftInequality(stack, terminal) {
    if (stack.length < 2) {
        print(terminal, "Not enough elements on the stack!");
    } else {
        var top = stack.pop()
        var secondTop = stack.pop()
        if (secondTop > top) {
            stack.push(-1)
        } else {
            stack.push(0)
        }
    }
}

function rightInequality(stack, terminal) {
    if (stack.length < 2) {
      print(terminal, "Not enough elements on the stack!");
    } else {
        var top = stack.pop()
        var secondTop = stack.pop()
        if (secondTop < top) {
            stack.push(-1)
        } else {
            stack.push(0)
        }
    }
}


function equal(stack, terminal) {
    if (stack.length < 2) {
      print(terminal, "Not enough elements on the stack!");
    } else {
        var top = stack.pop()
        var secondTop = stack.pop()
        if (secondTop === top) {
            stack.push(-1)
        } else {
            stack.push(0)
        }
    }
}

function nip(stack, terminal) {
    swap(stack, terminal)
    drop(stack, terminal)
}

function tuck(stack,terminal) {
    swap(stack, terminal)
    over(stack, terminal)
}


function emptyStack(stack) {
    while (stack.size > 0) {
        stack.pop();
    }
}

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}

/** 
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */
function renderStack(stack) {
    if (stack.size > 0) {
        $("#thestack").empty();
        stack.stack.slice().reverse().forEach(function(element) {
            $("#thestack").append("<tr><td>" + element + "</td></tr>");
        });
    } else {
        $("#thestack").empty();
        $("#thestack").append("<tr><td>empty</td></tr>");      
    }
};

/** 
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */
function process(stack, input, terminal, ctx) {
	console.log("input", input)
    // The user typed a number
    if (!(isNaN(Number(input)))) {
        print(terminal,"pushing " + Number(input));
        stack.push(Number(input));
    } else if (shapes.includes(input)) {
      print(terminal,"performing " + input);   	
      words[input](stack,terminal,ctx);
    } else if (Object.keys(words).includes(input)) {
         print(terminal,"performing " + input);   	
        words[input](stack,terminal)
    } else {
        print(terminal, ":-( Unrecognized input");
    }
};

function runRepl(terminal, ctx, stack) {
    terminal.input("Type a forth command:", function(line) {
    	if (line.length === 0) {
    		runRepl(terminal, stack);
    	} else {
        var inputs = line.trim().split(/ +/)
        print(terminal, "User typed in: " + line);
        i = 0
        while (i<inputs.length) {
            if (inputs[i] === ":") {
                var functionInputs = []
                j = i
                while (inputs[j] != ";" && j < inputs.length) {
                    if (j === inputs.length - 1) {
                        functionInputs = []
                        j += 1
                    } else if (inputs[j] === "if") {
                    	var iffunctionInputs = []
                    	k = j
                    	while (!validif(iffunctionInputs) && k < inputs.length) {
                    		if (k === inputs.length - 1) {
                    			functionInputs = []
                    			iffunctionInputs = []
                          k += 1
                    		} else {
                    			iffunctionInputs.push(inputs[k])
                    			k += 1
                    		}
                    	}
                    	functionInputs = functionInputs.concat(iffunctionInputs);
                    	j = k
                    } else {
                        functionInputs.push(inputs[j])
                        j += 1
                    }
                }
                if (functionInputs.length>1) {
                    functionInputs = functionInputs.slice(1)
                    words[functionInputs[0]] = function(astack,terminal) {template(astack, functionInputs.slice(1), terminal, ctx)};
                    print (terminal, "User defined new function " + functionInputs[0] + "!")
                    $("#user-defined-funcs").append('<a class="btn btn-success" href="#" role="button" id="' + functionInputs[0] + '">' + functionInputs[0] + '</a>');
                    $("#"+functionInputs[0]).click(function() {process(stack, functionInputs[0], terminal, ctx)})
                    i = j + 1  
                } else {
                    print (terminal, "Exiting function definition due to incorrect syntax")
                    i = j
                }
            } else {
                process(stack, inputs[i], terminal, ctx)
                i += 1
            }
        }   
        runRepl(terminal, ctx, stack);
      }
    });       
};

// Whenever the page is finished loading, call this function. 
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);
    
    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);

    var stack = new observableStack();
    var observeChange = function() {renderStack(stack)};
    stack.register(observeChange);
    var reset = $("#reset")
    reset.click(function(){emptyStack(stack)});     
    var canvas = $('canvas');
    canvas.css("border", "1px solid black")
    var ctx = canvas[0].getContext('2d');

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, ctx, stack);
});

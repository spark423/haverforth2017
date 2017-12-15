// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var words = {"+": plus, "-": minus, "*": multiply, "/": divide, "dup": dup, "drop": drop, "swap": swap, "over": over, "rot": rot, "nip": nip, "tuck": tuck, ">": leftInequality, "<": rightInequality, "=": equal};
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

function template(stack, procedures, terminal) {
    for (var i=0; i<procedures.length; i++) {
        process(stack, procedures[i], terminal)
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
        stack.push(stack[stack.length - 1])
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

    } else {
        var top = stack.pop()
        var secondTop = stack.pop()
        if (secondtop > top) {
            stack.push(-1)
        } else {
            stack.push(0)
        }
    }
}

function rightInequality(stack, terminal) {
    if (stack.length < 2) {

    } else {
        var top = stack.pop()
        var secondTop = stack.pop()
        if (secondtop < top) {
            stack.push(-1)
        } else {
            stack.push(0)
        }
    }
}


function equal(stack, terminal) {
    if (stack.length < 2) {

    } else {
        var top = stack.pop()
        var secondTop = stack.pop()
        if (secondtop === top) {
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
    while (stack.length > 0) {
        stack.pop();
    }
    $("#thestack").empty();    
    $("#thestack").append("<tr><td>empty</td></tr>")
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
    if (stack.length > 0) {
        $("#thestack").empty();
        stack.slice().reverse().forEach(function(element) {
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
function process(stack, input, terminal) {
    // The user typed a number
    if (!(isNaN(Number(input)))) {
        print(terminal,"pushing " + Number(input));
        stack.push(Number(input));
    } else if (Object.keys(words).includes(input)) {
         print(terminal,"performing " + input);   	
        words[input](stack,terminal)
    } else {
        print(terminal, ":-( Unrecognized input");
    }
    renderStack(stack);
};

function runRepl(terminal, stack) {
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
                        print(terminal, "Must finish function definition with ;!");
                        while (functionInputs.length > 0) {
                            functionInputs.pop()
                        }
                        j += 1
                    } else {
                        functionInputs.push(inputs[j])
                        j += 1
                    }
                } 
                if (functionInputs.length>1) {
                    functionInputs = functionInputs.slice(1)
                    words[functionInputs[0]] = function(astack,terminal) {template(astack, functionInputs.slice(1), terminal)}
                    print (terminal, "User defined new function " + functionInputs[0] + "!")
                    $("#user-defined-funcs").append('<a class="btn btn-success" href="#" role="button" id="' + functionInputs[0] + '">' + functionInputs[0] + '</a>');
                    $("#"+functionInputs[0]).click(function() {process(stack, functionInputs[0], terminal)})
                    i = j + 1  
                } else {
                    print (terminal, "Exiting function definition due to incorrect syntax")
                    i = j
                }
            } else {
                process(stack, inputs[i], terminal)
                i += 1
            }
        }   
        runRepl(terminal, stack);
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

    var stack = [];
    var reset = $("reset")
    $("#reset").click(function(){emptyStack(stack)});     

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, stack);
});

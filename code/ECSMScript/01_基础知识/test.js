sayHi("ixfosa"); // ReferenceError: Cannot access 'sayHi4' before initialization
var sayHi = function(name) {  // (*) no magic any more
    console.log( `Hello, ${name}` );
};
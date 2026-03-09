
    - 1️⃣ What is the difference between var,let, and const?
        var:
            - Declares variables with function or global scope.
            - variables can be reassigned another value.
            - allows re-declaration.
        let: 
            - Declares variables with block scope.
            - variables can be reassigned another value.
            - not allows re-declaration .
        const:
            -  Declares block-scoped variables.
            -  variables that cannot be reassigned another value.
             - not allows re-declaration .

    - 2️⃣ What is the spread operator (...)?
        The spread operator (...) is the way to expand elements from arrays, strings, or objects.
        it used for copying and merging arrays or objects without mutating the original data.
        it is introduce in ES6

    - 3️⃣ What is the difference between map(), filter(), and forEach()?
        map():
            - returns a new array with the transformed elements.
            - not modify the original array.
            - used for creating new arrays with modified data based on the original array.

        filter():
            - returns a new array with elements that satisfy the provided test function.
            - not modify the original array.
            - used for creating a subset of the original array based on certain criteria.

        forEach():
            - forEach does not return a new array. it returns undefined.
            - not modify the original array.
            - used for side effects like logging, updating variables, or modifying elements in place.
     
    - 4️⃣ What is an arrow function?
        Arrow function is the shorter syntax for writing functions, it's uses the (=>) syntax instead of the function keyword.
        If the function body has only one expression, the return is implicit (no need for return keyword). it introduce in ES6.
        Syntex:  const sum = (num1, num2) => num1 + num2;


    - 5️⃣ What are template literals? 
        - It's the way to write strings using backticks (``) instead of quotes.
        - Allow embedding expressions/variables directly inside strings using ${}. 
        - Support multi-line strings without needing \n.

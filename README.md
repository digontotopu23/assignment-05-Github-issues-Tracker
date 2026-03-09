### 1 Difference between `var`, `let`, and `const`

* **`var`**: The traditional way to declare variables. It is function-scoped and can be redeclared, which often leads to unexpected bugs due to hoisting.
* **`let`**: Block-scoped, meaning it only exists within the `{}` where it is defined. It allows the value to be updated but prevents redeclaring the variable in the same scope.
* **`const`**: Also block-scoped but used for variables that should not be reassigned. It makes the code more predictable and prevents accidental data overwrites.

### 2 Spread Operator (`...`)

The spread operator is a powerful tool used to "unpack" or spread elements of an array or object.
* **Usage**: It’s perfect for creating shallow copies of arrays or merging multiple objects into one without mutating the original data. In this project, it helps in handling data arrays efficiently.



### 3 `map()`, `filter()`, and `forEach()`
These are the most used array methods for data manipulation:
* **`map()`**: Iterates through an array and returns a **new array** by transforming each element. Used when we need to display a modified list of data.
* **`filter()`**: Creates a **new array** containing only the elements that meet a specific condition. (Example: Filtering "Open" vs "Closed" issues).
* **`forEach()`**: Executes a function for each element but **does not return anything**. It’s used when we just need to perform an action (like logging or updating the DOM) for every item.

### 4 Arrow Functions
Arrow functions provide a more concise syntax for writing function expressions using the 
`=>` operator.
* **Benefit**: They make the code cleaner and more readable. Unlike regular functions, they don't have their own `this` context, which is very useful when working with event listeners or callbacks inside this tracker.

### 5 Template Literals
Template literals allow for much easier string manipulation using backticks (`` ` ``).
* **Features**: They support **String Interpolation** (inserting variables directly via `${variable}`) and **Multi-line strings**. This was heavily used in this project to inject dynamic HTML cards into the DOM.

---

## Question

Create a function `repeatAsync` , which takes in 4 arguments: `func`, `count`, `interval`, and `done`. The argument `func` is a function that takes in no arguments, and returns a single value. The `repeatAsync` function should invoke the given `func` as many times as the given `count`, invoking one after another at every `interval` ms. Finally, `repeatAsync` should invoke the callback function `done`, which is its last argument, with an array containing the results of each invocation of `func` as the argument (after all the invocations of `func` are done).

**NOTE:** You cannot modify or add to the global state, or else no points will be given.

**Example:** Upon calling `repeatAsync(foo, 3, 500, bar)`, `foo` should be invoked after 500, 1000, and 1500 ms. Finally, after 1500ms, `repeatAsync` calls `bar` with the array containing the results of the three invocations of `foo` as the argument of `bar`.

```javascript
var count = 1;
function foo(){
    return count ++;
}
function bar(results){
    console.log(results.join(', '));
}

repeatAsync(foo, 3, 500, bar); // should print "1, 2, 3" after 1500ms
```

---

```javascript
'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
process.stdin.on('data', (chunk) => {
    inputString += chunk;
});
process.stdin.on('end', function() {
    let tokens = inputString.split(' ');
    let funcName = tokens[0];
    let testCount = parseInt(tokens[1]);
    let testInterval = parseInt(tokens[2]);
    
    let state = {
        count: 0,
        product: 1,
        text: ''
    };
    const testFuncs = {
        increment: function increment(){
            return state.count ++; 
        },
        multiply: function multiply(){
            state.product *= state.product + 1
            return state.product;
        },
        append: function append(){
            state.text += Math.random();
            return state.text;
        },
        random: function random(){
            return Math.random();
        }
    };
    
    runTest(testFuncs[funcName], testCount, testInterval);
});

/*
 * Complete the 'repeatAsync' function below.
 *
 * The function accepts the following parameters:
 *     func: Function
 *     count: Integer
 *     interval: Integer
 *     done: Function
 * The function should return undefined.
 */

function repeatAsync(func, count, interval, done) {
    
}

function runTest(testFunc, testCount, testInterval) {
    let vals = [];
    for (let i = 0; i < testCount; i++){
        vals.push(testFunc());
    }
    
    let promise = new Promise(function(resolve, reject){
        let i = 0;
        let stamps = [];
        let started = Date.now();
        repeatAsync(function(){
            stamps.push(Date.now() - started);
            return vals[i++];
        }, testCount, testInterval, function(result){
            let valuesMatch = result.length === vals.length && vals.reduce((acc, val, index) => acc && result[index] === val, true);
            let timesMatch = stamps.length === vals.length && stamps.reduce((acc, stamp, index) => acc && testInterval * (index + 1) - 10 < stamp && stamp < testInterval * (index + 1) + 10, true);
            resolve(valuesMatch && timesMatch);
        });
        
        setTimeout(function(){
            reject(new Error('done was not called within the expected time range'));
        }, testCount * testInterval + 1000);
    });
    
    promise.then(function(result){
        process.stdout.write(String(result));
    }).catch(function(err){
        process.stdout.write(String(err.message));
    });
}
```


## Solution

```javascript
function repeatAsync(func, count, interval, done) {
    var c = 0, result = [];
    var timer = setInterval(function(){
        result.push(func());
        c ++;
        if (c === count) {
            clearInterval(timer);
            done(result);
        }
    }, interval);   
}
```
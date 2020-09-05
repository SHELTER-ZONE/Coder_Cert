// Node.js compatibility
try {
  const atob = require('atob');
} catch(err) {
  console.error(err);
}

var testCases = new Map();

var userAns = [];
var userFunc = null;

const getHash=function(M,N=!1,T=1337){var D,z,O=void 0===T?2166136261:T;for(D=0,z=M.length;D<z;D++)O^=M.charCodeAt(D),O+=(O<<1)+(O<<4)+(O<<7)+(O<<8)+(O<<24);
    return N?("0000000"+(O>>>0).toString(16)).substr(-8):O>>>0},getTestCases=()=>{var M=atob("MDMwMzE1MTM0MTMwOS00NjAwNy8xMjEzNDk4NTMxMDM0NTAzMTQvNDM0MTM0ODk"+
    "wMTMyLzEzMTQxMzQwOTE4MzQxMzA0LzcyMzQ5MDM5ODQyMDk1ODIxOTU3MjU5ODIzNDEwMzg0MDIzNzg1OTIxNTcyNDk4NTczNDk3NTk0NTc2NDc5NS8wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA"+
    "vMTI3NjE2NDU5ODE0NTM0OTg1NzMyOTg1NzQzOTkxMjc1OTI3Mzk0MjM3NDkyODEzNDc4OTI0NTIwMTU3MjQ5NTcyOTA4NTcyOTA4NDcyMzQ3NjQzMi8xNzYxMjI0NTkwODU5MDI4NTkwMzg0MjAzOTQ"+
    "4MjA5ODQxOTA0ODExMjM5NzY0NS81NjM2OTgxNDY4NDA1LzU2MzY5ODE0Njg0MTU=").split("/"),N=atob("MjM4OTQxNDYxNC8yNzY5NzgyMTM0LzY0OTE0NjA5Ny8yMDA0MDMwMDEzLzQyMjQyM"+
    "zc2MTQvMTY3NjE2ODcyNC8yMjg2MDcyOTQ5LzkyMzgwMjc1OS80MjU3OTM5OTQ3LzQyOTE0OTUxODU=").split("/");
if(M.length!=N.length)throw"Error: Cannot load testcase datasets.";for(var T=0;T<M.length;)testCases.set(M[T],N[T]),T++};

function run(func) {
    var sampleAns = func('12345');
    if(typeof(sampleAns) != "string")
        throw 'run: Return value of given function is not type of string'
    if (sampleAns != '2353')
        throw 'run: Failed to pass sample testcase. Your answer is: ' + sampleAns + ' instead of 2353';

    getTestCases();
    userFunc = func;
    i = 1;
    for (let [key, value] of testCases.entries()) {
        let testCase = key, ansHash = value;
        result = userFunc(testCase);
        if (ansHash != null && getHash(result) != ansHash && i < 6)
            throw 'run: Failed to open lock #' + i + ', your solution is probably wrong.';
        
        userAns.push(ansHash);
        i++;
    }
}

function getPassword(userID) {
    if (typeof(userID) != 'string')
        throw 'getPassword: The given argument is not of type string';
    answer = userAns.join('') + userFunc(userID);
    return getHash(answer);
}

function encrypt(num) {
    if (typeof(num) != 'number')
        throw 'encrypt: The given argument is not a number';
    return (num >> 23) ^ 2333;
}

function solve(token) {
  // complete this function
}

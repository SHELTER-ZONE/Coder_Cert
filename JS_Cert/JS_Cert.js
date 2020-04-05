var testCases = new Map();

const getHash=function(M,z=!1,N=1337){var T,D,O=void 0===N?2166136261:N;for(T=0,D=M.length;T<D;T++)O^=M.charCodeAt(T),O+=(O<<1)+(O<<4)+(O<<7)+(O<<8)+(O<<24);
return z?("0000000"+(O>>>0).toString(16)).substr(-8):O>>>0},getTestCases=()=>{var M=atob("MDMwMzE1NDYwMDcvMTIzNDUvODkwMTMyLzEyNTYxNTYvNzIzNDk3NjQ3OTUvMTI3NjE"+
"2NDU3NjQzMi8xNzYxMjc2NDUvMTU2MS83Nzg1MjQyMC80NjEzMzE2NTQvNDgxMjMxNTYxLzk3Mzc2NzMxLzU2NDAwMzAwMC8xNTQ1NjQ1MDEyMzE1NjQ1NjMyMS81NjM2OTgxNDY4NDA1LzU2MzY5ODE0Njg"+
"0MTUvNTY0MTIzMTU0LzQ1NjEyMzEwMzEvMjAyMzE2NTQwNS8yMDkxMjMwODQyMTk3NTUyNC8zNDE0OTA4MzE1NzM1MTk1MzEwOTQ3MTMvMDAwMDAxMDEwMTAxMDEwMTAwMDEwMS8yMzE5MTI4MzAxMjUzODc"+
"3NTI5NDc4OTQ1NzMyNDUvMjEzOTgyMzAxOTIzODI5MzE4MjMvMzU5ODMwMjM4NTM5MjAzMTgwMC8zMTQ4MzQ4NDgwMDI4NDM4MjkyMDEwMy8yODA5NTI4NDU5MDQ4NjgwMzg1NzM3MjIvNTk4NTkyMDQyNDA"+
"1ODcxMzA0MTg5Lzk5OTIxNDE0MTM3MDQxODk1NzQ5ODc5NDcyODMvMTM5MjgwOTgxMzUwOTEzODUwOTMxODU5MDMxODUwOTEzLzMxOTQ4MTA5NDgyMTkzMDgxMjk0Mzc1ODEzOTc1MzE5NC80NjkwMjQ4Njk"+
"wMjgzMTA5MjM4NTE3ODE1MTczOTg1NzEzMzgxOTU3LzIzMTA5ODMxMDkyNTgwMTc1MzkwNTczOTQ4MTM5MDQ4OTEwMzc0OTA3MDMxNzQxMy8xMzQ5ODEzNTAzMTg0OTMxODQxMDM5NTczMTgwNTczMTg5NDE"+
"zODQ3LzMxNTMxOTA0ODMxMDg1OTc0MTg3MzA0NzE5MjQ3OTAzMTc0ODAzMTc0MTgzMDQ3MTM0MDcxMzQ=").split("/"),z=atob("MjE3MzM5MzU0OC8xNTQxNjUzNTgyLzM0ODczMTI5MzMvMzQ1Mzc1N"+
"zY5NS8zODQ4ODc2NTU1LzYzMTUyOTgzNS8xNjA4NzY0MDU4LzE1NDE2NTM1ODIvMzUwNDA5MDU1Mi8zNTkwMjQ0MzEzLzM3MjQ0NjUyNjUvMzcyNDQ2NTI2NS8yNjExNzMwMTYyLzE5NTM2OTcxNTYvNDI1N"+
"zkzOTk0Ny80MjkxNDk1MTg1LzI2Nzg2OTM1NDMvMTU3NTUwMzAxMC8yNzUzMDA0NTE1LzYxNDQ1ODAyNi8xNzUyMjE4NjMzLzI0MjM2MzA4MTAvNTk3NjgwNDA3LzM5NDk2ODkzNjQvMjA0MzgzODY5Mi82M"+
"TU1OTA4NTkvMjMyOTMxMzcyMi80MjU3NzkyODUyLzI1NDM0ODY4NTMvNTk3NjgwNDA3LzI0OTMxNTM5OTYvMTAwODgyMzY4Ny8xMDQyMzc4OTI1LzI5NTQ2MzAxMzMvOTc0MjgyNzEx").split("/");
if(M.length!=z.length)throw"Error: Cannot create testcase datasets.";for(var N=0;N<M.length;)testCases.set(M[N],z[N]),N++};

var userAns = [];
var userFunc = null;

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
        if (ansHash != null && getHash(result) != ansHash)
            throw 'run: Failed to open lock #' + i + ', your solution is probably wrong.';
        
        userAns.push(ansHash);
        i++;
    }
}

function getPassword(userID) {
    if (typeof(userID) != 'string')
        throw 'getPassword: The given argument is not of type string';
    answer = userAns.join('') + userfunc(userID);
    return getHash(answer);
}

function encrypt(num) {
    if (typeof(num) != 'number')
        throw 'encrypt: The given argument is not a number';
    return (num >> 23) ^ 2333;
}
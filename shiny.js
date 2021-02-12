/*
*   Function: Calculates the first 100 shiny number starting with n
*   Input: n as a starting point
*   Output: returns an array of 100 shiny numbers 
*   Assumptions: n is an integer, n >= 0, n !== undefined, single-digit numbers are shiny
*/

function shiny(n) {
    let currentNum = n;
    const shinies = [];

    while(shinies.length < 100) {
        const numString = currentNum.toString().split('');
        const digits = numString.map(Number);
        let isShiny = true;

        for(let i = 0; i < digits.length - 1 && isShiny; i++) {
            isShiny = digits[i] <= digits[i+1];
        }

        if(isShiny) {
            shinies.push(currentNum);
        }
        
        currentNum++;
    }

    return shinies;
}

// Change input value here to test other starting values
console.log(shiny(0));

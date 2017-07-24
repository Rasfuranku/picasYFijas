/**
 * Name: Picas y Fijas
 * Version: 1.0.0
 * Author: Frank Torres
 */

const digitsTochoose = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const theNumber = generateNumber();
var turn = 1;
var attempts = {};
var discardNumbers = []; //Discarded numbers
var baseAttempts = []; //Array of the three first attempts
var sumMatches = 0; //Sum of picas and fixed

/**
 * Generate Number
 * @param {Array} availableDigits
 * return an array of 4 different digits.
 */
function generateNumber(){
    var availableDigits = digitsTochoose;
    let numberContainter = [];
    
    var i=0;
    while( i<=3 ){
        let position = Math.floor(Math.random() * (availableDigits.length - 0) + 0);
        let index = availableDigits.indexOf(availableDigits[position]);
        
        if(index != -1){
            numberContainter.push(availableDigits[position]);
            availableDigits.splice(index, 1);
            i++;
        }

        if(availableDigits.length == 0)
            i=4;
    }
    var theNumber = numberContainter;

    return theNumber;
}

/**
 * Added the number of attempts relating the number, the number of picas and fixed.
 * It will increase its size by one.
 * Return an object with the following structure.
 * {
 *   1: {
 *     number: [1, 2, 3, 4],
 *     picas: int,
 *     fijas: int
 *   },
 *   2: {
 *    number: [1, 2, 4, 5],
 *    picas: int,
 *    fijas, int
 *   }
 * }
 */
function setAttempts(){
    var number = generateNumber();

    attempts[turn] = {
        number: number,
        picas: null,
        fixed: null
    }
    turn++;

    return attempts;
}

/**
 * Get fixed.
 * Return number of fixed digits.
 * @param {Array} theNumber 
 * @param {Array} attempts 
 */
function getFixed(theNumber, attempts){
    var fixed = 0;
    for(let i=0; i<attempts.length; i++){
        if(attempts[i] === theNumber[i]){
            fixed++;
        }
    }
    return fixed;
}

/**
 * Get Picas
 * Return number of Picas digits
 * @param {Array} theNumber 
 * @param {Array} attempts 
 */
function getPicas(theNumber, attempts){
    var picas = 0;
    for(let i=0; i<attempts.length; i++){
        if(theNumber.indexOf(attempts[i]) != -1 && theNumber.indexOf(attempts[i]) != i ){
            picas++;
        }
    }
    return picas;
}

function setBaseAttempts(){
    var actualDigits = generateNumber();
    if(turn <= 3){
        baseAttempts.push(actualDigits);
        turn++;
    }
    console.log(turn);
    return baseAttempts;
}

function guessNumber(theNumber, attempt){
    sumMatches = getPicas(theNumber, attempt) + getFixed(theNumber, attempt);
    if(sumMatches === 0)
        discardNumbers.push(attempt);
    return discardNumbers;
}

// var actual = generateNumber();
console.log(theNumber);
// console.log(actual);
// console.log("Picas: "+getPicas(theNumber, actual));
// console.log("Fijas: "+getFixed(theNumber, actual));
// console.log("discardNumber: "+guessNumber(theNumber, actual));

// console.log(setBaseAttempts());
// console.log(setBaseAttempts());
// console.log(setBaseAttempts());
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
function setAttempts(number, picas, fijas){

    attempts[turn] = {
        number: number,
        picas: picas,
        fixed: fijas
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
    return baseAttempts;
}

/**
 * Set the first 4 attempst.
 * lauch an array of 4 different digits.
 * Take the last two digits of the previous array and put it in an new array with two new digits,
 * until complete 4 attempts.
 */
function setTheory(){
    var firstAttempt = [];
    var list = [0,1,2,3,4,5,6,7,8,9];

    list = list.sort(function() {return Math.random() - 0.5});
    
    // TODO REFACTOR THIS
    var attempts = [
        [list[0], list[1], list[2], list[3]],
        [list[2], list[3], list[4], list[5]],
        [list[4], list[5], list[6], list[7]],
        [list[6], list[7], list[8], list[9]],
    ];
    return attempts;
}

/**
 * CheckSetTheory
 * Return an object with the 4 first attemps and the results comparing it with the number to guess
 * @param {Array} attempts 
 */
function checkSetTheory(attempts){
    var fourAttempts = {};
    for(var i=0; i<attempts.length; i++){
        var picas = getPicas(theNumber, attempts[i]);
        var fixed = getFixed(theNumber, attempts[i]);
        fourAttempts = setAttempts(attempts[i], picas, fixed);
    }

    return fourAttempts;
}

/**
 *  guessNumber evalue a arrays
 * @param {Array} theNumber 
 * @param {Object} attempts 
 */
function guessNumber(theNumber, attempts){
  /*  sumMatches = getPicas(theNumber, attempts) + getFixed(theNumber, attempts);
 /*   if(sumMatches === 0){
        discardNumbers.push(attempts);
    }else if(sumMatches === 1){
        
    }else if(sumMatches === 2){

    }else if(sumMatches === 3){

    }else if(sumMatches === 4){

    }*/

    var aux= [];

    for (var key in attempts) {
        sumMatches = attempts[key].picas + attempts[key].fixed;
        
        if(sumMatches === 4){
            aux.push(attempts[key].number);
        }
        if(sumMatches === 1){
            console.log("entro 1");
        }
        if(sumMatches === 2){
            console.log("entro 2");
        }
        if(sumMatches === 3){
            console.log("entro 3");
        }
        if(sumMatches === 0){
            
        }
    }
    
    
  //  return discardNumbers;
}

console.log(theNumber);
//console.log(checkSetTheory(setTheory()));
console.log(guessNumber(theNumber, checkSetTheory(setTheory())));


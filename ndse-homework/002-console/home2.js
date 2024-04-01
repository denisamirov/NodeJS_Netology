#!/usr/bin/env node

const { exit } = require('process');
var readline = require('readline');
var rl = readline.createInterface(
       process.stdin, process.stdout);
let numb = getRandomInt(0, 100);

console.log(`Загадано число в диапазоне от 0 до 100`);
rl.prompt();
rl.on('line', (num) => {

    if (num < numb) {
        console.log("Больше");
        rl.prompt();
    }

    if (num > numb) {
        console.log("Меньше");
        rl.prompt();
    }

    if (num == numb) {
        rl.close();
        console.log(`Отгадано число: ${num}`);
    }

});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  


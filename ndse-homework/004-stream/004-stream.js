#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
var readline = require('readline');
let numb = getRandomInt(1, 2);
var rl = readline.createInterface(
    process.stdin, process.stdout);



let reportFile = path.join(path.resolve('004-stream'), process.argv[2]);

console.log("Сыграй в игру 'Орел и решка';\nОрёл - 1; Решка -2; Выйти - exit");
// console.log(`${reportFile}`); path to file

rl.prompt();

rl.on('line', (num) => {
    numb = getRandomInt(1, 3);
    console.log(numb);

    if (num == numb) {
        console.log("You are win!");
        log("win");
    }

    if ((num > numb) || (num < numb)) {
        console.log("You are lose!");
        log("lose");
    }

    if (num == "exit") {
        rl.close();
        console.log(`Game end`);
    }});


function log(name) {
    let date = new Date().toUTCString();
    fs.appendFile(reportFile, `${date}\t\t${name}\n`, (err) => {
        if (err) throw Error(err)
        rl.prompt();
        });
    }


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }




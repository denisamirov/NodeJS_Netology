#!/usr/bin/env node

let first = process.argv[2];
let second = process.argv[3];
let third = process.argv[4];
let len = process.argv.length;
var today = new Date();
let dateDay = today.getDate();



if (first==="current" && len===3) {
    console.log(`${today.toUTCString()}`);
}

if (len === 4) {

    if ((second==="-y") || (second==="-year")) {
        console.log(today.getFullYear());
    }

    if ((second==="-m") || (second==="-month")) {
        console.log(today.getMonth());
    }

    if ((second==="-d") || (second==="-date")) {
        console.log(dateDay);
    }
}

if (len === 5) {
    if (first === "add" && second === "-d") {
        today.setDate(Number(dateDay) + Number(third))
        console.log(today.toUTCString());
    }

    if (first === "sub" && second === "-d") {
        today.setDate(Number(dateDay) - Number(third))
        console.log(today.toUTCString());
    }

    if (first === "add" && second === "-month") {
        today.setMonth(Number(today.getMonth()) + Number(third))
        console.log(today.toUTCString());
    }

    if (first === "sub" && second === "-month") {
        today.setMonth(Number(today.getMonth()) - Number(third))
        console.log(today.toUTCString());
    }
}
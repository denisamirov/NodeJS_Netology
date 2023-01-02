#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
let reportFile = path.join(path.resolve('004-stream'), process.argv[2]);
console.log(`\nАнализ файла ${reportFile}:\n`); //Выводится имя файла с расширением

fs.readFile(reportFile, "utf8", 
            function(error,data){
                if(error) throw error; // если возникла ошибка
                data = data.split('\n');  // выводим считанные данные
                numbPoint = data.length - 1; // количество партий всего
                let numbLose = 0; //количество проигранных партий
                for (let i = 0; i < data.length; i++) {
                    // console.log(data[i]); отладка
                    if (data[i].indexOf('lose') > 1) {
                        numbLose = numbLose + 1;
                    }
                    else {
                        continue
                    }
                }

                console.log(`Количество проигранных партий: ${numbLose}`);
                console.log(`Количество выйгранных партий: ${numbPoint - numbLose}`);
                console.log(`Процентное отношение выйгранных партий: ${(((numbPoint - numbLose)*100)/numbPoint).toFixed(2)} %\n`);

});
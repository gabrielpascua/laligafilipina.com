const readline = require('readline');

(async function(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const datePart = await new Promise(resolve => {
        rl.question('Enter a date: ', answer => {
            rl.close();
            resolve(answer.replaceAll('"', ''));
        });
    });
    console.log("===>", new Date(datePart).toISOString());
})()
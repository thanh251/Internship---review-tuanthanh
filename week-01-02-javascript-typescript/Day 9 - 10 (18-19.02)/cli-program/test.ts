import * as readline from 'readline'; 
const rl = readline.createInterface({
  input: process.stdin,  
  output: process.stdout, 
});

rl.question("What's your name? ", (name) => {
  console.log(`Hi ${name}!`); 
  rl.close(); 
});
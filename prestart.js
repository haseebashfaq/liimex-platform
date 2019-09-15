console.log('RUNNING PRESTART');
const fs = require('fs');
const readline = require('readline');

const start_string = '//start-replace-by-prestart//';
const end_string = '//end-replace-by-prestart//';

const file_path = 'client/assets/js/constants/config.constant.js';
const reader = readline.createInterface({
  input: fs.createReadStream(file_path)
});

const required_envs_keys = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'storageBucket',
    'messagingSenderId',
    'backofficeUrl'
];

const to_insert = [];

required_envs_keys.some(env_key => {
   if (!process.env[env_key]) {
        console.error(`PRESTART ERROR: Missing environment variable "${env_key}"`);
        return true;
   }
        to_insert.push(`      ${env_key}: "${process.env[env_key]}",`);
        return false;

});

let should_replace = false;
let output = "";
let count = 0;
function regenerate(){
  reader.on('line', line => {
    if(line.match(end_string)){
      should_replace = false;
    }
    if(should_replace === false){
      output = output.concat(line,'\n');
    } else if(should_replace === true){
      output = output.concat(to_insert[count],'\n');
      count++;
    }
    if(line.match(start_string)){
      should_replace = true;
    }
  });
}

regenerate();
setTimeout(() => {
  output.split('\n').slice(1).join('\n');
  fs.writeFile(file_path, output);
  console.log('PRESTART STATUS: Finished');
}, 500);


//Fs.writeFile('client/assets/js/app.js', output)

//
// Function read_app_js() {
//   Var data = fs.readFileSync('', 'utf-8');
//   //var newValue = data.replace(/^\./gim, 'myString');
//   //fs.writeFileSync('filelistSync.txt', newValue, 'utf-8');
//
//   Data = data.toString();
//   For(var line in data){
//     Console.log(data[line]);
//   }
//   Console.log('readFileSync complete');
// }
//
//
// Read_app_js();

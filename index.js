const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { exec } = require("child_process");
const dotenv = require('dotenv').config();
// defining the Express app
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/reboot/:apiKey', (req,res) => {
   if(req.params.apiKey === process.env.API_TOKEN){
       exec("sudo reboot", (error, stdout, stderr) => {
           if (error) {
               console.log(`error: ${error.message}`);
               return;
           }
           if (stderr) {
               console.log(`stderr: ${stderr}`);
               return;
           }
           console.log(`stdout: ${stdout}`);
       });
       res.end();
   }
});

app.get('/logs/flush/:apiKey', (req,res) => {
   if(req.params.apiKey === process.env.API_TOKEN){
       exec("pm2 flush", (error, stdout, stderr) => {
           if (error) {
               console.log(`error: ${error.message}`);
               return;
           }
		   
           if (stderr) {
               console.log(`stderr: ${stderr}`);
               return;
           }
           console.log(`stdout: ${stdout}`);
       });
       res.end();
   }
});

app.get('/allow/:newIp/:apiKey', (req,res) => {
    if(req.params.apiKey === process.env.API_TOKEN){
        exec(`ufw allow from ${req.params.newIp} to any port 80`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        res.end();
    }
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});

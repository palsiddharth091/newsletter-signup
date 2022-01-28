const express = require('express');
const app = express();
const body = require('body-parser');
const request = require('request');
const https = require('https');
app.use(body.urlencoded({ extended: true }));
app.use(express.static('public'));  // this is used to load up the folder containing static elements like css and images
let port = process.env.PORT; // process.env.PORT selects a dynamic port form the server to execute
app.post('/', function (req, res) {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields:
            {
                FNAME: name

            }
        }]
    }
    let jsonData = JSON.stringify(data);
    const url ='https://us20.api.mailchimp.com/3.0/lists/b61d36e3da';
    const options = {
        method: 'POST',
        auth:'palsiddharthkiit:fad670249914f4f53699dc65c31e3934-us20'
    }
   const request = https.request(url,options, function(response){
       if(response.statusCode==200)
       {
           res.sendFile(__dirname+'/success.html');
           response.on('data', function (data) {
               console.log(JSON.parse(data));
           })
       }
       else
       {
           res.sendFile(__dirname + '/failure.html');
       }
       
    })
    console.log(name);
    console.log(password);
    console.log(email);
    console.log('Working');
    request.write(jsonData);
    request.end();
})
app.post('/return',function(req,res)
{
    // res.sendFile(__dirname + '/signup.html'); 
    res.redirect("/");
})
app.get('/', function (req, res) { // req = request , res = response
    res.sendFile(__dirname + '/signup.html');
})
app.listen(port || 3000, function () { // this will print a message in the command line telling the server is wokring
    console.log(`Server is working in ${port}`);
})

// port || 3000 means it will work either on ${port} or on local port 3000 
// fad670249914f4f53699dc65c31e3934-us20
// b61d36e3da
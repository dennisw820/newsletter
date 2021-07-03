//Resources
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, response){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            } 
        ]
    };

    var jsonData = JSON.stringify(data);
    var url = `https://us6.api.mailchimp.com/3.0/lists/${process.env.audienceID}`;
    var username = 'mailchimp';

    var options = {
        method: 'POST',
        auth: `${username}: ${process.env.mailchimpApiKey}`    
    }

    const request = https.request(url, options, function(response){
        
        response.on('data', function(data){
            if(response.statusCode === 200){
                console.log(JSON.parse(data));
                res.sendFile(__dirname + '/success.html');
                // response.send('<div class="alert alert-success" role="alert">
                // <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                // <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                // </symbol>
                // Submission successful!
                // <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                // </div>');
            }
            else{
                res.sendFile(__dirname + '/failure.html');
                res.redirect(__dirname + '/index.html');
                // response.send('<div class="alert alert-danger" role="alert">
                // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                // <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                // </svg>
                // Submission unsuccessful. Please try again.
                // <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                // </div>')
            }

            request.write(jsonData);
            request.end();
        });
    });

    app.post('/failure', function (req, res){
        res.redirect('/');
    });

});

app.listen(process.env.PORT || 3000, function(){
    console.log('Sever is running on Port 4200.');
});
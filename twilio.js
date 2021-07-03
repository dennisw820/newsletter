    // Twilio API
    const accountSid = process.env.accountSid;
    const authToken = process.env.authToken;
    const client = require('twilio')(accountSid, authToken);

    var message = 'This is Ms. McKinney lmao.';
    var from = '16159051419';
    var to = '9546385037';

    client.messages.create({
        body: message,
        from: from,
        to: to
    }).then(message => console.log(message.sid));


    // // Twilio API
    // const accountSid = process.env.accountSid;
    // const authToken = process.env.authToken;
    // const client = require('twilio')(accountSid, authToken);

    // var message = 'This is Ms. McKinney lmao.';
    // var from = '16159051419';
    // var to = '9546385037';

    // client.messages.create({
    //     body: message,
    //     from: from,
    //     to: to
    // }).then(message => console.log(message.sid));
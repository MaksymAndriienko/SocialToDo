var nodemailer = require('nodemailer');

module.exports.sendMessage = function(email, subject, text){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: 'm.andriienko@gmail.com', 
            pass: 'Jojfo68Ddgs5!'  
        }
    });

    let mailOptions = {
        from: '"Fred Foo 👻" <m.andriienko@gmail.com>', 
        to: email, 
        subject: text, 
        text: text, 
        html: '<p>'+ text +'</p>' 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
}
const nodemailer = require('nodemailer');

const testEmail = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'psanjiv24@gmail.com',
                pass: 'Akiiki256',
            },
        });

        const mailOptions = {
            from: 'psanjiv24@gmail.com',
            to: 'kakiiki256@gmail.com',
            subject: `New contact from Test`,
            text: `Name: Test\nCompany: Test Company\nEmail: test@example.com\nPhone: 1234567890\nMessage: Hello, this is a test message.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

    } catch (error) {
        console.error('Error in test script:', error);
    }
};

testEmail();

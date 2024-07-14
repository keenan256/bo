const nodemailer = require('nodemailer');

export default async (req, res) => {
    console.log('Received a request at /api/contact');
    
    if (req.method !== 'POST') {
        console.log('Invalid request method:', req.method);
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    try {
        const { name, company, email, phone, message } = req.body;
        console.log('Form data received:', { name, company, email, phone, message });

        if (!name || !email || !phone || !message) {
            console.log('Missing required fields');
            return res.status(400).send({ message: 'Please complete the form and try again.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: 'kakiiki256@gmail.com',
            subject: `New contact from ${name}`,
            text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send({ message: 'Thank you! Your message has been sent.' });

    } catch (error) {
        console.error('Error in API handler:', error);
        res.status(500).send({ message: 'Oops! Something went wrong, and we couldn\'t send your message.' });
    }
};

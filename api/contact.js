const nodemailer = require('nodemailer');

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { name, company, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
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

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Thank you! Your message has been sent.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Oops! Something went wrong, and we couldn\'t send your message.' });
    }
};

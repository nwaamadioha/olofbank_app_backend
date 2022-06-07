import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'prosperfavor04@gmail.com',
        pass: 'QWASpolk123FGV56$$'
    },
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
});


const sendMail = async ({ to, subject, text }) => {
    await transporter.sendMail({from: " prosperfavor04@gmail.com", to, subject, text });
}

export default sendMail;
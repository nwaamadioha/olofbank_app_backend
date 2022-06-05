import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'prosperfavor04@gmail.com',
        pass: 'QWASpolk123FGV56$$'
    }
});


const sendMail = async ({ from, to, subject, html }) => {
    await transporter.sendMail({ from, to, subject, html });
}

export default sendMail;
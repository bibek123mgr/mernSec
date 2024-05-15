import nodemailer from 'nodemailer';

type OptionType = {
    to: string;
    subject: string;
    message: string;
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "bibekmagar746@gmail.com",
        pass: "hzcqlfwezjkfpfzk"
    }
})
const sendMail = async ({ option }: { option: OptionType }) => {
    await transporter.sendMail({
        from: '<bibekmagar746@gmail.com>',
        to: option.to,
        subject: option.subject,
        text: option.message
    })
}
export default sendMail



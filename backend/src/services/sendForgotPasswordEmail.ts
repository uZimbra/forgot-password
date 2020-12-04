import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  auth: {
    user: 'mail@gmail.com',
    pass: '123',
  },
  host: `smtp.gmail.com`,
  port: 587,
  secure: false
})

export async function sendMail(email: string, text: string){
  return await transporter.sendMail({
      text, 
      subject: "Redifinição de senha",
      from: `mail@gmail.com <mail@gmail.com>`,
      to:[email]
  });
}
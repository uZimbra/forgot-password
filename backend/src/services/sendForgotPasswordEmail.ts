import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  auth: {
    user: 'main@gmail.com',
    pass: '12345',
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
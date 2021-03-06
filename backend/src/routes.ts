import express from 'express';

import { verify } from 'jsonwebtoken';

import { sendMail } from './services/sendForgotPasswordEmail';
import generateToken from './services/generateToken';

const routes = express();

interface TokenPayLoad {
  iat: number;
  exp: number
  email: string;
}

routes.post('/send', async (req, res) => {
  const { email } = req.body;

  if (email == process.env.EMAIL_USER_TEST) {
    const generatedToken = generateToken(email);

    const hashedToken = Buffer.from(generatedToken).toString('base64');

    const redefinitionLink = `http://localhost:${process.env.PORT}/${hashedToken}`;

    const emailTemplate = (username: string, link: string) => `
     Hi ${username}!
     Click the link to change your password: ${link}
    `
    const template = emailTemplate( email, redefinitionLink )
    
    await sendMail(email, template);

    return res.json({ message: 'Success!' });

  } else {

    return res.json({ error: 'Invalid email/password!'})
  } 
});

routes.get('/:token', (req, res) => {
  const { token } = req.params;

  const unhashedToken = Buffer.from(token, 'base64').toString('ascii');

  try {
    const decodedToken = verify(unhashedToken, process.env.JWT_SECRET!) as TokenPayLoad;

    return res.json({ email: decodedToken.email });
  } catch (err) {

    return res.json({ error: 'Invalid link!'})
  } 
}) 

export default routes;
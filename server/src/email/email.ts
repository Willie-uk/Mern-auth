import { transporter, sender } from './email.config';
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_TEMPLATE,
} from './emailTemplate';

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
    });
    console.log('Verification email sent successfully', response);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Welcome!',
      html: WELCOME_TEMPLATE,
    });
    console.log('Welcome email sent successfully', response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
    });
    console.log('Password reset email sent successfully', response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log('Password reset success email sent successfully', response);
  } catch (error) {
    console.error('Error sending password reset success email:', error);
  }
};

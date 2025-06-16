export const VERIFICATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #000; padding: 5px; text-align: center; border-radius: 15px;">
    <p style="color: white; margin: 0; font-size: 20px;">Verify Your Email</p>
  </div>
  <div style="background-color: #f1f1f1; padding: 20px; border-radius: 0 0 30px 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Email verification,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 5 minutes for security reasons.</p>
    <p style="color:#881a1a;">If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your Tech Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;
export const PASSWORD_RESET_REQUEST_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #000; padding: 5px; text-align: center; border-radius: 15px;">
    <p style="color: white; margin: 0; font-size: 20px;">Password Reset</p>
  </div>
  <div style="background-color: #f1f1f1; padding: 20px; border-radius: 0 0 30px 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi,</p>
    <p>We received a request to reset your password. To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #000; color: white; padding: 12px 20px; text-decoration: none; border-radius: 15px; font-weight: bold;">Reset Password</a>
    </div>
    <p style="color:#881a1a;">If you didn't make this request, please ignore this email.</p>
    <p>This link will expire in 10 min for security reasons.</p>
    <p>Best regards,<br>Your Tech Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #000; padding: 5px; text-align: center; border-radius: 15px;">
    <p style="color: white; margin: 0; font-size: 20px;">Password Reset Successful</p>
  </div>
  <div style="background-color: #f1f1f1; padding: 20px; border-radius: 0 0 30px 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Congrats,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p style="color:#881a1a;">If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your Tech Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;
export const WELCOME_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #000; padding: 5px; text-align: center; border-radius: 15px;">
    <p style="color: white; margin: 0; font-size: 20px;">Welcome</p>
  </div>
  <div style="background-color: #f1f1f1; padding: 20px; border-radius: 0 0 30px 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Congrats,</p>
    <p>Email verified successfully, you are now part of the AI revolution team.</p>
   <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your Tech Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;

const { sendEmail } = require("../service/email/sendEmail");

// Application logo URL for email templates
const LOGO_URL = `${process.env.BASE_URL || "https://ticked.onrender.com"}/static/images/logo.png`;

/**
 * Send email verification email
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @param {string} verificationOTP - Email verification OTP
 * @returns {Promise<Object>} Email sending result
 */
async function sendEmailVerificationEmail(userEmail, userName, verificationOTP) {
  const subject = "Verify Your Email Address - Ticked";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #374151; max-width: 500px; margin: 0 auto; padding: 32px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 80px; height: auto; margin-bottom: 24px;" />
            <h1 style="color: #0ea5e9; margin: 0; font-size: 24px; font-weight: 600;">Verify Your Email</h1>
        </div>
        
        <div style="margin-bottom: 32px;">
            <p style="margin: 0 0 16px 0; color: #374151;">Hello ${userName},</p>
            <p style="margin: 0; color: #6b7280;">Please verify your email address to complete your Ticked account setup.</p>
        </div>
        
        <div style="text-align: center; margin: 32px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px;">
            <p style="color: #374151; font-size: 14px; margin: 0 0 12px 0; font-weight: 500;">Your verification code:</p>
            <div style="background-color: #0ea5e9; color: white; padding: 12px 24px; border-radius: 6px; display: inline-block; font-size: 20px; font-weight: 600; letter-spacing: 3px; font-family: monospace;">
                ${verificationOTP}
            </div>
            <p style="color: #6b7280; font-size: 12px; margin: 12px 0 0 0;">Expires in 10 minutes</p>
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 14px;">
            <p style="margin: 0;">The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Verify Your Email - Ticked
    
    Hello ${userName},
    
    Please verify your email address to complete your Ticked account setup.
    
    Your verification code: ${verificationOTP}
    (Expires in 10 minutes)
    
    The Ticked Team
  `;

  return await sendEmail({
    to: userEmail,
    subject,
    html,
    text,
  });
}

/**
 * Send welcome email to new users
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @returns {Promise<Object>} Email sending result
 */
async function sendWelcomeEmail(userEmail, userName) {
  const subject = "Welcome to Ticked - Your Task Management Journey Starts Now!";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Ticked</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #374151; max-width: 500px; margin: 0 auto; padding: 32px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 80px; height: auto; margin-bottom: 24px;" />
            <h1 style="color: #0ea5e9; margin: 0; font-size: 24px; font-weight: 600;">Welcome to Ticked!</h1>
        </div>
        
        <div style="margin-bottom: 32px;">
            <p style="margin: 0 0 16px 0; color: #374151;">Hello ${userName},</p>
            <p style="margin: 0; color: #6b7280;">Thank you for joining Ticked. Start organizing your tasks and boost your productivity today.</p>
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 14px;">
            <p style="margin: 0;">The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to Ticked!
    
    Hello ${userName},
    
    Thank you for joining Ticked. Start organizing your tasks and boost your productivity today.
    
    The Ticked Team
  `;

  return await sendEmail({
    to: userEmail,
    subject,
    html,
    text,
  });
}

/**
 * Send password reset email
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @param {string} resetToken - Password reset token
 * @param {string} resetUrl - Password reset URL
 * @returns {Promise<Object>} Email sending result
 */
async function sendPasswordResetEmail(userEmail, userName, resetToken, resetUrl) {
  const subject = "Reset Your Ticked Password";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #374151; max-width: 500px; margin: 0 auto; padding: 32px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 80px; height: auto; margin-bottom: 24px;" />
            <h1 style="color: #dc2626; margin: 0; font-size: 24px; font-weight: 600;">Reset Password</h1>
        </div>
        
        <div style="margin-bottom: 32px;">
            <p style="margin: 0 0 16px 0; color: #374151;">Hello ${userName},</p>
            <p style="margin: 0; color: #6b7280;">Click the button below to reset your password. If you didn't request this, you can safely ignore this email.</p>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">Reset Password</a>
            <p style="color: #6b7280; font-size: 12px; margin: 12px 0 0 0;">Link expires in 1 hour</p>
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 14px;">
            <p style="margin: 0;">The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Reset Password - Ticked
    
    Hello ${userName},
    
    Click the link below to reset your password:
    ${resetUrl}
    
    If you didn't request this, you can safely ignore this email.
    
    Link expires in 1 hour.
    
    The Ticked Team
  `;

  return await sendEmail({
    to: userEmail,
    subject,
    html,
    text,
  });
}

/**
 * Send password reset OTP email
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @param {string} resetOTP - Password reset OTP
 * @returns {Promise<Object>} Email sending result
 */
async function sendPasswordResetOTPEmail(userEmail, userName, resetOTP) {
  const subject = "Reset Your Ticked Password - Verification Code";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Code</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #374151; max-width: 500px; margin: 0 auto; padding: 32px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 80px; height: auto; margin-bottom: 24px;" />
            <h1 style="color: #dc2626; margin: 0; font-size: 24px; font-weight: 600;">Reset Password</h1>
        </div>
        
        <div style="margin-bottom: 32px;">
            <p style="margin: 0 0 16px 0; color: #374151;">Hello ${userName},</p>
            <p style="margin: 0; color: #6b7280;">Use the verification code below to reset your password.</p>
        </div>
        
        <div style="text-align: center; margin: 32px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px;">
            <p style="color: #374151; font-size: 14px; margin: 0 0 12px 0; font-weight: 500;">Your reset code:</p>
            <div style="background-color: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; display: inline-block; font-size: 20px; font-weight: 600; letter-spacing: 3px; font-family: monospace;">
                ${resetOTP}
            </div>
            <p style="color: #6b7280; font-size: 12px; margin: 12px 0 0 0;">Expires in 5 minutes</p>
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 14px;">
            <p style="margin: 0;">The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Reset Password - Ticked
    
    Hello ${userName},
    
    Use the verification code below to reset your password:
    ${resetOTP}
    (Expires in 5 minutes)
    
    The Ticked Team
  `;

  return await sendEmail({
    to: userEmail,
    subject,
    html,
    text,
  });
}

module.exports = {
  sendWelcomeEmail,
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetOTPEmail,
};

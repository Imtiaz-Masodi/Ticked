const { Resend } = require("resend");
const constants = require("../utils/constants");

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Application logo URL for email templates
const LOGO_URL = `${process.env.BASE_URL || "https://ticked.onrender.com"}/static/images/logo.png`;

/**
 * Send a basic email
 * @param {Object} emailData - Email configuration object
 * @param {string} emailData.to - Recipient email address or array of addresses
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.html - HTML content of the email
 * @param {string} [emailData.text] - Plain text content (optional)
 * @param {string} [emailData.from] - Sender email (defaults to env variable)
 * @returns {Promise<Object>} Resend API response
 */
async function sendEmail({ to, subject, html, text, from }) {
  try {
    if (!to || !subject || !html) {
      throw new Error(constants.EMAIL_REQUIRED_FIELDS_MISSING);
    }

    const emailOptions = {
      from: from || process.env.RESEND_FROM_EMAIL || constants.DEFAULT_FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    };

    // Add text content if provided
    if (text) {
      emailOptions.text = text;
    }

    const response = await resend.emails.send(emailOptions);

    if (response.error) {
      throw new Error(response.error.error);
    }

    return {
      success: true,
      data: response.data,
      message: constants.EMAIL_SENT_SUCCESSFULLY,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: error.message,
      message: constants.EMAIL_SENDING_FAILED,
    };
  }
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
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 120px; height: auto; margin-bottom: 20px;" />
            <h1 style="color: #4f46e5; margin-bottom: 10px;">Welcome to Ticked!</h1>
            <p style="font-size: 18px; color: #6b7280;">Your Task Management Journey Starts Now</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Hello ${userName}!</h2>
            <p>Thank you for joining Ticked, the simple and efficient task management app that helps you stay organized and productive.</p>
            
            <p>With Ticked, you can:</p>
            <ul style="color: #4b5563;">
                <li>Create and organize tasks with categories</li>
                <li>Track your progress with different task statuses</li>
                <li>Manage your backlog efficiently</li>
                <li>Stay on top of your productivity</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280;">Ready to get started? Log in to your account and create your first task!</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p>Happy task managing!<br>The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to Ticked!
    
    Hello ${userName}!
    
    Thank you for joining Ticked, the simple and efficient task management app that helps you stay organized and productive.
    
    With Ticked, you can:
    - Create and organize tasks with categories
    - Track your progress with different task statuses
    - Manage your backlog efficiently
    - Stay on top of your productivity
    
    Ready to get started? Log in to your account and create your first task!
    
    Happy task managing!
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
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 120px; height: auto; margin-bottom: 20px;" />
            <h1 style="color: #dc2626; margin-bottom: 10px;">Password Reset Request</h1>
        </div>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Hello ${userName},</h2>
            <p>We received a request to reset your password for your Ticked account.</p>
            <p>If you didn't make this request, you can safely ignore this email.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Reset Your Password</a>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <strong>Security Note:</strong> This link will expire in 1 hour for your security. 
                If the button doesn't work, copy and paste this link into your browser: ${resetUrl}
            </p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p>The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Request
    
    Hello ${userName},
    
    We received a request to reset your password for your Ticked account.
    
    To reset your password, visit this link: ${resetUrl}
    
    If you didn't make this request, you can safely ignore this email.
    
    Security Note: This link will expire in 1 hour for your security.
    
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
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 120px; height: auto; margin-bottom: 20px;" />
            <h1 style="color: #4f46e5; margin-bottom: 10px;">Verify Your Email Address</h1>
            <p style="font-size: 18px; color: #6b7280;">Complete your Ticked account setup</p>
        </div>
        
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Hello ${userName}!</h2>
            <p>Thank you for signing up with Ticked! To complete your account setup and start managing your tasks, please verify your email address using the OTP below.</p>
            <p>This helps us ensure the security of your account and keep you updated with important information.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0; background-color: #f9fafb; padding: 25px; border-radius: 8px;">
            <p style="color: #374151; font-size: 16px; margin-bottom: 10px; font-weight: bold;">Your Verification Code:</p>
            <div style="background-color: #4f46e5; color: white; padding: 15px 25px; border-radius: 6px; display: inline-block; font-size: 24px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                ${verificationOTP}
            </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <strong>Note:</strong> This verification code will expire in 10 minutes for security reasons. 
                Please enter this code in the verification form to complete your account setup.
            </p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>Didn't sign up for Ticked?</strong> If you received this email by mistake, you can safely ignore it. No account will be created without email verification.
            </p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p>Welcome to the team!<br>The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Verify Your Email Address - Ticked
    
    Hello ${userName}!
    
    Thank you for signing up with Ticked! To complete your account setup and start managing your tasks, please verify your email address using the OTP below.
    
    Your Verification Code: ${verificationOTP}
    
    This helps us ensure the security of your account and keep you updated with important information.
    
    Note: This verification code will expire in 10 minutes for security reasons.
    
    Didn't sign up for Ticked? If you received this email by mistake, you can safely ignore it. No account will be created without email verification.
    
    Welcome to the team!
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
 * Send task reminder email
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @param {Array} tasks - Array of overdue or upcoming tasks
 * @returns {Promise<Object>} Email sending result
 */
async function sendTaskReminderEmail(userEmail, userName, tasks) {
  const subject = `Task Reminder - ${tasks.length} task${tasks.length > 1 ? "s" : ""} need your attention`;

  const taskList = tasks
    .map(
      (task) => `
    <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 4px solid #f59e0b;">
        <h4 style="margin: 0 0 8px 0; color: #374151;">${task.title}</h4>
        <p style="margin: 0; color: #6b7280; font-size: 14px;">${task.description || "No description"}</p>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
            <strong>Status:</strong> ${task.status} | 
            <strong>Priority:</strong> ${task.priority || "Normal"}
            ${task.dueDate ? ` | <strong>Due:</strong> ${new Date(task.dueDate).toLocaleDateString()}` : ""}
        </p>
    </div>
  `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Task Reminder</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 120px; height: auto; margin-bottom: 20px;" />
            <h1 style="color: #f59e0b; margin-bottom: 10px;">Task Reminder</h1>
        </div>
        
        <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Hello ${userName}!</h2>
            <p>You have ${tasks.length} task${tasks.length > 1 ? "s" : ""} that need your attention.</p>
        </div>
        
        <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Your Tasks:</h3>
            ${taskList}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280;">Stay productive and keep up the great work!</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p>The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Task Reminder
    
    Hello ${userName}!
    
    You have ${tasks.length} task${tasks.length > 1 ? "s" : ""} that need your attention:
    
    ${tasks
      .map(
        (task) => `
    - ${task.title}
      ${task.description || "No description"}
      Status: ${task.status} | Priority: ${task.priority || "Normal"}${task.dueDate ? ` | Due: ${new Date(task.dueDate).toLocaleDateString()}` : ""}
    `
      )
      .join("\n")}
    
    Stay productive and keep up the great work!
    
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
        <title>Password Reset - Verification Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${LOGO_URL}" alt="Ticked Logo" style="max-width: 120px; height: auto; margin-bottom: 20px;" />
            <h1 style="color: #dc2626; margin-bottom: 10px;">Password Reset Request</h1>
            <p style="font-size: 18px; color: #6b7280;">Verify your identity to reset your password</p>
        </div>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Hello ${userName},</h2>
            <p>We received a request to reset your password for your Ticked account. Please use the verification code below to proceed with resetting your password.</p>
            <p>If you didn't make this request, you can safely ignore this email and your password will remain unchanged.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0; background-color: #f9fafb; padding: 25px; border-radius: 8px;">
            <p style="color: #374151; font-size: 16px; margin-bottom: 10px; font-weight: bold;">Your Password Reset Code:</p>
            <div style="background-color: #dc2626; color: white; padding: 15px 25px; border-radius: 6px; display: inline-block; font-size: 24px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                ${resetOTP}
            </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <strong>Note:</strong> This verification code will expire in 5 minutes for security reasons. 
                Please enter this code in the password reset form to continue.
            </p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>Security Reminder:</strong> If you didn't request this password reset, please secure your account immediately by changing your password or contacting support.
            </p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p>Stay secure!<br>The Ticked Team</p>
        </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Request - Ticked
    
    Hello ${userName},
    
    We received a request to reset your password for your Ticked account. Please use the verification code below to proceed with resetting your password.
    
    Your Password Reset Code: ${resetOTP}
    
    If you didn't make this request, you can safely ignore this email and your password will remain unchanged.
    
    Note: This verification code will expire in 5 minutes for security reasons.
    
    Security Reminder: If you didn't request this password reset, please secure your account immediately by changing your password or contacting support.
    
    Stay secure!
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
  sendEmail,
  sendWelcomeEmail,
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetOTPEmail,
  sendTaskReminderEmail,
};

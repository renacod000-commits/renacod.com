import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact notification email
export const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `New Contact Form Submission: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
            ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Service:</strong> ${contact.service || 'Not specified'}</p>
            <p><strong>Budget:</strong> ${contact.budget || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${contact.timeline || 'Not specified'}</p>
            <p><strong>Source:</strong> ${contact.source}</p>
            <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${contact.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This is an automated notification from your website contact form. 
              Please respond to the customer within 24 hours.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent successfully');
    
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    throw error;
  }
};

// Send welcome email to new user
export const sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Welcome to Renacod - Your Account is Ready!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Welcome to Renacod!
          </h2>
          
          <p>Hello ${user.name},</p>
          
          <p>Welcome to Renacod! Your account has been successfully created and you're now ready to explore our platform.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Account Details</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Department:</strong> ${user.department || 'Not specified'}</p>
            <p><strong>Position:</strong> ${user.position || 'Not specified'}</p>
          </div>
          
          <p>You can now log in to your account and start managing your projects, services, and content.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/login" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Login to Your Account
            </a>
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>The Renacod Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
    
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Password Reset Request - Renacod',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Password Reset Request
          </h2>
          
          <p>Hello ${user.name},</p>
          
          <p>You recently requested to reset your password for your Renacod account. Click the button below to reset it.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Your Password
            </a>
          </div>
          
          <p>This password reset link will expire in 10 minutes.</p>
          
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Security Note:</strong> Never share this link with anyone. Our team will never ask for your password.
            </p>
          </div>
          
          <p>Best regards,<br>The Renacod Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
    
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
};

// Send email verification email
export const sendEmailVerificationEmail = async (user, verificationToken) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Verify Your Email - Renacod',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Verify Your Email Address
          </h2>
          
          <p>Hello ${user.name},</p>
          
          <p>Thank you for signing up with Renacod! To complete your registration, please verify your email address by clicking the button below.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p>This verification link will expire in 24 hours.</p>
          
          <p>If you did not create an account with Renacod, please ignore this email.</p>
          
          <p>Best regards,<br>The Renacod Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email verification email sent successfully');
    
  } catch (error) {
    console.error('Failed to send email verification email:', error);
    throw error;
  }
};

// Test email service
export const testEmailService = async () => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: 'Email Service Test - Renacod',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Email Service Test
          </h2>
          
          <p>This is a test email to verify that your email service is working correctly.</p>
          
          <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
          
          <p>If you received this email, your email service is configured correctly!</p>
          
          <p>Best regards,<br>The Renacod System</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully');
    return true;
    
  } catch (error) {
    console.error('Failed to send test email:', error);
    return false;
  }
}; 
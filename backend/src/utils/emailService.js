import nodemailer from 'nodemailer';

// Simple email service for development
// In production, this would integrate with a real email service like SendGrid, AWS SES, etc.

export const sendContactNotification = async (contact) => {
  // For development, just log the contact details
  console.log('📧 Contact Form Submission:');
  console.log(`   Name: ${contact.name}`);
  console.log(`   Email: ${contact.email}`);
  console.log(`   Company: ${contact.company || 'N/A'}`);
  console.log(`   Subject: ${contact.subject}`);
  console.log(`   Message: ${contact.message}`);
  console.log(`   Service: ${contact.service || 'N/A'}`);
  console.log(`   Budget: ${contact.budget || 'N/A'}`);
  console.log(`   Timeline: ${contact.timeline || 'N/A'}`);
  console.log(`   Submitted: ${contact.createdAt}`);
  console.log('---');
  
  // In production, you would send an actual email here
  // Example with nodemailer:
  /*
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form: ${contact.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong> ${contact.message}</p>
      <p><strong>Service:</strong> ${contact.service || 'N/A'}</p>
      <p><strong>Budget:</strong> ${contact.budget || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${contact.timeline || 'N/A'}</p>
      <p><strong>Submitted:</strong> ${contact.createdAt}</p>
    `
  });
  */
  
  return true;
};

export const sendWelcomeEmail = async (user) => {
  console.log('📧 Welcome Email:');
  console.log(`   To: ${user.email}`);
  console.log(`   Name: ${user.name}`);
  console.log('---');
  
  return true;
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  console.log('📧 Password Reset Email:');
  console.log(`   To: ${user.email}`);
  console.log(`   Reset Token: ${resetToken}`);
  console.log('---');
  
  return true;
};

// Send email verification email
export const sendEmailVerificationEmail = async (user, verificationToken) => {
  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
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
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
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
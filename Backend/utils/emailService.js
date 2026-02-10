const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send OTP Email
const sendOTPEmail = async (email, name, otp) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Sport Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🏆 Verify Your Sport Account - OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #00e676 0%, #00aeef 100%);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 800;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 20px;
              color: #263238;
              margin-bottom: 20px;
              font-weight: 600;
            }
            .message {
              color: #546e7a;
              line-height: 1.6;
              margin-bottom: 30px;
              font-size: 16px;
            }
            .otp-box {
              background: linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 174, 239, 0.1) 100%);
              border: 2px solid #00e676;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-label {
              font-size: 14px;
              color: #546e7a;
              text-transform: uppercase;
              font-weight: 700;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }
            .otp-code {
              font-size: 42px;
              font-weight: 800;
              background: linear-gradient(135deg, #00e676 0%, #00aeef 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              letter-spacing: 8px;
              margin: 10px 0;
            }
            .expiry {
              font-size: 13px;
              color: #ff5252;
              font-weight: 600;
              margin-top: 10px;
            }
            .warning {
              background: #fff3e0;
              border-left: 4px solid #ffc107;
              padding: 15px;
              border-radius: 8px;
              color: #e65100;
              font-size: 14px;
              margin-top: 30px;
            }
            .footer {
              background: #f5f5f5;
              padding: 30px;
              text-align: center;
              color: #78909c;
              font-size: 14px;
            }
            .footer-icon {
              font-size: 40px;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 Sport Platform</h1>
            </div>
            <div class="content">
              <div class="greeting">Hello ${name}! 👋</div>
              <div class="message">
                Welcome to Sport Platform! We're excited to have you join our athletic community.
                To complete your registration and verify your account, please use the OTP code below:
              </div>
              
              <div class="otp-box">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div class="expiry">⏱️ Valid for 10 minutes</div>
              </div>
              
              <div class="message">
                Enter this code on the verification page to activate your account and start your journey with us.
              </div>
              
              <div class="warning">
                <strong>⚠️ Security Notice:</strong> Never share this code with anyone. Our team will never ask for your OTP.
              </div>
            </div>
            <div class="footer">
              <div class="footer-icon">💪</div>
              <div>Sport Platform - Your Athletic Partner</div>
              <div style="margin-top: 10px; font-size: 12px;">
                This is an automated email. Please do not reply to this message.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP Email sent: ', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Send Welcome Email after verification
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Sport Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to Sport Platform!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #00e676 0%, #00aeef 100%);
              padding: 50px 30px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 800;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 24px;
              color: #263238;
              margin-bottom: 20px;
              font-weight: 700;
            }
            .message {
              color: #546e7a;
              line-height: 1.8;
              margin-bottom: 20px;
              font-size: 16px;
            }
            .footer {
              background: #f5f5f5;
              padding: 30px;
              text-align: center;
              color: #78909c;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Account Verified!</h1>
            </div>
            <div class="content">
              <div class="greeting">Congratulations ${name}! 🏆</div>
              <div class="message">
                Your account has been successfully verified and you're now part of the Sport Platform family!
              </div>
              <div class="message">
                Start exploring your dashboard, track your progress, and achieve your athletic goals with us.
              </div>
              <div class="message" style="margin-top: 30px;">
                <strong>Let's get started! 💪</strong>
              </div>
            </div>
            <div class="footer">
              <div>Sport Platform - Your Athletic Partner</div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
};

import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

export const sendMail =async (inputEmail:string,emailType:string) => {
    const tempOTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        // Transporter
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        //Mail options
        let mailOptions:any

        if(emailType=="otp"){
             mailOptions = await {
                from: process.env.EMAIL,
                to: inputEmail ,
                subject: "OTP Verification",
                html: `<p>your OTP verification code is :${tempOTP}</p>`,
            };
        }

         if(emailType=="approved"){
             mailOptions = await {
                from: process.env.EMAIL,
                to: inputEmail ,
                subject: "Account Verification Successful",
                html: `<p>We are writing to inform you that your account has been successfully verified. You can now access all the features of our platform and start using it to its fullest potential.</p>`,
              };
        }
         if(emailType=="rejected"){
             mailOptions = await {
                from: process.env.EMAIL,
                to: inputEmail ,
                subject: " Account Verification Failed",
                html: `<p>We regret to inform you that your account verification was not successful. We were unable to confirm your identity with the information provided.</p>`,
              };
      
         }
    
        // Send mail
        await transporter.sendMail(mailOptions)
        // console.log("Account creation OTP Sent: " + req.session.tempOTP)
        // res.json({success:true})
        // res.redirect("/otp")
        return tempOTP
  
}



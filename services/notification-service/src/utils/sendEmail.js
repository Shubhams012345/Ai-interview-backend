import mailTransporter from "../config/mailer.js";
import env from "../config/env.js";

const sendEmail = async ({ to, subject, text }) => {
  await mailTransporter.sendMail({
    from: env.fromEmail,
    to,
    subject,
    text
  });
};

export default sendEmail;

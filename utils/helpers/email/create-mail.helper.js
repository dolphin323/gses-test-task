import { INITIAL_MAIL } from "../../constants/constants.js";
import { ENV } from "../../enums/enums.js";

const createMail = ({ to, html, subject }) => {
  return {
    from: {
      email: ENV.SENDGRID.VERIFIED_SENDER,
      name: INITIAL_MAIL.fromName,
    },
    to: to || ENV.SENDGRID.VERIFIED_SENDER,
    subject: subject || INITIAL_MAIL.subject,
    html: html || INITIAL_MAIL.html,
  };
};

export { createMail };

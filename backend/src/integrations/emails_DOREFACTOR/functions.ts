// // import nodemailer from './nodemailer';
// import { sendMail } from './mailjet';

// export const sendEmail = async ({ to, subject, text, templateId, variables = {} }: SendEmailArgs): Promise<boolean> => {
//   if (process.env.ENV_NAME?.includes('local')) {
//     console.log(text);
//     return true;
//   }

//   const data = {
//     to,
//     subject,
//     text,
//     templateId,
//     variables,
//   };

//   try {
//     const message = await sendMail(data);

//     return true;
//   } catch (e) {
//     console.error(e);
//   }

//   return false;
// };

// type SendEmailArgs = {
//   to: string;
//   subject?: string;
//   text?: string;
//   variables?: any;
//   templateId: number;
// };

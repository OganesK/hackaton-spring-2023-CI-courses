// import mailjet from 'node-mailjet';

// interface SendMailArgs {
//   to: string;
//   subject?: string;
//   text?: string;
//   variables?: any;
//   templateId: number;
// }

// export const sendMail = async ({ to, subject, text, templateId, variables = {} }: SendMailArgs) => {
//   const mail = mailjet.connect(process.env.MAILJET_KEY!, process.env.MAILJET_SECRET!);
//   const requestPayload = {
//     "Messages":[
//       {
//         TemplateLanguage: true,
//         "From": {
//           "Email": "help@divorcepath.com",
//           "Name": "Divorcepath"
//         },
//         "To": [
//           {
//             "Email": to,
//           }
//         ],
//         "TemplateID": templateId,
//         "Variables": variables,
//         ... (subject ? { "Subject": subject } : {}),
//         ...(text ? { "TextPart": text } : {}),
//       }
//     ]
//   };

//   new Promise((resolve, reject) => {
//     mail.post("send", {'version': 'v3.1'})
//     .request(requestPayload)
//     .then(data => resolve(data))
//     .catch(err => reject(err))
//   });

// };

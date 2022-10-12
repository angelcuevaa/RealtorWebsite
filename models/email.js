
const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.EMAIL_ACCESS_KEY,
    secretAccessKey: process.env.EMAIL_API_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = (recipientEmail, name, message) => {
    let params = {
      Source: 'angelcueva47@gmail.com',
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

let sendTemplateEmail = (recipientEmail) => {
    let params = {
      Source: 'angelcueva45@yahoo.com',
      Template: '<name of your template>',
      Destination: {
        ToAddresses: [ 
          recipientEmail
        ]
      },
      TemplateData: '{ \"name\':\'John Doe\'}'
    };
    return AWS_SES.sendTemplatedEmail(params).promise();
};

module.exports = {
  sendEmail,
  sendTemplateEmail,
};

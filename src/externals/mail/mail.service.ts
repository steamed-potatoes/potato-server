import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '@src/config';
import Mail from 'nodemailer/lib/mailer';
import { BadGateWayException } from '@src/common/exceptions/custom.exceptions';
import { Service } from 'typedi';
import ejs from 'ejs';

@Service()
export class MailSender {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: config.mail.service,
        host: config.mail.host,
        auth: {
          user: config.mail.user,
          pass: config.mail.password,
        },
      })
    );
  }

  public async sendVerifcationMail(to: string, authCode: string) {
    const emailTemplate = await ejs.renderFile(
      __dirname + '/resources/email.ejs',
      { authCode: authCode }
    );
    await this.sendMail(to, 'Verify Email', emailTemplate);
  }

  private async sendMail(to: string, subject: string, emailTemplate: string) {
    const mailOptions = {
      from: config.mail.user,
      to: to,
      subject: subject,
      html: emailTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new BadGateWayException('이메일 전송에 실패하였습니다');
    }
  }
}

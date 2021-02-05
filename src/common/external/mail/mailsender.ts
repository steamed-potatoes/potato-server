import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '@src/config';
import Mail from 'nodemailer/lib/mailer';
import { BadGateWayException } from '@src/common/exceptions/custom.exceptions';
import { Service } from 'typedi';

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

  public async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: config.mail.user,
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new BadGateWayException('이메일 전송에 실패하였습니다');
    }
  }
}

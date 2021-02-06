import aws from 'aws-sdk';
import config from '@src/config';
import { BadGateWayException } from '@src/common/exceptions/custom.exceptions';
import { Service } from 'typedi';

@Service()
export class SqsSender {
  private readonly sqs: aws.SQS;
  private readonly url: string;

  constructor(sqs: aws.SQS) {
    aws.config.update(config.aws);
    this.sqs = sqs;
    this.url = config.sqs.url;
  }

  public sendMessage(email: string, code: string) {
    this.sqs
      .sendMessage({
        QueueUrl: this.url,
        MessageBody: JSON.stringify({
          receiver: email,
          code: code,
        }),
        DelaySeconds: 0,
      })
      .promise()
      .then(() => {
        console.log(`이메일 확인 요청을 보냈습니다 (${email})`);
      })
      .catch((error) => {
        console.error(error);
        throw new BadGateWayException(
          `메시지 큐 전송에 실패하였습니다. (${email})`
        );
      });
  }
}

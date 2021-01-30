import { BadGateWayException } from '@src/common/exceptions/custom.exceptions';
import axios from 'axios';
import { Service } from 'typedi';
import config from '@src/config';

export interface GoogleApiCaller {
  getGoogleMemberProfile(code: string, redirectUri: string): any;
}

@Service()
export class GoogleApiCallerImpl implements GoogleApiCaller {
  public async getGoogleMemberProfile(code: string, redirectUri: string) {
    try {
      const accessToken = await this.getGoogleAccessToken(code, redirectUri);
      const profileInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken.data.access_token}`
      );
      return profileInfo.data;
    } catch (error) {
      throw new BadGateWayException('구글 로그인 중 에러가 발생하였습니다.');
    }
  }

  private async getGoogleAccessToken(code: string, redirectUri: string) {
    return await axios.post('http://oauth2.googleapis.com/token', {
      client_id: config.google.client_id,
      client_secret: config.google.client_secret,
      grant_type: config.google.grant_type,
      redirect_uri: redirectUri,
      code: code,
    });
  }
}

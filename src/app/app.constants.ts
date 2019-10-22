import { NgGapiClientConfig } from 'ng-gapi';

export class AppConstants {

  public static SESSION_STORAGE_KEY = 'accessToken';

  public static YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

  public static getGapiClientConfig(): NgGapiClientConfig {
    return {
      client_id: '781957298776-3cuabf7f0albtoragc3j66m4pvqq202n.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      scope: [
        'https://www.googleapis.com/auth/youtube.force-ssl'
      ].join(' '),
      fetch_basic_profile: true
    };
  }
}
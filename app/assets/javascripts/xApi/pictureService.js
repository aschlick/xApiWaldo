import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class PictureService{
  pictures = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });

    this.http = http;
  }
  getPictures(){
    return this.http.fetch('pictures')
      .then(response => response.json())
      .then(pictures => this.pictures = pictures);
  }
}

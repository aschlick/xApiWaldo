import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)

export class Start{
  constructor(){
    console.log('Start constructed');
  }

  activate(){
    console.log('Start activated');
  }
}

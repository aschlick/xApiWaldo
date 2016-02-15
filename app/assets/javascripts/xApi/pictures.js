import {inject} from 'aurelia-framework';
import {PictureService} from './pictureService';

@inject(PictureService)
export class Pictures{
  picture = {};

  constructor(pictureService){
    this.pictureService = pictureService
  }

  setup(params){
    if(!params.id){
      this.picture = this.pictureService.pictures[0]
    } else {
      this.picture = this.pictureService.pictures.find(item => item.id == params.id);
    }
  }

  activate(params){
    var self = this;
    if (this.pictureService.pictures.length == 0){
      return this.pictureService.getPictures().then(function(){
        self.setup(params);
      })
    }
    this.setup(params);
  }
}

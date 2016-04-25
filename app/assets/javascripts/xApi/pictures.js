import {inject} from 'aurelia-framework';
import {PictureService} from './pictureService';
import $ from 'bootstrap'

@inject(PictureService)
export class Pictures{
  picture = {};
  user = {
    objectType: 'Agent',
    account: {
      name: Cookies.get('guid'),
      homePage: 'http://xapi.schlickster.us/'
    }
  }

  constructor(pictureService){
    this.pictureService = pictureService;
    this.hintType = Math.round(Math.random());
    this.start = Date.now();
    ADL.XAPIWrapper.sendStatement(this.startPackage());

    var self = this;
    $(window).bind('beforeunload', function(){
      ADL.XAPIWrapper.sendStatement(self.quitPackage());
    })
  }

  setup(params){
    if(!params.id){
      this.picture = this.pictureService.pictures[0];
    } else {
      this.picture = this.pictureService.pictures.find(item => item.id == params.id);
    }
    this.picture.hintPath = "/assets/picture_hint.png"
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

  clicked($event){
    var xpercent = $event.layerX / $event.srcElement.width;
    var ypercent = $event.layerY / $event.srcElement.height;

    var successX = xpercent > 0.1734767 && xpercent < 0.1842294;
    var successY = ypercent > 0.8393040 && ypercent < 0.8587513;

    console.log({x: xpercent, y: ypercent})

    if(successX && successY){
      this.end = Date.now();
      ADL.XAPIWrapper.sendStatement(this.foundPackage());
      $('#winDialog').modal({show: true, backdrop: 'static'});
    } else {
      ADL.XAPIWrapper.sendStatement(this.notFoundPackage());
    }
  }

  hint(){
    ADL.XAPIWrapper.sendStatement(this.hintPackage());
    $('#hintDialog').modal({show: true});
  }

  closeHint(){
    $('#hintDialog').modal('hide');
  }

  quit(){
    $('#quitDialog').modal({show: true, backdrop: 'static'});
  }

  time_taken_string(){
    var str = 'N/A';
    if(this.end && this.start){
      var dif = (this.end - this.end)/1000;
      var minutes = dif/60;
      var seconds = dif - (minutes * 60);

      str = "It took you ";
      if(minutes > 0){
        str = str + minutes + " minutes and ";
      }
      str = str + seconds + "seconds.";
    }
    return str;
  }

  hintPackage(){
    var stmt = new ADL.XAPIStatement(
        this.user,
        ADL.verbs.interacted,
        new ADL.XAPIStatement.Activity('http://xapi.schlickster.us/',this.hintType === 0 ? 'Picture Hint' : 'Word Hint')
    );
    return stmt;
  }

  startPackage(){
    var stmt = new ADL.XAPIStatement(
      this.user,
      ADL.verbs.launched,
      new ADL.XAPIStatement.Activity('http://xapi.schlickster.us/','Game')
    )
    return stmt;
  }

  foundPackage(){
    var stmt = new ADL.XAPIStatement(
      this.user,
      ADL.verbs.completed,
      new ADL.XAPIStatement.Activity('http://xapi.schlickster.us/','Game')
    )
    return stmt;
  }

  notFoundPackage(){
    var stmt = new ADL.XAPIStatement(
      this.user,
      ADL.verbs.interacted,
      new ADL.XAPIStatement.Activity('http://xapi.schlickster.us/','not waldo')
    )
    return stmt;
  }

  quitPackage(){
    var stmt = new ADL.XAPIStatement(
      this.user,
      ADL.verbs.exited,
      new ADL.XAPIStatement.Activity('http://xapi.schlickster.us/','Game')
    )
    return stmt
  }

}

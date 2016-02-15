export class App{
  configureRouter(config, router){
    config.title = 'Wheres xApi';
    config.map([
      { route: [''], name: 'start', moduleId: 'start', nav: true, title:'Start' },
      { route: ['pictures'], name: 'pictures', moduleId: 'pictures', nav: false },
      { route: ['pictures/:id'], name: 'picturesDetail', moduleId: 'pictures', nav: false }
    ]);
    this.router = router;
  }
}

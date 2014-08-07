requirejs.config({
  baseUrl: 'js/lib',
paths: {
  "app": '../app',
}
});


requirejs(['jquery','app/render_timeline'],function($,render_timeline){ $(render_timeline);});

define(['jquery','vis','app/timeline_options','app/card'],function ($,vis,timeline_options,card){
  $.get("/card_details",function(cards){
    cards = cards.map(card.format);
    var container = document.getElementById('chart');
    var timeline = new vis.Timeline(container);
    //timeline.setOptions(timeline_options);
    //timeline.setGroups(groups);
    timeline.setItems(cards);
  });
});




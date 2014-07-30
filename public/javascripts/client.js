
// Timeline Options
var options = {
  width:  "100%",
  //height: "300px",
  height: "auto",
  layout: "box",
  editable: true,
  eventMargin: 5,  // minimal margin between events
  eventMarginAxis: 0, // minimal margin beteen events and the axis
  showMajorLabels: false,
  axisOnTop: true,
  // groupsWidth : "200px",
  groupsChangeable : true,
  groupsOnRight: false,
  stackEvents: false  
};
var timeline = new links.Timeline(document.getElementById('chart'),options);

function format_card_date(card){
 card.start = new Date(card.start);
      card.end = new Date(card.end);
      return card;

}

function render_page(){
  $.get("/card_details",function(cards){
    console.log("inside");
    cards = cards.map(format_card_date) ;
    timeline.draw(cards); 
  });
};


$(render_page);



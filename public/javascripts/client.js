console.log("vandiruchi");

// Timeline Options
var options = {
  'width':  '100%',
  'editable': true, // make the events dragable
  'style': 'box',
  'intervalMax': 1000 * 60 * 60 * 24 * 90,
  'start': "07-01-2014",
  'zoomMin': 86400000,
  'zoomable': false,
  'scale': links.Timeline.StepDate.SCALE.MONTH,
};
var timeline = new links.Timeline(document.getElementById('chart'),options);


function render_page(){
  $.get("/card_details",function(cards){
    console.log("inside");
    var data = [];

    cards.forEach(function(card){
      var date=new Date();
      card['className']='';
      if(card.dev_effort > 0){
        date.setDate(date.getDate()+card.dev_effort);
        card['className']= 'dev_in_progress';
      }
      if(card.qa_effort > 0){
        date.setDate(date.getDate()+card.qa_effort);
        card['className']= card['className']+' qa_in_progress';
      }
      card['start']=  Date.parse(date);
      card['content']=card.number;
      timeline.addItem(card);

    });
  });
};


$(render_page);



console.log("vandiruchi");

function render_page(){
$.get("/card_details",function(data){
  //data=clean_up_data(data);
console.log("inside");
  var cards=d3.select("#chart")
    .selectAll("div")
    .data(data)
  var cards_entered=cards.enter().append("div").attr('class','card').text(function(d){return d.number});
  
  cards_entered.append("paper-progress").attr('value',function(d){return d.dev_effort*10});

  cards_entered.append("paper-progress").attr('value',function(d){return d.qa_effort*10});
});
};


$(render_page);

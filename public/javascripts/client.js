console.log("vandiruchi");

$.get("/card_details",function(data){

  var cards=d3.select("#chart")
    .selectAll("div")
    .data(data);

  var cards_entered=cards.enter().append("div").attr('class','card').append("div").text(function(d){return d.id});
  cards_entered.append("paper-progress").attr('value',function(d){return d.dev_pending*10});

  cards_entered.append("paper-progress").attr('value',function(d){return d.qa_pending*10})
})

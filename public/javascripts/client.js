console.log("vandiruchi");

$.get("/cards",function(data){
  var cards=d3.select("#chart")
    .selectAll("div")
    .data(data);

  var cards_entered=cards.enter().append("div").attr('class','card');
  cards_entered.append("div").attr('class','dev')
    .style("width", function(d) { return d.dev_pending + "px"; })
    .text(function(d) { return d.dev_pending;});
  cards_entered.append("div").attr('class','qa')
    .style("width", function(d) { return d.qa_pending + "px"; })
    .text(function(d) { return d.qa_pending;})
})

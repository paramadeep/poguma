define({
  format: function(card){
    card.start = new Date(card.start);
    card.end = new Date(card.end);
    return card;
  }
});



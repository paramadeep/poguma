var moment = require('moment');

exports.derive_timelines = function(cards){
  var clean_data=cards.map(function(card){
    qa_date_range = get_qa_date_range(card);
    dev_date_range = get_dev_date_range(card);
    return [
  {
    start: dev_date_range.start,
      end: dev_date_range.end,
      content: card.Name,
      group: card.Number,
      className: 'dev_in_progress'
  },
      {
        start: qa_date_range.start,
      end: qa_date_range.end,
      content: card.Name,
      group: card.Number,
      className: 'qa_in_progress'
      }
  ];
  });
 var final_data = [];
  return final_data.concat.apply(final_data,clean_data);
};

function get_qa_date_range(card){
  return {start: getDate(5) , end: getDate(6) }
}

function getDate(days){
  return moment().add('days',days).format('YYYY-MM-DD')
}


function get_dev_date_range(card){
  return {start: getDate(0), end: getDate(4) }
}


function get_effort(start_date){
  var today=new Date();
  var iterator_date= new Date(start_date);
  var effort_spent=0;
  while(iterator_date<=today){
    effort_spent = (iterator_date.getDay()<=5) ? effort_spent+1 : effort_spent+0;
    iterator_date.setDate(iterator_date.getDate()+1);
  }
  return effort_spent;
}

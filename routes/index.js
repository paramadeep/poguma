/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "will_we_go"})
};


exports.cards =function(req, res){

  var response;
  var mingle_query="select 'name','Story Status','number','Estimate','QA Estimate' where 'Story Status' >= 'Ready for Development' and 'Story Status' < 'Ready for Signoff' and 'Planned Release' = (Current Release)";
  res.set({
    'Content-Type': 'application/json',
  });
  var request = require('request');
  var mingle = require('../mingle.json');
  var encoded_mql=encodeURIComponent(mingle_query);
  var url = "https://" + mingle.user_name + ":" + mingle.password + "@" + mingle.domain + "/api/v2/projects/" + mingle.project_name + "/cards/execute_mql.json?mql=" + encoded_mql;
  request(url,function(er,re,body){
    body=clean_up_data(JSON.parse(body));
    res.send(body);
  });
};


function clean_up_data(cards){
  var clean_data=cards.map(function(card){
    return {
      'name': card.Name, 
      'number': card.Number,
      'qa_effort': get_qa_effort(card),
      'dev_effort': get_dev_effort(card)
    };
  });
  debugger;

  return clean_data;
};


function get_qa_effort(card){
  var qa_scale= {'Simple': 1, 'Medium': 2, 'Complex': 3};
  return card['QA Estimate']!= null ? qa_scale[card['QA Estimate']] : 0;

}

function get_dev_effort(card){
 return card['Estimate']!= null ? parseInt(card['Estimate']) : 0;
}




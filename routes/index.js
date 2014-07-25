
/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "will_we_go"})
};


exports.cards =function(req, res){

  var response;
  var mingle_query="select 'name','Story Status','number','Estimate','QA Estimate','Development Started On','Development Completed On','QA Started on','QA Completed on' where 'Story Status' >= 'Ready for Development' and 'Story Status' < 'Ready for Signoff' and 'Planned Release' = (Current Release)";
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

  return clean_data;
};


function get_qa_effort(card){
  var qa_scale= {'Simple': 1, 'Medium': 2, 'Complex': 3};
  var status=card['Story Status'];
  var estimate=card['QA Estimate']!= null ? qa_scale[card['QA Estimate']] : 0;

  if(status=='In QA'){
    var effort=(Math.abs(new Date()- new Date(card['QA Started on'])))/(1000*24*60*60);
    return estimate < effort  ? 1: estimate-effort;
  }
  return estimate;

}

function get_dev_effort(card){
  var estimate=parseInt(card['Estimate']);
  var status=card['Story Status'];
  if(status== 'Ready For Development'){
    return estimate;
  }
  if(status== 'Development In Progress'){
    effort=(Math.abs(new Date()- new Date(card['Development Started On'])))/(1000*24*60*60);
    return estimate < effort  ? 1: estimate-effort;
  }
  return 0;
}




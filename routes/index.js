/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "will_we_go"})
};

exports.cards_timelines =function(req, res){
  var cards = require('./cards');
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
    body=cards.derive_timelines(JSON.parse(body));
    res.send(body);
  });
};




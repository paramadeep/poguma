/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "will_we_go"})
};


exports.cards =function(req, res){

  var response;
  var mingle_query="select 'name','Story Status','number','Estimate','QA Estimate' where 'Story Status' >= 'Ready for Development' and 'Story Status' < 'Ready for Signoff' and 'Planned Release' = (Current Release)";

  var request = require('request');
  var mingle = require('../mingle.json');
  var encoded_mql=encodeURIComponent(mingle_query);
  var url = "https://" + mingle.user_name + ":" + mingle.password + "@" + mingle.domain + "/api/v2/projects/" + mingle.project_name + "/cards/execute_mql.json?mql=" + encoded_mql;
  request(url,function(er,re,body){
    res.send(body);
  });
};





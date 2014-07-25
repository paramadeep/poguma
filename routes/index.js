/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "will_we_go"})
};


exports.cards =function(req, res){
  var cards = get_cards();
  response=[];
  cards.forEach(function(card){
    response.push(get_card_details(card));
  });
  res.send(response)
};

get_cards = function(){

  return [1782,1582]
};

get_card_details = function(card){
  var request = require('request');
  var parseString = require('xml2js').parseString;
  var mingle = require('../mingle.json');
  var url = "https://" + mingle.user_name + ":" + mingle.password + "@" + mingle.domain + "/api/v2/projects/" + mingle.project_name + "/cards/" + card + ".xml"
  request(url,function(er,re,body){
    parseString(body,function(err,res){
      debugger;
      var id = res.card.id[0]._;
      var status = true;
     return {"id": "1782", "status": "in_dev" , "dev_pending": 4 ,"qa_pending": 1 }
    })
  });
};

//select 'name','Story Status','number','Estimate','QA Estimate' where 'Story Status' >= 'Ready for Development' and 'Story Status' < 'Ready for Signoff' and 'Planned Release' = (Current Release)



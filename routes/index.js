/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "will_we_go"})
};

exports.cards =function(req, res){
  var cards = get_cards();
  response=[];
  //for(let card of cards){
  //response.push(get_card_details(card));
  //}
  response.push({"id": "1782", "status": "in_dev" , "dev_pending": 4 ,"qa_pending": 1 })
    response.push({"id": "1783", "status": "in_qa", "dev_pending": 0 ,"qa_pending": 2})
    response.push({"id": "1784", "status": "ready_for_qa", "dev_pending": 0 ,"qa_pending": 0})
    response.push({"id": "1785", "status": "in_dev", "dev_pending": 4 ,"qa_pending": 3})
    res.send(response)
};

get_cards = function(){
  return [1782,1582]
};

get_card_details = function(card){
  var request = require('request');
  var parseString = require('xml2js').parseString;
  request(url,function(er,re,body){
    parseString(body,function(err,result){

    })
  });
};


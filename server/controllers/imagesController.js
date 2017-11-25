var fs = require('fs');
var mongoose = require('mongoose');
var User = require('../database/users');
var uniqueFilename = require('unique-filename');
var decodeInformation = require('../services/decodeInformation');

function uniqueFileName(){
    return uniqueFilename('/assets/upload', 'image');
}

module.exports.decodeImg = function(req, res){

    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
      
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
      
        return response;
      }
      var imageBuffer = decodeBase64Image(req.body.data.image);
      var fileName =  uniqueFileName() + '.jpg';
      var fileNameServer = 'dist' + fileName;
      fs.writeFile(fileNameServer, imageBuffer.data, function(err) {
          if(err) {
              console.log(err);
          }
          else{
              var user = decodeInformation.getInformation(req.body.token);
              User.findByIdAndUpdate(user._id, {avatar: fileName}, function(err, result){
                if(err) throw err;
                else{
                    res.send({
                        success: true,
                        msg: 'Good'
                    });
                }
              });
          }
      });

}
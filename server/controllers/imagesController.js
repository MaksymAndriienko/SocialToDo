var fs = require('fs');
var uniqueFilename = require('unique-filename');

function uniqueFileName(){
    return uniqueFilename('upload', 'image');
}

module.exports.decodeImg = function(req, res){

    console.log(req.body.image);

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
      var imageBuffer = decodeBase64Image(req.body.image);
      var fileName = uniqueFileName() + '.jpg';
      fs.writeFile(fileName, imageBuffer.data, function(err) {
          if(err) {
              console.log(err);
          }
      });

}
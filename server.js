//var spawn= require('child_process').spawn;
//var child= spawn('java', ['params1', 'param2']);
var imgur= require('imgur');
imgur.setClientId('a60df619ce86905');

var express= require('express');
var app= express();
app.set('port', 3000);
//app.use(express.static(path.join(__dirname, 'public')));

//error logs
// error logging
app.use(function(err, req, res, next) {
	console.log("ERROR: " + err + ".. for path: " + req.path);
	next();
});

// landing page
app.get("/", function(req, res) {
	console.log("GET landing page");
	res.json({"success": true});
});

//server start
var server= app.listen(3000, function(){
    var host= server.address().address;
    var port= server.address().port;
    console.log("SERVER STARTED at http://%s:%s",host,port);
});

app.get("/board/:x/:y/:roomDensity/:level/:playerNum", function(req,res){
    var exec = require('child_process').exec;
    exec('java -jar dungeon_map.jar 40 40 6 2 2', function(error, stdout, stderr){
        var linkTitle;
        if(error){
            console.log(error);
        }
        imgur.uploadFile('Dungeon.jpg').then(function(json){
            console.log(json.data.link);
            res.json(json.data.link);
        })
        .catch(function(err){
            console.log(err.message);
        });
    });
});
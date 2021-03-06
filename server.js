//var spawn= require('child_process').spawn;
//var child= spawn('java', ['params1', 'param2']);
var imgur= require('imgur');
var qunit= require('qunitjs');
imgur.setClientId('a60df619ce86905');

var express= require('express');
var app= express();
app.set('port', process.env.PORT || 3000);
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
var server= app.listen(app.get('port'), function(){
    var host= server.address().address;
    var port= server.address().port;
    console.log("SERVER STARTED at http://%s:%s",host,port);
});

app.get("/board/:x/:y/:roomDensity/:level/:playerNum", function(req,res){
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var exec = require('child_process').exec;
    exec('java -jar dungeon_map.jar '+req.params.x+' '+req.params.y+' '+req.params.roomDensity+' '+req.params.level+' '+req.params.playerNum+'', function(error, stdout, stderr){
        var linkTitle;
        if(error){
            console.log(error);
        }
        imgur.uploadFile('Dungeon.jpg').then(function(json){
            console.log(json.data.link);
            res.json(json);
        })
        .catch(function(err){
            console.log(err.message);
        });
    });
});

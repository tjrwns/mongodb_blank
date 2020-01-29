//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var cp = require( "child_process" );
var fs = require('fs');
var http = require('http');

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;
// 정리해야함 ---- 생각나는데로 하고있음.....;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.server = {};
global.server.addRouter = function(a,b){ return global.ROUTER_LIST[ a ] = b; };

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.ROUTER_LIST = {};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;


global.CONST = {}
global.CONST.MongoDB = {}
global.CONST.MongoDB.OPTIONS = {
	self : { ID : "tjrwns", PWD : "123qweasdzxc", HOST : "localhost", PORT : 59320 }	
}

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

var ROOT_PATH = process.cwd();
var server_port = 8888;

var CP_COMMAND = {
	MONGO : ROOT_PATH + "\\..\\..\\..\\Binary\\mongodb\\4.0.15\\bin\\mongo"
};
	
var DBJS_DIRECTORY_PATH = ROOT_PATH + "\\..\\dbjs\\";
var ROUTER_DIRECTORY_PATH = ROOT_PATH + "\\..\\js\\";
var ROUTER_LIST;

(function(){
	ROUTER_FILE_LIST = fs.readdirSync( ROUTER_DIRECTORY_PATH )
	var i =0,iLen = ROUTER_FILE_LIST.length,io;
	for(;i<iLen;++i){
		io = ROUTER_FILE_LIST[ i ].split(".")[0];
		eval( fs.readFileSync( ROUTER_DIRECTORY_PATH + ROUTER_FILE_LIST[ i ] ).toString() );
		console.log( io );	
	}
})();
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// LOGIC;
//-------------------------------------------------------;

global.server = http.createServer(function(req, res){

    req.on('error', function( err ){
        console.error(err);
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', function( err ){ console.error(err); });

	//var routerNm = req.url.replace(/\//,"");
	var routerNm = req.url.split("?")[0];
	
	if( req.url == "/" )
	{
		res.end( JSON.stringify( fs.readdirSync( DBJS_DIRECTORY_PATH ) ) )
	}
	else if( global.ROUTER_LIST[ routerNm ] )
	{
		res.statusCode = 200;
		global.ROUTER_LIST[ routerNm ]( req, res );
	}
	else
	{
		res.statusCode = 404;
        res.end('404: File Not Found');
	}

	return; 
}).listen( server_port );

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var cp = require( "child_process" );
var fs = require('fs');
var http = require('http');


//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;

var CP_COMMAND = {};
	CP_COMMAND.MONGO = "..\\..\\..\\Binary\\mongodb\\4.0.15\\bin\\mongo";

var DBJS_DIRECTORY_PATH = "D:\\Github\\mongodb_sample\\dbjs\\";

var dbjs_list;
var _ROUTER_LIST_ = {};

(function(){
	dbjs_list = fs.readdirSync( DBJS_DIRECTORY_PATH )
	console.log( dbjs_list )

	var i =0,iLen = dbjs_list.length,io;
	for(;i<iLen;++i){
		io = dbjs_list[ i ].split(".")[0];
		_ROUTER_LIST_[ io ] = {};
	}
	console.log( _ROUTER_LIST_ )
	
})()

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;

/*
 * @function
 * @param {String} str
 * @param {Number} n
 * @return {String} str
 */
var deleteLines = function( str, n ){
	var i = 0,iLen = n,io;
	for(;i<iLen;++i){ str = str.slice(str.indexOf("\n") + 1, str.length ); }
	//str = str.replace( /\t/g, '' );
	//str = str.replace( /\r\n/g, '' );
	return str;
};

//상수로정희할것 나중에 구분해야함;

/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var exec_query_DB = function( dbjsNm, bResult ){
	
	var options = {	ID : "tjrwns", PWD : "123qweasdzxc", HOST : "localhost", PORT : 59320 };
	var DBJS_DIRECTORY_PATH = "D:\\Github\\mongodb_sample\\dbjs\\";
	var DBJS_NM = dbjsNm + ".dbjs";
	var FILE_PATH = DBJS_DIRECTORY_PATH + DBJS_NM;

	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin <!=FILE_PATH=!>";
	if( bResult ) _t_command = _t_command + " > test.result";
	
	var command = _t_command.replace( "<!=ID=!>", options.ID )
		.replace( "<!=PWD=!>", options.PWD )
		.replace( "<!=HOST=!>", options.HOST )
		.replace( "<!=PORT=!>", options.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );

	var r = cp.execSync( command ).toString();
		r = deleteLines( r , 4 )
	return r;
};


//-------------------------------------------------------;
// LOGIC;
//-------------------------------------------------------;

var server = http.createServer(function(req, res){

    req.on('error', function( err ){
        console.error(err);
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', function( err ){ console.error(err); });

    /*
	fs.readFile('./public' + req.url, function(err, data){
        if (err) {
            if (req.url === '/' && req.method === 'GET') {
                res.end('Welcome Home');
            } else if (req.url === '/tcs' && req.method === 'GET') {
                res.end('HI RCSer');
            } else {
                res.statusCode = 404;
                res.end('404: File Not Found');
            }
        } else {
            // NOTE: The file name could be parsed to determine the
            // appropriate data type to return. This is just a quick
            // example.
            res.setHeader('Content-Type', 'application/octet-stream');
            res.end(data);
        }
    });
	*/
	var routerNm = req.url.replace(/\//,"");
	
	console.log( routerNm + " - " + Date.now() );

	if( _ROUTER_LIST_[ routerNm ] )
	{
		res.statusCode = 200;
		res.end( exec_query_DB( routerNm ) )
	}
	else
	{
		res.statusCode = 404;
        res.end('404: File Not Found');
	}

	return;
});

server.listen(8080, function(){ 
	console.log('------------------------------'); 
	console.log('Server listening on port 8080'); 
	console.log('------------------------------'); 
});
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var cp = require( "child_process" );
var fs = require( "fs" );

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;

var options = {	ID : "tjrwns", PWD : "123qweasdzxc", HOST : "localhost", PORT : 59320 };
var DBJS_DIRECTORY_PATH = "D:\\Github\\mongodb_sample\\dbjs\\";
var DBJS_NM = "find.dbjs";
var FILE_PATH = DBJS_DIRECTORY_PATH + DBJS_NM;

var _t_command = "..\\..\\..\\Binary\\mongodb\\4.0.15\\bin\\mongo --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin <!=FILE_PATH=!>";
//var _t_command = "..\\..\\..\\Binary\\mongodb\\4.0.15\\bin\\mongo --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin <!=FILE_PATH=!> > test.result";

var command = _t_command.replace( "<!=ID=!>", options.ID )
	.replace( "<!=PWD=!>", options.PWD )
	.replace( "<!=HOST=!>", options.HOST )
	.replace( "<!=PORT=!>", options.PORT )
	.replace( "<!=FILE_PATH=!>", FILE_PATH )

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;


var deleteLines = function( str, n ){
	var i = 0,iLen = n,io;
	for(;i<iLen;++i){
		str = str.slice(str.indexOf("\n") + 1, str.length )	
	}
	str = str.replace( /\t/g, '' );
	str = str.replace( /\r\n/g, '' );
	//console.log( str.indexOf( "\r\n" ) )
	return str
};


/*/
cp.exec( command , function(error, stdout, stderr){
	if( error) throw error; 
	console.log( deleteLines( stdout, 4 ) );
});
/*/
var a = cp.execSync( command ).toString();
	a = deleteLines( a , 4 )
//console.log( deleteLines( a ) )
console.log( a )
//*/


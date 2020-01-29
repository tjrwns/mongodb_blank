(function(){

var ROOT_PATH = process.cwd();

var CP_COMMAND = {};
	CP_COMMAND.MONGO = ROOT_PATH + "\\..\\..\\..\\Binary\\mongodb\\4.0.15\\bin\\mongo";


var DBJS_DIRECTORY_PATH = ROOT_PATH + "\\..\\dbjs\\";

/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var exec_query_DB = function( dbjsNm, bResult ){
	
	var options = {	ID : "tjrwns", PWD : "123qweasdzxc", HOST : "localhost", PORT : 59320 };
	
	var DBJS_NM = dbjsNm + ".dbjs";
	var FILE_PATH = DBJS_DIRECTORY_PATH + DBJS_NM;

	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin <!=FILE_PATH=!>";
	if( bResult ) _t_command = _t_command + " > " + dbjsNm + "__" + Date.now() + ".result";
	
	var command = _t_command.replace( "<!=ID=!>", options.ID )
		.replace( "<!=PWD=!>", options.PWD )
		.replace( "<!=HOST=!>", options.HOST )
		.replace( "<!=PORT=!>", options.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );

	var r = cp.execSync( command ).toString();
		r = deleteLines( r , 4 )
	return r;
};

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

/*
 * @function
 * @param {String} url
 * @return {Object} o
 */
var paramToObject = function( url ){
	
	var r =  url.split("?")[ 1 ];
	var a = r.split("=");
	var o = {};
	var i = 0,iLen = a.length,io;
	
	for(;i<iLen;++i){
		io = a[ i ];
		if( i % 2 == 0 ) o[ io ] = "";
		else o[ a[ i - 1] ] = io;
	}

	return o;
}

//쿼리실행라우터
global.server.addRouter("/exec_dbjs",function( req, res ){
	
	var routerNm = req.url.split("?")[0];
	var paramsO = paramToObject( req.url );

	console.log( routerNm + " - Exec Query dbjs --- " + paramsO.dbjs + ".dbjs --- " + Date.now() );
	res.end( exec_query_DB( paramsO.dbjs ) )
});

})()


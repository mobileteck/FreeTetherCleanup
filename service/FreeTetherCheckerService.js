var FreeTetherCheckerService = function() {
}

FreeTetherCheckerService.prototype.run = function(future) {
   check(future);
}



function check(future){
    var exec  = IMPORTS.require('child_process').exec;
    
	var child = exec('/sbin/ifconfig', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	    var code = 0;
	    if(error){
	    	console.log('Error Executing Command');
	    	code = error.code || -1;
	    	future.result = {code: code, result: "FAILED", "message": error};	
	    } else{
	    	console.log('Commands Executed Successfully');
	    	if(stdout.indexOf("bridge0") === -1){
	    		future.result = {code: code, result: "notfound"};		
	    	} else{
	    		future.result = {code: code, result: "found"};		
	    	}
	    	
	    }
	    
	});
}

function check2(future) {
	var fs  = IMPORTS.require('fs');
	var path  = IMPORTS.require('path');
	// check if there is a left over bridge0 interface
	var f = '/sys/class/net/bridge0/operstate';

	path.exists(f), function (exists) {
		if(exists){
			fs.readFile(f, 'utf8', function (err,data) {
				if (err) {
					console.log("Error Checking Status " + err);
					future.result = {code: -1, result: "error"};	
					return;
				}else{
					future.result = {code: 0, result: data};	
					return;
				}
			});
		} else{
			future.result = {code: 0, result: "notfound"};	
			return;
		}
	}

}


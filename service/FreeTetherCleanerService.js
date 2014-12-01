var FreeTetherCleanerService = function() {
}

FreeTetherCleanerService.prototype.run = function(future) {
   cleanUp(future);
}

function cleanUp(future){
    var exec  = IMPORTS.require('child_process').exec;
    
	var child = exec('/sbin/ifconfig bridge0 down; /usr/bin/brctl delbr bridge0', 
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
	    	future.result = {code: code, result: "OK", "message": stdout};	
	    }
	    
	});
}

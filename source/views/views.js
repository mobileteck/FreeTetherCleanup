/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "myapp.MainView",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "FreeTether Cleaner 2"},
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Clean", ontap: "cleanTap"},
			{kind: "onyx.Button", content: "Check", ontap: "checkTap"}
		]},
		{ name: "checkerService",
          kind: "enyo.PalmService",
          service: "palm://com.mobileteck.freetether.cleaner.service",
          method: "check",
          subscribe: false,
          onComplete: "checkComplete"
        },
		{ name: "cleanerService",
          kind: "enyo.PalmService",
          service: "palm://com.mobileteck.freetether.cleaner.service",
          method: "clean",
          subscribe: false,
          onComplete: "cleanComplete"
        }
	],
	//create: function() {
	//	this.inherited(arguments);
		// do this async to reduce app load times
		 //enyo.asyncMethod(this, function() {
    	//	this.$.checkerService.send({});						
	    //});
	//},
	cleanTap: function(inSender, inEvent) {
		this.$.main.addContent("Starting Cleaner Service.<br/>");

		this.$.cleanerService.send({});						

	},
	checkTap: function(inSender, inEvent) {
		this.$.main.addContent("Starting Cheker Service.<br/>");

		this.$.checkerService.send({});						

	},
	cleanComplete : function(inSender, inEvent) {
		var result = inEvent.data;
		enyo.log(JSON.stringify(result));
		if(!result.code === 0 || ! result.result === "OK"){
			enyo.log("Failed to cleanup FreeTether");
			this.$.main.addContent("Cleaner Service Failed.<br/>");			
		} else{
			this.$.main.addContent("Cleaner Service Completed.<br/>");	
		}
		this.$.checkerService.send({});						
	},
	checkComplete : function(inSender, inEvent) {
		var result = inEvent.data;
		enyo.log(JSON.stringify(result));
		if(result.code !== 0){
			enyo.log("Failed to check Bridge0 status");
			this.$.main.addContent("Failed to check Bridge0 status.<br/>");			
		} else{
			if(result.result === "notfound"){
				this.$.main.addContent("<span style='color:green'>Bridge0 does not exists. No Clean Up Required </span><br/>");		
			} else{
				this.$.main.addContent("<span style='color:red'>Bridge0 exists</span><br/> Clean Up Required. Press 'Clean' Button <br/>");		
			}
			
		}
	},
});

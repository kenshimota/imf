Ext.define('app.controller.main.Main',{
	extend : 'Ext.app.Controller',

	init : function(){
		this.control({
			
			'viewport > #panelMain > #toolbarMain > button ' :{
				click : this.openModule
			}

		});
	},

	openModule : function(optionSelect){

		if(optionSelect.pathController != null)
		{
			this.includeController(optionSelect);
		}

	},

	includeController : function(optionSelect){

		var smallDiv = Ext.ComponentQuery.query('#smallWind')[0];

		Ext.Msg.wait('Loading...');

		var thisClass = this;

		Ext.require(optionSelect.pathController,function(){

		Ext.Msg.hide();

		var control = thisClass.application.controllers.get(optionSelect.pathController);

		if(!control){

			var control = Ext.create(optionSelect.pathController,{
				id : optionSelect.pathController,
				application : thisClass.application
			});

			control.container = control.createContainer(optionSelect);
			smallDiv.add(control.container);
			control.addContent();

			thisClass.application.controllers.add(control);
			control.init(thisClass.application);
			control.onLaunch(thisClass.application);
		}
		
		else
		{

			if(control.container.isDestroyed){
				control.container = control.createContainer(optionSelect);
				smallDiv.add(control.container);
				control.addContent();
			}
		}
		
			smallDiv.setActiveTab(control.container);
		});
	}
});
Ext.define('app.controller.items.editItems',{
	extend : 'Ext.app.Controller',
	models : ['app.model.items'],
	stores : ['app.store.items'],
	views : ['app.view.items.editItems'],

	getData : function(record){
		Ext.Msg.wait('Loading data to be items edit...');

		var option = new Object();
		option.text = 'Items Edit - '+record.get('name');
		option.iconCls = '.editItems';

		if(this.container != null)
			this.container.isDestroyed

		this.container = this.createContainer(option);

		var smallDiv = Ext.ComponentQuery.query('#smallWind')[0];
		smallDiv.add(this.container);
		this.addContent();

		var formEdit = Ext.ComponentQuery.query('#formEditItems');
		formEdit = formEdit[formEdit.length - 1];

		formEdit.loadRecord(record);

		formEdit.items.getAt(3).setValue(record.data.price[0].price);

		formEdit.title = option.text; 

		Ext.Msg.hide();

		smallDiv.setActiveTab(this.container);
	},

	addContent : function(){
		this.container.add({
			xtype : 'items.editItems'
		});
	},

	createContainer : function(optionSelect){
		return Ext.widget({
			xtype : 'container',
			title : optionSelect.text,
			iconCls : optionSelect.iconCls,
			closable : true,
			layout : {
				type : 'vbox',
				align : 'middle'
			}
		});
	}
});
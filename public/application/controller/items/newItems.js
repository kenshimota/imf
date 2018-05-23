Ext.define('app.controller.items.newItems',{
	extend : 'Ext.app.Controller',
	models : ['app.model.items'],
	stores : ['app.store.items'],
	views : ['app.view.items.newItems'],

	init : function(){
	},

	addContent : function(){
		this.container.add({
			xtype : 'container', 
			
			layout : {
				xtype : 'hbox',
				align : 'stretch'
			},

			items : 
			[{
				xtype : 'items.newItems',
				margin : "0px auto",
				flex : 1,
				width : 600,
				layout : {
					align : 'middle'
				},
				margin : "10px auto"
			}]
		})
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
var TypePrice = null;

Ext.define('app.controller.items.List',{
	extend : 'Ext.app.Controller',
	models : ['app.model.items'],
	stores : ['app.store.items'],

	views : [
		'app.view.items.gridItems',
		'app.view.items.comboboxPrice'
	],

	init : function(){
		this.control({
			
			'#TypePrice' : {
				select : this.changePrice
			}
		})
	},

	addContent : function(){

		this.container.add({
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},

			items : [
				{
					xtype : 'panel',
					html : '<h1>Items List</h1>',
					margin : 5,
					flex : 2,
					border : false
				},
				{
					xtype : 'container',
					flex : 1,
					layout : {
						type : 'vbox',
						align : 'stretch'
					},

					items :[
					{
						xtype : 'tbfill'
					},
					{
						xtype : 'items.comboboxPrice'
					}]
				}]
		},
		{
			xtype : 'items.gridItems',
			margin : 5,
			border : true,
			region : 'center',
			flex : 5
		});
	},

	changePrice : function(combo, record){
		
		TypePrice = record.get('key');

		var grid = Ext.ComponentQuery.query('grid')[0];
		
		if(grid)
		{
			grid.getView().refresh();
		}
		else
			console.log('grid no encontrada');
	},

	createContainer : function(optionSelect){

		return Ext.widget({
			xtype : 'container',
			title : optionSelect.text,
			iconCls : optionSelect.iconCls,
			closable : true,
			layout : {
				type : 'vbox',
				align : 'stretch'
			}
		});
	}

});
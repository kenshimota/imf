Ext.define('app.controller.items.seeItems',{
	extend : 'Ext.app.Controller',
	models : ['app.model.items'],
	stores : ['app.store.items'],
	views : ['app.view.items.seeItems'],

	getData : function (record){

	idItems = record.get('id');

	var option = new Object();
	option.text = 'Items see - '+record.get('name');
	option.iconCls = 'seeItems';

	this.container = this.createContainer(option);

	var smallDiv = Ext.ComponentQuery.query('#smallWind')[0];
	smallDiv.add(this.container);
	this.addContent(record);


	Ext.Msg.hide();
	smallDiv.setActiveTab(this.container);
	},

	addContent : function(record){

		var itemsTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div style="margin-bottom: 10px;" class="thumb-wrap">',
          			'<div>Id : {id}</div>',
					'<div>Reference: {reference} </div>',
					'<div>Name : {name}</div>',
					'<div>Price : '+ record.get('price')[0].price +'$ '+ record.get('price')[0].name +'</div>',
					'<div>Description : {description}</div>',
        		'</div>',
    		'</tpl>'
    		);

		this.container.add({
			xtype : 'items.seeItems',
			store : this.getStore(record.get('id')),
			tpl : itemsTpl 
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
	},

	getStore : function(id){
		store = Ext.create('Ext.data.Store',{
			requires : ['app.model.items'],
			model : 'app.model.items',
			proxy : {
				url : '/items/get/id/'+id,
				type : 'ajax',
				reader : {
					type : 'json',
					root : 'data'
				}
			},

			autoLoad : true
		});
		return store;
	}
});
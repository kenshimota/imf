Ext.define('app.view.items.newItems',{
	extend : 'Ext.form.Panel',
	alias : 'widget.items.newItems',
	title : 'New Items',
	padding : 10,
	width: 300,

	defaults : {
		allowBlank : true,
		anchor:'90%'
	},

	initComponent : function(){
		this.items = this.buildItems();
		this.buttons = this.buildButtons();
		this.callParent();
	},

	buildButtons : function(){
		return [
			{
				iconCls : 'saveItems',
				text : 'Save Items',
				formBind : true,
				disabled : true,
				scope : this,
				handler : function()
				{
					this.getForm().submit({

						url : '/items/add/',

						success : function(){
							Ext.Msg.alert('Exito','Items to be create...');
						},

						failure : function(){
							Ext.Msg.alert('Fail','Fail to load data...');
						}
					});
				}
			},
			{
				text : 'Reset Items',
				scope : this,
				handler : function(){
					this.reset();
				} 
			}];
	},

	buildItems : function(){
		return [
			{
				xtype : 'textfield',
				fieldLabel : 'Name',
				name : 'name'
			},
			{
				xtype : 'textfield',
				fieldLabel : 'Reference',
				name : 'reference'
			},
			{
				xtype : 'numberfield',
				fieldLabel : 'Price ($ USD)',
				name : 'price',
				minValue : 0
			},
			{
				xtype : 'textareafield',
				name : 'description',
				fieldLabel : 'Description'
			}
		];
	}
});
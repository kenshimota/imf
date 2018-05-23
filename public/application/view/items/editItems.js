Ext.define('app.view.items.editItems',{
	extend : 'Ext.form.Panel',
	alias : 'widget.items.editItems',
	title : 'Items Edit',
	width : 600,
	padding : 10,
	itemId : 'formEditItems',

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

						url : '/items/update/',

						success : function(){
							Ext.Msg.alert('Exito','Items to be uptaded...');
						},

						failure : function(){
							Ext.Msg.alert('Fail','Fail load data');
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
				xtype : 'hiddenfield',
				name : 'id',

			},
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
// Aqui formaremos el menu principal para nuestro menu
Ext.define('app.view.Viewport',{
	extend : 'Ext.container.Viewport',
	
	// con esto hare instancia 
	requires : [
		'Ext.tab.Panel',
		'Ext.window.MessageBox'
	],

	/* Diseño ajustable */
	layout : 'fit',

	initComponent : function(){

		this.items = [{
			
			xtype : 'panel',
			itemId : 'panelMain',

			dockedItems : this.buildItems(),

			items : [{
				xtype : 'tabpanel',
				itemId : 'smallWind', /* le puse pequeñas ventanas debido al
				desarrollo de implementados controladores que dara un contenido
				obtenido y dando a pequeñas divisiones dentro de esta pagina */
				border : false,
				hidden : false
			}]

		}];

		this.callParent();
	},



	buildItems : function(){
		
		return [{
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbarMain',

			items : [
			{
				iconCls : 'listItems',
				text : 'Items List',
				pathController : 'app.controller.items.List'

			},
			{
				iconCls : 'newItems',
				text : 'Create new Items',
				pathController : 'app.controller.items.newItems'
			},
			{
				xtype : 'tbfill'
			},
			{
				iconCls : 'userProfile-16-26',
				text : 'IMF'
			}]
		}]
	}
});
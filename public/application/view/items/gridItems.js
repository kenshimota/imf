Ext.define('app.view.items.gridItems',{
	
	extend : 'Ext.grid.Panel',
	alias : 'widget.items.gridItems',
	itemsId : 'itemsList',
	width : "auto",
	border : true,
	enableColumnMove  :true, 
	enableColumnResize:true,

	initComponent : function(){
		this.store = this.getStore();
		this.columns = this.buildColumns();
		this.callParent();
	},

	getStore : function(){

		var store = Ext.create('app.store.items');

		return store;
	},

	buildColumns : function(){
		return [
			{
				header : 'N',
				xtype : 'rownumberer',
				align : 'center'
			},
			{
				header : 'Name',
				dataIndex : 'name',
				id : 'name',
				flex : 0.5
			},
			{
				header : 'Reference',
				dataIndex : 'reference',
				id : 'reference',
				flex : 0.3
			},
			{
				header : 'Price',
				dataIndex : 'price',
				id : 'price',
				align : 'center',
				renderer : function(valuePrice){

					for (var i = 0; i < valuePrice.length ; i++) {
						
						if(TypePrice == null)
						{
							TypePrice = valuePrice[i].name;
							return valuePrice[i].price+'$';
						}
						else
						{
							if (TypePrice.toLowerCase() == valuePrice[i].name.toLowerCase())
								return valuePrice[i].price+'$';
						}

					}

					return 0 + '$';
				}
			},
			{
				header : 'Description',
				dataIndex : 'description',
				id : 'description',
				flex : 0.5
			},
			{
				header : 'Actions',
				itemId : 'ActionsForItems',
				xtype : 'actioncolumn',
				items : [
				{
					itemId : 'see',
					icon : 'resource/img/see.png',
					handler : function(grid, rowIndex)
					{
						var selection = grid.getSelectionModel();
						selection.select(rowIndex);
						var record = selection.getSelection()[0];

						var controller = Ext.create('app.controller.items.seeItems');
						controller.getData(record);
					}
				},
				{
					itemId : 'edit',
					icon : 'resource/img/edit.png',
					handler : function(grid, rowIndex)
					{
						var selection = grid.getSelectionModel();
						selection.select(rowIndex);
						var record = selection.getSelection()[0];

						var controller = Ext.create('app.controller.items.editItems');
						controller.getData(record);
					}
				},
				{
					itemId : 'delete',
					icon : 'resource/img/delete.png',
					width : 30,
					handler : function(grid, rowIndex){
						
						var selection = grid.getSelectionModel(), record;
						selection.select(rowIndex);
						record = selection.getSelection()[0];
						Ext.Msg.confirm('Confirm','Are you sure that you want to delete this Items?',
							function(btn){
								if(btn === 'yes'){

									Ext.Ajax.request({
										url : 'items/delete/id/'+record.get('id'),
										timeout : 30000,

										success : function()
										{
											grid = Ext.ComponentQuery.query('grid')[0];
											grid.getStore().idItems = record.get('id');
											grid.store.remove(record);
											grid.getStore().sync();
											grid.getView().refresh();
											Ext.Msg.alert('Delete','Items do delete...');
										},
										failure : function()
										{
											Ext.Msg.alert('Fail','Fail to load data...');
										} 
									})
								}
							}
						);
					}
				}]
			}];
	}
});
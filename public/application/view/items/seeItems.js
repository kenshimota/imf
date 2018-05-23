Ext.define('app.view.items.seeItems',{
	extend : 'Ext.view.View',
	alias : 'widget.items.seeItems',
	itemsId : 'itemsData',
	xtype : 'items.seeItems',
	width : 400,
	padding : 10,
	margin : 10,
	itemSelector: 'div.thumb-wrap',
	emptyText:'This items not available'
});
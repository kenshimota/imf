Ext.define('app.store.price-list',{
	
	extend : 'Ext.data.Store',
	fields : [ 'name'],

	proxy : {

		url : '/price/',
		type : 'ajax',

		reader : {
			root : 'data',
			type : 'json'
		}
	},

	autoLoad : true
});
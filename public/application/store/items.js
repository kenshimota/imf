Ext.define('app.store.items',{
	
	extend : 'Ext.data.Store',
	model : 'app.model.items',
	
	proxy : {

		url : '/items/',
		type : 'ajax',

		reader : {
			type : 'json',
			root : 'data'
		}
	},

	autoLoad: true
});
Ext.define('app.model.items',{
	
	extend : 'Ext.data.Model',

	fields : [
		{name : 'id', type : 'int'},
		{name : 'name', type : 'string'},
		{name : 'reference', type : 'string'},
		{name : 'description', type : 'string'},
		'price', 'tax', 'category', 'inventory'
	],

	validations : [
		{type : 'lenght', field : 'name', min : 7, max : 50},
		{type : 'format', flied : 'name', matcher:/^[\w ]+$/},
	]
});
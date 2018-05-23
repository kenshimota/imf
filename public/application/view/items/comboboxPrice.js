/* Combo que contendra todos los de que tipo de de precio que va ha mostrar la grid */
Ext.define('app.view.items.comboboxPrice',{
	extend : 'Ext.form.field.ComboBox', 
	alias : 'widget.items.comboboxPrice',
	itemId : 'TypePrice',
	store : Ext.create('app.store.price-list'),
	fieldLabel : 'Price List',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'name',
	forceSelection : true,
	margin : 5
})
/* Estableciendo las configuraciones para nuestra Api central */

Ext.application({
	name : 'app', // nombre de la app
	
	appFolder : 'application', /* cada vez que use la palabra reservada app
	se dirigira hacia la carpeta acontinuación */ 
	
	// controladores que usare para nuestro menu principal
	controllers : [
		'app.controller.main.Main',
	],

	/* crea automaticamente un viewport en donde podemos forma el primer panel
	con un toolbar(menu) y y tabpanel(donde depositare el contenido) */
	autoCreateViewport : true
});
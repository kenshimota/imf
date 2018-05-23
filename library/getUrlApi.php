<?php

define('EMAILACCESS', 'jesslomasbello@gmail.com');
define('TOKENACCESS','c2e96ad7783ed9698172');

/* Libreria con una clase que se encargara de enviar y recibir la informacion desde la pagina de alegra permitiendo asi recibir los datos que se necesitan, y enviarlos cuando se necesita */
class getUrlApi
{

	/* Este es el constructor siempre he creido que los valores iniciales que se necesitan los esteblezco aqui */
	public function __construct($method = 'GET'){
		$this->method = $method;
	}

	/* Obtendra la ubicacion en que parte de alegra buscara los datos */
	public function dirGetData($class){
		$dir = str_replace('Application_Model_',null,$class);
		$dir = strtolower($dir);
		$this->serverApi = "https://app.alegra.com/api/v1/{$dir}/";
	}

	/* Funcion encargada de comunicar nuestro BackEnd con la API de alegra */
	public function openCurl($id = null, $data = array(), $method = 'GET'){

		$headers = array();
		$headers[] = 'Accept: application/json';
        $headers[] = 'Content-type: application/json';
        $headers[] = 'Authorization: Basic '.TOKENACCESS;
        $openUrl = curl_init($this->serverApi.$id);

        /* Opciones para la funcion Curl */
        $options = array(
        
        CURLOPT_URL => $this->serverApi.$id ,
    	CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING       => "",
        CURLOPT_HTTPAUTH       => CURLAUTH_BASIC,
        CURLOPT_USERPWD        => EMAILACCESS.":".TOKENACCESS,
        CURLOPT_AUTOREFERER    => true,
       	CURLOPT_CONNECTTIMEOUT => 120,
        CURLOPT_TIMEOUT        => 120,
        CURLOPT_MAXREDIRS      => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    	);

    	curl_setopt_array( $openUrl, $options );
        curl_setopt($openUrl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($openUrl, CURLOPT_HEADER, false);

		switch($method){
			case 'POST':
				curl_setopt($openUrl, CURLOPT_POST, true);
				curl_setopt($openUrl, CURLOPT_POSTFIELDS, json_encode($data));
			break;
			case 'PUT':
				curl_setopt($openUrl, CURLOPT_CUSTOMREQUEST, 'PUT');
				curl_setopt($openUrl, CURLOPT_POSTFIELDS, json_encode($data));
			break;
			case 'DELETE':
				curl_setopt($openUrl, CURLOPT_CUSTOMREQUEST, 'DELETE');
			break;
		}

		$data = curl_exec($openUrl);
        $statuscode = curl_getinfo($openUrl, CURLINFO_HTTP_CODE);
        $this->dataResponse = $data;
		curl_close($openUrl);

		return $statuscode;
	}

	/* Funcion que devolvera los datos obtenidos del servidor cuando se deseen */
	public function getData(){
		return $this->dataResponse;
	}

	private $dataResponse;// Esta variable contendra los datos que se requieren.
	private $method; // Contendra si el metodo a usar es GET, POST, PUT o DELETE.
	private $serverApi; // Esta variable contendra la direccion que se encuantra la Api que distribuye los datos.
}
<?php

include('getUrlApi.php');
include('GoogleTranslate.php');

class Application_Model_Price extends getUrlApi
{
	public function __construct()
	{
		$this->dirGetData('price-lists');
	}

	# obtiene los datos de uno o mas items
	public function getItems($id = null)
	{
		$this->method = "GET";
		$this->openCurl($id);
	}

	/* Funcion encargada de dar los datos de respuestas hacias 
	el servidor */
	public function getDataResponse()
	{
		$trans = new GoogleTranslate();
		$data = json_decode($this->getData());
		for($i=0; $i < count($data); $i++)
		{
			$data[$i]->name = $trans->translate('en', 'es' , $data[$i]->name);
		}
		return json_encode($data);
	}
}
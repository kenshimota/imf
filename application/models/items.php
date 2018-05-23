<?php

include('getUrlApi.php');
include('GoogleTranslate.php');

class Application_Model_Items extends getUrlApi
{
	public function __construct()
	{
		$this->dirGetData(__CLASS__);
	}

	# obtiene los datos de uno o mas items
	public function getItems($id = null)
	{
		$this->method = "GET";
		$this->openCurl($id);
	}

	# Agregar los nuevos items
	public function addItems()
	{
		$data_send = $this->createDataSend();
		$this->method = "POST";
		$this->openCurl(null, $data_send, 'POST');
	}

	# Actualiza los items
	public function updateItems($id = null)
	{
		$data_send = $this->createDataSend();
		$this->openCurl($id, $data_send,'PUT');
	}

	# Elimina los items
	public function deleteItems($id = null)
	{
		if($id != null && $id > 0)
		{
			$this->openCurl($id, array(),'DELETE');
		}
	}

	/* Funcion encargada de dar los datos de respuestas hacias 
	el servidor */
	public function getDataResponse()
	{
		$data = json_decode($this->getData());

		$data = $this->converte_money_and_translater($data);

		return json_encode($data);
	}

	/* Esta funcion se dedica hacia la conversion de los texto a 
	recibir y a mostrar los precios de COP a USD use 2800 COP para
	cada dolar debido a que estoy viviendo al lado de colombia 
	practicamente estoy en amazonas al lado de casuarito y siempre que
	un escucha a los colombianos de casuarito siempre me dijeron eso 
	de que el precio del dolar alla es de 2800 COP */
	public function converte_money_and_translater($data = array())
	{
		if(count($data) > 1)
		{
			for($index = 0; $index < count($data); $index++)
			{
				# Accediendo a los precios de los items...
				if(isset($data[$index]->price))
				{
					for ($i=0; $i < count($data[$index]->price); $i++) {
						$data[$index]->price[$i]->name = $this->translate($data[$index]->price[$i]->name); 
						$data[$index]->price[$i]->price = number_format( ($data[$index]->price[$i]->price / 2800) ,2);
					}
				}

				# Accediendo a los datos cuantitativos del invetario como 
				# los precios c/u que es lo que necesita un cambio de divisa
				if(isset($data[$index]->inventory))
				{
					$data[$index]->inventory->unitCost = number_format(( $data[$index]->inventory->unitCost / 2800 ) , 2);
				}

				# Parte que se encargara de traducir los textos que necesitare
				# para la grid de Items y tambien para la resecion de estos datos
				# String
				$data[$index]->name = $this->translate($data[$index]->name);
				$data[$index]->description = $this->translate($data[$index]->description);
			}
		}

		else
		{
			# Accediendo a los datos de precios de un items
			if(isset($data->price))
			{
				for ($i=0; $i < count($data->price); $i++) { 
					$data->price[$i]->name = $this->translate($data->price[$i]->name);
					$data->price[$i]->price = number_format( ($data->price[$i]->price / 2800), 2 );
				}
			}

			else
			{
				for ($i=0; $i < count($data[0]->price); $i++) { 
					$data[0]->price[$i]->name = $this->translate($data[0]->price[$i]->name);
					$data[0]->price[$i]->price = number_format( ($data[0]->price[$i]->price / 2800), 2 );
				}
			}

			#accendiendo a los nombres y descripciones
			if(isset($data->name))
			{
				# Traducciendo los nombres y descripciones de los items
				$data->name = $this->translate($data->name);
				$data->description = $this->translate($data->description);
			}
			else
			{
				$data[0]->name = $this->translate($data[0]->name);
				$data[0]->description = $this->translate($data[0]->description);
			}
		}

		return $data;
	}

	public function translate($txt = null,$source = 'es',$target = 'en')
	{
		$trans = new GoogleTranslate();
		$txt = $trans->translate($source, $target, $txt);

		return $txt;
	}

	/* Funcion encargada de crear los datos a enviar */
	public function createDataSend()
	{
		/* Esta variable contendra los datos obtenidos del 
		method $_POST de los productos */
		$data = array(
			'name' => $this->translate($_POST['name'],'en','es'),
			'reference' => $_POST['reference'],
			'description' => $this->translate($_POST['description'],'en', 'es'),
		);

		$data['price']= $_POST['price'] * 2800;

		return $data;
	}
}
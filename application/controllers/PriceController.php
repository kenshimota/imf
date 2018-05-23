<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include_once('price.php');

class PriceController extends Zend_Controller_Action
{
	public function init()
	{
		$this->openApi = new Application_Model_Price();

	}

	/* Metodo encargado de la indice que mostrara todos los
    items recibidos de la api */
    public function indexAction()
    {
    	$this->openApi->getItems();
        $this->view->data = "{success : true, data :".$this->openApi->getDataResponse()."}";
    }

	private $openApi;
}
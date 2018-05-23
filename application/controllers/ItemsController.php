<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once('items.php');

class ItemsController extends Zend_Controller_Action
{

    public function init()
    {
        $this->openApi = new Application_Model_Items();
    }

    /* Metodo encargado de la indice que mostrara todos los
    items recibidos de la api */
    public function indexAction()
    {
    	$this->openApi->getItems();
        $this->view->data = $this->openApi->getDataResponse();
    }

    /* Metodo encargado de obtener un items que se necesita */
    public function getAction()
    {
    	$this->openApi->getItems($this->getRequest()->getParam('id'));
    	$this->view->data = $this->openApi->getDataResponse();
    }

    /* Agregar un items nuevo */
    public function addAction()
    {
    	$this->openApi->addItems();
    	$this->view->data = $this->openApi->getDataResponse();
    }

    /* Actualizar un items */
    public function updateAction()
    {
    	$this->openApi->updateItems($this->getRequest()->getParam('id'));
    	$this->view->data = $this->openApi->getDataResponse();
    }

    /* Funcion que eliminara un items de acuerdo a la identidad recibida */
    public function deleteAction()
    {
    	$this->openApi->deleteItems($this->getRequest()->getParam('id'));
    	$this->view->data = $this->openApi->getDataResponse();
    }

    private $openApi;
}
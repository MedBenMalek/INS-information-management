<?php

namespace AdministrationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/administration")
     */
    public function indexinscriAction()
    {
        return $this->render('@Administration/Default/indexinscri.html.twig');
    }
}

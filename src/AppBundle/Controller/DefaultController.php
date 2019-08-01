<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use AdministrationBundle\Entity\seekersBib;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $posts = $em->getRepository('AdministrationBundle:post')->findBy([], null, 4);

        return $this->render('@App/frontPages/homepage.html.twig', array(
            'posts' => $posts,
            ));
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('@App/frontPages/about.html.twig');
    }

    /**
     * @Route("/contact", name="contact")
     */
    public function conatctAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('@App/frontPages/contact.html.twig');
    }

    /**
     * @Route("/demande", name="demande")
     */
    public function demandeAction(Request $request)
    {
        $demande = new seekersBib();
        $form = $this->createForm('AdministrationBundle\Form\seekersBibType', $demande);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($demande);
            $em->flush();
            return $this->redirectToRoute('homepage');
        }

        return $this->render('@App/frontPages/demande.html.twig', array(
            'demande' => $demande,
            'form' => $form->createView(),
        ));

    }
}

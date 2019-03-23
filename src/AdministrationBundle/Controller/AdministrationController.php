<?php

namespace AdministrationBundle\Controller;

use AdministrationBundle\Entity\seekersBib;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * User controller.
 *
 * @Route("admin")
 */

class AdministrationController extends Controller
{
    /**
     * @Route("/", name="admin_index")
     */
    public function loginAction(Request $request)
    {
            return $this->render('@Administration/Default/index_administration.html.twig');
    }

    /**
     * @Route("bib/demandeur", name="bib_demandeur")
     */
    public function demandeurAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $demandeur = $em->getRepository('AdministrationBundle:seekersBib')->findAll();

        return $this->render('@Administration/agentBib/demandeur.html.twig', ['demandeur' => $demandeur]);

    }

    /**
     * @Route("bib/demande/delete/{id}", name="bib_demandeur_delete")
     */
    public function demandeurDeleteAction(Request $request, $id)
    {

        $em = $this->getDoctrine()->getManager();

        $demandeur01 = $em->getRepository('AdministrationBundle:seekersBib')->find($id);
        $em->remove($demandeur01);
        $em->flush();
        $demandeur = $em->getRepository('AdministrationBundle:seekersBib')->findAll();

        return $this->render('@Administration/agentBib/demande.html.twig', ['demandeur' => $demandeur]);

    }

    /**
     * @Route("bib/demandeur/date", name="bib_demandeur_date")
     */
    public function demandeurDateAction(Request $request)
    {

        $start = $request->request->get('start');
        $end = $request->request->get('end');


        $em = $this->getDoctrine()->getManager();

        $demandeur = $this->getDoctrine()
            ->getManager()
            ->createQuery('SELECT e FROM AdministrationBundle:seekersBib e WHERE e.datedemande >='.$start.'and e.datedemande <='.$end )
            ->getResult();

        return $this->render('@Administration/agentBib/affichedemandedate.html.twig', ['demandeur' => $demandeur]);

    }

    /**
     * @Route("bib/demandeur/{id}", name="demandeur_view")
     */
    public function GetDemandeAction(Request $request,$id)
    {
        $em = $this->getDoctrine()->getManager();
        $demandeur = $em->getRepository('AdministrationBundle:seekersBib')->find($id);

        return $this->render('@Administration/agentBib/affichageDemande.html.twig', ['demandeur' => $demandeur]);

    }

    /**
     * @Route("bib/demande", name="bib_demande")
     */
    public function demandeAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $demandeur = $em->getRepository('AdministrationBundle:seekersBib')->findAll();
        return $this->render('@Administration/agentBib/demande.html.twig', ['demandeur' => $demandeur]);

    }

    /**
     * @Route("responsible/demande" , name="res_demande")
     */
    public function RespDemandeAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $demandeur = $em->getRepository('AdministrationBundle:seekersBib')->findAll();
        return $this->render('@Administration/agentEmail/demande.html.twig', ['demandeurs' => $demandeur]);

    }

    /**
     * @Route("responsible/demandeur", name="res_demandeur")
     */
    public function RespDemandeurAction(Request $request)
    {

        return $this->render('@Administration/agentEmail/demandeForm.html.twig');

    }

    /**
 * Creates a new demande entity.
 *
 * @Route("bib/newdemande", name="demande_new")
 * @Method({"GET", "POST"})
 */
    public function newDemandeAction(Request $request)
    {
        $demande = new seekersBib();
        $form = $this->createForm('AdministrationBundle\Form\seekersBibType', $demande);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($demande);
            $em->flush();
            return $this->redirectToRoute('admin_index');
        }

        return $this->render('@Administration/agentBib/newdemande.html.twig', array(
            'demande' => $demande,
            'form' => $form->createView(),
        ));
    }

    public function loginancienAction(Request $request)
    {
        $response = new Response();
        if ($request->getMethod() == 'POST') {
            $session = $this->get('session');
            $data = $request->request->all();
            $login = $data['login'];
            //$password=md5($data['password']);
            $password = $data['password'];
            $session->set('login', $login);
            $actif = '1';


            $repository = $this->getDoctrine()
                ->getManager()
                ->getRepository('IpiBundle:Agent');
            $by = array('login' => $login, 'pwd' => $password, 'actifON' => $actif);
            $user = $repository->findOneBy($by);
            $nb = count($user);
            $em = $this->getDoctrine()->getManager();
            //$conn = $em->getConnection();


            if ($nb == 0) {
                $response->setContent("<script>alert('Login et mot de passe Erronés');</script>");
                $response->send();
                return $this->render('@Ipi/Default/login.html.twig');
            } else {
                $nom = $user->getNomUtilisateur();
                $login_user = $user->getLogin();
                $type = $user->getTypes();
                $id = $user->getIdAgent();
                $id_bureau = $user->getidBureau();
                $em = $this->getDoctrine()->getManager();

                $profils = 'admin';

                $session->set('nom_regional', $nom);
                $session->set('user_regional', $login);
                $session->set('id_user_regional', $id);
                $session->set('profils', $profils);
                $session->set('type', $type);


                //   return $this->redirect( $this->generateUrl('ipi_homepage') );

                //  }
            }
            return $this->redirect($this->generateUrl('ipi_homepage'));
        } else {

            return $this->render('@Ipi/Default/login.html.twig');

        }
    }

    /**
     * @Route("/logout")
     */
    public function logoutAction()
    {
        $session = $this->get('session');
        $session->remove('user_regional');
        $session->remove('listeenq');
        $session->remove('liste_idenq');
        $session->remove('listegouv');
        $session->remove('listebureau');
        $session->remove('nom_regional');
        $session->remove('id_user_regional');
        $session->remove('profils');
        $session->remove('type');
        $session->remove('liste_enq00');

        $session->remove('idEnquete');
        $session->remove('annee');
        $session->remove('passage');
        return $this->redirect($this->generateUrl('login_serverpage'));

    }

}

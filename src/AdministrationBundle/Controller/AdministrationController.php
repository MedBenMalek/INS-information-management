<?php

namespace AdministrationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdministrationController extends Controller
{
    /**
     * @Route("/login")
     */
    public function loginAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            return $this->render('@Administration/Default/index_administration.html.twig');
        } else {
            return $this->render('@Administration/Default/login.html.twig');
        }
    }

    /**
     * @Route("/demandeur")
     */
    public function demandeurAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $demandeur = $em->getRepository('AdministrationBundle:seekersBib')->findAll();

        return $this->render('@Administration/agentBib/demandeur.html.twig', ['demandeur' => $demandeur]);

    }

    /**
     * @Route("/demande")
     */
    public function demandeAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $demande = $em->getRepository('AdministrationBundle:seekersBib')->findAll();

        return $this->render('@Administration/agentBib/demande.html.twig', ['demands' => $demande]);

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

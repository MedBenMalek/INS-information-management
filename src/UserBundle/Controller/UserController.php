<?php

namespace UserBundle\Controller;

use UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * User controller.
 *
 * @Route("admin/user")
 */
class UserController extends Controller
{
    /**
     * Lists all user entities.
     *
     * @Route("/bib", name="user_index_bib")
     * @Method("GET")
     */
    public function indexBibAction()
    {
        $em = $this->getDoctrine()->getManager();

        $users = $em->getRepository('UserBundle:User')->findByRole('ROLE_BIB');

        return $this->render('user/indexBib.html.twig', array(
            'users' => $users,
        ));
    }

    /**
     * Lists all user entities.
     *
     * @Route("/resp", name="user_index_resp")
     * @Method("GET")
     */
    public function indexRespAction()
    {
        $em = $this->getDoctrine()->getManager();

        $users = $em->getRepository('UserBundle:User')->findByRole('ROLE_EMAIL');

        return $this->render('user/indexResp.html.twig', array(
            'users' => $users,
        ));
    }

    /**
     * Creates a new user entity.
     *
     * @Route("resp/new", name="user_new_resp")
     * @Method({"GET", "POST"})
     */
    public function newRespAction(Request $request)
    {
        $user = new User();
        $form = $this->createForm('UserBundle\Form\UserTypeNew', $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user->setRoles(['ROLE_EMAIL']);
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('admin_index');
        }

        return $this->render('user/newresp.html.twig', array(
            'user' => $user,
            'form' => $form->createView(),
        ));
    }

    /**
     * Creates a new user entity.
     *
     * @Route("bib/new", name="user_new_bib")
     * @Method({"GET", "POST"})
     */
    public function newBibAction(Request $request)
    {
        $user = new User();
        $form = $this->createForm('UserBundle\Form\UserTypeNew', $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user->setRoles(['ROLE_BIB']);
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('admin_index');
        }

        return $this->render('user/newBib.html.twig', array(
            'user' => $user,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a user entity.
     *
     * @Route("/{id}", name="user_show")
     * @Method("GET")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('UserBundle:User')->find($id);

        return $this->render('user/show.html.twig', array(
            'user' => $user,
        ));
    }

    /**
     * Displays a form to edit an existing user entity.
     *
     * @Route("/{id}/edit", name="user_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, User $user)
    {
        $editForm = $this->createForm('UserBundle\Form\UserType', $user);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_index');
        }

        return $this->render('user/edit.html.twig', array(
            'user' => $user,
            'edit_form' => $editForm->createView(),
        ));
    }

    /**
     * Deletes a user entity.
     *
     * @Route("/d/{id}/{role}", name="user_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, User $user, $id, $role)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('UserBundle:User')->find($id);
        $em->remove($user);
        $em->flush();

        if($role == 'resp')
            return $this->redirectToRoute('user_index_resp');
        return $this->redirectToRoute('user_index_bib');
    }

    /**
     *
     * @Route("/activate/{id}/{role}", name="user_activate")
     * @Method("DELETE")
     */
    public function activateUserAction($id, $role)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('UserBundle:User')->find($id);
        if ($user->isEnabled()){
            $user->setEnabled(false);
        }else{
            $user->setEnabled(true);
        }

        $em->flush();

        if($role == 'resp')
            return $this->redirectToRoute('user_index_resp');
        return $this->redirectToRoute('user_index_bib');
    }

    /**
     * Creates a form to delete a user entity.
     *
     * @param User $user The user entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(User $user)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('user_delete', array('id' => $user->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
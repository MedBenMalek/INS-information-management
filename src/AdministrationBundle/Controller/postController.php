<?php

namespace AdministrationBundle\Controller;

use AdministrationBundle\Entity\post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * Post controller.
 *
 * @Route("post")
 */
class postController extends Controller
{
    /**
     * Lists all post entities.
     *
     * @Route("/", name="post_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $posts = $em->getRepository('AdministrationBundle:post')->findAll();

        return $this->render('@Administration/agentBib/listActualites.html.twig', array(
            'posts' => $posts,
        ));
    }

    /**
     * Lists all post entities.
     *
     * @Route("/front", name="post_front_index")
     * @Method("GET")
     */
    public function indexPostAction()
    {
        $em = $this->getDoctrine()->getManager();

        $posts = $em->getRepository('AdministrationBundle:post')->findAll();

        return $this->render('@App/frontPages/listPosts.html.twig', array(
            'posts' => $posts,
        ));
    }

    /**
     * Creates a new post entity.
     *
     * @Route("/new", name="post_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $post = new Post();
        $form = $this->createForm('AdministrationBundle\Form\postType', $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $logo_new = $post->getLogo();
            $fileName = md5(uniqid()).'.'.$logo_new->guessExtension();
            $logo_new->move(
                $this->getParameter('images_directory') . '/' ,
                $fileName
            );
            $post->setLogo($fileName);
            $post->setCreatedAt(new \DateTime() );
            $post->setUser($this->getUser());
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            return $this->redirectToRoute('post_index', array('id' => $post->getId()));
        }

        return $this->render('post/new.html.twig', array(
            'post' => $post,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a post entity.
     *
     * @Route("/{id}", name="post_show")
     * @Method("GET")
     */
    public function showAction(post $post)
    {
        $deleteForm = $this->createDeleteForm($post);

        return $this->render('@Administration/agentBib/viewActualite.html.twig', array(
            'post' => $post,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing post entity.
     *
     * @Route("/{id}/edit", name="post_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, post $post)
    {
        $deleteForm = $this->createDeleteForm($post);
        $editForm = $this->createForm('AdministrationBundle\Form\postType', $post);
        $editForm->handleRequest($request);
        $logo = $post->getLogo();

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $logo_new = $post->getLogo();
            if ($logo_new == null) {
                $post->setLogo($logo);
            } else {
                $fs = new Filesystem();
                $fs->remove($this->getParameter('images_directory') . '/' ,  $logo);
                $fileName = md5(uniqid()).'.'.$logo_new->guessExtension();
                $logo_new->move(
                    $this->getParameter('images_directory') . '/' ,
                    $fileName
                );
                $post->setLogo($fileName);
            }

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('post_index', array('id' => $post->getId()));
        }

        return $this->render('post/edit.html.twig', array(
            'post' => $post,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * @Route("/delete/{id}", name="deletePost")
     */
    public function postDeleteAction(Request $request, $id)
    {

        $em = $this->getDoctrine()->getManager();

        $post = $em->getRepository('AdministrationBundle:post')->find($id);
        $logo = $post->getLogo();
        $fs = new Filesystem();
        $fs->remove($this->getParameter('images_directory') . '/' ,  $logo);
        $em->remove($post);
        $em->flush();

        return $this->redirectToRoute('post_index');

    }

    /**
     * Deletes a post entity.
     *
     * @Route("/{id}", name="post_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, post $post)
    {
        $form = $this->createDeleteForm($post);
        $form->handleRequest($request);
        $logo = $post->getLogo();
        if ($form->isSubmitted() && $form->isValid()) {
            $fs = new Filesystem();
            $fs->remove($this->getParameter('images_directory') . '/' ,  $logo);
            $em = $this->getDoctrine()->getManager();
            $em->remove($post);
            $em->flush();
        }

        return $this->redirectToRoute('post_index');
    }

    /**
     * Creates a form to delete a post entity.
     *
     * @param post $post The post entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(post $post)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('post_delete', array('id' => $post->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}

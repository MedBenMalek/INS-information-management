<?php

namespace AdministrationBundle\Controller;

use AdministrationBundle\Entity\stat;
use AdministrationBundle\Entity\cart;
use AdministrationBundle\Entity\chartdata;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Ob\HighchartsBundle\Highcharts\Highchart;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Knp\Bundle\SnappyBundle\Snappy\Response\JpegResponse;

/**
 * Stat controller.
 *
 * @Route("stat")
 */
class statController extends Controller
{
    /**
     * Lists all stat entities.
     *
     * @Route("/", name="stat_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $stats = $em->getRepository('AdministrationBundle:stat')->findAll();

        return $this->render('stat/index.html.twig', array(
            'stats' => $stats,
        ));
    }

    /**
     * Lists all stat entities.
     *
     * @Route("/status", name="stat_status_demande")
     * @Method({"GET", "POST"})
     */
    public function statusAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $demande = $em->getRepository('AdministrationBundle:seekersBib')->findOneBy(['id' =>$request->request->get('id')]);

        $status = $request->request->get('statu');

        if ($status == "waiting") {
            $demande->setStatus("waiting");
        } elseif ($status == "inProgress") {
            $demande->setStatus("in progress");
        } else {
            $demande->setStatus("completed");
        }

        $em->flush();

        return new JsonResponse("succès");
    }

    /**
     * Creates a new stat entity.
     *
     * @Route("/new", name="stat_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $stat = new Stat();
        $form = $this->createForm('AdministrationBundle\Form\statType', $stat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $stat->setUser($this->getUser());
            $em->persist($stat);
            $em->flush();

            return $this->redirectToRoute('stat_new_chart', array('id' => $stat->getId()));
        }

        return $this->render('stat/new.html.twig', array(
            'stat' => $stat,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a stat entity.
     *
     * @Route("/{id}", name="stat_show")
     * @Method("GET")
     */
    public function showAction(stat $stat)
    {
        $deleteForm = $this->createDeleteForm($stat);

        return $this->render('stat/show.html.twig', array(
            'stat' => $stat,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing stat entity.
     *
     * @Route("/{id}/edit", name="stat_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, stat $stat)
    {
        $deleteForm = $this->createDeleteForm($stat);
        $editForm = $this->createForm('AdministrationBundle\Form\statType', $stat);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('stat_edit', array('id' => $stat->getId()));
        }

        return $this->render('stat/edit.html.twig', array(
            'stat' => $stat,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * @Route("/delete/{id}", name="deleteStat")
     */
    public function statDeleteAction(Request $request, $id)
    {

        $em = $this->getDoctrine()->getManager();

        $stat = $em->getRepository('AdministrationBundle:stat')->find($id);
        $em->remove($stat);
        $em->flush();

        return $this->redirectToRoute('stat_index');

    }

    /**
     * Deletes a stat entity.
     *
     * @Route("/{id}", name="stat_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, stat $stat)
    {
        $form = $this->createDeleteForm($stat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($stat);
            $em->flush();
        }

        return $this->redirectToRoute('stat_index');
    }

    /**
     * Creates a new stat entity.
     *
     * @Route("/newchart/{id}", name="stat_new_chart")
     * @Method({"GET", "POST"})
     */
    public function newChartAction(Request $request, $id)
    {
        $chart = new cart();
        $form = $this->createForm('AdministrationBundle\Form\chartType', $chart);
        $form->handleRequest($request);


        $em = $this->getDoctrine()->getManager();
        $stat = $em->getRepository('AdministrationBundle:stat')->find($id);
        $cle = $request->request->get('cle');
        $val = $request->request->get('val');


        if ($form->isSubmitted() && $form->isValid()) {
            $data = array_combine($cle, $val);

            $chart->setStat($stat);
            $em->persist($chart);
            $em->flush();



            foreach ($data as $c => $v){
                $chartData = new Chartdata();
                $chartData->setChart($chart);
                $chartData->setCle($c);
                $chartData->setValue($v);
                $em->persist($chartData);
                $em->flush();
            }

            return $this->redirectToRoute('chart', array('id' => $stat->getId()));
        }

        return $this->render('@Administration/agentBib/newChart.html.twig', array(
            'chart' => $chart,
            'stat' => $stat,
            'form' => $form->createView(),
        ));
    }


    /**
     * @Route("/chart/{id}", name="chart")
     * @Method({"GET", "POST"})
     */
    public function chartAction($id)
    {

        $em = $this->getDoctrine()->getManager();
        $stat = $em->getRepository('AdministrationBundle:stat')->find($id);
        $chart = $em->getRepository('AdministrationBundle:cart')->findBy(['stat' => $stat]);

        $obj = array();

        foreach ($chart as $char) {

            $chartdata = $em->getRepository('AdministrationBundle:chartdata')->findBy(['chart' => $char]);

            // Chart
            $ob = new Highchart();
            $ob->chart->renderTo('chartrun'.$char->getId());  // The #id of the div where to render the chart
            $ob->title->text($char->getTitle());
            $ob->plotOptions->pie(array(
                'allowPointSelect'  => false,
                'cursor'    => 'pointer',
                'dataLabels'    => array('enabled' => true),
                'showInLegend'  => true
            ));
            $data = array();

            foreach ($chartdata as $c) {
                array_push($data, [ $c->getCle() , intval($c->getValue()) ]);
            }

            $ob->series(array(array('type' => 'pie','name' => 'Browser share', 'data' => $data)));

            array_push($obj, [
                "ob" => $ob,
                "id" => $char->getId(),
            ]);
        }

        return $this->render('@Administration/agentBib/chart.html.twig', array(
            'charts' => $obj,
            'stat' => $stat,
        ));
    }

    /**
     * Lists all stat entities.
     *
     * @Route("/pdf/{id}", name="stat_pdf")
     * @Method({"GET","POST"})
     */
    public function PDFAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $stat = $em->getRepository('AdministrationBundle:stat')->find($id);
        $chart = $em->getRepository('AdministrationBundle:cart')->findBy(['stat' => $stat]);

        $obj = array();

        foreach ($chart as $char) {

            $chartdata = $em->getRepository('AdministrationBundle:chartdata')->findBy(['chart' => $char]);

            // Chart
            $ob = new Highchart();
            $ob->chart->renderTo('chartrun'.$char->getId());  // The #id of the div where to render the chart
            $ob->title->text($char->getTitle());
            $ob->plotOptions->pie(array(
                'allowPointSelect'  => false,
                'cursor'    => 'pointer',
                'dataLabels'    => array('enabled' => true),
                'showInLegend'  => true
            ));
            $data = array();

            foreach ($chartdata as $c) {
                array_push($data, [ $c->getCle() , intval($c->getValue()) ]);
            }

            $ob->series(array(array('type' => 'pie','name' => 'Browser share', 'data' => $data)));

            array_push($obj, [
                "ob" => $ob,
                "id" => $char->getId(),
            ]);
        }

        $html = $this->renderView('@Administration/agentBib/chart.html.twig', array(
            'charts' => $obj,
            'stat'  => $stat
        ));

        return new JpegResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'file.pdf'
        );

    }

    /**
     * Creates a form to delete a stat entity.
     *
     * @param stat $stat The stat entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(stat $stat)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('stat_delete', array('id' => $stat->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}

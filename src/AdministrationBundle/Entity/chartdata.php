<?php

namespace AdministrationBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * chartdata
 *
 * @ORM\Table(name="chartdata")
 * @ORM\Entity(repositoryClass="AdministrationBundle\Repository\chartdataRepository")
 */
class chartdata
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="cle", type="string", length=255)
     */
    private $cle;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="string", length=255)
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity="AdministrationBundle\Entity\cart", inversedBy="chart")
     * @ORM\JoinColumn(name="chart_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $chart;

    /**
     * @return mixed
     */
    public function getChart()
    {
        return $this->chart;
    }

    /**
     * @param mixed $chart
     */
    public function setChart($chart)
    {
        $this->chart = $chart;
    }



    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set cle
     *
     * @param string $cle
     *
     * @return chartdata
     */
    public function setCle($cle)
    {
        $this->cle = $cle;

        return $this;
    }

    /**
     * Get cle
     *
     * @return string
     */
    public function getCle()
    {
        return $this->cle;
    }

    /**
     * Set value
     *
     * @param string $value
     *
     * @return chartdata
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }
}


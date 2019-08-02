<?php

namespace AdministrationBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * cart
 *
 * @ORM\Table(name="cart")
 * @ORM\Entity(repositoryClass="AdministrationBundle\Repository\cartRepository")
 */
class cart
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
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="AdministrationBundle\Entity\stat", inversedBy="stat")
     * @ORM\JoinColumn(name="stat_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $stat;

    /**
     * @ORM\OneToMany(targetEntity="AdministrationBundle\Entity\chartdata", mappedBy="chartdata")
     */
    private $chartdata;

    public function __construct()
    {
        $this->chartdata = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getStat()
    {
        return $this->stat;
    }

    /**
     * @param mixed $stat
     */
    public function setStat($stat)
    {
        $this->stat = $stat;
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
     * Set title
     *
     * @param string $title
     *
     * @return cart
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return cart
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}


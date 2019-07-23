<?php

namespace AdministrationBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * stat
 *
 * @ORM\Table(name="stat")
 * @ORM\Entity(repositoryClass="AdministrationBundle\Repository\statRepository")
 */
class stat
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
     * @ORM\ManyToOne(targetEntity="AdministrationBundle\Entity\seekersBib", inversedBy="seekersBib")
     * @ORM\JoinColumn(name="seekersBib_id", referencedColumnName="id")
     */
    private $demandeur;

    /**
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User", inversedBy="User")
     * @ORM\JoinColumn(name="User_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="AdministrationBundle\Entity\cart", mappedBy="cart")
     */
    private $cart;

    public function __construct()
    {
        $this->cart = new ArrayCollection();
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
     * @return stat
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
     * Set demandeur
     *
     * @param string $demandeur
     *
     * @return stat
     */
    public function setDemandeur($demandeur)
    {
        $this->demandeur = $demandeur;

        return $this;
    }

    /**
     * Get demandeur
     *
     * @return string
     */
    public function getDemandeur()
    {
        return $this->demandeur;
    }

    /**
     * Set user
     *
     * @param string $user
     *
     * @return stat
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return string
     */
    public function getUser()
    {
        return $this->user;
    }
}


<?php

namespace AdministrationBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * seekersBib
 *
 * @ORM\Table(name="seekers_bib")
 * @ORM\Entity(repositoryClass="AdministrationBundle\Repository\seekersBibRepository")
 */
class seekersBib
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
     * @ORM\Column(name="firstname", type="string", length=255)
     */
    private $firstname;

    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=255)
     */
    private $lastname;

    /**
     * @var string
     *
     * @ORM\Column(name="activity", type="string", length=255)
     */
    private $activity;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="tel", type="string", length=255)
     */
    private $tel;

    /**
     * @var string
     *
     * @ORM\Column(name="organization", type="string", length=255)
     */
    private $organization;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @var bool
     *
     * @ORM\Column(name="frstTime", type="boolean")
     */
    private $firstTime;

    /**
     *
     * @ORM\Column(name="datedemande", type="datetime", nullable=true)
     */
    private $datedemande;

    /**
     *
     * @ORM\Column(name="dateresponse", type="datetime", nullable=true)
     */
    private $dateresponse;

    /**
     * @var string
     *
     * @ORM\Column(name="cle", type="string", length=255, nullable=true)
     */
    private $cle;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=255, nullable=true)
     */
    private $status;

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
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param string $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     *
     * @return seekersBib
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     *
     * @return seekersBib
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set activity
     *
     * @param string $activity
     *
     * @return seekersBib
     */
    public function setActivity($activity)
    {
        $this->activity = $activity;

        return $this;
    }

    /**
     * Get activity
     *
     * @return string
     */
    public function getActivity()
    {
        return $this->activity;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return seekersBib
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set tel
     *
     * @param string $tel
     *
     * @return seekersBib
     */
    public function setTel($tel)
    {
        $this->tel = $tel;

        return $this;
    }

    /**
     * Get tel
     *
     * @return string
     */
    public function getTel()
    {
        return $this->tel;
    }

    /**
     * Set organization
     *
     * @param string $organization
     *
     * @return seekersBib
     */
    public function setOrganization($organization)
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * Get organization
     *
     * @return string
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return seekersBib
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

    /**
     * Set firstTime
     *
     * @param boolean $firstTime
     *
     * @return seekersBib
     */
    public function setFirstTime($firstTime)
    {
        $this->firstTime = $firstTime;

        return $this;
    }

    /**
     * Get firstTime
     *
     * @return bool
     */
    public function getFirstTime()
    {
        return $this->firstTime;
    }

    /**
     * @return mixed
     */
    public function getDatedemande()
    {
        return $this->datedemande;
    }

    /**
     * @param mixed $datedemande
     */
    public function setDatedemande($datedemande)
    {
        $this->datedemande = $datedemande;
    }

    /**
     * @return mixed
     */
    public function getDateresponse()
    {
        return $this->dateresponse;
    }

    /**
     * @param mixed $dateresponse
     */
    public function setDateresponse($dateresponse)
    {
        $this->dateresponse = $dateresponse;
    }

    /**
     * @return string
     */
    public function getCle()
    {
        return $this->cle;
    }

    /**
     * @param string $cle
     */
    public function setCle($cle)
    {
        $this->cle = $cle;
    }

    public function __toString() {
        return $this->firstname;
    }



}


<?php

namespace AdministrationBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class seekersBibType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('firstname')
            ->add('lastname')
            ->add('activity')
            ->add('email')
            ->add('tel')
            ->add('organization')
            ->add('type', ChoiceType::class, [
                "choices" => [
                    "Physique"  => "Physique",
                    "morale"    => "morale",
                ],
                "multiple" => false,
            ])
            ->add('firstTime')
            ->add('datedemande', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('cle');
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AdministrationBundle\Entity\seekersBib'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'administrationbundle_seekersbib';
    }


}

<?php

/*
 * This file is part of the FOSUserBundle package.
 *
 * (c) FriendsOfSymfony <http://friendsofsymfony.github.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace UserBundle\Form;

//use FOS\UserBundle\Util\LegacyFormHelper;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RegistrationType extends AbstractType
{
    /**
     * @var string
     */

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('accountType', ChoiceType::class, [
                "choices" => [
                    "Architecte"  => "ROLE_ARCHITECT",
                    "Etudiant"    => "ROLE_STUDENT",
                ],
                "multiple" => false,
                "expanded" => true
            ])

            ->add('firstname')
            ->add('lastname')
            ->add('born_at')
            ->add('email')

            ->add('architect_type', ChoiceType::class, [
                "choices" => [
                    "Vous êtes... ?" => null,
                    "Une agence (personne morale)"       => "Agence",
                    "Un indépendant (personne physique)" => "Indépendant",
                ]
            ])
            ->add('oat')
            ->add('year_of_diploma')
            ->add('institute_of_diploma')

            ->add('phone')
            ->add('address')
            ->add('zip_code')
            ->add('city')
            ->add('website')
            ->add('facebook')
            ->add('instagram')
            ->add('linkedin')
            ->add('logo')
            ->add('description')

            ->add('plainPassword', RepeatedType::class, array(
                'type' => PasswordType::class,
                'options' => array(
                    'translation_domain' => 'FOSUserBundle',
                    'attr' => array(
                        'autocomplete' => 'new-password',
                    ),
                ),
                'first_options' => array('label' => 'form.password'),
                'second_options' => array('label' => 'form.password_confirmation'),
                'invalid_message' => 'fos_user.password.mismatch',
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'UserBundle\Entity\User',
            'csrf_token_id' => 'registration',
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'fos_user_registration';
    }
}

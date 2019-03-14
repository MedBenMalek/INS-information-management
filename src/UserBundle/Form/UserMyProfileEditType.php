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
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserMyProfileEditType extends AbstractType
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
            //->add('logo')
            ->add('description')

            ->add('logo', FileType::class, [
                    'attr' => [
                        'accept' => 'image/jpeg, image/jpg, image/png, image/gif'
                    ],
                    'data_class' => null,
                    'required' => false
                ]
            )
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

 function autocomplete(){
         
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          }
        });
      },
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },
 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
 
     }
 
 function table(){
                  
                    $.extend($.tablesorter.themes.bootstrap, {
                       // these classes are added to the table. To see other table classes available,
                       // look here: http://twitter.github.com/bootstrap/base-css.html#tables
                       table      : '#myTable table-bordered',
                       caption    : 'caption',
                       header     : 'bootstrap-header', // give the header a gradient background
                       footerRow  : '',
                       footerCells: '',
                       icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
                       sortNone   : 'bootstrap-icon-unsorted',
                       sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',     // includes classes for Bootstrap v2 & v3
                       sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down', // includes classes for Bootstrap v2 & v3
                       active     : '', // applied when column is sorted
                       hover      : '', // use custom css here - bootstrap class may not override it
                       filterRow  : '', // filter row class
                       even       : '', // odd row zebra striping
                       odd        : ''  // even row zebra striping
                     });

                     // call the tablesorter plugin and apply the uitheme widget
                     $("#myTable").tablesorter({
                       // this will apply the bootstrap theme if "uitheme" widget is included
                       // the widgetOptions.uitheme is no longer required to be set
                       theme : "bootstrap",

                       widthFixed: true,

                       headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

                       // widget code contained in the jquery.tablesorter.widgets.js file
                       // use the zebra stripe widget if you plan on hiding any rows (filter widget)
                       widgets : [ "uitheme", "filter", "zebra","print" ],

                       widgetOptions : {
                         // using the default zebra striping class name, so it actually isn't included in the theme variable above
                         // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
                         zebra : ["even", "odd"],

                         // reset filters button
                         filter_reset : ".reset",
                         print_title      : 'Impression',          // this option > caption > table id > "table"
			print_dataAttrib : 'data-name', // header attrib containing modified header name
			print_rows       : 'f',         // (a)ll, (v)isible, (f)iltered, or custom css selector
			print_columns    : 's',         // (a)ll, (v)isible or (s)elected (columnSelector widget)
			print_extraCSS   : '',          // add any extra css definitions for the popup window here
			print_styleSheet : '../css/theme.blue.css', // add the url of your print stylesheet
			print_now        : true,        // Open the print dialog immediately if true
			// callback executed when processing completes - default setting is null
			print_callback   : function(config, $table, printStyle) {
				// do something to the $table (jQuery object of table wrapped in a div)
				// or add to the printStyle string, then...
				// print the table using the following code
				$.tablesorter.printTable.printOutput( config, $table.html(), printStyle );
			}
                            
                       }
                     })
                     .tablesorterPager({

                       // target the pager markup - see the HTML block below
                       container: $(".ts-pager"),

                       // target the pager page select dropdown - choose a page
                       cssGoto  : ".pagenum",

                       // remove rows from the table to speed up the sort of large tables.
                       // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
                       removeRows: false,

                       // output string - default is '{page}/{totalPages}';
                       // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
                       output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'

                     });

                 

        }

 
function limit(element,max_chars)//délimite un champs avec clavier numerique max_chars=longueur max
                {
                    

                    if(element.value.length > max_chars) {
                        element.value = element.value.substr(0, max_chars);
                    }
                }
         

                
function verif_nombre(champ)

{
////^[0-9]*,?[0-9]+D
    ///////
    //var chiffres = new RegExp("^[0-9]*,?[0-9]+D"); /* Modifier pour : var chiffres = new RegExp("[0-9]"); */
    var chiffres = new RegExp("[0-9\.]"); /* Modifier pour : var chiffres = new RegExp("[0-9]"); */

    var verif;
    

    var points = 0; /* Supprimer cette ligne */

 

    for(x = 0; x < champ.value.length; x++)

    {

    verif = chiffres.test(champ.value.charAt(x));

    if(champ.value.charAt(x) == "."){points++;} /* Supprimer cette ligne */

    if(points > 1){verif = false; points = 1;} /* Supprimer cette ligne */

    if(verif == false){champ.value = champ.value.substr(0,x) + champ.value.substr(x+1,champ.value.length-x+1); x--;}

    }

}
////////
//////
   
  

/*

$("#Collecte_Visite").click(function(){
    
    $.ajax({
       url : 'suivicollecte',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       }

    });

      
   
});



$("#Controle_collecte").click(function(){
   //alert('ici' );
    $.ajax({
       url : 'controlecollecte',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       }

    });
   
});

$("#Chiffrement").click(function(){
    
    $.ajax({
       url : 'chiffrement',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       }

    });
   
});

$("#Controle_chiffrement").click(function(){
     $.ajax({
       url : 'controle_chiff',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       }

    });
   
});
 */
////
$("#entreprise_agents").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'affiche_agents_entreprises',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

$("#affiche_suivi_entreprises").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'affiche_suivi_entreprises',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

$("#travail_agent").click(function(){
     $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'affiche_travail_agent',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});
///

///
function inhibe_login()
{
     if ($("#types").val()=='7') //chauffeur
     {
        document.getElementById("login").value=''; 
        document.getElementById("login").disabled = true;
        document.getElementById("password").value=''; 
        document.getElementById("password").disabled = true; 
     }
     else
     {
          document.getElementById("login").disabled = false;
          document.getElementById("password").disabled = false;
     }
}



//$("#valider_agent").click(function(){
//                        // alert("tttttt");
//                        $.ajax({
//                           url : 'updateagent',
//                           type : 'POST',
//                           dataType : 'html',
//                           success : function(code_html, statut){
//                               $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
//                           },
//
//                           error : function(resultat, statut, erreur){
//
//                           }
//
//                        });
//
//                    });

function affiche_gouv(){
    

    $.ajax({
       url : 'recherche_gouv',
       type : 'POST',
       data : {bureau_1:$('#bureau_1').val()}, 
       success : function(donnees){
           //alert(donnees['gouv']);
           $('#gouv_1').html(donnees['gouv']); 
       }

    });
   

}


//function affiche_agent(){
//    
//
//    $.ajax({
//       url : 'recherche_agent',
//       type : 'POST',
//       data : {bureau_1:$('#bureau_1').val()}, 
//       success : function(donnees){
//           //alert(donnees['gouv']);
//           $('#id_agent').html(donnees['AGENT']); 
//       }
//
//    });
//   
//
//}




$("#echantillon").click(function(){
     
    alert("echantillon");
   
});

$("#bord").click(function(){
     
     $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'tableaubord',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});
$("#ajoutenquete").click(function(){
    
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'enquete',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

$("#gestion_voiture").click(function(){
    
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'voiture',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});


$("#bordenquete").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'bordenquete',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       }

    });
   
});

$("#bordenquete_type").click(function(){
   $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'bordenquete_affiche',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       }

    });
   
});


$("#affectation_entreprise").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'affectation_entreprise',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       }

    });
});


function affiche_details ()
{
   // alert('ggggggg');
    var data={bureau:$('#bureau_1').val()};
   // alert($('#bureau_1').val());
    $.ajax({
       url : 'affiche_affectation_entreprise',
       type : 'POST',
       data : data,
       success : function(donnees, statut){
          
           $('#collecte').html(donnees['COLLECTE']); 
           $('#chauffeur').html(donnees['CHAUFFEUR']); 
           $('#voiture').html(donnees['VOITURE']); 
           $('#controleur').html(donnees['CONTROLEUR']);
         // alert('oui');
        // url : 'liste_entrep_agentprint',
//           $.ajax({
//               url : 'liste_entrep_agent_print',
//                 type : 'POST',
//                      data : data,
//                      dataType : 'html',
//                      success : function(donnees, statut){
//                          $('#tablesorter').html(donnees);
//                }
//
//             });
       }

    });
   
}



// On reprend le même id que dans le précédent chapitre

$("#menu_agent").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'agent',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});
//session
$("#session").click(function(){
     $("#central").html('');  $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'sessionenquete',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});
/////


$("#travail_enquete").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'affichetravail_enquete',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

$("#incoherence").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                  
    $.ajax({
       url : 'afficheincoherence_enquete',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});




//session
$("#choixsession").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                  
    var data={appel:'lien'}
    $.ajax({
       url : 'choixsession',
       type : 'POST',
       dataType : 'html',
       data:data,
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       }

    });
   
});

//enquete travail 
$("#enquetetravail").click(function(){
     $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
     var data={appel:'lien'}
    $.ajax({
       url : 'enquetetravail',
       type : 'POST',
       dataType : 'html',
       data:data,
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       }

    });
   
});


$("#affectation_agent").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'affectation_agent',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});
////


// ************hatem *************************************************//
function ajax_frm_session()

    {
   
    
        var donnees = $('#frm').serialize();
        var url=$('#frm').attr('action');
        var typessss=$('#frm').attr('method');
                //alert(donnees);
                 $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>'); 
                  $.ajax({
                            url: url,
                            type: typessss,
                            data: donnees,
                            dataType: 'json', // JSON
                            success: function(code_html, statut){
                                
                               // alert(code_html.message);
                               
                               $.ajax({
                                    url: 'sessionenquete',
                                   
                                    dataType: 'html', // JSON
                                    success: function(code_html, statut){
                                        $("#central").html(code_html);
                                    },
                                    error       : function(resultat, statut, erreur){
                                        alert("Désolé".erreur);
                                    }
                                 });
                                
                                
                                //$("#central").html();
                            },
                            error       : function(resultat, statut, erreur){
                                alert("Désolé".erreur);
                            }
                         });

            
      }



function champs_obligatoire_affectation_agent()
{
    var erreurs=0;
    if (document.getElementById('id_profil').value=="")
    {
        alert("Le profil doit être renseigné");
        erreurs=1;
        document.getElementById('label_id_profil').style.color='red';
        document.getElementById('id_profil').focus();

    }
    else
    {
        document.getElementById('label_id_profil').style.color='black';
    }
    
    if ($("#date_debut").val()=='')
    {
        alert("La date début doit être renseignée");
        erreurs=1;
        document.getElementById('label_date_debut').style.color='red';
        document.getElementById('label_date_debut').focus();

    }
    else
    {
        document.getElementById('date_debut').style.color='black';
    }
    if ($("#date_fin").val()=='')
    {
        alert("La date fin doit être renseignée");
        erreurs=1;
        document.getElementById('label_date_fin').style.color='red';
        document.getElementById('date_fin').focus();

    }
    else
    {
        document.getElementById('label_date_fin').style.color='black';
    }
    //diff(date_debut, date_fin)
     if (($("#date_debut").val()!='') &&   ($("#date_fin").val()!=''))
     {
         $date_debut=$("#date_debut").val();
         $date_fin=$("#date_fin").val();
         if ($date_debut>$date_fin)
         {
            alert("Veuillez vérifier les dates de début et de fin de l'affectation");
            erreurs=1;
            document.getElementById('label_date_debut').style.color='red';
            document.getElementById('date_debut').focus();
         }
          else
        {
            document.getElementById('label_date_debut').style.color='black';
        }
             
         
    }
    
    return(erreurs);
    
}
 
function champs_obligatoire_collecte_visite()
{
    var erreurs=0;
    if (document.getElementById('entreprise').value=="")
    {
        alert("Veuillez séléctionner une entreprise");
        erreurs=1;
        document.getElementById('label_entreprise').style.color='red';
        document.getElementById('entreprise').focus();

    }
    else
    {
        document.getElementById('label_entreprise').style.color='black';
    }
   
    if (document.getElementById('collectepar').value=="")
    {
        if (erreurs=='0')
        {
            alert("L'agent doit être renseigné");
            erreurs=1;
            document.getElementById('collectepar').focus();
        }
        document.getElementById('label_collectepar').style.color='red';
        
    }
    else
    {
        document.getElementById('label_collectepar').style.color='black';
    }
    
     if (document.getElementById('datevisite').value=="")
    {
        if (erreurs=='0')
        {
            alert("La date visite doit être renseignée");
            erreurs=1;
            document.getElementById('datevisite').focus();
        }
        document.getElementById('label_datevisite').style.color='red';
        
    }
    else
    {
        document.getElementById('label_datevisite').style.color='black';
    }
    
    if (document.getElementById('voiture').value=="")
    {
        if (erreurs=='0')
        {
            alert("La voiture doit être renseignée");
            erreurs=1;
            document.getElementById('voiture').focus();
        }
        document.getElementById('label_voiture').style.color='red';
        
    }
    else
    {
        document.getElementById('label_voiture').style.color='black';
    }
    
     if (document.getElementById('chauffeur').value=="")
    {
        if (erreurs=='0')
        {
            alert("Le chauffeur doit être renseigné");
            erreurs=1;
            document.getElementById('chauffeur').focus();
        }
        document.getElementById('label_chauffeur').style.color='red';
        
    }
    else
    {
        document.getElementById('label_chauffeur').style.color='black';
    }
    
    var etat_quest=document.getElementById('etat').value;
    //alert(etat_quest);
    if (document.getElementById('etat').value=="")
    {
        if (erreurs=='0')
        {
            alert("L'état doit être renseigné");
            erreurs=1;
            document.getElementById('etat').focus();
        }
        document.getElementById('label_etat').style.color='red';
        
    }
    else
    {
        document.getElementById('label_etat').style.color='black';
    }
    
    if (document.getElementById('rdv').value=="" && etat_quest=='7')//rendez vous
    {
        if (erreurs=='0')
        {
            alert("La date du rendez vous doit être renseignée");
            erreurs=1;
            document.getElementById('rdv').focus();
        }
        document.getElementById('label_rdv').style.color='red';
        
    }
    else
    {
        document.getElementById('label_rdv').style.color='black';
    }
    
   /* if (document.getElementById('personne').value=="")
    {
        if (erreurs=='0')
        {
            alert("La personne contactée doit être renseignée");
            erreurs=1;
            document.getElementById('personne').focus();
        }
        document.getElementById('label_personne').style.color='red';
        
    }
    else
    {
        document.getElementById('label_personne').style.color='black';
    }
    
    if (document.getElementById('telephone').value=="")
    {
        if (erreurs=='0')
        {
            alert("Le telephone doit être renseigné");
            erreurs=1;
            document.getElementById('telephone').focus();
        }
        document.getElementById('label_telephone').style.color='red';
        
    }
    else
    {
        document.getElementById('label_telephone').style.color='black';
    }*/
    
    if (etat_quest=='7')
     {
       var date_visite, date_rendez_vous;
       var date_visite_modif, date_rendez_vous_modif;
       date_visite=$("#datevisite").val();
       date_visite_modif=date_visite.substr(0,2) + '/' + date_visite.substr(2,2) + '/' + date_visite.substr(5,4);
       
        date_rendez_vous=$("#rdv").val();
        date_rendez_vous_modif=date_rendez_vous.substr(0,2) + '/' + date_rendez_vous.substr(2,2) + '/' + date_rendez_vous.substr(5,4);
        
        //if ((document.getElementById('datevisite').value <= document.getElementById('rdv').value) )//rendez vous
        if (date_rendez_vous_modif < date_visite_modif )//rendez vous
       {
           if (erreurs=='0')
           {
               alert("Veuillez vérifier la date du rendez vous");
               erreurs=1;
               document.getElementById('rdv').focus();
           }
           document.getElementById('label_rdv').style.color='red';

       }
       else
       {
           document.getElementById('label_rdv').style.color='black';
       }
   }
    return(erreurs);
    
    }
 
 function rendez_vous()
 {
    
      if ($("#etat").val()=="7") // alert('rendez vous'); 
      {
          document.getElementById("rdv").disabled = false;
      }
      else
      {
          document.getElementById("rdv").disabled = true;
          document.getElementById("rdv").value='';
      }
 }
 
function champs_obligatoire_controle_collecte()
{
     var erreurs=0;
    if (document.getElementById('identreprise').value=="")
    {
        alert("Veuillez séléctionner une entreprise");
        erreurs=1;
        document.getElementById('label_identreprise').style.color='red';
        document.getElementById('identreprise').focus();

    }
    else
    {
        document.getElementById('label_identreprise').style.color='black';
    }
    
    if (document.getElementById('etat_collecte').value=="")
    {
         if (erreurs=='0')
        {
            alert("L'état doit être renseigné");
            erreurs=1;
            document.getElementById('etat_collecte').focus();
        }
        document.getElementById('label_etat_collecte').style.color='red';
     } 
     else
    {
        document.getElementById('label_etat_collecte').style.color='black';
    }
    return(erreurs);
}

function champs_obligatoire_chiffrement()
{  
    var erreurs=0;
    if (document.getElementById('identreprise').value=="")
    {
        alert("Veuillez séléctionner une entreprise");
        erreurs=1;
        document.getElementById('label_identreprise').style.color='red';
        document.getElementById('identreprise').focus();
    }
    else
    {
        document.getElementById('label_identreprise').style.color='black';
    }
    
    if (document.getElementById('etat_chiffrement').value=="")
    {
       // alert(erreurs);
        if (erreurs=='0')
        {
            alert("L'état doit être renseigné");
            erreurs=1;
            document.getElementById('label_etat_chiffrement').style.color='red';
            document.getElementById('etat_chiffrement').focus();
        }
        
     } 
     else
    {
        document.getElementById('label_etat_chiffrement').style.color='black';
    }
    return(erreurs);
}

function champs_obligatoire_controle_chiff()
{  
   // alert('debut');
    var erreurs=0;
    if (document.getElementById('identreprise').value=="")
    {
        alert("Veuillez séléctionner une entreprise");
        erreurs=1;
        document.getElementById('label_identreprise').style.color='red';
        document.getElementById('identreprise').focus();
    }
    else
    {
        document.getElementById('label_identreprise').style.color='black';
    }
   
    if (document.getElementById('etat_controle_chiff').value=="")
    {
       // alert(erreurs);
        if (erreurs=='0')
        {
            alert("L'état doit être renseigné");
            erreurs=1;
            document.getElementById('label_etat_chiffrement').style.color='red';
            document.getElementById('etat_chiffrement').focus();
        }
        
     } 
     else
    {
        document.getElementById('label_etat_chiffrement').style.color='black';
    }
     
    return(erreurs);
}






function test_champ_affectation_agent()
{
    //alert('ici'); 
    if (champs_obligatoire_affectation_agent()=='0'  )
            {
            ajax_form();
            }
            else
            {
                alert('probleme');           
            }
            //alert(champs_obligatoire_affectation_agent());
}


function test_champ_collecte_visite()
{
    var types=$('#max_etat_visite').val();
    var id_visite=$('#id_visite').val()
    
    if (id_visite =='' && ((types =='1')||(types =='2')|| (types =='3'))) //mode ajout
    {
        alert ("Impossible d'ajouter à cause de l'état de la derniere visite");
        return;
    }
    if (champs_obligatoire_collecte_visite()=='0'  )
     {
            var data={entreprise:$('#entreprise').val()};
            var donnees = $('#frm').serialize();
                  $.ajax({
                            url: $('#frm').attr('action'),
                            type: $('#frm').attr('method'),
                            data: donnees,
                            dataType: 'html', // JSON
                            success: function(code_html, statut){
                                $.ajax({
                                        url : 'visite_entreprise',
                                        type : 'POST',
                                        data : data,
                                        success : function(donnees, statut){
                                            $('#collectepar').val('');
                                            $('#id_visite').val('');
                                            $('#datevisite').val('');
                                            $('#voiture').val('');
                                            $('#chauffeur').val('');
                                            $('#etat').val('');
                                            $('#rdv').val('');
                                            $('#personne').val('');
                                            $('#telephone').val('');
                                            $("#tablesorter").html(donnees['tablesorter']);
                                            table();
                                        }

                                     });
                            },
                            error       : function(resultat, statut, erreur){
                                alert("Désolé".erreur);
                            }
                         });
                          
        }
                                  
           
}

function test_champ_controle_collecte()
{
   
    if (champs_obligatoire_controle_collecte()=='0')  
            {
                ajax_form();
            }
}

function test_champ_chiffrement()
{
   
    if (champs_obligatoire_chiffrement()=='0')  
            {
                ajax_form();
            }
}

function test_champ_controle_chiff()
{
   
   if (champs_obligatoire_controle_chiff()=='0')  
            {
             ajax_form();
            }
}
//function tt()
//{
//    alert($("#date_debut").val());
//    $("#date_debut").val('2018-10-01');
//}
function load_id()
{
     $x=$("#id_agent").val();
     $("#id_agent0").val($x);
   
}
function ajax_form()

    {
       // alert($('#frm').attr('action'));
            var url=$('#frm').attr('action');
            var methode=$('#frm').attr('method');
            var donnees = $('#frm').serialize();
                $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>'); 
                  $.ajax({
                            url: url,
                            type: methode,
                            data: donnees,
                            dataType: 'html', // JSON
                            success: function(code_html, statut){
                                $("#central").html(code_html);
                            },
                            error       : function(resultat, statut, erreur){
                                alert("Désolé".erreur);
                            }
                         });

           
      }
      
     


function ajax_frm()

    {
                var donnees = $('#frm').serialize();
                var url=$('#frm').attr('action');
                var typessss=$('#frm').attr('method');
                //alert(donnees);
                 $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>'); 
                  $.ajax({
                            url: url,
                            type: typessss,
                            data: donnees,
                            dataType: 'json', // JSON
                            success: function(code_html, statut){
                                
                                alert(code_html.erreur+'--'+code_html.message);
                                //$("#central").html(code_html.erreur);
                            },
                            error       : function(resultat, statut, erreur){
                                alert("Désolé".erreur);
                            }
                         });

            
      }
      
//function ajax_affectation_agent_form()
//    {
//       var donnees = $('#frm').serialize();
//                  $.ajax({
//                            url: $('#frm').attr('action'),
//                            type: $('#frm').attr('method'),
//                            data: donnees,
//                            dataType: 'html', // JSON
//                            success: function(code_html, statut){
//                                $("#central").html(code_html);
//                            },
//                            error       : function(resultat, statut, erreur){
//                                alert("Désolé".erreur);
//                            }
//                         });
//      }



//function affiche_agent()
//{
//       $.ajax({
//       url : 'agent_param',
//       type : 'POST',
//       data : {bureau1:$('#bureau_1').val()},
//       success : function(donnees, statut){
//           $('#tablesorter').html(donnees);
//           var bureaux=$('#bureau_1').val();
//           $("#save_bureau_affichage").val(bureaux);
//           // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
//       }
//
//    });
//}


//function editer_echantillon(id_ligne)
//{
//  var lignes=id_ligne;
//  alert('oui');
//  if (lignes>='1')
//  { 
//     var indices="#id_bureau"+id_ligne;
//     var bureaux=$(indices).val();
//     $("#bureau").val(bureaux);
//    
//     var indices="#entreprise"+id_ligne;
//     var id=$(indices).val();
//     $("#Id").val(id);
//     $("#Id_hidden").val(id);
//   
//     var indices1="#rs"+id_ligne;
//     var nom=$(indices1).val();
//     $("#rs").val(nom);
//     
//     var indices1="#rue"+id_ligne;
//     var rue=$(indices1).val();
//     $("#rue").val(rue);
//     
//     var indices="#code_gouv"+id_ligne;
//     var code_gouv=$(indices).val();
//     $("#code_gouv").val(code_gouv);
//     
//     var indices1="#id_activite"+id_ligne;
//     var id_activite=$(indices1).val();
//     $("#id_activite").val(id_activite);
//     
//  }
//}

function editer_agent(id_ligne)
{
  var lignes=id_ligne;
  //alert('oui');
  if (lignes>='1')
  { 
     var indices="#id_bureau"+id_ligne;
     var bureaux=$(indices).val();
     $("#bureau").val(bureaux);
    
     var indices="#id_agent"+id_ligne;
     var id=$(indices).val();
     $("#Id").val(id);
     $("#Id_hidden").val(id);
   
     var indices1="#nom"+id_ligne;
     var nom=$(indices1).val();
     $("#name").val(nom);
     
     var indices1="#tel"+id_ligne;
     var tel=$(indices1).val();
     $("#telephone").val(tel);
     
     var indices="#types"+id_ligne;
     var types=$(indices).val();
     $("#types").val(types);
     
     if (types=='7')//chauffeur
     {
          document.getElementById("login").value=''; 
          document.getElementById("login").disabled = true;
          document.getElementById("password").value=''; 
          document.getElementById("password").disabled = true; 
     }
     else
     {
         document.getElementById("login").disabled = false;
          document.getElementById("password").disabled = false;
         
     }
     ///
     var indices="#titre"+id_ligne;
     var titre=$(indices).val();
     $("#titre").val(titre);
     ////
    
     var indices="#login"+id_ligne;
     var logins=$(indices).val();
      $("#login").val(logins);
    
     var indices="#pwd"+id_ligne;
     var pwd=$(indices).val();
     $("#password").val(pwd);
     
     var indices="#actif"+id_ligne;
     var actif=$(indices).val();
   
     if (actif=="1")
     {
         document.frm['actifs'][0].checked=true;
     }
     else
      {
         document.frm['actifs'][1].checked=true;
     }      
  }
}


function editer_affectation_agent(id_ligne)
{
  var lignes=id_ligne;
  //alert('ici');
   if (lignes>='1')
  { 
     var indices="#id"+id_ligne;
     var id_agent=$(indices).val();
     $("#id_agent0").val(id_agent);
     
    var indices="#id_profil"+id_ligne;
    var profil=$(indices).val();
    $("#id_profil").val(profil);   
     
    var indices="#nom"+id_ligne;
    var nom_agent=$(indices).val();
    //  $("#id_agent").option = null

//document.all.choix.options[document.all.choix.length-1] = null;
   // $("#id_agent").val(nom_agent);
            
     var indices="#date_debut"+id_ligne;
    // alert($(indices).val());
     $("#date_debut").val($(indices).val());
//     var date_debut=$(indices).val();
//   
//     var annee=date_debut.substring(0, 4);
//     var mois1=(date_debut.substring(5));
//     var mois =(mois1.substring(0,2));
//     var jour=date_debut.substring(8);
//     var chaines= jour + '-' + mois + '-' + annee;
//     //alert(chaines);
//      $("#date_debut").val(chaines);
         
     var indices="#date_fin"+id_ligne;
     $("#date_fin").val($(indices).val());
//     var date_fin=$(indices).val();
//     
//     var annee=date_fin.substring(0, 4);
//     var mois1=(date_fin.substring(5));
//     var mois =(mois1.substring(0,2));
//     var jour=date_fin.substring(8);
//     var chaines= jour + '-' + mois + '-' + annee;
//     //alert(chaines);
//      $("#date_fin").val(chaines);
         
     var indices="#id_bureau"+id_ligne;
     var bureaux=$(indices).val();
     $("#bureau_1").val(bureaux);
     
     removeOptions(document.getElementById("id_agent"));
     var select = document.getElementById ("id_agent");
     var newOption = new Option (nom_agent, id_agent);
     select.options.add (newOption);  
    
     
      var rowcount= $('#tblAppendGrid').appendGrid('getRowCount');
         
          
                        for(var j=1; j<=rowcount; j++) {
                           var choix="#tblAppendGrid_choix_"+j;
                          
                                $(choix).prop("checked", false);
                             
                        }
     affiche_tache(id_agent);
              
  }
}
function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}
//using the function:



function ajouter_agent()
{
    $("#Id").val('');
    $("#Id_hidden").val('');
    $("#name").val('');
    $("#telephone").val('');
    $("#bureau").val('');
    $("#types").val('');
    $("#titre").val('');
    $("#login").val('');
    $("#password").val('');
    $("#bureau").val($("#bureau_1").val()); 
    document.frm['actifs'][0].checked=true;
    document.frm['actifs'][1].checked=false;
    document.getElementById('bureau').focus();
    
}

function ajouter_echantillon()
{
    $("#Id").val('');
    $("#rs").val('');
    $("#rue").val('');
    $("#code_gouv").val('');
    $("#id_activite").val('');
    $("#bureau").val($("#bureau_1").val()); 
    document.getElementById('Id').focus();
    
}

function ajouter_affectation_agent()
{
  $("#id_profil").val('');  
  $("#id_agent").val('');  
  $("#date_debut").val('');  
  $("#date_fin").val('');  
  document.getElementById('bureau_1').focus();
  affiche_tache();
}

 function agent_bureau()
 {
     var data={bureau1:$('#bureau_1').val()};
     $.ajax({
       url : 'affectation_agent_affichage',
       type : 'POST',
       data : data,
       success : function(donnees, statut){
           //$('#tablesorter').html(donnees);
           $('#id_agent').html(donnees['AGENT']); 
       }

    });
 }
 
 function affiche_tache(id_agent)
 {
     var data={ID_AGENT:id_agent};
     $.ajax({
       url : 'affectation_agent_tache',
       type : 'POST',
       data : data,
       success : function(donnees, statut){
           
                        var rowcount= $('#tblAppendGrid').appendGrid('getRowCount');
         
           for(var i=0; i<donnees.liste_tache.length; i++) {
            
                        for(var j=1; j<=rowcount; j++) {
                           var champ="#tblAppendGrid_ID_TACHE_"+j;
                           var choix="#tblAppendGrid_choix_"+j;
                           if ($(champ).val()==donnees.liste_tache[i].ID_TACHE)
                           {
                               //alert(choix);
                                $(choix).prop("checked", true);
                           }
                           
                              
                        }
          
             }
          
        
       }

    });
 }
  function editer_controle_collecte(id_ligne)
        {
            var indices="#entreprise"+id_ligne;
            var entreprise=$(indices).val();

            var indices="#rs"+id_ligne;
            var rs=$(indices).val();

            removeOptions(document.getElementById("identreprise"));
            var select = document.getElementById ("identreprise");
            var newOption = new Option (rs, entreprise);
            select.options.add (newOption);  

            var indices="#etat"+id_ligne;
            var etat=$(indices).val();
           // alert(etat);
            $("#etat_collecte").val(etat);

        }
 
 
 function editer_chiffrement(id_ligne)
 {
     var indices="#entreprise"+id_ligne;
     var entreprise=$(indices).val();
     var indices="#rs"+id_ligne;
     var rs=$(indices).val();
         
     removeOptions(document.getElementById("identreprise"));
     var select = document.getElementById ("identreprise");
     var newOption = new Option (rs, entreprise);
     select.options.add (newOption);  
     
     
      var indices="#etat"+id_ligne;
     var etat=$(indices).val();
     $("#etat_chiffrement").val(etat);
   
 }
 $("#Controle_chiff").click(function(){
     $("#central").html(''); 
    $.ajax({
       url : 'controle_chiff',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       }

    });
   
});
 
 function editer_controlechiff(id_ligne)
 {
     var indices="#entreprise"+id_ligne;
     var entreprise=$(indices).val();
     var indices="#rs"+id_ligne;
     var rs=$(indices).val();
         
     removeOptions(document.getElementById("identreprise"));
     var select = document.getElementById ("identreprise");
     var newOption = new Option (rs, entreprise);
     select.options.add (newOption);  
         
     var indices="#etat_controle_chiff"+id_ligne;
     var etat=$(indices).val();
     $("#etat_controle_chiff").val(etat);
   
 }
 

//function ajax_delete_agent()
//
//    {
//    if ($('#Id').val()!='')  
//    {
//    //
//    if(confirm('Veuillez confirmer la suppression'))
//    {
//         $("#central").html(''); 
//        //alert($('#Id').val())          ;
//        var data={Id:$('#Id').val(),types:$('#types').val() }; 
//        var data1={Id:$('#Id').val()}; 
//                  $.ajax({
//                            url: 'verif_delete_agent',
//                            type : 'POST',
//                            data:data,
//                            dataType: 'json', // JSON
//                            success: function(data, statut){
//                                
//                                if (data.trouve=='0')// l'agent ne pas de données dans d'autres tables
//                                {
//                                    
//                                    $.ajax({
//                                         url: 'delete_agent',
//                                         type : 'POST',
//                                         data:data1,
//                                         dataType: 'html', // JSON
//                                         success: function(code_html, statut){
//                                             $("#central").html(code_html);
//                                         },
//                                         error       : function(resultat, statut, erreur){
//                                             alert("Désolé".erreur);
//                                         }
//                                      });
//                                  }
//                                  else 
//                                      alert ("Impossible de supprimer cet agent, il est relié à d'autres tables");
//                                
//                                
//                                //$("#central").html();
//                            },
//                            error       : function(resultat, statut, erreur){
//                                alert("Désolé".erreur);
//                            }
//                         });
//                     }
//
//    }       
//      }



//function editer_collecte_visite(id_ligne)
//{
//    alert('ici');
//     var indices="#id_agent"+id_ligne;
//     var champs=$(indices).val();
//     $("#collectepar").val(champs);
//      alert(champs);
//     
//     var indices="#id_visite"+id_ligne;
//     var champs=$(indices).val();
//     $("#id_visite").val(champs);
//      alert(champs);
//     
//     var indices="#dates"+id_ligne;
//     var champs=$(indices).val();
//     $("#datevisite").val(champs);
//      alert(champs);
//        
//     var indices="#voiture"+id_ligne;
//     var champs=$(indices).val();
//     $("#voiture").val(champs);
//      alert(champs);
//     
//     var indices="#chauffeur"+id_ligne;
//     var champs=$(indices).val();
//     $("#chauffeur").val(champs);
//      alert(champs);
//     
//     var indices="#etat"+id_ligne;
//     var champs=$(indices).val();
//     $("#etat").val(champs);
//     alert(champs);
//     
//    //alert(champs);
//     if (champs=='7') //rendez vous
//     {
//          document.getElementById("rdv").disabled = false;
//          var indices="#date_rendez_vous"+id_ligne;
//          var champs=$(indices).val();
//          $("#rdv").val(champs);
//      }
//      else
//      {
//          document.getElementById("rdv").disabled = true;
//          document.getElementById("rdv").value='';
//      }
//     
//     var indices="#personne_contactee"+id_ligne;
//     var champs=$(indices).val();
//     $("#personne").val(champs);
//     
//     var indices="#tel"+id_ligne;
//     var champs=$(indices).val();
//     $("#telephone").val(champs);
//     
//  
//}
function supprime_collecte_visite()
{
    alert($('#max_id_visite').val());
   if ($('#identreprise').val()!='')
    {
        if(confirm('Veuillez confirmer la suppression'))
       {
            if ($('#id_visite').val()!=$('#max_id_visite').val())
            {
                alert("Suppression impossible,cette visite n'est pas la derniere");
            }
            else
            {
                     $("#central").html(''); 
                    var data={identreprise:$('#identreprise').val()}; 
                    var data1={identreprise:$('#identreprise').val(),entreprise:$('#identreprise').val(),id_visite:$('#id_visite').val()}; 
                              $.ajax({
                                        url: 'verif_delete_collecte_visite',
                                        type : 'POST',
                                        data:data,
                                        dataType: 'json', // JSON
                                        success: function(data, statut){

                                           // alert('trouve='+ data.trouve);
                                            if (data.trouve=='0')// l'agent ne pas de données dans d'autres tables
                                            {

                                                $.ajax({
                                                     url: 'delete_collecte_visite',
                                                     type : 'POST',
                                                     data:data1,
                                                     dataType: 'html', // JSON
                                                     success: function(code_html, statut){
                                                         $("#central").html(code_html);
                                                     },
                                                     error       : function(resultat, statut, erreur){
                                                         alert("Désolé".erreur);
                                                     }
                                                  });
                                              }
                                              else 
                                                  alert ("Impossible de supprimer cette visite (controle collecte, chiffrement, controle chiffrement)");


                                            //$("#central").html();
                                        },
                                        error       : function(resultat, statut, erreur){
                                            alert("Désolé".erreur);
                                        }
                                     });
                                 }

        }
    }
}
 
function supprime_controle_collecte()
{
    if ($('#identreprise').val()!='')
    {   
        if(confirm('Veuillez confirmer la suppression'))
        {

             var data0={identreprise:$('#identreprise').val()}; 
                              $.ajax({
                                 url: 'verif_delete_controle_collecte',
                                 type : 'POST',
                                 data:data0,
                                 dataType: 'json', // JSON
                                 success: function(data, statut){

                                    // alert('trouve='+ data.trouve);
                                     if (data.trouve=='0')// l'agent ne pas de données dans d'autres tables
                                     {
                                          $("#central").html(''); 
                                         $.ajax({
                                              url: 'delete_controle_collecte',
                                              type : 'POST',
                                              data:data0,
                                              dataType: 'html', // JSON
                                              success: function(code_html, statut){
                                                  $("#central").html(code_html);
                                              },
                                              error       : function(resultat, statut, erreur){
                                                  alert("Désolé".erreur);
                                              }
                                           });
                                       }
                                       else 
                                           alert ("Impossible de supprimer ce controle collecte ( chiffrement, controle chiffrement)");


                                     //$("#central").html();
                                 },
                                 error       : function(resultat, statut, erreur){
                                     alert("Désolé".erreur);
                                 }
                              });
                          }

    
    }
}


function supprime_responsable()
{
   if (($("#enquete").val()!='') && ($("#annee").val()!='') && ($("#passage").val()!='') &&($("#responsable").val()!='') )
   {
        if(confirm('Veuillez confirmer la suppression'))
        {
             var variable={enquete:$("#enquete").val(),annee:$("#annee").val(),passage:$("#passage").val(),id_agent:$("#responsable").val()};   
              $("#central").html(''); 
             $.ajax({
                                              url: 'delete_responsable',
                                              type : 'POST',
                                              data:variable,
                                              dataType: 'html', // JSON
                                              success: function(code_html, statut){
                                                  $("#central").html(code_html);
                                              },
                                              error       : function(resultat, statut, erreur){
                                                  alert("Désolé".erreur);
                                              }
                                           });
                                       } 
      }   
   }
function supprime_chiffrement()
{
    if ($('#identreprise').val()!='')
    {
        if(confirm('Veuillez confirmer la suppression'))
        {

             var data0={identreprise:$('#identreprise').val()}; 
                              $.ajax({
                                 url: 'verif_delete_chiffrement',
                                 type : 'POST',
                                 data:data0,
                                 dataType: 'json', // JSON
                                 success: function(data, statut){

                                    // alert('trouve='+ data.trouve);
                                     if (data.trouve=='0')// l'agent ne pas de données dans d'autres tables
                                     {
                                          $("#central").html(''); 
                                         $.ajax({
                                              url: 'delete_chiffrement',
                                              type : 'POST',
                                              data:data0,
                                              dataType: 'html', // JSON
                                              success: function(code_html, statut){
                                                  $("#central").html(code_html);
                                              },
                                              error       : function(resultat, statut, erreur){
                                                  alert("Désolé".erreur);
                                              }
                                           });
                                       }
                                       else 
                                           alert ("Impossible de supprimer ce chiffrement ( controle chiffrement)");


                                     //$("#central").html();
                                 },
                                 error       : function(resultat, statut, erreur){
                                     alert("Désolé".erreur);
                                 }
                              });
                          }
                      }
}

function supprime_controle_chiffrement()
{
   if ($('#identreprise').val()!='')
    {
        if(confirm('Veuillez confirmer la suppression'))
       {

            var data0={identreprise:$('#identreprise').val()}; 
             $("#central").html(''); 
                                             $.ajax({
                                             url: 'delete_controle_chiffrement',
                                             type : 'POST',
                                             data:data0,
                                             dataType: 'html', // JSON
                                             success: function(code_html, statut){
                                                 $("#central").html(code_html);
                                             },
                                             error       : function(resultat, statut, erreur){
                                                 alert("Désolé".erreur);
                                             }
                                          });

                         }
    }
}
$("#affectation_responsable").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
                            
                           url : 'affiche_responsable',
                           type : 'POST',
                           dataType : 'html',
                           success : function(code_html, statut){
                               $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
                           },

                           error : function(resultat, statut, erreur){

                           }

                        });

                    });
                 
  function  charger_annee_passage()
  {
       var variable={enquete:$('#enquete').val()};   
      $.ajax({
                            
                           url : 'affiche_annee_passage',
                           type : 'POST',
                           data: variable,
                           
                           success: function(data, statut){
                              $('#annee').html(data['liste_annee']); 
                          },

                           error : function(resultat, statut, erreur){

                           }

                        });
  }
  
  function charger_passage()
  {
      var variable={enquete:$('#enquete').val(),annee:$('#annee').val()};   
      $.ajax({
                            
                           url : 'affiche_passage',
                           type : 'POST',
                           data: variable,
                          
                           success: function(data, statut){
                              $('#passage').html(data['liste_passage']); 
                           },

                           error : function(resultat, statut, erreur){

                           }

                        });
      
      
     
  }
  
  
  
  
  
  
//  function editer_affectation_responsable(id_ligne)
//{
//  var lignes=id_ligne;
//  alert('xxxxxx');
//    if (lignes>='1')
//    { 
//       var indices="#id_enquete"+id_ligne;
//       var champs=$(indices).val();
//       $("#enquete").val(champs);
//       //$("#enquete").val('xxxxxxxxxxx');
//
//       var indices="#annee"+id_ligne;
//       var champs=$(indices).val();
//       /////
//       removeOptions(document.getElementById("annee"));
//       var select = document.getElementById ("annee");
//       var newOption = new Option (champs, champs);
//       select.options.add (newOption);  
//       //
//      // $("#annee").val(champs);
//
//       var indices="#passage"+id_ligne;
//       var champs=$(indices).val();
//       removeOptions(document.getElementById("passage"));
//       var select = document.getElementById ("passage");
//       var newOption = new Option (champs, champs);
//       select.options.add (newOption);  
//       //$("#passage").val(champs);
//
//       var indices="#id_agent"+id_ligne;
//       var champs=$(indices).val();
//       $("#responsable").val(champs);
//       alert('fffff');
//       //////
//       alert('ici');
//       var indices="#types"+id_ligne;
//       
//       var champs=$(indices).val();
//       alert(champs);
//       /////
//       removeOptions(document.getElementById("types"));
//       var select = document.getElementById ("types");
//       var newOption = new Option (champs, champs);
//       select.options.add (newOption);  
//   }
// }
 function formattage_date()
 {

$("#datevisite").val(format('Y-m-d',$("#datevisite").val()));

 }
 
 
 function  editer_enquete(id_ligne)
{
  var lignes=id_ligne;
  if (lignes>='1')
  { 
     var indices="#id"+id_ligne;
     var champs=$(indices).val();
     //alert(champs);
     $("#identifiant").val(champs);
     
     var indices="#nom"+id_ligne;
     var champs=$(indices).val();
     //alert(champs);
     $("#nom_enquete").val(champs);
  }
 }
 
 function  editer_unite(id_ligne)
{
  var lignes=id_ligne;
  if (lignes>='1')
  { 
     var indices="#id"+id_ligne;
     var champs=$(indices).val();
     //alert(champs);
     $("#identifiant").val(champs);
     
     var indices="#nom"+id_ligne;
     var champs=$(indices).val();
     //alert(champs);
     $("#nom").val(champs);
  }
 }
 function ajouter_enquete ()
 {
    $("#identifiant").val('');
    $("#nom_enquete").val('');
 }
 
 function valider_enquete()
{
    
     var erreurs=0;
    if (document.getElementById('nom_enquete').value=="")
    {
        alert("Le nom doit être renseigné");
        erreurs=1;
        document.getElementById('label_nom_enquete').style.color='red';
        document.getElementById('nom_enquete').focus();

    }
    else
    {
        document.getElementById('label_nom_enquete').style.color='black';
    }
    if (erreurs==0)
    {
       
        
        var data={identifiant:$('#identifiant').val(),nom:$('#nom_enquete').val()};
         $("#central").html(''); 
        $.ajax({
           url : 'update_enquete',
           type : 'POST',
           data : data ,
           dataType : 'html',
           success : function(code_html, statut){
               $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
           },

           error : function(resultat, statut, erreur){

           },

           complete : function(resultat, statut){

           }

        });

    }
  }
  //////
 function  editer_voiture(id_ligne)
{
  var lignes=id_ligne;

  if (lignes>='1')
  { 
     var indices="#id_voiture"+id_ligne;
     var champs=$(indices).val();
     $("#identifiant").val(champs);
      
     var indices="#matricule_voiture"+id_ligne;
     var champs=$(indices).val();
     $("#matricule").val(champs);
     
     var indices="#type_voiture"+id_ligne;
     var champs=$(indices).val();
     $("#types").val(champs);
  }
 }
 
 function ajouter_voiture ()
 {
    $("#identifiant").val('');
    $("#matricule").val('');
    $("#types").val('');
 }
 
 function valider_voiture()
{
   
     var erreurs=0;
   
    if (document.getElementById('bureau').value=="")
    {
        alert("Le bureau doit être renseigné");
        erreurs=1;
        document.getElementById('label_bureau').style.color='red';
        document.getElementById('bureau').focus();

    }
    else
    {
        document.getElementById('label_bureau').style.color='black';
    }
     if (erreurs==0)
    { 
     ////
        if (document.getElementById('matricule').value=="")
        {
            alert("Le matricule doit être renseigné");
            erreurs=1;
            document.getElementById('label_matricule').style.color='red';
            document.getElementById('matricule').focus();

        }
        else
        {
            document.getElementById('label_matricule').style.color='black';
        }
    }
    if (erreurs==0)
    {
        if (document.getElementById('types').value=="")
        {
            alert("Le type doit être renseigné");
            erreurs=1;
            document.getElementById('label_types').style.color='red';
            document.getElementById('types').focus();

        }
        else
        {
            document.getElementById('label_types').style.color='black';
        }
    }
    if (erreurs==0)
    {
        var data={identifiant:$('#identifiant').val(),matricule:$('#matricule').val(),types:$('#types').val(),gouv:$('#bureau').val()};
        $.ajax({
                url : 'update_voiture',
                type : 'POST',
                data : data ,
                dataType : 'html',
              success : function(donnees, statut){
           $('#tablesorter').html(donnees); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
           ajouter_voiture ();
           },
       });
         
    
    }
  }
  function supprimer_voiture()
  {
  //alert('ok');
   $.ajax({
       url : 'deletevoiture',
       type : 'POST',
       data : {bureau:$('#bureau').val(), voiture:$('#identifiant').val()},
       success : function(donnees, statut){
         //  $('#tablesorter').html(donnees);
         
           $('#tablesorter').html(donnees['tablesorter']);
           table();
           $('#identifiant').val('');
           $('#matricule').val('');
           $('#types').val('');
           //$("#central").html(code_html);
           // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       }

    });
  }
  
  $("#affiche_suivi_agent_etat").click(function(){
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');  
    $.ajax({
       url : 'affiche_suivi_agent_etat',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

             
  $("#affiche_suivi_gouv_type_reponse").click(function(){
     $("#central").html(''); 
    $.ajax({
       url : 'affiche_suivi_gouv_type_reponse_etat',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
}); 

$("#ajoutunite").click(function(){
    
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'unite',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

function valider_unite()
{
    
     var erreurs=0;
    if (document.getElementById('nom').value=="")
    {
        alert("Le libellé doit être renseigné");
        erreurs=1;
        document.getElementById('label_nom').style.color='red';
        document.getElementById('nom').focus();

    }
    else
    {
        document.getElementById('label_nom').style.color='black';
    }
    if (erreurs==0)
    {
        
        
        var data={identifiant:$('#identifiant').val(),nom:$('#nom').val()};
         $("#central").html(''); 
        $.ajax({
           url : 'update_unite',
           type : 'POST',
           data : data ,
           dataType : 'html',
           success : function(code_html, statut){
               $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
           },

           error : function(resultat, statut, erreur){

           },

           complete : function(resultat, statut){

           }

        });

    }
  }
  function ajouter_unite ()
 {
    $("#identifiant").val('');
    $("#nom").val('');
 }
 /////
 $("#ajoutsource").click(function(){
    
    $("#central").html('<center><img src="../Ipi/dist/img/ajax-loader.gif" ><br><b>Patientez...</b></center>');                 
    $.ajax({
       url : 'source',
       type : 'POST',
       dataType : 'html',
       success : function(code_html, statut){
           $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
   
});

function valider_source()
{
   
     var erreurs=0;
    if (document.getElementById('nom').value=="")
    {
        alert("Le libellé doit être renseigné");
        erreurs=1;
        document.getElementById('label_nom').style.color='red';
        document.getElementById('nom').focus();

    }
    else
    {
        document.getElementById('label_nom').style.color='black';
    }
     alert('oui')+erreurs;
    if (erreurs==0)
    {
        
        
        var data={identifiant:$('#identifiant').val(),nom:$('#nom').val()};
         $("#central").html(''); 
        $.ajax({
           url : 'update_source',
           type : 'POST',
           data : data ,
           dataType : 'html',
           success : function(code_html, statut){
               $("#central").html(code_html); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
           },

           error : function(resultat, statut, erreur){

           },

           complete : function(resultat, statut){

           }

        });

    }
  }
  
  function ajouter_source ()
 {
    $("#identifiant").val('');
    $("#nom").val('');
 }
  





  
  
 
         
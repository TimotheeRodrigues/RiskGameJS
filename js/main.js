$(document).ready(function() {

	//regarde s'il est connecte ou pas
	//et affiche le bouton LOGIN/LOGOUT
	$.ajax({
		method: "get",
	    url: "json_est_connecte.php",	    
		dataType: 'json',
	    success: function(data) {
		    if (data.est_connecte) {
	            $('#form-logout').fadeIn();
            } else {
				$('#form-login').fadeIn();				
			}

			if (typeof(data.message) != 'undefined'){
				$('#message-content').html(data.message);
				$('#message').slideDown();
			}
	    },
        error: function() {
	        alert('error');
	        //TODO faire un fichier erreur.php
        }
    });

	//Cache le message de bienvenue au chargement de la page
	$('#message').hide();

	//Cache le message de bienvenue quand on click sur close
	$('#message-btn').click(function(){
		$('#message').slideUp();
	});

	//Formulaire de CONNEXION
    $('#form-login').submit(function() {
	    $.ajax({
            method: $(this).attr('method'),
		    url: $(this).attr('action'),
			data: $(this).serialize(),		    
			dataType: 'json',
		    success: function(data) {
			    if (data.success) {
                    /*cacher le formulaire*/
                    /*afficher le message "data.message" */
                    /*afficher un bouton de deconnexion*/
		            $('#form-logout').fadeIn();
                }

				if (typeof(data.message) != 'undefined'){
					//afficher un message de bienvenue
					$('#message-content').html(data.message);
					$('#message').slideDown();
					$('#riskgame').append('<button id="start-btn" ' +
						'					type="button" ' +
						'					class="btn btn-primary">START GAME</button>');
					$('#start-btn').click(function(){
						$(this).hide();
						var riskGame = RiskGame.getInstance(10);
						riskGame.startGame();
					});//Risk started
				}
		    },
            error: function() {
		        alert('error');
		        //TODO faire un fichier erreur.php
	        }
        });
		$(this).hide();
        return false;
    });

	
	$('#form-logout').submit(function() {
		$.ajax({
            method: $(this).attr('method'),
		    url: $(this).attr('action'),
			data: $(this).serialize(),		    
			dataType: 'json',
		    success: function(data) {
			    if (data.success) {
                    /*cacher le bouton*/
                    /*afficher le message "data.message" */
                    /*afficher un formulaire de connexion*/
		            $('#form-login').fadeIn();
                }

				if (typeof(data.message) != 'undefined'){
					//afficher un message d'aurevoir
					$('#message-content').html(data.message);
					$('#message').slideDown();
				}
		    },
            error: function() {
		        alert('error');
		        //TODO faire un fichier erreur.php
	        }
        });
		$(this).hide();
        return false;
	});

});

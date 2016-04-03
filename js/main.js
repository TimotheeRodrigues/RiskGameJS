$(document).ready(function() {

	//regarde s'il est connecte ou pas
	//et affiche le bouton LOGIN/LOGOUT
	$.ajax({
		method: "get",
	    url: "php/json_is_connected.php",
		dataType: 'json',
	    success: function(data) {
		    if (data.est_connecte) {
	            $('#form-logout').fadeIn();
				if (data.state == 'waiting'){
                    createStartButton();
                }else if (data.state == 'in-game'){
                    var riskGame = RiskGame.getInstance();
                    riskGame.startGame();
                }
            } else {
				$('#form-login').fadeIn();
				$('#form-register').fadeIn();
			}

			if (typeof(data.message) != 'undefined'){
				$('#message-content').html(data.message);
				$('#message').slideDown();
			}
	    },
        error: function() {
	        alert('error Login/Logout');
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
					$('#form-login').hide();
					$('#form-register').hide();
		            $('#form-logout').fadeIn();
					createStartButton();
                }

				if (typeof(data.message) != 'undefined'){
					//afficher un message de bienvenue
					$('#message-content').html(data.message);
					$('#message').slideDown();

				}
		    },
            error: function() {
		        alert('error form-login');
	        }
        });
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
					$('#riskgame').empty();
					$('#form-register').fadeIn();
                }

				if (typeof(data.message) != 'undefined'){
					//afficher un message d'aurevoir
					$('#message-content').html(data.message);
					$('#message').slideDown();
				}
		    },
            error: function() {
		        alert('error form-logout');
	        }
        });
		$(this).hide();
        return false;
	});

	$('#form-register').submit(function(){
		$.ajax({
			method: $(this).attr('method'),
			url: $(this).attr('action'),
			data: $(this).serialize(),
			dataType: 'json',
			success: function(data) {
				if (data.success) {
					$('#form-logout').hide();
					$('#form-register').hide();
					$('#form-login').fadeIn();
					createStartButton();
				}
				else{
					$('#message-content').html(data.error);
					$('#message').slideDown();
				}
			},
			error: function() {
				alert('error form-logout');
			}
		});
		return false;
	});
});


function createStartButton(){
	$('#riskgame').append('<button id="start-btn" ' +
		'					type="button" ' +
		'					class="btn btn-primary">START GAME</button>');
	$('#start-btn').click(function(){
		$(this).hide();
		var riskGame = RiskGame.getInstance();
		riskGame.startGame();
	});//Risk started
}
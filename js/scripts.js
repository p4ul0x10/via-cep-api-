$(document).ready(function(){

	//mascara cep
	$("#cep").keypress(function(){
		var caracteres = $("#cep").val();

		if(caracteres.length >= 5 && caracteres.length < 6){
			$("#cep").val(caracteres+"-");
		}
	});

	//mascara cpf
	$("#cpf").keypress(function(){
		var caracteres = $("#cpf").val();

		if(caracteres.length >= 3 && caracteres.length < 5){
			$("#cpf").val(caracteres+".");
		}else if(caracteres.length >= 7 && caracteres.length < 9){
			$("#cpf").val(caracteres+".");
		}else if(caracteres.length >= 11 && caracteres.length < 12){
			$("#cpf").val(caracteres+"-");
		}
		else if(caracteres.length >= 11 && caracteres.length < 12){
			$("#label cpf").val(caracteres+"-");
		}
	});

	//mascara celular
	$("#celular").keypress(function(){
		var numeros = $("#celular").val();
		if(numeros.length >= 2 && numeros.length < 4){
			$("#celular").val(numeros+" - ");
		}
	});

	//mascara fixo
	$("#tel").keypress(function(){
		var numeros = $("#tel").val();
		if(numeros.length >= 2 && numeros.length < 4){
			$("#tel").val(numeros+" - ");
		}
	});


	//check genero
	
	$("#m").click(function(){
		$("#m").css({"background":"#fafafa"});
		$("#f").css({"background":"#fff"});
		
	});
	$("#f").click(function(){
		$("#f").css({"background":"#fafafa"});
		$("#m").css({"background":"#fff"});
		
	});

	//upload arquivo
	var upload = document.getElementById("upload");
	upload.addEventListener("change", function(e) {
	    var size = upload.files[0].size;
	    var mb = parseFloat(size) / parseFloat(1000000);  
	    if(size < 3080000) { //3MB     
	      
	      $("#size").text("Arquivo com ("+mb.toFixed(2)+ " Mb"+")");
	      alert('Permitido, arquivo com menos menos de 3 mb'); //Abaixo do permitido
	   
	    }else {           
	    
	     $("#size").text("Arquivo com ("+mb.toFixed(2)+ " Mb"+")");
	      alert('Não permitido, limite permitido 3 Mb'); //Acima do limite
	      upload.value = ""; //Limpa o campo          
	   
	    }
	    e.preventDefault();
	});
	//consulta do cep
	$("#btn_cep").click(function(){

		var cep = $("#cep").val().replace(/\D/g, '');
		$("#btn_cep").html("<img id='load' src='images/loading.png'></button>");
		$("#load").css({"display":"block","margin":"0px 35px"});
		setTimeout(function(){ 
			$("#btn_cep").html("Consultar <img id='load' src='images/loading.png'></button>");
			$("#load").css({"display":"none"}); 
		}, 2000);
		//Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
               
                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#resultado").show();
                        $("#endereco").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                       
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
  
	});
});
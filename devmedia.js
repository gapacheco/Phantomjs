var steps=[];
var testindex = 0;
var loadInProgress = false;

/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;


console.log('All settings loaded, start with execution');
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

steps = [

	//Step 1 - Abrindo a pagina DevMedia
    function(){
        console.log('Step 1 - Abrindo a pagina DevMedia');
        page.open("http://www.devmedia.com.br/artigos/", function(status){
			
		});
    },
	//Step 2 - Preenchendo o campo de busca e clicando no botao pesquisar
    function(){
        console.log('Step 2 - Preenchendo o campo de busca e clicando no botao pesquisar');
		page.evaluate(function() {		  
		  $("nav.busca-pocket input").val("Engenharia de Software");
		  $("nav.busca-pocket button").click();		
		});
		page.render('Busca.png');
    },
	//Step 3 - Esperando pelo resultado da busca
    function(){
		console.log("Step 3 - Esperando pelo resultado da busca ");
         var fs = require('fs');
		 var result = page.evaluate(function() {
			return document.querySelectorAll("html")[0].outerHTML;
		});
        fs.write('DevMedia.html',result,'w'); //Salvando a página carregada em um arquivo html
		page.render('DevMedia.png'); //Salvando uma foto da página carregada
    },
];

//Executando os passos um por um com um tempo de intervalo
interval = setInterval(executeRequestsStepByStep,5000);

function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("Test complete!"); //Teste finalizado
        phantom.exit();
    }
}

//Controlando se a página está sendo carregada
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};

//Verificando se a página já foi completamente carregada
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
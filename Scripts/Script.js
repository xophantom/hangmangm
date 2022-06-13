let rand = 0;
let word = "";
let numWrong = 0;
let numRight = 0;
let phraseLength = 0;
let numChar = 0;
let firstTime = true;
let animais = ["Cachorro", "Elefante" , "Golfinho" , "Guaxinim" , "Hiena"];
let frutas = ["Abacaxi", "Hortela", "Laranja", "Maracuja", "Kiwi"];
let filmes = ["Titanic", "Star Wars", "Os Vingadores", "Velozes e Furiosos", "O Poderoso Chefao"];

const elements = {
    introPage: document.getElementById('introPage'),
    configPage: document.getElementById('configPage'),
    singlePage: document.getElementById('singlePage'),
    rulesPage: document.getElementById('rulesPage'),
    gamePage: document.getElementById('gamePage'),
    rankingPage: document.getElementById('rankingPage'),
    categoriaPage: document.getElementById('categoriaPage')
}

function hideElements(...elements) {
    elements.forEach(element => {
        element.style.display = "none";
    })
}

function showElements(...elements) {
    elements.forEach(element => {
        element.style.display = "block";
    })
}

function newGame(){
    const { introPage, configPage, singlePage, rulesPage, gamePage } = elements;

	if (!firstTime) {
		firstTime = false;
        showElements(configPage, singlePage);
        hideElements(introPage, rulesPage, gamePage);
	} else{
		firstTime = false;
		draw();
	}
}

function showRulesPage(){
    const { rulesPage } = elements;
    hideElements(...Object.values(elements));
    showElements(rulesPage);
}

const rp = showRulesPage;

function showSinglePage(){
    const { singlePage } = elements;
    hideElements(...Object.values(elements));
    showElements(singlePage);
}

const sp = showSinglePage;

function tp(){
    const { introPage, configPage } = elements;
    hideElements(...Object.values(elements));
    showElements(introPage, configPage);
}

function fp(){
    const { configPage } = elements;
    hideElements(...Object.values(elements));
    showElements(configPage);
}

function vp(){ //Function para ativar a acessibilidade
    const { singlePage } = elements;
    hideElements(...Object.values(elements));
    showElements(singlePage);
}

function pp(){ //Function para ativar a acessibilidade
    const { rankingPage } = elements;
    hideElements(...Object.values(elements));
    showElements(rankingPage);
}

function future(){
    rand = Math.floor(Math.random()*animais.length);
    word = animais[rand];
    document.getElementById('singlePage').style.display = "none";
	document.getElementById('hangman').style.display = "block";
    document.getElementById('categoryName').innerHTML = "Animais";
    hangman();
}

function past(){
    rand = Math.floor(Math.random()*frutas.length);
    word = frutas[rand];
    document.getElementById('singlePage').style.display = "none";
	document.getElementById('hangman').style.display = "block";
    document.getElementById('categoryName').innerHTML = "Frutas";
    hangman();
}

function present(){
    rand = Math.floor(Math.random()*filmes.length);
    word = filmes[rand];
    document.getElementById('singlePage').style.display = "none";
	document.getElementById('hangman').style.display = "block";
    document.getElementById('categoryName').innerHTML = "Filmes";
    hangman();
}

function prepositions(){ //adicionar categoria
    document.getElementById('categoriaPage').style.display = "block";
    document.getElementById('introPage').style.display = "none";
    document.getElementById('configPage').style.display = "none";
    document.getElementById('singlePage').style.display = "none";
	document.getElementById('rulesPage').style.display = "none";
	document.getElementById('gamePage').style.display = "none";
}

function countChars(countfrom,displayto) {
    let len = document.getElementById(countfrom).value.length;
    document.getElementById(displayto).innerHTML = len;
}

function readText(){
    word = document.getElementById('input').value;
    hangman();
}

function hangman(){
    let x = word.length;
        if(x==0){
            alert("Por favor, insira algum texto.");
            return;
        }
    let y = x-1;
    let spaces = 0;
    let validChar = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "?", "!", ",", ".", "-", "'");
    for(z = 0; z < word.length; z++){
        let letter = word.substring(y,x);
        if(validChar.indexOf(letter) > -1){
            x--;
            y--;
        }
        else{
            alert("Remova caracteres especiais.");
            return;
        }
    }
    x = word.length;
    y = x-1;
    while (x>0){
        numChar++;
        let letter = word.substring(y,x);
        if(letter === " "){
            document.getElementById('letter'+x).innerHTML = "&nbsp;";
            document.getElementById('letter'+x).style.visibility = "hidden";
            document.getElementById('letter'+x).style.display = "block";
            document.getElementById('underline'+x).style.display = "block";
            spaces++;
        }
        else if(letter === "?" || letter === "!" || letter === "," || letter === "." || letter === "-" || letter === "'"){
            document.getElementById('letter'+x).innerHTML = letter;
            document.getElementById('letter'+x).style.display = "block";
            document.getElementById('underline'+x).style.display = "block";
            spaces++;
        }
        else{
            document.getElementById('letter'+x).innerHTML = letter;
            document.getElementById('letter'+x).style.visibility = "hidden";
            document.getElementById('underline'+x).style.display = "block";            
            document.getElementById('underline'+x).style.borderBottom = "3px solid black";
        }
        x--;
        y--;
    }
    phraseLength = word.length - spaces;
    document.getElementById('gamePage').style.display = "block";
    /*splitWords();*/
    draw();
}

function draw(){
    let ctx = document.getElementById("hangman").getContext('2d');
        ctx.fillStyle = "white";
        ctx.lineWidth=3;
        ctx.fillRect(0, 0, 300, 300);
        ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
        ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,64);
            ctx.lineTo(65,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(106,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(50,80);
            ctx.lineTo(100,25);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(60,90);
            ctx.lineTo(111,35);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(50,80);
            ctx.lineTo(60,90);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(100,25);
            ctx.lineTo(111,35);
            ctx.stroke();
        ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
        ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
    let cntx = document.getElementById("homeHangman").getContext('2d');
        cntx.fillStyle = "white";
        cntx.lineWidth=3;
        cntx.fillRect(0, 0, 300, 300);
        cntx.beginPath(); //vertical bar
            cntx.moveTo(50,270);
            cntx.lineTo(50,25);
            cntx.stroke();
        cntx.beginPath(); //vertical bar long piece
            cntx.moveTo(65,270);
            cntx.lineTo(65,85);
            cntx.stroke();
        cntx.beginPath(); //vertical bar short piece
            cntx.moveTo(65,64);
            cntx.lineTo(65,40);
            cntx.stroke();
        cntx.beginPath(); //horizontal bar
            cntx.moveTo(49,25);
            cntx.lineTo(175,25);
            cntx.stroke();
        cntx.beginPath(); //horizontal bar short piece
            cntx.moveTo(49,40);
            cntx.lineTo(86,40);
            cntx.stroke();
        cntx.beginPath(); //horizontal bar long piece
            cntx.moveTo(106,40);
            cntx.lineTo(175,40);
            cntx.stroke();
        cntx.beginPath(); //small vertical bar
            cntx.moveTo(173,25);
            cntx.lineTo(173,40);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(50,80);
            cntx.lineTo(100,25);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(60,90);
            cntx.lineTo(111,35);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(50,80);
            cntx.lineTo(60,90);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(100,25);
            cntx.lineTo(111,35);
            cntx.stroke();
        cntx.beginPath(); //ground
            cntx.moveTo(35,270);
            cntx.lineTo(265,270);
            cntx.stroke();
        cntx.beginPath(); //noose
            cntx.moveTo(150,40);
            cntx.lineTo(150,80);
            cntx.stroke();
}

function splitWords(){
    let placeKeep = 0;
    let countBack = 16;
    if(numChar > 15){
        while(countBack > 1){
            if(document.getElementById('letter16').innerHTML == "&nbsp;"){
                document.getElementById('underline16').style.width = "0px";
                document.getElementById('underline16').style.marginRight = "0px";
            }
            if(document.getElementById('letter'+countBack).innerHTML == "&nbsp;"){
                document.getElementById('underline'+countBack).style.width = (document.getElementById('underline1').offsetWidth)*(16-countBack)+"px";
                placeKeep = countBack;
                countBack = 0;
            }
            countBack--;
        }
    }
    for(x=0;x<8;x++){
        countBack = 15+placeKeep;
        if(numChar > countBack){
            while(countBack > 1){
                if(document.getElementById('letter'+countBack).innerHTML == "&nbsp;"){
                    document.getElementById('underline'+countBack).style.width = (document.getElementById('underline1').offsetWidth*((16+placeKeep)-countBack))+"px";
                    placeKeep = countBack;
                    countBack = 0;
                }
                countBack--;
            }
        }
    }
    
}

function guessLetter(){
    let correct = 0;
    let target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    let lower = target.id;
    let upper = document.getElementById(lower).getAttribute('value');
    let results = document.getElementById('results');
    let ul1 = document.getElementById('underline1').offsetWidth;
    for(a = 1; a < 101; a++){
        if(document.getElementById('letter'+a).innerHTML === upper || document.getElementById('letter'+a).innerHTML === lower){
            document.getElementById('letter'+a).style.visibility = "visible";
            correct++;
            numRight++;
        }
    }
    if(correct==0){
        numWrong++;
        hang();
    }
    if(numWrong==6){
        results.style.visibility = "visible";
		window.location.hash = '#results';
        results.style.color = "Black";
        results.innerHTML = "Você tem mais uma letra!";
        if(ul1 == 50){
            results.style.lineHeight = "30px";
            results.style.fontSize = "30px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "30px";
            results.style.fontSize = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "30px";
            results.style.fontSize = "20px";
        }
    }
    if(numWrong==7){
		window.location.hash = '#results';
        results.innerHTML = "Você perdeu!<br> Jogar de novo?";
        document.getElementById('again').style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "30px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "30px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "30px";
        }
    }
    if(numRight==phraseLength){
        win();
    }
}

function win(){
    let ul1 = document.getElementById('underline1').offsetWidth;
    let again = document.getElementById('again');
    let results = document.getElementById('results');
        results.style.visibility = "visible";
        results.style.color = "black";
    if(numWrong > 6){
        results.innerHTML = "Já estava na hora de você descobrir...";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "50px";
            results.style.fontSize = "45px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "40px";
            results.style.fontSize = "35px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "30px";
            results.style.fontSize = "20px";
        }
    }
    else{
        results.innerHTML = "Venceu!";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "50px";
            results.style.fontSize = "70px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "40px";
            results.style.fontSize = "55px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "30px";
            results.style.fontSize = "50px";
        }
    }
}

function hang(){
    let ctx = document.getElementById("hangman").getContext('2d');
    if(numWrong==1){
        ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //mouth
            ctx.arc(150, 103, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==2){
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
    }
    if(numWrong==3){
        ctx.fillStyle = "white";
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,108);
            ctx.lineTo(160,108);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,135);
            ctx.lineTo(180,160);
            ctx.stroke();
    }
    if(numWrong==4){
        ctx.beginPath(); //left arm
            ctx.moveTo(150,135);
            ctx.lineTo(120,160);
            ctx.stroke();
    }
    if(numWrong==5){
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 112, 9, 0, Math.PI, true);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,188);
            ctx.lineTo(180,230);
            ctx.stroke();
    }
    if(numWrong==6){
        ctx.beginPath(); //left leg
            ctx.moveTo(151,188);
            ctx.lineTo(120,230);
            ctx.stroke();
    }
    if(numWrong==7){
        ctx.fillRect(138, 90, 24, 24); //cover face
        ctx.fillRect(118, 121.2, 70, 120); //cover body
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,108);
            ctx.lineTo(160,108);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,135);
            ctx.lineTo(150,205);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,150);
            ctx.lineTo(180,175);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,150);
            ctx.lineTo(120,175);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,203);
            ctx.lineTo(180,245);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,203);
            ctx.lineTo(120,245);
            ctx.stroke();
        ctx.lineWidth=2;
        ctx.beginPath(); //left eye
            ctx.moveTo(140,93);
            ctx.lineTo(146,98);
            ctx.stroke();
            ctx.moveTo(140,98);
            ctx.lineTo(146,93);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(154,98);
            ctx.lineTo(160,93);
            ctx.stroke(); 
            ctx.moveTo(154,93);
            ctx.lineTo(160,98);
            ctx.stroke();
    }
    if(numWrong==8){
        ctx.fillRect(118, 135, 70, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(150,150);
            ctx.lineTo(150,220);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,165);
            ctx.lineTo(180,180);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,165);
            ctx.lineTo(120,180);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,218);
            ctx.lineTo(180,260);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,218);
            ctx.lineTo(120,260);
            ctx.stroke();
    }
    if(numWrong==9){
        ctx.fillRect(118, 143, 70, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(150,165);
            ctx.lineTo(150,235);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,180);
            ctx.lineTo(180,195);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,180);
            ctx.lineTo(120,195);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,232);
            ctx.lineTo(180,270);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,232);
            ctx.lineTo(120,270);
            ctx.stroke();
    }
    if(numWrong==10){
        ctx.fillRect(118, 148, 70, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(150,180);
            ctx.lineTo(150,250);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,195);
            ctx.lineTo(180,210);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,195);
            ctx.lineTo(120,210);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,247);
            ctx.lineTo(200,270);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,247);
            ctx.lineTo(100,270);
            ctx.stroke();
    }
    if(numWrong==11){
        ctx.fillRect(90, 148, 120, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(200,195);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(191,210);
            ctx.lineTo(220,245);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(191,210);
            ctx.lineTo(145,237);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,268);
            ctx.lineTo(210,268);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,268);
            ctx.lineTo(90,268);
            ctx.stroke();
    }
    if(numWrong==12){
        ctx.fillRect(90, 145, 140, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(230,220);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(212,230);
            ctx.lineTo(240,255);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(212,230);
            ctx.lineTo(165,237);
            ctx.stroke();
    }
    if(numWrong==13){
        ctx.fillRect(90, 145, 160, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(245,255);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(225,255);
            ctx.lineTo(255,268);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(225,255);
            ctx.lineTo(185,250);
            ctx.stroke();
    }
    if(numWrong==14){
        ctx.fillRect(90, 145, 160, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(245,264);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(225,268);
            ctx.lineTo(255,268);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(225,264);
            ctx.lineTo(185,264);
            ctx.stroke();
        ctx.fillRect(138, 90, 24, 24); //cover face
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,108);
            ctx.lineTo(160,108);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
    }
    if(numWrong==15){
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //mouth
            ctx.arc(150, 103, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==16){
        ctx.fillRect(128, 78, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 120, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 115, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 115, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //mouth
            ctx.arc(150, 123, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==17){
        ctx.fillRect(128, 98, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 140, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 135, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 135, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //mouth
            ctx.arc(150, 143, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==17){
        ctx.fillRect(128, 118, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 160, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 155, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 155, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,168);
            ctx.lineTo(160,168);
            ctx.stroke();
    }
    if(numWrong==18){
        ctx.fillRect(128, 138, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 180, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 175, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 175, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,188);
            ctx.lineTo(160,188);
            ctx.stroke();
    }
    if(numWrong==19){
        ctx.fillRect(128, 158, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 200, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 195, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 195, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 213, 9, 0, Math.PI, true);
            ctx.stroke();
    }
    if(numWrong==20){
        ctx.fillRect(128, 178, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 220, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 215, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 215, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 233, 9, 0, Math.PI, true);
            ctx.stroke();
    }
    if(numWrong==21){
        ctx.fillRect(128, 198, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 240, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 235, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 235, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 253, 9, 0, Math.PI, true);
            ctx.stroke();
    }
    if(numWrong==22){
        ctx.fillRect(128, 218, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 243, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(140,234);
            ctx.lineTo(146,239);
            ctx.stroke();
            ctx.moveTo(140,239);
            ctx.lineTo(146,234);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(154,234);
            ctx.lineTo(160,239);
            ctx.stroke(); 
            ctx.moveTo(154,239);
            ctx.lineTo(160,234);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,250);
            ctx.lineTo(160,250);
            ctx.stroke();
    }
    if(numWrong==23){
        ctx.fillRect(128, 220, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(129, 246, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(115,245);
            ctx.lineTo(121,250);
            ctx.stroke();
            ctx.moveTo(115,250);
            ctx.lineTo(121,245);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(120,234);
            ctx.lineTo(126,239);
            ctx.stroke(); 
            ctx.moveTo(120,239);
            ctx.lineTo(126,234);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(129,257);
            ctx.lineTo(138,240);
            ctx.stroke();
    }
    if(numWrong==24){
        ctx.fillRect(106, 218, 45, 45); //cover head
        ctx.fillRect(120, 261, 25, 5); //cover rest of head
        ctx.beginPath(); //head
            ctx.arc(108, 247, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(105,257);
            ctx.lineTo(111,262);
            ctx.stroke();
            ctx.moveTo(105,262);
            ctx.lineTo(111,257);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(94,248);
            ctx.lineTo(100,253);
            ctx.stroke(); 
            ctx.moveTo(94,253);
            ctx.lineTo(100,248);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(121,248);
            ctx.lineTo(101,235);
            ctx.stroke();
    }
    if(numWrong==25){
        ctx.fillRect(86, 220, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(87, 248, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(78,250);
            ctx.lineTo(84,256);
            ctx.stroke();
            ctx.moveTo(78,256);
            ctx.lineTo(84,250);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(91,250);
            ctx.lineTo(97,256);
            ctx.stroke(); 
            ctx.moveTo(91,256);
            ctx.lineTo(97,250);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(77,240);
            ctx.lineTo(97,240);
            ctx.stroke();
    }
}

function reset(){
    let ul1 = document.getElementById('underline1').offsetWidth;
    let results = document.getElementById('results');
    let again = document.getElementById('again');
    for(a = 1; a < 101; a++){
        document.getElementById('letter'+a).innerHTML = "&nbsp;";
        document.getElementById('underline'+a).style.width = ul1 + "px";
        if(ul1 == 50){
            document.getElementById('underline'+a).style.marginRight = "5px";
            results.style.height = "70px";
        }
        else if(ul1 == 28){
            document.getElementById('underline'+a).style.marginRight = "3px";
            results.style.height = "50px";
        }
        else{
            document.getElementById('underline'+a).style.marginRight = "3px";
            results.style.height = "40px";
        }
        document.getElementById('underline'+a).style.display = "none";
        document.getElementById('underline'+a).style.borderBottom = "0px";
    }
    let bank = document.getElementById("letterBank").querySelectorAll("div");
    for(b = 0; b < 26; b++){
        bank[b].style.visibility = "visible";
        /*cBank[b].style.visibility = "visible";*/
    }
    numWrong = 0;
    numRight = 0;
    phraseLength = 0;
    numChar = 0;
    results.style.marginTop = "5px";
    results.style.lineHeight = "40px";
    results.innerHTML = " ";
    document.getElementById('letterBank').style.display = "block";
    again.style.marginTop = "0px";
    again.style.display = "none";

	
	document.getElementById('introPage').style.display = "none";
    document.getElementById('singlePage').style.display = "block";
	document.getElementById('rulesPage').style.display = "none";
	document.getElementById('gamePage').style.display = "none";
}
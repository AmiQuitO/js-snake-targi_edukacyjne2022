let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
let gridsize = 11;
let spacing = 5;
let ostklaw = "d";
let ostkier = 1;
let waz = [Math.floor((gridsize*gridsize)/2)-2, Math.floor((gridsize*gridsize)/2)-1 , Math.floor((gridsize*gridsize)/2)];
let punkty = 0;
let punktyTeraz = 0;
let puntkyRekord = 0;
let pozowoc = -1;
let predkosc = 800;
let koniec = false;
let blocknextkey = false;


ctx.beginPath();
czas = setInterval(ruch, predkosc-(punkty*2));

losowanie();
szachownica();

// szachownica
function szachownica(){
	ctx.fillStyle = "#0B0A10";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    count = 0;
    for(i=0; i<canvas.height; i = i+(canvas.height/gridsize)){
        for(j=0; j<canvas.width; j = j+(canvas.width/gridsize)){
            if(count%2==0){
                ctx.fillStyle = "RGBA(87, 87, 87, 0.1)";
            }else{
                ctx.fillStyle = "RGBA(166, 166, 166, 0.1)";
            }
            ctx.fillRect(j, i, canvas.height/gridsize, canvas.width/gridsize);

            if(pozowoc == count){
                ctx.fillStyle = "#E91E63";
                ctx.fillRect(j + spacing, i + spacing, (canvas.height/gridsize) - (spacing*2), (canvas.width/gridsize) - (spacing*2));
            }
            for(k = 0; k<waz.length; k++){
                if(waz[k] == count){
                    ctx.fillStyle = `RGBA(60, ${255-(k*2)}, 89, 1)`;
                    ctx.fillRect(j, i, canvas.height/gridsize, canvas.width/gridsize);    
                }
            }
            count++;
        }
    }
	ctx.font = '40px monospace';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(punkty, 25, canvas.height-25);
}

function f(event){

	if(blocknextkey == false){
		klawisz=event.key;
		if(klawisz == "w" && ostklaw != "s"){
			ostklaw = "w";
			ostkier = -gridsize;
			blocknextkey = true;
		}
		if(klawisz == "s" && ostklaw != "w"){
			ostklaw = "s";
			ostkier = gridsize;
			blocknextkey = true;
		}
		if(klawisz == "a" && ostklaw != "d"){
			ostklaw = "a";
			ostkier = -1;
			blocknextkey = true;
		}
		if(klawisz == "d" && ostklaw != "a"){
			ostklaw = "d";
			ostkier = 1;
			blocknextkey = true;
		}
	}
}
function ruch()
{
	blocknextkey = false;
	if(kolizja(ostkier)){
		clearInterval(czas);
		setTimeout(przegrana, 800);
	}else{
		if(czypunkt(ostkier)){
			waz.push(waz[waz.length-1]+ostkier);
		}else{
			for(i = 0; i < waz.length; i++){
				if(i == 0){
					tyl=waz[0];
					waz[i]=waz[i+1];
				}
				if(i < waz.length-1){
					waz[i] = waz[i+1];
				}
				if(i == waz.length-1){
					waz[i] += ostkier;
				}
			}
		}
	}
	if(kolizjamapy(ostkier)){	
		clearInterval(czas);
		setTimeout(przegrana, 100);
	}else{
		szachownica();
	}
}

function kolizjamapy(a){
	// 0 1 2
	// 3 4 5
	// 6 7 8
	
	if((waz[waz.length-1]) < 0 || ((waz[waz.length-1]) >= gridsize*gridsize)){
		return true;
	}
	if(a == 1 && (((waz[waz.length-1]))%gridsize==0)){
		return true;
	}else if(a == -1 && (((waz[waz.length-1]+1))%gridsize==0)){
		return true;
	}
	return false;
}

function kolizja(a){
	for(i=1; i < waz.length-1; i++){
		if(waz[waz.length-1]+a == waz[i]){
			return true;
		}
	}
	return false;
}

function czypunkt(a){

	if((waz[waz.length-1]+a) == pozowoc){
		punkty++;
		punktyTeraz++;
			
		clearInterval(czas);
		czas = setInterval(ruch, predkosc-(punkty*2));
		
		if(punktyTeraz >= gridsize*gridsize-3){
			
			clearInterval(czas);
			setTimeout(wygrana, 800);
		}
        losowanie();
		return true;
	}else{
		return false;
	}
}

function losowanie(){
	if (waz.length >= (gridsize*gridsize)){
		return;
    }
	do{
		pozowoc=Math.floor(((gridsize*gridsize)-2)*Math.random())+1;
		czyok=0;
		for(i=0;i<=waz.length-1;i++){
			if(pozowoc==waz[i]){
				czyok++;
			}
		}
	}while(czyok>0);
}

function przegrana(){

	ctx.fillStyle = "RGBA(0, 0, 0, 0.5)"
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.font = '40px monospace';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Przegrales/as!`, 60, canvas.height/2-40);

	ctx.font = '30px monospace';
    ctx.fillText(`Ilosc punktow:`, 100, canvas.height/2+10);

	ctx.font = '50px monospace';
    ctx.fillText(punkty, canvas.width/2 - 20, canvas.height/2+80);
	setTimeout(reset, 2000);
}
function wygrana(){
	
	ctx.fillStyle = "RGBA(0, 0, 0, 0.5)"
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.font = '30px monospace';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Przechodzisz dalej!`, 40, canvas.height/2-40);

	ctx.font = '20px monospace';
    ctx.fillText(`Ilosc punktow:`, 120, canvas.height/2+10);

	ctx.font = '40px monospace';
    ctx.fillText(punkty, canvas.width/2 - 20, canvas.height/2+80);

	setTimeout(resetWygrana, 2000);
}
function resetWygrana(){
	ostklaw = "d";
	ostkier = 1;
	waz = [];
	waz = [Math.floor((gridsize*gridsize)/2)-2, Math.floor((gridsize*gridsize)/2)-1 , Math.floor((gridsize*gridsize)/2)];
	pozowoc = -1;
	predkosc = 800;
	koniec = false;
	punktyTeraz = 0;

	if(punkty > puntkyRekord){
		puntkyRekord = punkty;
		document.getElementById("rekord").innerHTML = puntkyRekord;
	}
	
	clearInterval(czas);
	czas = setInterval(ruch, predkosc-(punkty*2));
		
	losowanie();
	szachownica();
}
function reset(){
	ostklaw = "d";
	ostkier = 1;
	waz = [];
	waz = [Math.floor((gridsize*gridsize)/2)-2, Math.floor((gridsize*gridsize)/2)-1 , Math.floor((gridsize*gridsize)/2)];
	pozowoc = -1;
	predkosc = 800;
	koniec = false;
	punktyTeraz = 0;

	if(punkty > puntkyRekord){
		puntkyRekord = punkty;
		document.getElementById("rekord").innerHTML = puntkyRekord;
	}
		
	punkty = 0;

	clearInterval(czas);
	czas = setInterval(ruch, predkosc-(punkty*2));

	losowanie();
	szachownica();
}
function getHypotenuse(cat1, cat2){
	let res = cat1**2 + cat2**2;
	res = Math.sqrt(res);
	return res;
}

function triangleExists(cat1, cat2){
	let hyp = getHypotenuse(cat1, cat2);
	
	if(hyp > Math.abs(cat1 - cat2) && hyp < cat1 + cat2){
		return true;	
	}
	return false;
}

function drawTriangle(cat1, cat2){
	let cnv = document.getElementById("cnv");
	let ctx = cnv.getContext("2d");
	let width = cnv.width;
	let height = cnv.height;
	
	ctx.clearRect(0,0,width,height);
	if(triangleExists(cat1, cat2)){
		ctx.beginPath();
		ctx.moveTo(width/2-cat1/2, height/2+cat2/2);
		ctx.lineTo(width/2+cat1/2, height/2+cat2/2);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(width/2+cat1/2, height/2-cat2/2);
		ctx.lineTo(width/2+cat1/2, height/2+cat2/2);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(width/2-cat1/2, height/2+cat2/2);
		ctx.lineTo(width/2+cat1/2, height/2-cat2/2);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(width/2+cat1/2, height/2-cat2/2);
		ctx.lineTo(width/2+cat1/2+cat2/1, height/2-cat2/2);
		ctx.lineTo(width/2+cat1/2+cat2/1, height/2+cat2/2);
		ctx.lineTo(width/2+cat1/2, height/2+cat2/2);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(width/2-cat1/2, height/2+cat2/2);
		ctx.lineTo(width/2-cat1/2, height/2+cat2/2+cat1/1);
		ctx.lineTo(width/2+cat1/2, height/2+cat2/2+cat1/1);
		ctx.lineTo(width/2+cat1/2, height/2+cat2/2);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(width/2+cat1/2, height/2-cat2/2);
		ctx.lineTo(width/2+cat1/2-cat2/1, height/2-cat2/2-cat1/1);
		ctx.lineTo(width/2-cat1/2-cat2/1, height/2+cat2/2-cat1/1);
		ctx.lineTo(width/2-cat1/2, height/2+cat2/2);
		ctx.stroke();
	}
	

}


function update(){
	let cat1 = document.getElementById("cathetus1").value;
	let cat2 = document.getElementById("cathetus2").value;
	let hyp = getHypotenuse(cat1, cat2);
	
	if(triangleExists(cat1, cat2)){
		document.getElementById("span").innerHTML = "Representação de um triângulo com catetos de tamanho: "+ cat1 +" e " + cat2 +", com hipotenusa de "+ hyp.toFixed(2) +". Todos na mesma unidade de medida."
	drawTriangle(cat1, cat2);
		
		
	} else {
		document.getElementById("span").innerHTML = "Configuração inválida."
	}
}

update();

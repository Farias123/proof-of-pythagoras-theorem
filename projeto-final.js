let t = 0;
let dt = 0.01;
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
let width = cnv.width;
let height = cnv.height;
let waterMovement;

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

function drawTriangleAndSquares(cat1, cat2){
	ctx.fillStyle = "blue";
	
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
		ctx.fill();
		ctx.stroke();
		
	}
	

}

function passTime(cat1, cat2, hyp, alpha, beta){
	//ctx.fillStyle = "transparent";
	ctx.fillStyle = "white";
	let flowRate = (hyp**2)/10;
	let deltaL1 = Math.sqrt(2*flowRate*t/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
	
	if(t<10){
			ctx.beginPath();
			ctx.moveTo(width/2+cat1/2-cat2/1,height/2-cat2/2-cat1/1);
			ctx.lineTo(width/2+cat1/2-cat2/1-deltaL1*Math.cos(alpha),height/2-cat2/2-cat1/1+deltaL1*Math.sin(alpha));
			ctx.lineTo(width/2+cat1/2-cat2/1+deltaL1*Math.sin(alpha)*Math.tan(beta)**(-1),height/2-cat2/2-cat1/1+deltaL1*Math.sin(alpha));
			ctx.fill();
		
		t+=dt
		console.log(t);
	}
}

function update(){
	let cat1 = document.getElementById("cathetus1").value;
	let cat2 = document.getElementById("cathetus2").value;
	let hyp = getHypotenuse(cat1, cat2);
	
	if(triangleExists(cat1, cat2)){
		document.getElementById("span").innerHTML = "Representação de um triângulo com catetos de tamanho: "+ cat1 +" e " + cat2 +", com hipotenusa de "+ hyp.toFixed(2) +". Todos na mesma unidade de medida."
		
		drawTriangleAndSquares(cat1, cat2);
		
		let beta = Math.atan2(cat1,cat2);
		let alpha = Math.PI/2-beta;
		
		clearInterval(waterMovement);
		t = 0;
		
		waterMovement = setInterval(passTime,dt*1000, cat1, cat2, hyp, alpha, beta);
		
		
	
	} else {
		document.getElementById("span").innerHTML = "Configuração inválida."
	}
	
}

update();

let t = 0;
let dt = 0.01;
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
let width = cnv.width;
let height = cnv.height;
let waterMovement;
let xTop, yTop, xLeft, yLeft, xRight, yRight, xBottom, yBottom;
let deltaL1 = 0, deltaL2 = 0, deltaL3 = 0, deltaL4;
let alpha, beta;
ctx.fillStyle = "blue";
function getHypotenuse(cat1, cat2){
	let res = cat1**2 + cat2**2;
	res = Math.sqrt(res);
	return res;
}

function triangleExists(cat1, cat2){
	let hyp = getHypotenuse(cat1, cat2);
	
	if(hyp > Math.abs(cat1 - cat2) && hyp < cat1 + cat2 && cat1 >= 10 && cat2 >= 10){
		return true;	
	}
	return false;
}

function drawTriangleAndSquares(cat1, cat2){
	ctx.clearRect(0,0,width,height);

	if(triangleExists(cat1, cat2)){
		ctx.beginPath();
		ctx.moveTo(xBottom, yBottom);
		ctx.lineTo(xRight, yBottom);
		ctx.lineTo(xRight, yRight);
		ctx.lineTo(xBottom, yBottom);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(xRight, yRight);
		ctx.lineTo(xRight+cat2/1, yRight);
		ctx.lineTo(xRight+cat2/1, yBottom);
		ctx.lineTo(xRight, yBottom);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(xBottom, yBottom);
		ctx.lineTo(xBottom, yBottom+cat1/1);
		ctx.lineTo(xRight, yBottom+cat1/1);
		ctx.lineTo(xRight, yBottom);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(xRight, yRight);
		ctx.lineTo(xTop, yTop);
		ctx.lineTo(xLeft, yLeft);
		ctx.lineTo(xBottom, yBottom);
		ctx.stroke();
	}
}

function getBase(deltaL){
	let base = deltaL*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1));
	return base;
}

function passTime(cat1, cat2, hyp, alpha, beta){
	let flowRate = (hyp**2)/10;
	let flowRateSquare1 = (cat1**2/hyp**2)*flowRate;
	let flowRateSquare2 = (cat2**2/hyp**2)*flowRate;
	let deltaH1 = flowRateSquare1*t/cat1;
	let deltaH2 = flowRateSquare2*t/cat2;

	if(t<10){
		drawTriangleAndSquares(cat1, cat2);
		let x = hyp*Math.sin(beta)/Math.sin(alpha);
		ctx.beginPath();
		ctx.moveTo(xBottom, yBottom);
		ctx.lineTo(xRight,yRight);

		if(yRight<yLeft){
			deltaL4 = x;
			if(yRight>yTop+deltaL1*Math.sin(alpha)){
				deltaL1 = Math.sqrt(2*flowRate*t/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
				ctx.lineTo(xTop+deltaL1*Math.sin(alpha)*Math.tan(beta)**(-1),yTop+deltaL1*Math.sin(alpha));
				ctx.lineTo(xTop-deltaL1*Math.cos(alpha),yTop+deltaL1*Math.sin(alpha));
			}
			else if(yLeft>yTop+Math.sin(alpha)*(deltaL1+deltaL2)){
				deltaL2 = -deltaL1/2+flowRate*t/(getBase(deltaL1)*Math.sin(alpha));
				ctx.lineTo(xRight-deltaL2*Math.cos(alpha),yRight+deltaL2*Math.sin(alpha));
				ctx.lineTo(xRight-deltaL2*Math.cos(alpha)-getBase(deltaL1),yRight+deltaL2*Math.sin(alpha));
			}
			else if(yBottom>yTop+Math.sin(alpha)*(deltaL1+deltaL2+x-deltaL4)){
				deltaL4 = Math.sqrt((2*hyp**2-2*flowRate*t)/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
				ctx.lineTo(xRight-Math.cos(alpha)*(x-deltaL4+deltaL2),yLeft+(x-deltaL4)*Math.sin(alpha));
				ctx.lineTo(xRight-Math.cos(alpha)*(x-deltaL4+deltaL2)-getBase(deltaL4),yLeft+(x-deltaL4)*Math.sin(alpha));
			}
		}else if(yLeft<yRight){
			deltaL4 = hyp;
			if(yLeft>yTop+deltaL1*Math.sin(alpha)){
				deltaL1 = Math.sqrt(2*flowRate*t/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
				ctx.lineTo(xTop+deltaL1*Math.sin(alpha)*Math.tan(beta)**(-1),yTop+deltaL1*Math.sin(alpha));
				ctx.lineTo(xTop-deltaL1*Math.cos(alpha),yTop+deltaL1*Math.sin(alpha));
			}
			else if(yRight>yTop+deltaL1*Math.sin(alpha)+deltaL3*Math.sin(beta)){
				deltaL3 = -deltaL1/2*Math.sin(alpha)/Math.sin(beta)+flowRate*t/(getBase(deltaL1)*Math.sin(beta));
				ctx.lineTo(xLeft+deltaL3*Math.cos(beta)+getBase(deltaL1),yLeft+deltaL3*Math.sin(beta));
				ctx.lineTo(xLeft+deltaL3*Math.cos(beta),yLeft+deltaL3*Math.sin(beta));
			}
			else if(yBottom>yTop+(deltaL1+hyp-deltaL4)*Math.sin(alpha)+deltaL3*Math.sin(beta)){
				deltaL4 = Math.sqrt((2*hyp**2-2*flowRate*t)/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
				ctx.lineTo(xRight-(hyp-deltaL4)*Math.cos(alpha),yRight+(hyp-deltaL4)*Math.sin(alpha));
				ctx.lineTo(xRight-(hyp-deltaL4)*Math.cos(alpha)-getBase(deltaL4),yRight+(hyp-deltaL4)*Math.sin(alpha));
			}
		}else{
			deltaL4 = hyp;
			if(yRight>yTop+deltaL1*Math.sin(alpha)){
				deltaL1 = Math.sqrt(2*flowRate*t/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
				ctx.lineTo(xTop+deltaL1*Math.sin(alpha)*Math.tan(beta)**(-1),yTop+deltaL1*Math.sin(alpha));
				ctx.lineTo(xTop-deltaL1*Math.cos(alpha),yTop+deltaL1*Math.sin(alpha));
			}
			else if(yBottom>yTop+Math.sin(alpha)*(deltaL1+hyp-deltaL4)){
				deltaL4 = Math.sqrt((2*hyp**2-2*flowRate*t)/(Math.sin(alpha)*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1))));
				ctx.lineTo(xRight-(hyp-deltaL4)*Math.cos(alpha),yRight+(hyp-deltaL4)*Math.sin(alpha));
				ctx.lineTo(xLeft+(hyp-deltaL4)*Math.cos(alpha),yRight+(hyp-deltaL4)*Math.sin(alpha));
			}

		}
		ctx.lineTo(xLeft,yLeft);
		ctx.lineTo(xBottom,yBottom);
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(xBottom,yBottom+cat1/1);
		ctx.lineTo(xBottom+cat1/1,yBottom+cat1/1);
		ctx.lineTo(xBottom+cat1/1,yBottom+cat1/1-deltaH1);
		ctx.lineTo(xBottom, yBottom+cat1/1-deltaH1);
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(xBottom+cat1/1, yBottom);
		ctx.lineTo(xBottom+cat1/1+cat2/1, yBottom);
		ctx.lineTo(xBottom+cat1/1+cat2/1, yBottom-deltaH2);
		ctx.lineTo(xBottom+cat1/1, yBottom-deltaH2);
		ctx.fill();
		ctx.stroke();
	}
	else{
		clearInterval(waterMovement);
	}
	t+=dt
}

function update(){
	let cat1 = document.getElementById("cathetus1").value;
	let cat2 = document.getElementById("cathetus2").value;
	let hyp = getHypotenuse(cat1, cat2);

	deltaL1 = 0, deltaL2 = 0, deltaL3 = 0;
	
	xTop = width/2+cat1/2-cat2/1, yTop = height/2-cat2/2-cat1/1;
	xLeft = xTop-cat1/1, yLeft = yTop+cat2/1;
	xRight = width/2+cat1/2, yRight = height/2-cat2/2;
	xBottom = width/2-cat1/2, yBottom = height/2+cat2/2;
	
	if(triangleExists(cat1, cat2)){
		document.getElementById("span").innerHTML = "Representação de um triângulo com catetos de tamanho: "+ cat1 +" e " + cat2 +", com hipotenusa de "+ hyp.toFixed(2) +". Todos na mesma unidade de medida."
		
		drawTriangleAndSquares(cat1, cat2);
		
		beta = Math.atan2(cat1,cat2);
		alpha = Math.PI/2-beta;
		
		clearInterval(waterMovement);
		t = 0;
		
		waterMovement = setInterval(passTime,dt*1000, cat1, cat2, hyp, alpha, beta);


	} else {
		clearInterval(waterMovement);
		document.getElementById("span").innerHTML = "Configuração inválida.";
	}	
}

update();
let t = 0, dt = 0.01;
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
let width = cnv.width, height = cnv.height;
let waterMovement;
let xTop, yTop, xLeft, yLeft, xRight, yRight, xBottom, yBottom;
let deltaL1, deltaL2, deltaL3, deltaL4;
let alpha, beta;
let flowRate, flowRateSquare1, flowRateSquare2;
let data, layout;
ctx.fillStyle = "rgb(0,0,255)";

function drawTriangleAndSquares(cat1, cat2){
	ctx.clearRect(0,0,width,height);
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

function getBase(deltaL){
	let base = deltaL*(Math.cos(alpha)+Math.sin(alpha)*Math.tan(beta)**(-1));
	return base;
}

function passTime(cat1, cat2, hyp, alpha, beta){
	let deltaH1 = flowRateSquare1*t/cat1;
	let deltaH2 = flowRateSquare2*t/cat2;

	if(t<=10){
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
	let hyp = Math.sqrt(cat1**2 + cat2**2);
	
	deltaL1 = 0, deltaL2 = 0, deltaL3 = 0;
	
	xTop = width/2+cat1/2-cat2/1, yTop = height/2-cat2/2-cat1/1;
	xLeft = xTop-cat1/1, yLeft = yTop+cat2/1;
	xRight = width/2+cat1/2, yRight = height/2-cat2/2;
	xBottom = width/2-cat1/2, yBottom = height/2+cat2/2;
	document.getElementById("message-text").innerHTML = `<var>${cat1}</var> <sup>2</sup> + <var>${cat2}</var> <sup>2</sup> = <var>${hyp.toFixed(2)}</var> <sup>2</sup><br><var>${cat1**2}</var> + <var>${cat2**2}</var> = <var>${cat1**2+cat2**2}</var>`
	beta = Math.atan2(cat1,cat2);
	alpha = Math.PI/2-beta;
		
	clearInterval(waterMovement);
	t = 0;
		
	flowRate = (hyp**2)/10;
	flowRateSquare1 = (cat1**2/hyp**2)*flowRate;
	flowRateSquare2 = (cat2**2/hyp**2)*flowRate;
	
	waterMovement = setInterval(passTime,dt*1000, cat1, cat2, hyp, alpha, beta);
	
	data = [{x:[],y:[],mode:"lines", name:"Hipotenusa"}, {x:[],y:[],mode:"lines", name:"Cateto 1"},{x:[],y:[],mode:"lines", name:"Cateto 2"}];
	for(let time = 0;time<=10;time+=1){
		data[0].x[time] = data[1].x[time] = data[2].x[time] = time;
		data[0].y[time] = (hyp**2-flowRate*time).toFixed(2);
		data[1].y[time] = flowRateSquare1*time;
		data[2].y[time] = flowRateSquare2*time;
	}
	layout = {
			xaxis:{title:"Tempo(s)"},
			yaxis:{title:"Volume(px<sup>3</sup>)"},
			title: "Volume de água nos quadrados"
		};
}

function drawGraph(){
	if(window.innerWidth >= 960/0.8){
		layout.width = 960;
	}else{
		layout.width = 0.8*window.innerWidth;
	}
	Plotly.react("chart", data, layout);
}

window.onresize = drawGraph;
document.getElementById("cathetus1").value = 150;
document.getElementById("cathetus2").value = 150;
update();
drawGraph();
setTimeout(clearInterval,10,waterMovement);
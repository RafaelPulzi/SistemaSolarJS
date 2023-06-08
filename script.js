function universo() {
    var background = document.getElementById('universo')
    background.style.backgroundColor = '#000000';
}


universo();

function resizeCanvas() {
    var canvas = document.getElementById('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  
  // Inicialização
  resizeCanvas();

function animate() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var centerXSOL = canvas.width / 2; // Coordenada x do centro do canvas
  var centerYSOL = canvas.height / 2; // Coordenada y do centro do canvas

  //Definição das Orbitas de cada planeta, eles estão na exata ordem para serem adicionados
  var angleMercurio = 0;
  var angleVenus = 0;
  var angleTerra = 0;
  var angleLua = 0;
  var angleMarte = 0;
  var angleJupiter = 0;
  var angleSaturno = 0;
  var angleNetuno = 0;
  var anglePlutão = 0;  

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // SOL
    context.beginPath();
    context.arc(centerXSOL, centerYSOL, 100, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(254, 169, 26)';
    context.fill();

    // Mercurio
    // Calculo da Mercurio em relação ao sol
    var radiusMercurio = 30; // Raio de Mercurio
    var xMercurio = centerXSOL + Math.cos(angleMercurio) * 150; // Distancia referente ao sol
    var yMercurio = centerYSOL + Math.sin(angleMercurio) * 150;

    context.beginPath();
    context.arc(xMercurio, yMercurio, radiusMercurio, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(204, 132, 0)';
    context.fill();

    angleMercurio += 0.01;

    // Venus
    // Calculo da Venus em relação ao sol
    var radiusVenus = 33; // Raio de Venus
    var xVenus = centerXSOL + Math.cos(angleVenus) * 250; // Distancia referente ao sol
    var yVenus = centerYSOL + Math.sin(angleVenus) * 250;

    context.beginPath();
    context.arc(xVenus, yVenus, radiusVenus, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(246, 230, 231)';
    context.fill();

    angleVenus += 0.004;
    
    // Terra
    // Calculo da terra em relação ao sol
    var radiusTerra = 45; // Raio da terra
    var xTerra = centerXSOL + Math.cos(angleTerra) * 400; // Distancia referente ao sol
    var yTerra = centerYSOL + Math.sin(angleTerra) * 400;

    context.beginPath();
    context.arc(xTerra, yTerra, radiusTerra, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(135, 206, 250)';
    context.fill();

    angleTerra += 0.001;

    // LUA
    // Calculo da posição da lua em relação a terra
    var radiusLua = 25; 
    var xLua = xTerra + Math.cos(angleLua) * 100; 
    var yLua = yTerra + Math.sin(angleLua) * 100;

    
    context.beginPath();
    context.arc(xLua, yLua, radiusLua, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(216, 212, 202)';
    context.fill();

    angleLua += 0.007; // velocidade de rotação da lua

    requestAnimationFrame(draw);
  }

  draw();
}

animate();
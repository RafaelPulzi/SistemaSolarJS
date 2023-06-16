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
  document.body.style.height = window.innerHeight + 'px'; // Ajusta a altura do <body> para corresponder à altura do canvas
}

window.addEventListener('resize', resizeCanvas);

// Inicialização
resizeCanvas();

function animate() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var centerXSOL = canvas.width / 2; // Coordenada x do centro do canvas
  var centerYSOL = canvas.height / 2;
  // Coordenada y do centro do canvas

  //Definição das Orbitas de cada planeta, eles estão na exata ordem para serem adicionados
  var angleMercurio = 0;
  var angleVenus = 0;
  var angleTerra = 0;
  var angleLua = 0;
  var angleMarte = 0;
  var angleJupiter = 0;
  var angleSaturno = 0;
  var angleNetuno = 0;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // SOL
    context.beginPath();
    context.arc(centerXSOL, centerYSOL, 70, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(254, 169, 26)';
    context.fill();

    // Mercurio
    // Calculo da Mercurio em relação ao sol
    var radiusMercurio = 20; // Raio de Mercurio
    var xMercurio = centerXSOL + Math.cos(angleMercurio) * 110; // Distancia referente ao sol
    var yMercurio = centerYSOL + Math.sin(angleMercurio) * 110;

    context.beginPath();
    context.arc(xMercurio, yMercurio, radiusMercurio, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(204, 132, 0)';
    context.fill();

    angleMercurio += 0.01;

    // Venus
    // Calculo da Venus em relação ao sol
    var radiusVenus = 23; // Raio de Venus
    var xVenus = centerXSOL + Math.cos(angleVenus) * 180; // Distancia referente ao sol
    var yVenus = centerYSOL + Math.sin(angleVenus) * 180;

    context.beginPath();
    context.arc(xVenus, yVenus, radiusVenus, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(246, 230, 231)';
    context.fill();

    angleVenus += 0.004;

    // Terra
    // Calculo da terra em relação ao sol
    var radiusTerra = 35; // Raio da terra
    var xTerra = centerXSOL + Math.cos(angleTerra) * 300; // Distancia referente ao sol
    var yTerra = centerYSOL + Math.sin(angleTerra) * 300;

    context.beginPath();
    context.arc(xTerra, yTerra, radiusTerra, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(135, 206, 250)';
    context.fill();

    angleTerra += 0.001;

    // LUA
    // Calculo da posição da lua em relação a terra
    var radiusLua = 15;
    var xLua = xTerra + Math.cos(angleLua) * 70;
    var yLua = yTerra + Math.sin(angleLua) * 70;


    context.beginPath();
    context.arc(xLua, yLua, radiusLua, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(216, 212, 202)';
    context.fill();

    angleLua += 0.007; // velocidade de rotação da lua

    // Marte
    // Calculo de Marte em relação ao sol
    var radiusMarte = 30; // Raio de Marte
    var xMarte = centerXSOL + Math.cos(angleMarte) * 450; // Distancia referente ao sol
    var yMarte = centerYSOL + Math.sin(angleMarte) * 450;

    context.beginPath();
    context.arc(xMarte, yMarte, radiusMarte, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(213, 133, 69)';
    context.fill();

    angleMarte += 0.0019;

    // Jupiter
    // Calculo de Jupiter em relação ao sol
    var radiusJupiter = 60; // Raio de Jupiter
    var xJupiter = centerXSOL + Math.cos(angleJupiter) * 580; // Distancia referente ao sol
    var yJupiter = centerYSOL + Math.sin(angleJupiter) * 580;

    context.beginPath();
    context.arc(xJupiter, yJupiter, radiusJupiter, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(188, 175, 178)';
    context.fill();

    angleJupiter += 0.0004;

    // Saturno
    // Calculo de Saturno em relação ao sol
    var radiusSaturno = 45; // Raio de Saturno
    var xSaturno = centerXSOL + Math.cos(angleSaturno) * 750; // Distancia referente ao sol
    var ySaturno = centerYSOL + Math.sin(angleSaturno) * 750;

    context.beginPath();
    context.arc(xSaturno, ySaturno, radiusSaturno, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(141, 159, 170)';
    context.fill();

    angleSaturno += 0.0009;

    // Netuno
    // Calculo de Netuno em relação ao sol
    var radiusNetuno = 35; // Raio de Netuno
    var xNetuno = centerXSOL + Math.cos(angleNetuno) * 850; // Distancia referente ao sol
    var yNetuno = centerYSOL + Math.sin(angleNetuno) * 850;

    context.beginPath();
    context.arc(xNetuno, yNetuno, radiusNetuno, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(0, 120, 146)';
    context.fill();

    angleNetuno += 0.0015;

    requestAnimationFrame(draw);
  }

  draw();
}

animate();
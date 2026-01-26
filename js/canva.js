const stars = [];
const nebulas = [];
const shootingStars = [];
const saturnParticles = [];


let panX = 0;
let panY = 0;


function createStars(count, width, height) {
    stars.length = 0;

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.6 + 0.1, // parallax
            baseAlpha: Math.random() * 0.5 + 0.3,
            twinkleSpeed: Math.random() * 0.001 + 0.001,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }
}

function spawnShootingStar(width, height) {
    const startX = Math.random() * width;
    const startY = Math.random() * height * 0.3; // parte superior

    shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.random() * 6 + 8,
        vy: Math.random() * 4 + 6,
        life: 0,
        maxLife: Math.random() * 30 + 40,
        length: Math.random() * 80 + 120
    });
}


function createNebulas(count, width, height) {
    nebulas.length = 0;

    for (let i = 0; i < count; i++) {
        nebulas.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 400 + 300,
            color: randomNebulaColor(),
            alpha: Math.random() * 0.12 + 0.05,
            depth: Math.random() * 0.2 + 0.05 // parallax lento
        });
    }
}

function randomNebulaColor() {
    const colors = [
        [180, 80, 255],   // roxo
        [80, 120, 255],  // azul
        [255, 120, 180], // rosa
        [120, 255, 200], // verde
        [255, 180, 80]   // laranja
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawNebulas(ctx, offsetX, offsetY) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    nebulas.forEach(n => {
        const gradient = ctx.createRadialGradient(
            n.x + offsetX * n.depth,
            n.y + offsetY * n.depth,
            n.radius * 0.1,
            n.x + offsetX * n.depth,
            n.y + offsetY * n.depth,
            n.radius
        );

        gradient.addColorStop(0, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${n.alpha})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
            n.x + offsetX * n.depth,
            n.y + offsetY * n.depth,
            n.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });

    ctx.restore();
}

function drawStars(ctx, width, height, offsetX, offsetY) {
    const time = performance.now();

    stars.forEach(star => {
        const twinkle =
            Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;

        const alpha = Math.min(
            1,
            Math.max(0.1, star.baseAlpha + twinkle)
        );

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;

        ctx.beginPath();
        if (star.radius > 1.2) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "white";
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.arc(
            star.x + offsetX * star.speed,
            star.y + offsetY * star.speed,
            star.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
}

function drawShootingStars(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];

        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const alpha = 1 - s.life / s.maxLife;

        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
            s.x - s.vx * s.length * 0.1,
            s.y - s.vy * s.length * 0.1
        );
        ctx.stroke();

        if (s.life > s.maxLife) {
            shootingStars.splice(i, 1);
        }
    }

    ctx.restore();
}

function createSaturnParticles(count) {
    saturnParticles.length = 0;

    for (let i = 0; i < count; i++) {
        saturnParticles.push({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 35 + 55,
            speed: Math.random() * 0.002 + 0.001,
            size: Math.random() * 1.8 + 0.6,
            depth: Math.random(), // frente / trás
            alpha: Math.random() * 0.6 + 0.4
        });
    }
}

function drawSaturnParticles(ctx, xSaturno, ySaturno, tilt) {
    ctx.save();
    ctx.translate(xSaturno, ySaturno);
    ctx.rotate(tilt);
    ctx.scale(1, 0.35); // mesma inclinação dos anéis

    saturnParticles.forEach(p => {
        p.angle += p.speed;

        const x = Math.cos(p.angle) * p.radius;
        const y = Math.sin(p.angle) * p.radius;

        ctx.globalAlpha = p.alpha;

        ctx.fillStyle = "rgba(220,220,220,0.9)";
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
}




function drawPlanetWithShadow(ctx, x, y, radius, color, lightX, lightY) {
    const dx = x - lightX;
    const dy = y - lightY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const offsetX = (dx / distance) * radius * 0.6;
    const offsetY = (dy / distance) * radius * 0.6;

    const gradient = ctx.createRadialGradient(
        x - offsetX,
        y - offsetY,
        radius * 0.2,
        x,
        y,
        radius
    );

    gradient.addColorStop(0, color);
    gradient.addColorStop(0.65, color);
    gradient.addColorStop(1, "#000");

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

function resizeCanvas() {
    var canvas = document.getElementById('canvas');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = (window.innerHeight + 850) + 'px';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 850;
    document.body.style.height = (window.innerHeight + 850) + 'px'; // Ajusta a altura do <body> para corresponder à altura do canvas
    createNebulas(6, canvas.width, canvas.height);
    createStars(400, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);

// Inicialização

window.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    panX = (e.clientX - centerX) * 0.05;
    panY = (e.clientY - centerY) * 0.05;
});

function drawSaturnRing(ctx, x, y, planetRadius, tilt, lightX, lightY, front = true) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(tilt);
    ctx.scale(1, 0.35); // achatamento do anel

    // Anel
    ctx.beginPath();
    ctx.arc(0, 0, planetRadius * 2.2, 0, Math.PI * 2);
    ctx.arc(0, 0, planetRadius * 1.4, 0, Math.PI * 2, true);

    // Cor base
    let gradient = ctx.createRadialGradient(0, 0, planetRadius, 0, 0, planetRadius * 2.2);
    gradient.addColorStop(0, "rgba(200,200,200,0.15)");
    gradient.addColorStop(1, "rgba(150,150,150,0.45)");

    ctx.fillStyle = gradient;
    ctx.fill("evenodd");

    // 🌑 Sombra do planeta no anel (somente frente)
    if (front) {
        const dx = x - lightX;
        const dy = y - lightY;
        const angle = Math.atan2(dy, dx);

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.ellipse(
            Math.cos(angle) * planetRadius * 0.6,
            Math.sin(angle) * planetRadius * 0.6,
            planetRadius * 0.9,
            planetRadius * 0.6,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    ctx.restore();
}




function drawLunarEclipse(ctx, xLua, yLua, rLua, xTerra, yTerra, xSol, ySol) {
    const vSolTerra = {
        x: xTerra - xSol,
        y: yTerra - ySol
    };

    const vTerraLua = {
        x: xLua - xTerra,
        y: yLua - yTerra
    };

    const dot = vSolTerra.x * vTerraLua.x + vSolTerra.y * vTerraLua.y;
    const magA = Math.hypot(vSolTerra.x, vSolTerra.y);
    const magB = Math.hypot(vTerraLua.x, vTerraLua.y);

    const angle = Math.acos(dot / (magA * magB));
    if (angle > 0.08) return;

    const shadowDirX = vSolTerra.x / magA;
    const shadowDirY = vSolTerra.y / magA;

    const shadowX = xLua + shadowDirX * rLua * 0.4;
    const shadowY = yLua + shadowDirY * rLua * 0.4;

    ctx.save();
    ctx.globalCompositeOperation = "source-atop";

    // Umbra
    const umbra = ctx.createRadialGradient(
        shadowX, shadowY, rLua * 0.2,
        shadowX, shadowY, rLua * 1.4
    );
    umbra.addColorStop(0, "rgba(0,0,0,0.75)");
    umbra.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = umbra;
    ctx.beginPath();
    ctx.arc(xLua, yLua, rLua, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}


function drawSolarEclipse(ctx, xLua, yLua, rLua, xTerra, yTerra, rTerra, xSol, ySol) {
    // Vetores
    const vSolLua = { x: xLua - xSol, y: yLua - ySol };
    const vLuaTerra = { x: xTerra - xLua, y: yTerra - yLua };

    const dot = vSolLua.x * vLuaTerra.x + vSolLua.y * vLuaTerra.y;
    const magA = Math.hypot(vSolLua.x, vSolLua.y);
    const magB = Math.hypot(vLuaTerra.x, vLuaTerra.y);

    const angle = Math.acos(dot / (magA * magB));

    // Condição de alinhamento
    if (angle > 0.06) return;

    // Direção da sombra
    const shadowDirX = vLuaTerra.x / magB;
    const shadowDirY = vLuaTerra.y / magB;

    const shadowX = xTerra - shadowDirX * rTerra * 0.3;
    const shadowY = yTerra - shadowDirY * rTerra * 0.3;

    ctx.save();
    ctx.globalCompositeOperation = "source-atop";

    const shadow = ctx.createRadialGradient(
        shadowX, shadowY, rTerra * 0.3,
        shadowX, shadowY, rTerra * 1.6
    );

    shadow.addColorStop(0, "rgba(0,0,0,0.55)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.arc(xTerra, yTerra, rTerra, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}






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
        // 🌠 Chance pequena de estrela cadente
        if (Math.random() < 0.003 && shootingStars.length < 2) {
            spawnShootingStar(canvas.width, canvas.height);
        }

        
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawNebulas(context, panX, panY);

        //ESTRELAS
        drawStars(context, canvas.width, canvas.height, panX, panY);
        
        // 🌠 Estrelas cadentes (ANTES do sistema solar)
        drawShootingStars(context);

        // SOL
        context.beginPath();
        context.arc(centerXSOL, centerYSOL, 70, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgb(254, 169, 26)';
        context.fill();

        var radiusSol = 70; // Radius of the sol
        var xSol = centerXSOL; // X-coordinate of the sol (center of the canvas)
        var ySol = centerYSOL; // Y-coordinate of the sol (center of the canvas)

        // Create a glowing effect for the sol
        context.shadowBlur = 20;
        context.shadowColor = 'rgb(254, 169, 26)';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

        // Draw the sol with the glowing effect
        context.beginPath();
        context.arc(xSol, ySol, radiusSol, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgb(254, 169, 26)';
        context.fill();

        // Reset the shadow properties
        context.shadowBlur = 0;
        context.shadowColor = 'rgba(0, 0, 0, 0)';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        

        // Mercurio
        // Calculo da Mercurio em relação ao sol
        var radiusMercurio = 20; // Raio de Mercurio
        var xMercurio = centerXSOL + Math.cos(angleMercurio) * 110; // Distancia referente ao sol
        var yMercurio = centerYSOL + Math.sin(angleMercurio) * 110;

        drawPlanetWithShadow(
            context,
            xMercurio,
            yMercurio,
            radiusMercurio,
            "rgb(204, 132, 0)",
            xSol,
            ySol
        );


        angleMercurio += 0.01;

        // Venus
        // Calculo da Venus em relação ao sol
        var radiusVenus = 23; // Raio de Venus
        var xVenus = centerXSOL + Math.cos(angleVenus) * 180; // Distancia referente ao sol
        var yVenus = centerYSOL + Math.sin(angleVenus) * 180;

        drawPlanetWithShadow(context, xVenus, yVenus, radiusVenus, "rgb(246, 230, 231)", xSol, ySol);

        angleVenus += 0.004;

        // Terra
        // Calculo da terra em relação ao sol
        var radiusTerra = 35; // Raio da terra
        var xTerra = centerXSOL + Math.cos(angleTerra) * 300; // Distancia referente ao sol
        var yTerra = centerYSOL + Math.sin(angleTerra) * 300;

        drawPlanetWithShadow(
            context,
            xTerra,
            yTerra,
            radiusTerra,
            "rgb(135, 206, 250)",
            xSol,
            ySol
        );

        angleTerra += 0.001;

        // LUA
        // Calculo da posição da lua em relação a terra
        var radiusLua = 15;
        var xLua = xTerra + Math.cos(angleLua) * 70;
        var yLua = yTerra + Math.sin(angleLua) * 70;


        // 🌙 Lua
        drawPlanetWithShadow(
            context,
            xLua,
            yLua,
            radiusLua,
            "rgb(216, 212, 202)",
            xSol,
            ySol
        );

        // Eclipse lunar (Terra na frente da Lua)
        drawLunarEclipse(
            context,
            xLua,
            yLua,
            radiusLua,
            xTerra,
            yTerra,
            xSol,
            ySol
        );

        // Eclipse solar (Lua na frente da Terra)
        drawSolarEclipse(
            context,
            xLua,
            yLua,
            radiusLua,
            xTerra,
            yTerra,
            radiusTerra,
            xSol,
            ySol
        );


        angleLua += 0.007; // velocidade de rotação da lua

        // Marte
        // Calculo de Marte em relação ao sol
        var radiusMarte = 30; // Raio de Marte
        var xMarte = centerXSOL + Math.cos(angleMarte) * 450; // Distancia referente ao sol
        var yMarte = centerYSOL + Math.sin(angleMarte) * 450;

        drawPlanetWithShadow(context, xMarte, yMarte, radiusMarte, "rgb(213, 133, 69)", xSol, ySol);

        angleMarte += 0.0019;

        // Jupiter
        // Calculo de Jupiter em relação ao sol
        var radiusJupiter = 60; // Raio de Jupiter
        var xJupiter = centerXSOL + Math.cos(angleJupiter) * 580; // Distancia referente ao sol
        var yJupiter = centerYSOL + Math.sin(angleJupiter) * 580;

        drawPlanetWithShadow(context, xJupiter, yJupiter, radiusJupiter, "rgb(188, 175, 178)", xSol, ySol);

        angleJupiter += 0.0004;


        // 🪐 Partículas ATRÁS do planeta
        context.save();
        context.globalCompositeOperation = "source-over";
        saturnParticles.forEach(p => {
            if (p.depth < 0.5) return;
        });
        drawSaturnParticles(context, xSaturno, ySaturno, Math.PI / 6);
        context.restore();

        // Saturno
        // Calculo de Saturno em relação ao sol
        var radiusSaturno = 45; // Raio de Saturno
        var xSaturno = centerXSOL + Math.cos(angleSaturno) * 750; // Distancia referente ao sol
        var ySaturno = centerYSOL + Math.sin(angleSaturno) * 750;

        drawSaturnRing(
        context,
        xSaturno,
        ySaturno,
        radiusSaturno,
        Math.PI / 6,
        xSol,
        ySol,
        false
    );

    drawPlanetWithShadow(
        context,
        xSaturno,
        ySaturno,
        radiusSaturno,
        "rgb(141, 159, 170)",
        xSol,
        ySol
    );

    // 🪐 Partículas NA FRENTE
    drawSaturnParticles(context, xSaturno, ySaturno, Math.PI / 6);

    drawSaturnRing(
        context,
        xSaturno,
        ySaturno,
        radiusSaturno,
        Math.PI / 6,
        xSol,
        ySol,
        true
    );




        angleSaturno += 0.0009;

        // Netuno
        // Calculo de Netuno em relação ao sol
        var radiusNetuno = 35; // Raio de Netuno
        var xNetuno = centerXSOL + Math.cos(angleNetuno) * 850; // Distancia referente ao sol
        var yNetuno = centerYSOL + Math.sin(angleNetuno) * 850;

        drawPlanetWithShadow(context, xNetuno, yNetuno, radiusNetuno, "rgb(0, 120, 146)", xSol, ySol);

        angleNetuno += 0.0015;

        requestAnimationFrame(draw);


    }

    draw();
}

export function initializeCanvas() {
    resizeCanvas();
    createSaturnParticles(180);
    animate();
}
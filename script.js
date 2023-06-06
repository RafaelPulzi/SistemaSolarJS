function universo() {
    var background = document.getElementById('universo')
    background.style.backgroundColor = '#000000';
}

function terra() {
    var canvas = document.createElement('canvas');
    canvas.id = 'terra';
  
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
  
      var circle = new Path2D();
      circle.moveTo(125, 35);
      circle.arc(100, 35, 25, 0, 2 * Math.PI);
  
      ctx.fillStyle = 'rgb(135, 206, 250)';
      ctx.fill(circle);
    }
  
    document.body.appendChild(canvas);
  }
  
universo();
terra();
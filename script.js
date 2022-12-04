window.addEventListener('load', () => {
  const canvas = document.querySelector('#app') 
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext('2d')

  
  // draw(200,200,7, 200, 200, 100, `hsl(0,50%,80%)`, `hsl(0,50%,50%)`)

  function draw(size,positionX,positionY,numPetals, petalLength_Old, petalCPY_Old, petalCPX_Old, strokeStyle, fillStyle) {
    
    const petalLength = size*(0.5+Math.random())
    const petalCPX = petalLength*(0.2+Math.random()*0.5)
    const petalCPY = petalLength*(0.2+Math.random()*0.5)

    context.save()

    context.strokeStyle = strokeStyle
    context.fillStyle = fillStyle
    
    context.translate(positionX, positionY)
    // context.translate(window.innerWidth / 2, window.innerHeight / 2)
    for (let i = 0; i < numPetals; i++) {
      context.beginPath()
      context.moveTo(0, 0)
      context.rotate(Math.PI * 2 / numPetals)
      context.quadraticCurveTo(petalCPX, -petalCPY / 2, petalLength, 0);
      context.quadraticCurveTo(petalCPX, petalCPY / 2, 0, 0);
      context.fill();
      
      context.stroke()
    }
    context.stroke()

    context.restore();
  
  }

  window.addEventListener('resize', () => {
    
    draw(200,200,200,7, 200, 200, 100, `hsl(0,50%,80%)`, `hsl(0,50%,50%)`)
  })
  
  window.addEventListener('mousemove',(event)=>{
    
    draw(200,event.clientX,event.clientY,7, 50+Math.random()*300, 200, 100, `hsl(0,${50+Math.random()*50}%,50%)`, `hsl(0,${50+Math.random()*50}%,50%)`)
    
  })

  function clearScreen(){
    context.fillStyle = 'rgba(0, 255, 0, 0.01)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  setInterval(()=>{
    clearScreen()
  },50)
  
})

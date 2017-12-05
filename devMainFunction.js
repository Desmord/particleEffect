let particleArray = [];
let parentElement = null;
let canvas = null;
let canvasContext = null;

const setParentElement = (element) => {
    parentElement = element;
}

const setContext = () => {
    canvasContext = canvas.getContext(`2d`);
}

const createCancasElement = () => {
    canvas = document.createElement('canvas');
    canvas.width = parentElement.clientWidth;
    canvas.height = parentElement.clientHeight;
    canvas.style.position = `relative`;
    canvas.style.top = `0`;
    canvas.style.left = `0`;
    parentElement.appendChild(canvas);
    setContext();
}

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

const addParticle = () => {
    let p = {
        x: Math.floor(Math.random() * canvas.width) + 1,
        y: Math.floor(Math.random() * canvas.height) + 1,
        xVel: (Math.random() - 0.5),
        yVel: (Math.random() - 0.5),
        radius: Math.floor(Math.random() * 2) + 1,
        opacity: Math.random() * 0.3,
        changeDirection: '',
    };
    return p;
}

const updateVelocity = (particle) => {
    particle.xVel = (Math.random() - 0.5) * 0.35;
    particle.yVel = (Math.random() - 0.5) * 0.35;

    let time = (Math.floor(Math.random() * 5) + 3) * 1000;

    particle.changeDirection = setTimeout(() => {
        updateVelocity(particle);
    }, time);
}

const updateNumberOfParticle = () => {
    for (let i = 0; i < particleArray.length; i++) {
        if (particleArray[i].x < 0 || particleArray[i].x > canvas.width || particleArray[i].y < 0 || particleArray[i].y > canvas.height) {
            clearTimeout(particleArray[i].changeDirection);
            particleArray.splice(i, 1);
            particleArray.push(addParticle());
            particleArray[particleArray.length - 1].changeDirection = updateVelocity(particleArray[particleArray.length - 1]);
        }
    }
    setTimeout(updateNumberOfParticle, 10000);
}

const createParticle = () => {
    for (let i = 0; i < particleArray.length; i++) {
        clearTimeout(particleArray[i].changeDirection);
    }

    particleArray = [];
    for (let i = 0; i < canvas.width / 15; i++) {
        particleArray[i] = addParticle();
        particleArray[i].changeDirection = updateVelocity(particleArray[i]);
    }
}

const changeParticlePostion = () => {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].x += particleArray[i].xVel;
        particleArray[i].y += particleArray[i].yVel;
    }
}

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

const clearCanvas = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.beginPath();
}

const drawBackground = () => {
    canvasContext.fillStyle = '#161616';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fill();
}

const drawParticle = ()=>{
    for (let i = 0; i < particleArray.length; i++) {
        canvasContext.beginPath();
        canvasContext.arc(particleArray[i].x, particleArray[i].y, particleArray[i].radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = "rgba(255, 255,255," + particleArray[i].opacity + ")";
        canvasContext.fill();
    }
}

const draw = () => {
    clearCanvas();
    drawBackground();
    drawParticle();
}

const setDrawing = () => {
    draw();
    changeParticlePostion();
    window.requestAnimationFrame(setDrawing);
}

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

const setRezolution = () => {
    canvas.width = parentElement.clientWidth;
    canvas.height = parentElement.clientHeight;
}

const resize = ()=>{
    setRezolution();
    createParticle();

}

const resizeWindowEvent = () => {
    window.addEventListener('resize', resize);
}

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

const setParticleEffect = (parentElement) => {
    setParentElement(parentElement);
    createCancasElement();
    updateNumberOfParticle();
    createParticle();
    resizeWindowEvent();
    window.requestAnimationFrame(setDrawing);
}

setParticleEffect(document.querySelector(`.main`));

module.exports = {
    setParticleEffect: setParticleEffect
}
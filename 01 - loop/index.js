import '../template/p5.min.js';

const nCirclesPerRow = 30
const totalFrames = 180

const width = 500
const height = width
const framerate = 30
const padding = 50
const diameter = 15


const frames = 2 * framerate 


function tri(t) {
  return t < 0.5 ? t * 2 : 2 - (t * 2);
}

function inOutSin(t) {
  return 0.5 - Math.cos(Math.PI * t) / 2;
}

let sketch = (p) => {


    function timeLoop( totalframes, offset) {
        return (p.frameCount + offset) % totalframes / totalframes;
    }

    p.setup = () => {
        p.createCanvas(width, height);
        p.frameRate(framerate);
    };
  
    // const radius = diameter / 2
    const top = padding// + radius
    const left = padding //+ radius
    const bottom = height - padding //- radius
    const right = width - padding //- radius

    const spaceX = (right - left)
    const spaceY = (bottom - top)


    let selectedColor = 0

    const getNextColor = () => colors[(selectedColor + 1) % colors.length]
    const moveColorRight = () => selectedColor = (selectedColor + 1) % colors.length

    window.onkeydown = (e) => {
       if (e.key === 'ArrowRight') moveColorRight()
         if (e.key === 'ArrowLeft') selectedColor = (selectedColor - 1) % colors.length
         if (e.key === 's') p.saveGif('test.gif', frames, {units: 'frames', delay: 0})
    }

    const opacity = 175
    const colors = [
        [255, 0, 100, opacity], // Red
        [255, 100, 0, opacity], // Orange
        [0, 255, 100, opacity], // Evergreen
        [0, 100, 255, opacity], // Blue
        [100, 0, 255, opacity], // Purple
    ]

    const framesPerColor = frames / colors.length


    const show = Array.from({length: Math.pow(nCirclesPerRow, 2)}).map((_, i) => Math.round(Math.random()) === 1)
    const size = Array.from({length: Math.pow(nCirclesPerRow, 2)}).map((_, i) => diameter * Math.random())


    let framesPassed = 0
    p.draw = () => {

        // if (totalFrames % framesPerColor === 0) moveColorRight() // Glitchy
        
        framesPassed++

        if (framesPassed === framesPerColor) {
            moveColorRight() 
            framesPassed = 0
        }

        const transitionPosition = framesPassed / framesPerColor

        // p.stroke('white')
        p.noStroke()
        p.blendMode(p.BLEND);
        p.background(0);
        // p.blendMode(p.ADD);
        // p.rectMode(p.CENTER)
      
        let barheight = 0
        const createRow = (centerRatio) => {

            const rowI = nCirclesPerRow * centerRatio


            for (let i = 0; i < 1; i += 1 / nCirclesPerRow) {

                const thisI = Math.round(rowI*nCirclesPerRow + i*nCirclesPerRow)
                const toShow = show[thisI]
                const thisSize = size[thisI]

                if (toShow){
                    const thisColor = colors[selectedColor]
                    const nextColor = getNextColor()
                    const mapped = thisColor.map((v, i) => p.map(transitionPosition, 0, 1,v, nextColor[i])) 
                   p.fill(...mapped)

                    barheight = inOutSin(tri(timeLoop(totalFrames, i * totalFrames)) / 0.5) * thisSize;

                    const x = left + (i * spaceX)
                    const y = (top + centerRatio*spaceY) - (barheight - diameter/2)
                    const w = barheight

                    p.rect(x,y,w);
                }
            }
        }


        for (let i = 0; i < 1; i += 1 / nCirclesPerRow) createRow(i)

        // // Checks
        // p.line(left, height / 2, right, height / 2) // Center Y
        // p.rect(padding, padding, width - 2*padding, height - 2*padding)
        // p.line(left, top, left, bottom)
        // p.line(right, top, right, bottom)

        // const nCircles = 50
        // const movementRadius = 100
        // const circleRadius = 2.25*movementRadius
        // const opacityMultiplier = .1


        // const opacityCondition = 10

        // const divergence = Date.now() * 2*Math.PI
        // console.log(divergence)

        // for (let i = 0; i < nCircles; i++) {
        //     let opacity = opacityMultiplier*p.map(i % opacityCondition, 0, opacityCondition, 0, 255);
        //     p.noStroke();
        //     p.fill(230, 250, 90, opacity);

        //     // const frameInput = 10*Math.sin(p.frameCount) // Shake the thing
        //     const frameInput = 0.2 * p.frameCount 
 

        //     const input = frameInput / ((divergence*i)) // get back to zero?
        //     const sinVal = Math.sin(input) // Get back to zero
        //     const cosVal = Math.cos(input) // get back to one

        //     const xOff = movementRadius * sinVal
        //     const yOff = movementRadius * cosVal

        //     p.circle(
        //         xOff + width / 2,
        //         yOff + height / 2,
        //         circleRadius
        //     );
        //   }
           
    }

};

new p5(sketch);

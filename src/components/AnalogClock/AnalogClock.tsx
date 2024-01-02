import Canvas from "../Canvas";
import './AnalogClock.css'
import { useEffect, useState } from "react";

type Props = {
    width: string,
    screenSize: {
        width: number,
        height: number
    }
}

const AnalogClock = ({ width, screenSize }: Props) => {

    const [containerSize, setContainerSize] = useState({width: 0, height: 0})

    var intervalID: number

    useEffect(() => {
        if(screenSize){
            if(screenSize.width < 1100){
                if(screenSize.width < screenSize.height){
                    setContainerSize({
                        width: screenSize.width,
                        height: screenSize.width
                    })
                }else{
                    setContainerSize({
                        width: screenSize.width,
                        height: screenSize.height
                    })
                }
            }else{               
                setContainerSize({
                    width: screenSize.width,
                    height: screenSize.height
                })
            }
        }
    }, [screenSize])

    const hand = (context: CanvasRenderingContext2D, pos: number, length: number, width: number, color: string)  => {
        context.beginPath()
        context.lineWidth = width
        context.lineCap = "round"
        context.moveTo(0,0)
        context.rotate(pos)
        context.lineTo(0, -length)
        context.strokeStyle = color
        context.stroke()
        context.rotate(-pos)
    }

    const timer = (context: CanvasRenderingContext2D, radius: number) => {
        const currentDate = new Date()
        const second = currentDate.getSeconds()
        const minute = currentDate.getMinutes()
        const hour = currentDate.getHours() % 12
        const hourHandPos = ((hour * 30) * Math.PI / 180) + ((minute * 0.5) * Math.PI/180)
        const minuteHandPos = (minute * 6) * Math.PI / 180
        const secondHandPos = (second * 6) * Math.PI / 180
        hand(context ,hourHandPos, radius * 0.58, radius * 0.04, "rgba(0,0,0,0.7)")
        hand(context, minuteHandPos, radius * 0.7, radius * 0.02, "rgba(0,0,0,0.7)")
        hand(context, secondHandPos, radius * 0.85, radius * 0.008, "red")
        centerPoint(context, radius, "red")
    }

    const centerPoint = (context: CanvasRenderingContext2D, radius: number, color: string) => {
        context.beginPath()
        context.arc(0, 0, radius * 0.015, 0, 2 * Math.PI)
        context.fillStyle = color
        context.fill()
    }
    
    const draw = (context: CanvasRenderingContext2D) => {
        let radius = context.canvas.width / 2
        context.clearRect(-radius, -radius, radius, radius)
        const main = () => {
            radius = context.canvas.width / 2
            context.clearRect(-(context.canvas.width / 2), -(context.canvas.width / 2), context.canvas.width, context.canvas.width)
            context.translate(radius, radius)
            radius = radius * 0.93
            context.arc(0, 0, radius, 0 , 2 * Math.PI)
            context.fillStyle = "white"
            context.fill()
            context.font =  radius * 0.17 + "px arial"
            context.fillStyle = "rgba(0,0,0,0.55)"
            context.textBaseline = "middle"
            context.textAlign = "center"
            const currentHour = new Date().getHours() % 12
            
            for(let number = 1; number <= 12; number++){
                if(currentHour == number || (currentHour == 0 && number == 12)){
                    context.fillStyle = "rgba(0, 136, 255, 1)"
                }else{
                    context.fillStyle = "rgba(0,0,0,0.55)"
                }
                const rotationAng = (number * 30) * Math.PI / 180
                context.rotate(rotationAng)
                context.translate(0, -radius * 0.9)
                context.rotate(-rotationAng)
                context.fillText(number.toString(), 0, 0)
                context.rotate(rotationAng)
                context.translate(0, radius * 0.9)
                context.rotate(-rotationAng)
    
            }
    
            context.beginPath()
            context.arc(0, 0, radius * 0.07, 0, 2 * Math.PI)
            context.fillStyle = 'black'
            context.fill()
            context.closePath()
    
            for(let markingCounter = 1; markingCounter <= 60; markingCounter++){
                const rotationAngle = (markingCounter * 6) * Math.PI / 180
                context.rotate(rotationAngle)
                context.translate(0, -radius * 0.7)
                if(markingCounter % 5 == 0){
                    context.font = radius * 0.1 + "px arial"
                    context.textBaseline = "middle"
                    context.textAlign = "center"
                    context.fillStyle = "rgba(0, 0, 0, 0.4)"
                    context.fillText("|", 0, 0)
                }else{
                    context.font = radius * 0.05 + "px arial"
                    context.textBaseline = "middle"
                    context.textAlign = "center"
                    context.fillStyle = "rgba(0, 0, 0, 0.3)"
                    context.fillText("|", 0, 0)
                }
                context.translate(0, radius * 0.7)
                context.rotate(-rotationAngle)
            }
    
            timer(context, radius)
            radius = context.canvas.width / 2
            context.translate(-radius, -radius)
        }
        intervalID = setInterval(() => {
            main()
        }, 1000)
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalID)
        }
    }, [screenSize])

    const drawFrame = (context: CanvasRenderingContext2D) => {
        let radius = context.canvas.width / 2
        context.clearRect(-(context.canvas.width / 2), -(context.canvas.width / 2), context.canvas.width, context.canvas.width)
        context.translate(radius, radius)
        
        context.arc(0, 0, radius, 0, 2 * Math.PI)
        const gradient = context.createRadialGradient(0, 0, radius * 0.9, 0, 0, radius)
        gradient.addColorStop(0, "#edebeb")
        gradient.addColorStop(0.5, "#edebeb")
        gradient.addColorStop(0.65, "#edebeb")
        gradient.addColorStop(0.85, "#bababa")
        gradient.addColorStop(1, "#bababa")
        context.fillStyle = gradient
        context.fill()        
        context.translate(-radius, -radius)
    }

    return(
        <div id="analogContainer" style={{ width: width, height: containerSize.height }}>
            <Canvas screenSize={screenSize} draw={drawFrame} zIndex={1} />
            <Canvas screenSize={screenSize} draw={draw} zIndex={2} />
        </div>
    )
}

export default AnalogClock;
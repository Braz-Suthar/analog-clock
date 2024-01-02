import { useEffect, useLayoutEffect, useRef, useState } from "react";
import './Canvas.css'

type Props = {
    screenSize: {
        width: number;
        height: number
    },
    draw: any,
    zIndex: number
}

const Canvas = ({ screenSize, draw, zIndex }: Props) => {

    const [canvasSize, setCanvasSize] = useState({width: 0, height: 0})

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        context?.clearRect(-(context.canvas.width / 2), -(context.canvas.width / 2), context.canvas.width, context.canvas.width)
    }, [screenSize])
    
    useEffect(() => {
        if(screenSize){
            if(screenSize.width < 1100){
                if(screenSize.width < screenSize.height){
                    setCanvasSize({
                        width: screenSize.width * 0.95,
                        height: screenSize.width * 0.95
                    })
                }else{
                    setCanvasSize({
                        width: screenSize.height * 0.95,
                        height: screenSize.height * 0.95
                    })
                }
            }else{
                setCanvasSize({
                    width: screenSize.height * 0.9,
                    height: screenSize.height * 0.9
                })
            }
        }
    }, [screenSize, draw])


    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        draw(context)
    }, [draw])
    

    return(
            <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: zIndex }} width={canvasSize.width} height={canvasSize.height}></canvas>
    )
}

export default Canvas;
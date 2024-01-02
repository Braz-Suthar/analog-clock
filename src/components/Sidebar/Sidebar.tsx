import { useRef } from 'react'
import './Sidebar.css'
import {
    HTML,
    CSS,
    JS,
    FB,
    NJS,
    RJS,
    MUI,
    LOVE,
    TICK_SOUND,
    SOUND_OFF,
    SOUND_ON
}  from './../../utility/images'

type Props = {
    width: string,
    height: string
}

const Sidebar = ({ width, height }: Props) => {

    const audioRef = useRef<HTMLAudioElement>(null)

    const playSound = () => {
        audioRef?.current?.play()
    }
    
    const pauseSound = () => {
        audioRef?.current?.pause()
    }

    return(
        <div className='sidebar' style={{ width: width, height: height }}>
            <div className="container">
                <div className="inner-container">
                    <div className='sound-container'>
                        <button onClick={playSound}>
                            <img src={SOUND_ON} width={30} height={30} style={{ padding: 10, margin: 0 }}/>
                        </button>
                        <button onClick={pauseSound}>
                            <img src={SOUND_OFF} width={30} height={30} style={{ padding: 10, margin: 0 }}/>
                        </button>
                        <audio style={{ visibility: 'hidden' }} controls src={TICK_SOUND} autoPlay={true} onEnded={() => audioRef?.current?.play()} ref={audioRef} />
                    </div>
                    <h1 style={{ textAlign: 'center', color: 'rgb(0, 136, 255)', marginTop: '10px' }}>Analog Clock</h1>
                    <p className='desc'>This is a fully functional analog clock created using HTML5, HTML5 Canvas, Vanilla Javascript, React JS, CSS, React MUI and Firebase for hosting.</p>
                    <div className="icon-container">
                        <img src={HTML} width={50} height={50} />
                        <img src={CSS} width={50} height={50} />
                        <img src={JS} width={50} height={50} />
                        <img src={FB} width={50} height={50} />
                        <img src={NJS} width={50} height={50} />
                        <img src={RJS} width={50} height={50} />
                        <img src={MUI} width={50} height={50} />
                    </div>
                    <div className="dev-info">
                        <img src={LOVE} width={50} height={50} />
                        <p>Design and Developed by <span style={{ color: 'rgb(222, 247, 255)' }}><b>Braz Suthar</b></span></p>
                        <span>For more, visit <a href='https://brazsuthar.in' style={{ color: 'rgb(0, 195, 255)' }}>https://www.brazsuthar.in</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
import './App.css'
import AnalogClock from './AnalogClock'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react';

function App() {

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  	function getCurrentDimension(){
    	return {
      		width: window.innerWidth,
      		height: window.innerHeight
    	}
  	}
  
  	useEffect(() => {
    		const updateDimension = () => {
      			setScreenSize(getCurrentDimension())
    		}
    		window.addEventListener('resize', updateDimension);
		
    		return(() => {
        		window.removeEventListener('resize', updateDimension);
    		})
  	}, [screenSize])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '100%', height: '100%' }}>
        <AnalogClock screenSize={screenSize} width={screenSize.width < 1100 ? '100%' : '70%' } />
        <Sidebar width={screenSize.width < 1100 ? '100%' : '30%'} height={screenSize.width < 1100 ? 'auto' : '100vh'} />
    </div>
  )
}

export default App

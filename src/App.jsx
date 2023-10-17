import CaptureVideo from './components/CaptureVideo/CaptureVideo'
import TrainingDataTable from './components/TrainingDataTable/TrainingDataTable'
import NavBar from './components/NavBar/NavBar'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'

const App = () => {
    return (
      <Provider store={store}>  
      <NavBar />
      <div className='container max-w-screen-xl h-screen flex flex-row'>
         <CaptureVideo />
        <TrainingDataTable />

      </div>
    </Provider>
    )
  }






  export default App
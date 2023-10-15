import CaptureVideo from './components/CaptureVideo/CaptureVideo'
import TrainingDataTable from './components/TrainingDataTable/TrainingDataTable'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
    return (
      <Provider store={store}>  
      <div className="container">
        <CaptureVideo />
        <TrainingDataTable />
        
      </div>
    </Provider>
    )
  }

  export default App
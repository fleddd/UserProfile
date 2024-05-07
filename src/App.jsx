import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header'



function App() {

  return (
    <>
            <Header/>
            <ToastContainer
              autoClose={5000}
              pauseOnFocusLoss= {false}
            />
            
    </>
  )
}

export default App

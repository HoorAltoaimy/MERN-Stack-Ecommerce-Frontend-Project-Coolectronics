import Index from './routes/Index'
import { ToastContainer, toast } from 'react-toastify'

function App() {

  return (
    <div className="App">
      <Index />
      <ToastContainer limit={1} autoClose={3000} position={toast.POSITION.TOP_LEFT} />
    </div>
  )
}

export default App

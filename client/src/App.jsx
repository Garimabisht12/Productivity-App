import './App.css';
import AppRouter from "./routes/AppRoutes";
import { BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <>
    <BrowserRouter>
    
      <AppRouter />
    </BrowserRouter>
    </>
  )
}

export default App

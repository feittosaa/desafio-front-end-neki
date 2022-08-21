import MainRoutes from "./Routes";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <div className="App">
      <MainRoutes />
    </div>
  );
}

export default App;

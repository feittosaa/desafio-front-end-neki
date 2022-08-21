import MainRoutes from "./Routes";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <MainRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;

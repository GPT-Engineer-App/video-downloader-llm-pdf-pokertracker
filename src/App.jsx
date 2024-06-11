import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Index from "./pages/Index.jsx";
import FramesPage from "./pages/FramesPage.jsx";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/frames" element={<FramesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

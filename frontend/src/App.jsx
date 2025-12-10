
import './App.css'
import {BrowserRouter as Router, Routes, Route, createBrowserRouter} from "react-router-dom";
import StoryLoader from "./components/StoryLoader.jsx";
import StoryGenerator from "./components/StoryGenerator.jsx";
function App() {


  return (
    <Router>
    <div className="app-container">
        <header>
            <h1>adventure ai</h1>
        </header>
        <main>
            <Routes>
                <Route path={"/story/:id"} element={<StoryLoader />} />
                <Route path={"/"} element={<StoryGenerator />}></Route>
            </Routes>
        </main>
    </div>
    </Router>
  )
}

export default App

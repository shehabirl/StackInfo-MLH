import NavigationBar from "./components/NavigationBar/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <NavigationBar />
      <Routes>
        {/*routes any url to home page for now */}
        <Route path="/*" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/search" element={<Search/>}/>
        {/*<Route path="/moderator" component={ModeratorView} />*/}
        {/* <Route path="/auth" component={AuthenticationView} /> */}
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;

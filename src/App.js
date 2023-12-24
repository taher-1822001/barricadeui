import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login'
import Home from './components/home';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkTheme: false,
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      isDarkTheme: !prevState.isDarkTheme,
    }));
  };

  componentDidMount() {
    // Set the initial theme when the component mounts
    this.updateBodyClass();
  }

  componentDidUpdate() {
    // Update the theme when it changes
    this.updateBodyClass();
  }

  updateBodyClass() {
    // Add or remove 'dark-theme' class to the body based on the theme state
    document.body.classList.toggle('dark-theme', this.state.isDarkTheme);
  }
  render()
  {
    
    
  return (
    <div className="app" >
     
      <Router>
  <Routes>
    <Route exact path="/" element={<LoginForm />} />
    <Route exact  path="/home" element={<Home />} />
  

  </Routes>
</Router>
     
    </div>
  );
}
}

export default App;

import React, { Component } from 'react'
import Navbar from './Component/Navbar'
import News from './Component/News'
import PropTypes from 'prop-types'
import Aboutus from './Component/Aboutus'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import './App.css'
export default class App extends Component {
  // state={
  static defaultProps = {
    pageSize: 6,
    country: "us",
    category: "science"
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string

  }

  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      apiKey:process.env.REACT_APP_API_KEY,
      progress: 0


    }
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }
  // business
  // entertainment
  // general
  // health
  // science
  // sports
  // technology


  

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    const { isDarkMode } = this.state;
    const themeClass = isDarkMode ? "dark-mode" : 'light-mode';
    return (
      <>
        <Router>
          <div className={`app ${themeClass}`}>

            <Navbar toggleMode={this.toggleDarkMode} />
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            />
            <Routes>
              <Route path='/' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="general" pageSize={6} country={"in"} category={"general"} />} />
              <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="entertainment" pageSize={6} country={"in"} category={"entertainment"} />} />
              <Route path='/business' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="business" pageSize={6} country={"in"} category={"business"} />} />
              <Route path='/health' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="health" pageSize={6} country={"in"} category={"health"} />} />
              <Route path='/science' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="science" pageSize={6} country={"in"} category={"science"} />} />
              <Route path='/sports' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="sports" pageSize={6} country={"in"} category={"sports"} />} />
              <Route path='/technology' element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey } key="technology" pageSize={6} country={"in"} category={"technology"} />} />
              <Route path='/Aboutus' element={<Aboutus key="Aboutus" pageSize={6} country={"in"} category={"Aboutus"} />} />

            </Routes>
          </div>



        </Router>

        {/* <News setProgress = {this.setProgress}Item/> */}
        {/* <Lodar /> */}

      </>
    )
  }
}

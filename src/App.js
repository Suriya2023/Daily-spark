import React, { Component } from 'react'
import Navbar from './Component/Navbar'
import News from './Component/News'
// import Lodar from './Component/lodar'
import './App.css'
// import NewsItem from './Component/NewsItem'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={6} />
        {/* <NewsItem/> */}
        {/* <Lodar /> */}

      </div>
    )
  }
}

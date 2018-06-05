import React, { Component } from 'react'
// import s from './App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import '../../node_modules/purecss/build/pure-min.css'
import '../css/layouts/side-menu.css'
import Menu from '../components/menu/Menu'

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <Router>
        <div id="layout">
          <Menu/>

          <div id="main">
            {this.props.children}
          </div>

        </div>
      </Router>
    )
  }

}

export default App

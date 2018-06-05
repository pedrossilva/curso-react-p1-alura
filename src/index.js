import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from "./app/App"
import AutorBox from './components/autor/AutorBox'
import Home from './components/home/Home'
import LivroBox from './components/livro/LivroBox'

const template = (
  <Router>
    <App>
      <Route exact={true} path="/" component={Home}/>
      <Route path="/autor" component={AutorBox}/>
      <Route path="/livro" component={LivroBox}/>
    </App>
  </Router>
)
ReactDOM.render(template, document.getElementById("root"))

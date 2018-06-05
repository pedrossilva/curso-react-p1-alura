import React, { Component } from 'react'
import ErrorBoundary from '../error/ErrorBoundary'
import LivroForm from './LivroForm'
import Livros from './Livros'
import ax from 'axios'
const axios = ax.create()

class LivroBox extends Component {

  constructor() {
    super()
    this.state = {
      livros: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/livros')
      .then(response => this.setState({livros: response.data}))
      .catch(error => console.error(error));
  }

  render(){
    return (
      <div>
        <div className="header">
          <h1>Cadastro de livros</h1>
        </div>
        <div className="content" id="content">

          <ErrorBoundary>
            <LivroForm/>
          </ErrorBoundary>
          <ErrorBoundary>
            <Livros list={this.state.livros} />
          </ErrorBoundary>

        </div>
      </div>
    );
  }
}

export default LivroBox

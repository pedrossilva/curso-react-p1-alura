import React, { Component } from 'react'
import ErrorBoundary from '../error/ErrorBoundary'
import AutorForm from './AutorForm'
import Autores from './Autores'
import ax from 'axios'
const axios = ax.create()
import PubSub from 'pubsub-js'

class AutorBox extends Component {

  constructor() {
    super()
    this.state = {list: []}

  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/autores')
      .then(response => this.setState({list: response.data}))
      .catch(error => console.error(error));

    PubSub.subscribe('lista-autores', ((topic, autores) => this.setState({list:autores})).bind(this))
  }

  componentWillUnmount() {
    PubSub.unsubscribe('lista-autores')
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <ErrorBoundary>
            <AutorForm/>
          </ErrorBoundary>
          <ErrorBoundary>
            <Autores list={this.state.list} />
          </ErrorBoundary>
        </div>
      </div>
    )
  }

}

export default AutorBox

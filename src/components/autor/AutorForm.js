import React, { Component } from 'react'
import ErrorBoundary from '../error/ErrorBoundary'
import Input from '../form/Input'
import ax from 'axios'
const axios = ax.create()
import PubSub from 'pubsub-js'
import ErrorHandle from '../error/ErrorHandle'

class AutorForm extends Component {

  constructor() {
    super()
    this.stateDefault = {
      nome: '',
      email: '',
      senha: ''
    }
    this.state = Object.assign({}, this.stateDefault)

    this.handleChange = this.handleChange.bind(this)
    this.save = this.save.bind(this)
  }

  handleChange(event) {
    const tg = event.target
    this.setState({[tg.name]: tg.value})

    const change = this.props.change
    if(change) {
      change(this.state)
    }
  }

  save(e) {
    e.preventDefault()

    axios.interceptors.request.use(config => {
      PubSub.publish('clear-errors', {})
      return config
    })

    axios.post('http://localhost:8080/api/autores', this.state)
      .then(response => {
        PubSub.publish('lista-autores', response.data)
        this.setState(this.stateDefault)
      })
      .catch(error => {
        const res = error.response
        if(res.status === 400) {
          // const errors = (res.data.errors || []).reduce((va, e) => {
          //   va[e.field] = e
          //   return va
          // }, {})
          // const errors = (res.data.errors || []).map(e => [e.field]:e)
          // this.setState({_errors: errors})
          new ErrorHandle().publish(res.data)
          // console.log('STATE ERRORS', this.state._errors)
        }
        // console.log('ERROR', error.response)
        // console.log('ERROR', Object.keys(error))
      });
  }

  // checkProps() {
  //   const propError = k => { throw new Error('undefined prop "'+k+'"') }
  //   ['listUpdate'].forEach(k => this.props[k] || propError(k))
  // }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <ErrorBoundary>
          <form className="pure-form pure-form-aligned" name="form" onSubmit={this.save} method="post">
            <Input label="Nome" id="nome" type="text" name="nome" value={this.state.nome}
                   onChange={this.handleChange}></Input>

            <Input label="E-mail" id="email" type="email" name="email" value={this.state.email}
                   onChange={this.handleChange}></Input>

            <Input label="Senha" id="senha" type="password" name="senha" value={this.state.senha}
                   onChange={this.handleChange}></Input>

            <div className="pure-control-group">
              <label></label>
              <button type="submit" className="pure-button pure-button-primary">Gravar</button>
            </div>
          </form>
        </ErrorBoundary>

      </div>
    )
  }

}

export default AutorForm

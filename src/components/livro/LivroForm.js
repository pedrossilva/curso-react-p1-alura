import React, { Component } from 'react'
import ErrorHandle from '../error/ErrorHandle'
import PubSub from 'pubsub-js'
import ErrorBoundary from '../error/ErrorBoundary'
import Input from '../form/Input'
import ax from 'axios'
const axios = ax.create()

class LivroForm extends Component {

  constructor() {
    super()
    this.stateDefault = {
      form: {
        titulo: '',
        autorId: '',
        preco: ''
      },
      autores: []
    }
    this.state = Object.assign({}, this.stateDefault)

    this.handleChange = this.handleChange.bind(this)
    this.save = this.save.bind(this)
  }

  handleChange(event) {
    const tg = event.target
    const form = Object.assign(this.state.form, {[tg.name]: tg.value})
    this.setState({form: form})

    const change = this.props.change
    if(change) change(this.state)
  }

  save(e) {
    e.preventDefault()

    axios.interceptors.request.use(config => {
      PubSub.publish('clear-errors', {})
      return config
    })

    axios.post('http://localhost:8080/api/livros', this.state.form)
      .then(response => {
        PubSub.publish('lista-livros', response.data)
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

  componentDidMount() {
    axios.get('http://localhost:8080/api/autores')
      .then(response => this.setState({autores: response.data}))
      .catch(error => console.error(error));
  }

  render() {
    const form = this.state.form;

    return (
      <div className="pure-form pure-form-aligned">
        <ErrorBoundary>
          <form className="pure-form pure-form-aligned" name="form" onSubmit={this.save} method="post">
            <Input label="Título" id="titulo" type="text" name="titulo" value={form.titulo}
                   onChange={this.handleChange}></Input>

            <Input label="Autor" id="autorId" type="select" name="autorId" value={form.autorId}
                   selectList={this.state.autores} onChange={this.handleChange}></Input>

            <Input label="Preço" id="preco" type="text" name="preco" value={form.preco}
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

export default LivroForm

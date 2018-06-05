import React, { Component } from 'react'
import PubSub from 'pubsub-js'

class Input extends Component {

  constructor() {
    super()
    this.state = {msgError: ''}
  }

  componentDidMount() {
    PubSub.subscribe('validation-error', (topic, error) => {
      if(error.field === this.props.name) this.setState({msgError: error.defaultMessage})
    })
    PubSub.subscribe('clear-errors', () => {
      this.setState({msgError: ''})
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('validation-error')
    PubSub.unsubscribe('clear-errors')
  }
  render() {

    const val = (v, params) => (typeof v === 'function') ? v(...(params || [])) : v;
    const {label, id, name, type, onChange} = this.props
    const value = val(this.props.value, [name])
    const selectList = val(this.props.selectList)

    let template = '';

    switch (type) {
      case 'select':
        template = (
          <select id={id} name={name} value={value} onChange={onChange}>
            <option value="" disabled={true}></option>
            {(selectList || []).map(item => (
              <option key={item.id} value={item.id}>{item.nome}</option>
            ))}
          </select>
        )
        break
      default:
        template = (
          <input id={id} type="text" name={name} value={value} onChange={onChange} />
        )
    }

    return (
      <div className="pure-control-group">
        <label htmlFor={id}>{label}</label>
        {template}
        <span className="error">{this.state.msgError}</span>
      </div>
    )

  }

}

export default Input

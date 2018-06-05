import React, { Component } from 'react'

class Autores extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const propError = k => { throw new Error('undefined prop "'+k+'"') }
    const list = this.props.list || propError('list')

    return list.length ? (
      <table className="pure-table">
        <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
        </tr>
        </thead>
        <tbody>
        {
          list.sort((a, b) => b.id - a.id).map(autor => (
            <tr key={autor.id}>
              <td>{autor.nome}</td>
              <td>{autor.email}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    ) : null
  }
}

export default Autores
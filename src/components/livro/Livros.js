import React, { Component } from 'react'

class Livros extends Component {

  constructor() {
    super()
  }

  render() {

    const propError = k => { throw new Error('undefined prop "'+k+'"') }
    const list = this.props.list || propError('list')

    return list.length ? (
      <table className="pure-table">
        <thead>
        <tr>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Preco</th>
        </tr>
        </thead>
        <tbody>
        {
          list.sort((a, b) => b.id - a.id).map(livro => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor.nome}</td>
              <td>{livro.preco}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    ) : null

  }
}

export default Livros

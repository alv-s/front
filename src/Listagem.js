import axios from "axios";
import React, { 
  useState, 
  useEffect 
} from 'react'

import { 
  Table 
} from 'react-bootstrap';

import { 
  Link 
} from 'react-router-dom';


function Listagem() {
    // Cria o estado pessoas
    const [pessoas, setPessoas] = useState([])

    // Função para atualizar a listagem
    const updatePessoa = () => {
      axios.get("http://localhost:8080/pessoa")
      .then((res) => {
        let data = res.data
        
        // Caso não tenha nenhuma pessoa cadastrada
        if (data.length == 0) {
          data = [{id: 0, nome: "Nenhum registro encontrado", email: "", idade: ""}]
        }

        setPessoas(data)

      }, (error) => {
        console.log(error)
        alert("Erro ao listar as pessoas")
      })
    }

    // Atualiza a listagem assim que a página é carregada
    useEffect(() => {
      updatePessoa()
    }, [])

    // Função para deletar uma pessoa
    const deletePessoa = (id) => {
      axios.delete("http://localhost:8080/pessoa/" + id)
      .then((res) => {
        alert("Pessoa deletada com sucesso")
        updatePessoa()
      }, (error) => {
        alert("Erro ao deletar pessoa")
      })
    } 

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='center'>Id</th>
            <th className='center'>Nome</th>
            <th className='center'>Email</th>
            <th className='center'>Idade</th>
            <th className='center'>Opções</th>
          </tr>
        </thead>

        <tbody >
            {pessoas.map((user, index) => (
                <tr key={index} style={{textAlign: "center"}}>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.idade}</td>

                    {/* Não mostrar os botões caso não tenha nenhuma pessoa */}
                    {(user.id != 0) ?
                      <div style={{display: "flex"}}>
                        <Link className='button-edit' style={{borderRadius: "10px", marginRight: "5px"}} to={'edit/' + user.id}>Editar</Link>
                        <Link className='button-edit' style={{borderRadius: "10px"}} to='/' onClick={() => { deletePessoa(user.id) }}>Deletar</Link>
                      </div>
                    : null
                    }
                </tr>
            ))}
        </tbody>
      </Table>
    )
}

export default Listagem
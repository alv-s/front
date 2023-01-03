import axios from "axios";

import React, { 
    useState, 
    useEffect 
} from 'react'

import { 
    Form, 
    Button, 
    Container 
} from 'react-bootstrap';

import { 
    Link,
    useNavigate, 
    useParams 
} from 'react-router-dom';

function Edicao() {

    // Cria o estado para nome, email e idade
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [idade, setIdade] = useState("")

    // Navegação entre páginas
    const navigate = useNavigate();

    // Pega o id da pessoa
    let { id } = useParams();

    useEffect(() => {

        axios.get("http://localhost:8080/pessoa/" + id).
        then((res) => {
            setNome(res.data.nome)
            setEmail(res.data.email)
            setIdade(res.data.idade)
        }, (error) => {
            if (error.response.status == 404) {
                alert("Pessoa não encontrada")
            } else {
                alert("Erro ao buscar pessoa")
            }
        })

    }, [])

    const submit = () => {

        // Validação dos campos
        if (nome == "" || email == "" || idade == "") {
            alert("Preencha todos os campos")
            return
        }

        axios.put("http://localhost:8080/pessoa/" + id, {
            email: email.trim(),
            nome: nome.trim(),
            idade: idade
        }).then((res) => {
            alert("Pessoa editada com sucesso")
            navigate("/");
        }, (error) => {
            if (error.response.status == 400 || error.response.status == 401) {
                alert(error.response.data.message)
            } else {
                alert("Erro ao cadastrar pessoa")
            }
        })
    }
      
    return (
        <div style={{
            marginTop: "40px",
            marginLeft: "10em",
            marginRight: "10em",
            paddingBottom: "5em",
            paddingTop: "3em",
            border: "3px solid black",
            borderRadius: "3em"
        }}>

            <Container>
                <h1 style={{textAlign: "center"}}>Edição</h1>
                <Form className='container mt-3 mb-3'>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Digite um nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        style={{borderRadius: "10px"}}
                        />
                    </Form.Group>

                    <Form.Group style={{marginTop: "20px"}} className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Digite o email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{borderRadius: "10px"}}
                        />
                    </Form.Group>

                    <Form.Group style={{marginTop: "20px"}} className="mb-3" controlId="idade">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Digite a idade" 
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                            style={{borderRadius: "10px"}}
                        />
                    </Form.Group>
                    
                    <div className="buttons">
                        <Button style={{width: "15%", padding: "10px", background: "green", borderRadius: "10px"}} className="border" variant="primary" onClick={submit}>Editar</Button>
                        <Button style={{width: "15%", padding: "10px", background: "red", borderRadius: "10px"}} className="border" variant="warning" ><Link to="/" style={{color: "white"}}>Voltar</Link> </Button>
                    </div>
                </Form>
                </Container>
        </div>

    )
}

export default Edicao
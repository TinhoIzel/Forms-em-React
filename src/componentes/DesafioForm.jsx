import { useState } from "react"

function FormDesafio() {

    const [ usuario , setUsuario ] = useState({
        nome: '',
        email: '',
        senha: '',
        senha2: ''
    })

    const [ erros, setErros ] = useState({
        erroNome: false,
        erroEmail: false,
        erroSenha: false,
        erroSenha2: false
    })


    // resetar hook das validacoes
    // dava pra fazer de outras formas...
    // deixar mais enxuto...
    const resetarValidacoes = () => {
        setErros(({
            erroNome: false,
            erroEmail: false,
            erroSenha: false,
            erroSenha2: false
        }))
    }

    // validar nome:
    // sem numeros, pelo menos 2 palavras
    // pelo que eu vi isso é o mais importante
    const validarNome = () => {
        const regex = /^[a-zA-Z\u00C0-\u00ff]{2,}(?: [a-zA-Z\u00C0-\u00ff]+){1,20}$/
        const resultado = usuario.nome.match(regex)

        resultado ? '' : 
            setErros(prevErros => ({
            ... prevErros,
            ["erroNome"]: true
        }))

        return resultado
    }

    // validar email:
    // não entendo ainda...
    // mas funciona!
    // e aprendi que email pode ter letra maiuscula
    // mas acontece que são 'case insensitive'
    const validarEmail = () => {
        const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
        const resultado = usuario.email.match(regex);

        resultado ? '' : 
            setErros(prevErros => ({
            ... prevErros,
            ["erroEmail"]: true
        }))

        return resultado
    }

    // validarSenha tudo ok!!
    const validarSenha = () => {

        // variavel de algum erro
        let valido = true
        
        // validacao do tamanho da senha
        if (usuario.senha.length < 8) {
            valido = false
            setErros(prevErros => ({
                ... prevErros,
                ["erroSenha"]: true
            }))
        }

        // validacao se as duas estão iguais 
        if (usuario.senha !== usuario.senha2) {        
            valido = false
            setErros(prevErros => ({
                ... prevErros,
                ["erroSenha2"]: true
            }))
        }

        // retornar se está valido ou não
        return valido
    }

    const mudanca = (event) => {
        // alterar variavel usuario pelo input
        const { name, value } = event.target

        setUsuario(prevUsuario => ({
            ... prevUsuario,
            [name]: value
        }))

    }

    const submitar = (event) => {
        // sem recarregar a pagina
        event.preventDefault()
        
        // resetar erros (forma centralizada)
        resetarValidacoes()
        
        // algo invalido
        let valido = true
        valido = validarNome() && valido
        valido = validarEmail() && valido
        valido = validarSenha() && valido

        valido ? alert("Tudo certo!!") : alert("Algo está inválido!!")
    }

    return (
        <form onSubmit={submitar}>
            <label>
                Nome: <br />
                <input type="text" name="nome" onChange={mudanca} />
                <br />{ erros.erroNome && <span>Nome inválido</span> }
            </label>

            <br />

            <label>
                Email: <br />
                <input type="text" name="email" onChange={mudanca} />
                <br />{ erros.erroEmail && <span>Email inválido</span> }
            </label>

            <br />

            <label>
                Senha: <br />
                <input type="password" name="senha" onChange={mudanca} />
                <br />{ erros.erroSenha && <span>Senha inválida (pelo menos 8 caracteres)</span> }
            </label>

            <br />

            <label>
                Confirmar senha: <br />
                <input type="password" name="senha2" onChange={mudanca} />
                <br />{ erros.erroSenha2 && <span>Senha inválida (as duas devem ser iguais)</span> }
            </label>

            <br />

            <input type="submit" value="Submitar" />
        </form>
    )
}

export default FormDesafio

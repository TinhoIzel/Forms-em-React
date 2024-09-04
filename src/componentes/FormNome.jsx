import { useState } from "react"


function FormNome() {
    
    // hook do nome
    const [nome, setNome] = useState('')

    // pra atualizar o hook constantemente
    const mudado = (event) => {
        setNome(event.target.value)
    }

    // quando der submit
    const submitado = (event) => {

        // não deixa a página atualizar
        event.preventDefault()
        alert(nome)
    }

    return (
        // forms continuam normais, nada diferente, só adiciona algumas coisas...
        // onSubmit: quando der submit kk
        <form onSubmit={submitado}>
            <label>Nome: <input type="text" value={nome} onChange={mudado}/></label>
            <button type="submit">Submitar</button>
        </form>
    )
}

export default FormNome
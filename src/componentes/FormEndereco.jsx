import { useState } from "react";


function FormEndereco() {
    
    const [endereco, setEndereco] = useState({
        rua: '',
        cidade: '',
        cep: ''
    })

    const submitar = (event) => {
        event.preventDefault()

        let valido = true
        for (let prop in endereco){

            if (!endereco[prop]){
                valido = false
                alert("O campo "+ prop +" está vazio!! Insira algo");
                break;
            }
        }

        if (valido) {
            alert(`Seu endereço é rua ${endereco.rua}, na cidadae ${endereco.cidade},
                com cep ${endereco.cep}`);   
        }
    }

    const mudanca = (event) => {

        // utilizando desestruturação:
        // objeto event.target...
        // pega só os valores nas propriedades...

        // coloca name em nome e value em valor
        const { name: nome, value: valor} = event.target
        
        setEndereco(prevEndereco =>
            // () é o mesmo que return
            ({
                // usando rest (... prevEndereco é ir pegando de propriedade em propriedade,
                // ou pra entrar dentro das propriedades do objeto, como no caso)
                // e o [name] é pegando somente a que eu quero pra fazer algo
                // tipo se fizesse prevEndereco[name]
                ... prevEndereco,
                [nome] : valor 
            })
        )
    }
    

    return (
        <form onSubmit={submitar}>
            <h2>Insira o endereço</h2>

            <label>Rua: 
                <input type="text" value={endereco.rua} name="rua" onChange={mudanca} />
            </label>

            <label>Cidade: 
                <input type="text" value={endereco.cidade} name="cidade" onChange={mudanca} />
            </label>

            <label>CEP: 
                <input type="text" value={endereco.cep} name="cep" onChange={mudanca} />
            </label>

            <input type="submit" value="Submitar" />
        </form>
    )
}

export default FormEndereco
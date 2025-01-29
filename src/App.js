import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'
function App () {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch () {
    if (input === '') {
      alert('Digite um cep para pesquisar')
    }

    try {
      const resp = await api.get(`${input}/json`)
      setCep(resp.data)
      setInput('')
    } catch (error) {
      alert('Ops.. digite um CEP válido')
      setInput('')
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador de cep</h1>

      <div className='containerInput'>
        <input
          type='text'
          placeholder='Digite o cep'
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button className='btn' onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento === '' ? 'Sem complemento' : cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}

      <footer className='footer'>Desenvolvido por Keillon</footer>
    </div>

  )
}

export default App

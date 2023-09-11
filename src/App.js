import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
import './styles.css'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ""){
      alert("digite algum cep");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    }
    catch{
      alert("ERRO");
    }
    finally{
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">App buscador</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>cep: {cep.cep}</h2>

          <span>rua: {cep.logradouro}</span>
          <span>complemento: {cep.complemento}</span>
          <span>bairro: {cep.bairro}</span>
          <span>cidade: {cep.localidade}</span>
          <span>estado: {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css'; 

function App() {
  const [pais, setPais] = useState('italy');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const buscarDados = () => {
    setCarregando(true);
    setErro(null);
    fetch(`https://disease.sh/v3/covid-19/countries/${pais}`)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar dados do país');
        return response.json();
      })
      .then(data => {
        setDados(data);
        setCarregando(false);
      })
      .catch(err => {
        setErro(err.message);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarDados();
  }, [pais]);

  return (
    <div className="app-container">
      
      
      {dados && (
        <div className="header-container">
          <img src={dados.countryInfo.flag} alt="Bandeira" className="flag-img" />
          <h1 className="main-title">PAINEL INTERATIVO COVID-19 ({dados.country})</h1>
        </div>
      )}

     
      <div className="controls-bar">
        <label>Selecione o País:</label>
        <select value={pais} onChange={(e) => setPais(e.target.value)} className="select-country">
          <option value="italy">🇮🇹 Itália</option>
          <option value="brazil">🇧🇷 Brasil</option>
          <option value="portugal">🇵🇹 Portugal</option>
          <option value="usa">🇺🇸 Estados Unidos</option>
          <option value="spain">🇪🇸 Espanha</option>
        </select>

        <button onClick={buscarDados} disabled={carregando} className="btn-update">
          {carregando ? ' Atualizando...' : '🔄 ATUALIZAR DADOS'}
        </button>
      </div>
      
      {erro && <div className="error-msg">Erro: {erro}</div>}

      {carregando && !dados && <p className="loading-txt">Buscando dados na rede...</p>}

      
      {dados && !carregando && (
        <div className="cards-grid">
          
         
          <div className="card card-blue">
            <span className="card-title">🌍 População Total</span>
            <h2 className="card-value">{dados.population.toLocaleString()}</h2>
          </div>

        
          <div className="card card-yellow">
            <span className="card-title">📌 Casos Confirmados</span>
            <h2 className="card-value">{dados.cases.toLocaleString()}</h2>
            <span className="card-sub" style={{ color: '#eab308' }}>↑ +{dados.todayCases.toLocaleString()} hoje</span>
          </div>

          
          <div className="card card-red">
            <span className="card-title">💀 Total de Mortes</span>
            <h2 className="card-value">{dados.deaths.toLocaleString()}</h2>
            <span className="card-sub" style={{ color: '#ef4444' }}>↑ +{dados.todayDeaths.toLocaleString()} hoje</span>
          </div>

       
          <div className="card card-green">
            <span className="card-title">🟢 Recuperados</span>
            <h2 className="card-value">{dados.recovered.toLocaleString()}</h2>
            <span className="card-sub" style={{ color: '#22c55e' }}>Dados oficiais da OMS</span>
          </div>

          
          <div className="card card-purple">
            <span className="card-title">🧪 Testes Realizados</span>
            <h2 className="card-value">{dados.tests.toLocaleString()}</h2>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
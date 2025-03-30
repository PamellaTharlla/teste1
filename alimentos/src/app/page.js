
'use client';
import { useState } from 'react';
import { getByName, getById } from '../services/api';
import './globals.css';

export default function App() {
  const [filtro, setFiltro] = useState('');
  const [tipoBusca, setTipoBusca] = useState('nome');
  const [alimentos, setAlimentos] = useState([]);

  const buscarAlimentos = async (e) => {
    e.preventDefault();

    let response;
    if (tipoBusca === 'nome') {
      response = await getByName(filtro); 
    } else {
      response = await getById(filtro); 
    }

    const dados = Array.isArray(response.data) ? response.data : [response.data];
    setAlimentos(dados); 
  };

  return (
    <div className="container">
      <h1 className="titulo-principal">ALIMENTOS</h1>

      <div className="conteudo">
        <h2 className="titulo-secundario">CATÁLOGO</h2>

        <form onSubmit={buscarAlimentos} className="formulario-busca">
          <select
            value={tipoBusca}
            onChange={(e) => setTipoBusca(e.target.value)}
            className="select-busca"
          >
            <option value="nome">Nome</option>
            <option value="id">ID</option>
          </select>

          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder={tipoBusca === 'nome' ? 'Pesquisar por nome' : 'Pesquisar por ID'}
            className="input-busca"
            required
          />

          <button type="submit" className="botao-busca">
            Buscar
          </button>
        </form>

        <div className="grid-cards">
          {alimentos.length > 0 ? (
            alimentos.map((alimento) => (
              <div key={alimento.id} className="card-alimento">
                <h3 className="card-titulo">{alimento.nome}</h3>
                <div className="card-detalhes">
                  <p><strong>Calorias:</strong> {alimento.calorias}</p>
                  <p><strong>Carboidratos:</strong> {alimento.carboidratos}g</p>
                  <p><strong>Proteína:</strong> {alimento.proteina}g</p>
                  <p><strong>Gordura:</strong> {alimento.gordura}g</p>
                </div>
              </div>
            ))
          ) : (
            <p className="não tem resultado">Nenhum alimento encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
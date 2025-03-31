
'use client';
import { useState, useEffect } from 'react';

import './globals.css';

export default function App() {
  const [filtro, setFiltro] = useState('');
  const [alimentos, setAlimentos] = useState([]);

  // Função para buscar os alimentos
  const buscarAlimentos = async (e) => {
    e.preventDefault();
    try {
      let url = 'http://localhost:3000/';
      
      if (filtro) {
        url = http://localhost:3000/nome/${filtro};
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar os alimentos');
      }
      const data = await response.json();
      setAlimentos(data);
    } catch (error) {
      console.error(error);
      setAlimentos([]);
    }
  };

  // Função para excluir um alimento
  const excluirAlimento = async (id) => {
    try {
      const response = await fetch(http://localhost:3000/${id}, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir o alimento');
      }
      // Atualiza a lista de alimentos após a exclusão
      setAlimentos((prevAlimentos) =>
        prevAlimentos.filter((alimento) => alimento.id !== id)
      );
    } catch (error) {
      console.error('Erro ao excluir o alimento:', error);
    }
  };

  // Requisição inicial para carregar os alimentos quando o componente for montado
  useEffect(() => {
    const fetchInitialAlimentos = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        if (!response.ok) {
          throw new Error('Erro ao carregar os alimentos');
        }
        const data = await response.json();
        setAlimentos(data);
      } catch (error) {
        console.error(error);
        setAlimentos([]);
      }
    };
    
    fetchInitialAlimentos();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo-principal">ALIMENTOS</h1>

      <div className="conteudo">
        <h2 className="titulo-secundario">CATÁLOGO</h2>

        <form onSubmit={buscarAlimentos} className="formulario-busca">
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Pesquisar por nome"
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

                <button 
                  onClick={() => excluirAlimento(alimento.id)} 
                  className="botao-excluir"
                >
                  Excluir
                </button>
              </div>
            ))
          ) : (
            <p className="nao-tem-resultado">Nenhum alimento encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
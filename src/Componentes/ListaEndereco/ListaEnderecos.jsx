import React, { useState, useEffect } from 'react';
import styles from './ListaEndereco.module.css';

const ListaEnderecos = ({ enderecos }) => {
  const [listaOrdenada, setListaOrdenada] = useState([]);

  useEffect(() => {
    setListaOrdenada([...enderecos]);
  }, [enderecos]);

  const ordenarEnderecos = (criterio) => {
    const listaOrdenadaCopia = [...listaOrdenada];
    listaOrdenadaCopia.sort((a, b) => {
      return a[criterio].localeCompare(b[criterio]);
    });
    setListaOrdenada(listaOrdenadaCopia);
  };

  return (
    <div className={styles.lista}>
      <div className={styles.ordenacao}>
        <button onClick={() => ordenarEnderecos('cep')}>Ordenar por CEP</button>
        <button onClick={() => ordenarEnderecos('localidade')}>
          Ordenar por Cidade
        </button>
        <button onClick={() => ordenarEnderecos('bairro')}>
          Ordenar por Bairro
        </button>
        <button onClick={() => ordenarEnderecos('uf')}>
          Ordenar por Estado
        </button>
      </div>
      <table className={styles.lista__}>
        <thead>
          <tr>
            <th>CEP</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {listaOrdenada.map((endereco, index) => (
            <tr key={index}>
              <td>{endereco.cep}</td>
              <td>{endereco.localidade}</td>
              <td>{endereco.bairro}</td>
              <td>{endereco.uf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEnderecos;

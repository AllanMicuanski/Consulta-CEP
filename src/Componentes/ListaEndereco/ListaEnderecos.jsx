import React from 'react';
import styles from './ListaEndereco.module.css';

const ListaEnderecos = ({ enderecos }) => {
  return (
    <div className={styles.lista}>
      <table>
        <thead>
          <tr>
            <th>CEP</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {enderecos.map((endereco, index) => (
            <tr key={index}>
              <td>{endereco.cep}</td>
              <td>{endereco.lcalidade}</td>
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

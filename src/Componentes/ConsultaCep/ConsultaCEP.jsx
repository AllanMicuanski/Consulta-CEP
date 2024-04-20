import React, { useState } from 'react';
import styles from './ConsultaCep.module.css';
import ListaEnderecos from '../ListaEndereco/ListaEnderecos';

const ConsultaCEP = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [listaEnderecos, setListaEnderecos] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    if (/^\d{0,8}$/.test(value)) {
      setCep(value);
      setErro('');
    } else {
      setErro('Por favor, insira no máximo 8 dígitos numéricos.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cep.length !== 8) {
      setErro('Por favor, insira um CEP válido com 8 dígitos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setEndereco(null);
        setErro('CEP não encontrado.');
      } else {
        setEndereco(data);
        setListaEnderecos([...listaEnderecos, data]);
        setErro('');
      }
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      setEndereco(null);
      setErro(
        'Ocorreu um erro ao consultar o CEP. Por favor, tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    setCep('');
    setEndereco(null);
    setErro('');
  };

  return (
    <div className={styles.consultaCep}>
      <h2>Consulta de CEP</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
        <button type="button" onClick={handleLimpar} className={styles.button}>
          Limpar
        </button>
      </form>
      {erro && <p className={styles.error}>{erro}</p>}
      {endereco && (
        <div className={styles.endereco}>
          <p>CEP: {endereco.cep}</p>
          <p>Cidade: {endereco.localidade}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Estado: {endereco.uf}</p>
        </div>
      )}
      <ListaEnderecos enderecos={listaEnderecos} />
    </div>
  );
};

export default ConsultaCEP;

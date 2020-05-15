import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  async function handleAddRepository(event) {
    event.preventDefault();

    try {
      const repository = { title, url, techs };

      const response = await api.post('repositories', repository);

      setRepositories([...repositories, response.data]);

      resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  function resetForm() {
    setTitle('');
    setUrl('');
    setTechs([]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const undeletedRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(undeletedRepositories);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data);
    }

    getRepositories();
  }, []);

  function handleChangeTechs(text) {
    const techs = text.split(',');
    console.log(techs);
    setTechs(techs);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 ? (
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        ) : (
          <p>Você não possui nenhum repositório</p>
        )}
      </ul>

      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Url"
          onChange={(event) => setUrl(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Techs"
          onChange={(event) => handleChangeTechs(event.target.value)}
          required
        />

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;

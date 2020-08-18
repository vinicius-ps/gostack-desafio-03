import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'titulo',
      url: 'https://github.com/vinicius-ps',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`).then((r) => {
      const editableRepositories = repositories;
      const repositoryIndex = repositories.findIndex((r) => (r.id = id));
      editableRepositories.splice(repositoryIndex, 1);
      setRepositories([...editableRepositories]);
    });
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}{' '}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

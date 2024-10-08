import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Navigate, useNavigate } from 'react-router-dom';

export const CadastroPet: React.FC = () => {
  const [nomePet, setNomePet] = useState('');
  const [idade, setIdade] = useState<number | undefined>(undefined);
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [peso, setPeso] = useState<number | undefined>(undefined);
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const navigate = useNavigate();
  {/*const [foto, setFoto] = useState<File | null>(null);
  const [vacinas, setVacinas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);*/}

  const handleCadastro = async () => {
    const Pet = new Parse.Object('Pet');
    Pet.set('nomePet', nomePet);
    Pet.set('idadePet', idade);
    Pet.set('escpeciePet', especie);
    Pet.set('racaPet', raca);
    Pet.set('pesoPet', peso);
    Pet.set('dataNascimentoPet', dataNascimento ? new Date(dataNascimento) : undefined);
    Pet.set('sexoPet', sexo);

    {/*if (foto) {
      const parseFile = new Parse.File(foto.name, foto);
      await parseFile.save();
      Pet.set('foto', parseFile);
    }

    Pet.set('vacinas', vacinas);*/}

    const currentUser = Parse.User.current();
    if (currentUser) {
      // Faço a relação entre a tabela Pet > _User
      const relation = Pet.relation('userObjectId');
      relation.add(currentUser);
    } else {
      alert('Usuário não autenticado.');
      return;
    }

    try {
      await Pet.save();
      alert('Pet cadastrado com sucesso!');
      navigate("/gerenciamento");
    } catch (err) {
      if (err instanceof Error) {
        alert(`Erro ao cadastrar pet: ${err.message}`);
      } else {
        alert('Erro desconhecido ao cadastrar pet.');
      }
      console.log(Parse.User.current());
    }
    
  };

  {/*const handleAddVacina = (vacina: string) => {
    setVacinas([...vacinas, vacina]);
  };*/}

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Pet</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome:</label>
        <input
          type="text"
          value={nomePet}
          onChange={(e) => setNomePet(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Idade:</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Espécie:</label>
        <input
          type="text"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Raça:</label>
        <input
          type="text"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Peso:</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(parseFloat(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Data de Nascimento:</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sexo:</label>
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione o sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </div>

      {/*<div className="mb-4">
        <label className="block text-sm font-medium mb-1">Foto:</label>
        <input
          type="file"
          onChange={(e) => setFoto(e.target.files ? e.target.files[0] : null)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>*/}

      {/*<div className="mb-4">
        <label className="block text-sm font-medium mb-1">Vacinas:</label>
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded mr-2"
            placeholder="Nome da vacina"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddVacina(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
        <ul className="mt-2">
          {vacinas.map((vacina, index) => (
            <li key={index} className="text-sm">{vacina}</li>
          ))}
        </ul>
      </div>*/}

      <button
        onClick={handleCadastro}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Cadastrar Pet
      </button>
    </div>
  );
};
import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { TextField } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

export const CadastroUsuario: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nomeCompleto, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [nrTelefone, setTelefone] = useState('');
    const [nomeEndereco, setEndereco] = useState('');
    const [numeroEndereco, setNumeroEndereco] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async () => {
        const user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        user.set('nomeCompleto', nomeCompleto);
        user.set('dataNascimento', dataNascimento ? new Date(dataNascimento) : undefined);
        user.set('cpf', cpf);
        user.set('nrTelefone', nrTelefone);
        user.set('nomeEndereco', nomeEndereco);
        user.set('numeroEndereco', numeroEndereco);

        try {
        await user.signUp();
        alert('Usuário cadastrado com sucesso!');
        navigate('/');

        } catch (err) {
        alert(`Erro ao cadastrar usuário:`);
        }
    };


  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Seu Cadastro</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome de Usuário:</label>
        <TextField
            required
            fullWidth
            label="Obrigatório"  
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Senha:</label>
        <TextField
            required
            fullWidth
            label="Obrigatório"  
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome Completo:</label>
        <TextField
            required
            fullWidth
            label="Obrigatório"  
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email:</label>
        <TextField
            required
            fullWidth
            label="Obrigatório"  
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Data de Nascimento:</label>
        <TextField
            required
            fullWidth  
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">CPF:</label>
        <TextField
            required
            fullWidth
            type="text"
            value={cpf}
            label="Apenas números"
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Telefone:</label>
        <TextField
            required
            fullWidth 
            type="text"
            value={nrTelefone}
            label="Apenas números"
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Endereço:</label>
            <TextField
            required
            type="text"
            value={nomeEndereco}
            label="Endereço"
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            />
      </div>

      <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">Número:</label>
            <TextField
            required
            fullWidth
            type="text"
            value={numeroEndereco}
            label="Número"
            onChange={(e) => setNumeroEndereco(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            />
      </div>
    </div>




      <button
        onClick={handleCadastro}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Finalizar Cadastro
      </button>
    </div>
  );
};
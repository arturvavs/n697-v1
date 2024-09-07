import Parse from 'parse/dist/parse.min.js';
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  Paper,
  Input,
  Typography,
  Button,
  Badge,
} from "@mui/material";

export const UserPager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof typeof pets[0]>("nomePet");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsList = await getPetsByUser();
        setPets(petsList);
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
      }
    };

    fetchPets();
  }, []);

  const getPetsByUser = async () => {
    const currentUser = Parse.User.current();
    
    if (!currentUser) {
      throw new Error('Usuário não autenticado.');
    }
  
    const Pet = Parse.Object.extend('Pet');
    const query = new Parse.Query(Pet);
  
    query.equalTo('userObjectId', currentUser);
  
    try {
      const results = await query.find();
      return results.map(pet => ({
        id: pet.id,
        nomePet: pet.get('nomePet') || '',
        idadePet: pet.get('idadePet') || '',
        especiePet: pet.get('especiePet') || '',
        racaPet: pet.get('racaPet') || '',
        pesoPet: pet.get('pesoPet') || '',
        dataNascimentoPet: pet.get('dataNascimentoPet') || '',
        sexoPet: pet.get('sexoPet') || '',
      }));
    } catch (err) {
      throw new Error(`Erro ao buscar pets: ${err.message}`);
    }
  };

  const filteredPets = pets.filter(
    (pet) =>
      pet.nomePet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.especiePet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.racaPet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPets = filteredPets.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column: keyof typeof pets[0]) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" component="h1">
          Pets Registrados
        </Typography>
        <Button href='/cadastroPet' variant="contained" color="primary">
          Registrar Pet
        </Button>
      </div>
      <TableContainer component={Paper}>
        <div className="p-4">
          <Input
            placeholder="Search pets..."
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "nomePet"}
                  direction={sortColumn === "nomePet" ? sortDirection : "asc"}
                  onClick={() => handleSort("nomePet")}
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "especiePet"}
                  direction={sortColumn === "especiePet" ? sortDirection : "asc"}
                  onClick={() => handleSort("especiePet")}
                >
                  Espécie
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "racaPet"}
                  direction={sortColumn === "racaPet" ? sortDirection : "asc"}
                  onClick={() => handleSort("racaPet")}
                >
                  Raça
                </TableSortLabel>
              </TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Sexo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPets.length > 0 ? (
              sortedPets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>{pet.nomePet}</TableCell>
                  <TableCell>{pet.especiePet}</TableCell>
                  <TableCell>{pet.racaPet}</TableCell>
                  <TableCell>{pet.pesoPet}</TableCell>
                  <TableCell>{pet.dataNascimentoPet?.toLocaleDateString()}</TableCell>
                  <TableCell>{pet.sexoPet}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum pet encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

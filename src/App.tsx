import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import MovementsList from "./components/MovementsList";
import { Movement } from "./types";

function App() {
  const [modal, setModal] = useState(false);
  const [move, setMove] = useState<Movement>({
    id: 0,
    typeMove: '',
    description: '',
    category: '',
    amount: 0,
    date: '',
  });
  const [moves, setMoves] = useState<Movement[]>(() => {
    const savedMoves = localStorage.getItem('moves');
    return savedMoves ? JSON.parse(savedMoves) : [];
  });
  const [selectedMove, setSelectedMove] = useState<Movement | null>(null);
  const [editFormData, setEditFormData] = useState<Movement>({
    id: 0,
    typeMove: '',
    description: '',
    category: '',
    amount: 0,
    date: '',
  });

  useEffect(() => {
    if (selectedMove) {
      setMove(selectedMove);
      setEditFormData(selectedMove);
    }
  }, [selectedMove, setMove, setEditFormData]);

  console.log(selectedMove)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    setMove((prevMove) => ({ ...prevMove, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (move.typeMove === '' || move.category === '' || move.description === '' || move.amount === 0 || move.date === '') {
      alert('Todos los campos deben de ser llenados');
    } else {
      if (move.typeMove !== 'retiro' && move.typeMove !== 'deposito') {
        alert('Tipo de movimiento invalido');
      } else {
        if (move.typeMove === 'retiro' && move.amount > 0) {
          move.amount = -move.amount;
        }
        if (selectedMove) {
          // Editar movimiento existente
          const updatedMoves = moves.map((m) => (m.id === selectedMove.id ? move : m));
          setMoves(updatedMoves);
          localStorage.setItem('moves', JSON.stringify(updatedMoves));
        } else {
          // Crear nuevo movimiento
          const newMove = {
            ...move,
            id: new Date().getTime(),
          };
          const updatedMoves = [...moves, newMove];
          setMoves(updatedMoves);
          localStorage.setItem('moves', JSON.stringify(updatedMoves));
        }
      }
    }

    setModal(false); // Close the modal after submitting
    setMove({
      id: 0,
      typeMove: '',
      description: '',
      category: '',
      amount: 0,
      date: '',
    });
    setSelectedMove(null);
  };

  return (
    <>
      <Header />
      <button
        className="bg-fuchsia-800 p-3 font-bold text-white mt-5 mx-5 rounded-2xl transform transition-all hover:scale-105"
        onClick={() => setModal(true)}
      >
        Agregar Movimiento
      </button>
      {modal && (
        <Form
          setModal={setModal}
          modal={modal}
          move={move}
          setMove={setMove}
          setMoves={setMoves}
          moves={moves}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          selectedMove={selectedMove}
          setSelectedMove={setSelectedMove}
          setEditFormData={setEditFormData}
          editFormData={editFormData}
        />
      )}
      <MovementsList
        moves={moves}
        setMoves={setMoves}
        modal={modal}
        setModal={setModal}
        selectedMove={selectedMove}
        setSelectedMove={setSelectedMove}
        setEditFormData={setEditFormData}
        editFormData={editFormData}
      />
    </>
  );
}

export default App;

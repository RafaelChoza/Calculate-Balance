import { Movement } from "../types";

type MovementsListProps = {
  moves: Movement[];
  setMoves: React.Dispatch<React.SetStateAction<Movement[]>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  editFormData: Movement
  setEditFormData: React.Dispatch<React.SetStateAction<Movement>>;
  modal: boolean;
  selectedMove: Movement | null;
  setSelectedMove: React.Dispatch<React.SetStateAction<Movement |null>>;
};

export default function MovementsList({ moves, setMoves, setModal, setSelectedMove, setEditFormData }: MovementsListProps) {

  const totalAmount = moves.reduce((acc, move) => acc + Number(move.amount), 0);
  
  
  const deleteMove = (id: Movement['id']) => {
    const selectedIdMove = moves.filter(move => move.id !== id)
    console.log(selectedIdMove)
    setMoves(selectedIdMove)
    localStorage.setItem('moves', JSON.stringify(selectedIdMove))
  }

  const editMove = (id: Movement['id']) => {
    const selectedIdToEdit = moves.find(move => move.id ===id)
    if(selectedIdToEdit) {
      setSelectedMove(selectedIdToEdit)
      setEditFormData(selectedIdToEdit)
    }
    setModal(true)
  }

  return (
    <>
      {moves.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-2xl font-bold mt-10">No hay ningún movimiento</p>
        </div>

      ) : (
        <>
          <div className="mt-5 flex justify-center text-4xl font-bold m-2">Lista de Movimientos</div>
          <div className="flex justify-center">
          <h2 className="text-xl m-5">El balance es de: <span className="font-b text-5xl font-bold">${totalAmount}</span></h2>
          </div>
          
          {moves.map((move) => (
            <div key={move.id} className="flex justify-center">
              <div className="border-4 mb-2 p-3 rounded-2xl w-4/5 flex flex-row">
                <div>
                <p className={`${move.typeMove === "retiro" ? "bg-red-600" : "bg-green-600"} inline-block px-2 font-bold text-white uppercase rounded-xl`}>
                  {move.typeMove}
                </p>
                <p>Descripción: {move.description}</p>
                <p>Categoría: {move.category}</p>
                <p>
                  Cantidad: {move.typeMove === 'deposito' ? (
                    <span className="font-bold">${move.amount}</span>
                  ) : (
                    <span className="font-bold">${move.amount}</span>
                  )}
                </p>
                <p>Fecha: {move.date}</p>
                </div>
                

                <div className="flex sm:flex-row flex-col items-center mx-10">
                  <button 
                    className="mb-5 bg-fuchsia-800 font-bold px-3 text-white mx-2 rounded-2xl transform transition-all hover:scale-105"
                    onClick={() => editMove(move.id)}
                  >
                    Editar
                  </button>
                  <button 
                    className="mb-5 bg-fuchsia-800 font-bold px-3 text-white mx-2 rounded-2xl transform transition-all hover:scale-105"
                    onClick={() => deleteMove(move.id)}
                  >
                    Borrar
                  </button>
                </div>


              </div>


            </div>
          ))}
        </>
      )}
    </>
  );
}


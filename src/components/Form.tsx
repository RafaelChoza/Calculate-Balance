import { useEffect, useState } from "react";
import { Movement } from "../types";
import { categories as initialCategories } from "../db/Categories";

type FormProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
    setMove: React.Dispatch<React.SetStateAction<Movement>>;
    move: Movement;
    moves: Movement[];
    setMoves: React.Dispatch<React.SetStateAction<Movement[]>>;
    editFormData: Movement
    setEditFormData: React.Dispatch<React.SetStateAction<Movement>>;
    selectedMove: Movement | null;
    setSelectedMove: React.Dispatch<React.SetStateAction<Movement |null>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({ modal, setModal, handleChange, handleSubmit, selectedMove, editFormData, setEditFormData }: FormProps) {
    const [categories, setCategories] = useState(initialCategories);
    const [newCategory, setNewCategory] = useState("");
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

    useEffect(() => {
        if (selectedMove) {
          setEditFormData(selectedMove);
        }
      }, [selectedMove, setEditFormData]);

   

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "new") {
            setShowNewCategoryInput(true);
        } else {
            handleChange(event);
        }
    };

    const handleNewCategorySubmit = () => {
        if (newCategory.trim() !== "") {
            setCategories([...categories, newCategory]);
            setShowNewCategoryInput(false);
            setNewCategory("");
        }
    };

    return (
        <>
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="flex justify-center">
                        <div className="bg-white border-4 border-fuchsia-800 w-7/8 rounded-3xl">
                            <button
                                className="bg-red-600 p-1 my-1 mx-1 font-bold text-white rounded-3xl inline-block transform transition-all hover:scale-105"
                                onClick={() => setModal(false)}
                            >
                                Cerrar
                            </button>
                            <p className="text-2xl font-bold text-center">Ingrese la información</p>

                            {selectedMove ? (
                                <div className="flex justify-center">
                                <form
                                    className="flex justify-center flex-col mt-1 border-2 rounded-xl mb-1"
                                    onSubmit={handleSubmit}
                                >
                                    <label 
                                        className="font-bold m-1"
                                        htmlFor=""
                                    >
                                        Seleccione Depósito o Retiro
                                    </label>

                                    <label>
                                        <input 
                                            className="mx-3"
                                            type="radio"
                                            name="typeMove"
                                            value="deposito"
                                            onChange={handleChange}
                                            checked={editFormData.typeMove === "deposito"}  
                                        
                                        />
                                        Depósito
                                    </label>

                                    <label>
                                        <input
                                            className="mx-3"
                                            type="radio"
                                            name="typeMove"
                                            value="retiro"
                                            onChange={handleChange}
                                            checked={editFormData.typeMove === "retiro"}
                                        />
                                        Retiro
                                    </label>

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Descripción
                                    </label>
                                    <input className="border-2 mx-5" type="text" value={editFormData.description} name="description" onChange={handleChange} />

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Seleccione la categoría
                                    </label>
                                    <select name="category" id="" className="border-2 mx-5" value={editFormData.category} onChange={handleCategoryChange}>
                                        <option value="">-- Selecciona una opción --</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                        <option value="new">Crear nueva categoría</option>
                                    </select>

                                    {showNewCategoryInput && (
                                        <div className="flex flex-col items-center mt-3">
                                            <input
                                                className="border-2 mx-5"
                                                type="text"
                                                placeholder="Nueva categoría"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="bg-fuchsia-800 font-bold p-2 text-white mx-2 rounded-2xl mt-2"
                                                onClick={handleNewCategorySubmit}
                                            >
                                                Añadir categoría
                                            </button>
                                        </div>
                                    )}

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Ingrese la Cantidad
                                    </label>
                                    <input className="border-2 mx-5" type="number" name="amount" value={editFormData.amount} onChange={handleChange} />

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Fecha
                                    </label>
                                    <input className="border-2 mx-5 mb-5" type="date" value={editFormData.date} name="date" onChange={handleChange} />

                                    <button className="mb-5 bg-fuchsia-800 font-bold p-3 text-white mx-2 rounded-2xl" type="submit">
                                        Guardar
                                    </button>
                                </form>
                            </div>
                            ) : (
                                <div className="flex justify-center">
                                <form className="flex justify-center flex-col mt-1 border-2 rounded-xl mb-1" onSubmit={handleSubmit}>
                                    <label className="font-bold m-1" htmlFor="">
                                        Seleccione Depósito o Retiro
                                    </label>

                                    <label>
                                        <input className="mx-3" type="radio" name="typeMove" value="deposito" onChange={handleChange} />
                                        Depósito
                                    </label>

                                    <label>
                                        <input className="mx-3" type="radio" name="typeMove" value="retiro" onChange={handleChange} />
                                        Retiro
                                    </label>

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Descripción
                                    </label>
                                    <input className="border-2 mx-5" type="text" name="description" onChange={handleChange} />

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Seleccione la categoría
                                    </label>
                                    <select name="category" id="" className="border-2 mx-5" onChange={handleCategoryChange}>
                                        <option value="">-- Selecciona una opción --</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                        <option value="new">Crear nueva categoría</option>
                                    </select>

                                    {showNewCategoryInput && (
                                        <div className="flex flex-col items-center mt-3">
                                            <input
                                                className="border-2 mx-5"
                                                type="text"
                                                placeholder="Nueva categoría"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="bg-fuchsia-800 font-bold p-2 text-white mx-2 rounded-2xl mt-2"
                                                onClick={handleNewCategorySubmit}
                                            >
                                                Añadir categoría
                                            </button>
                                        </div>
                                    )}

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Ingrese la Cantidad
                                    </label>
                                    <input className="border-2 mx-5" type="number" name="amount" onChange={handleChange} />

                                    <label className="font-bold mt-3 mx-3" htmlFor="">
                                        Fecha
                                    </label>
                                    <input className="border-2 mx-5 mb-5" type="date" name="date" onChange={handleChange} />

                                    <button className="mb-5 bg-fuchsia-800 font-bold p-3 text-white mx-2 rounded-2xl" type="submit">
                                        Guardar
                                    </button>
                                </form>
                            </div>
                            )}

                            
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

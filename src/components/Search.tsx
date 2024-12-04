
import { categories as initialCategories } from "../db/Categories"

type SearchProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  modalSearch: boolean,
  setModalSearch: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Search({ modalSearch, setModalSearch, setSelectedCategory }: SearchProps) {

  return (
    <>
      {modalSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="flex justify-center mt-5">
            <div className="w-5/6 sm:w-5/6 border-4 border-fuchsia-600 p-2 rounded-2xl bg-white">
              <button
                onClick={() => setModalSearch(false)}
                className="p-1 font-bold text-white bg-red-600 rounded-xl transform transition-all hover:scale-105"
              >Cerrar</button>

              <h2 className="text-2xl font-bold text-center">Busqueda de Movimientos por Categoria</h2>

              <div className="flex mt-5 items-center flex-col">

                <label className="font-bold" htmlFor="">Categoria: </label>
                <select 
                  className="border-2 mx-2" 
                  name="category" 
                  id="category"
                  onChange={(e) => {setSelectedCategory(e.target.value); setModalSearch(false)}}
                >
                  <option value="">-- Seleccione Categoria --</option>
                  {initialCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

              </div>
            </div>
          </div>
        </div>
      )}



    </>
  )
}

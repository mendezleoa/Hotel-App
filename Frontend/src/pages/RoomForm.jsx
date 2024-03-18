import { useForm } from "react-hook-form";
import RoomService from "../services/room.service";

const RoomForm = ({ setShowModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      capacidad: 1,
      evaluacion: 1,
      tarifas: 1,
    },
  });

  const onSubmit = async (data) => {
    await RoomService.newRoom(data);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-1">
        <div className="lg:w-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap content-center -m-2">
              <div className="p-2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    maxLength="50"
                    {...register("name", { required: true, maxLength: 50 })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.name?.type === "required" && (
                    <p>El campo Nombre es Requerido</p>
                  )}
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label
                    htmlFor="capacidad"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Capacidad
                  </label>
                  <input
                    type="number"
                    id="capacidad"
                    name="capacidad"
                    min="1"
                    max="10"
                    {...register("capacidad", {
                      required: true,
                      min: 1,
                      max: 10,
                    })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.capacidad?.type === "required" && (
                    <p>El campo Capacidad es Requerido</p>
                  )}
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label
                    htmlFor="evaluacion"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Evaluación
                  </label>
                  <input
                    type="number"
                    id="evaluacion"
                    name="evaluacion"
                    min="1"
                    max="10"
                    {...register("evaluacion", {
                      required: true,
                      min: 1,
                      max: 10,
                    })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.capacidad?.type === "required" && (
                    <p>El campo Evaluación es Requerido</p>
                  )}
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label
                    htmlFor="tarifas"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Tarifas
                  </label>
                  <input
                    type="number"
                    id="tarifas"
                    name="tarifas"
                    min="1"
                    max="255"
                    {...register("tarifas", {
                      required: true,
                      min: 1,
                      max: 255,
                    })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.capacidad?.type === "required" && (
                    <p>El campo Tarifas es Requerido</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col place-content-start ml-2">
                <span className="my-1">Tipo</span>
                <div className="relative">
                  <select
                    id="type"
                    {...register("type", { required: true })}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option>Delux</option>
                    <option>Gran Suite</option>
                    <option>Suite</option>
                    <option>Junior Suite</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="comodidades"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Comodidades
                  </label>
                  <textarea
                    id="comodidades"
                    name="comodidades"
                    maxLength="250"
                    {...register("comodidades", {
                      required: true,
                      maxLength: 250,
                    })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  {errors.comodidades?.type === "required" && (
                    <p>El campo Comodidades es Requerido</p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="descripcion"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    maxLength="250"
                    {...register("descripcion", {
                      required: true,
                      maxLength: 250,
                    })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  {errors.descripcion?.type === "required" && (
                    <p>El campo Descripción es Requerido</p>
                  )}
                </div>
                <div className="relative mt-2">
                  <input
                    className="bg-emerald-500 text-gray-100 hover:text-gray-800 hover:bg-emerald-500   active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    value="Enviar"
                  />
                  <button
                    className="text-red-500 active:bg-emerald-600 font-bold uppercase px-6 py-3 text-sm ml-2 mb-1  rounded shadow hover:shadow-lg outline-none focus:outline-none hover:text-gray-800 hover:bg-red-500 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RoomForm;

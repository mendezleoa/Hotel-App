import React, { useState, useEffect } from "react";

import RoomService from "../services/room.service";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

const Rooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await RoomService.getRooms();
        setData(response.rooms);
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEdit = (e) => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <>
            <Modal />
            <section className="text-gray-600 body-font overflow-hidden px-6">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                        Nombre
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                        Tipo
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                        Comodidades
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                        Tarifa
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item) => (
                      <tr
                        className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 text-xs lg:text-sm"
                        key={item._id}
                      >
                        <th
                          scope="row"
                          className="px-2 sm:px-6 py-3 font-medium text-slate-700 whitespace-nowrap dark:text-gray-100"
                        >
                          {item.name}
                        </th>
                        <td className="px-2 sm:px-6 py-3">{item.type}</td>
                        <td className="px-2 sm:px-6 py-3">
                          {item.descripcion}
                        </td>
                        <td className="px-2 sm:px-6 py-3">{item.tarifa}</td>
                        <td className="px-2 sm:px-6 py-3">
                          <button
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEdit(item._id);
                            }}
                          >
                            Editar
                          </button>
                          <> </>
                          <button
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEdit(item._id);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )
      )}
    </>
  );
};

export default Rooms;

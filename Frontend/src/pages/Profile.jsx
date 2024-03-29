import React, { useEffect, useState } from "react";

import RoomService from "../services/room.service";
import AuthService from "../services/auth.service";
import ReservationService from "../services/reserv.service";

const Profile = () => {
  const [data, setData] = useState(undefined);
  const [reservas, setReservas] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const datos = await AuthService.getUserData();
      setReservas(datos.reservaciones);
      setData(datos.user);
      const roomPromises = datos.reservaciones.map(async (reserva) => {
        const room = await RoomService.getRoombyId(reserva.room);
        reserva.room = room.room;
      });
      await Promise.all(roomPromises);

      setLoading(false);
    };

    fetchData();
  }, []);

  const deleteRow = async (id, e) => {
    e.preventDefault();

    const deleteData = async () => {
      setLoading(true);
      await ReservationService.deleteReservation(id);
      const datos = await AuthService.getUserData();
      setReservas(datos.reservaciones);
      setData(datos.user);
      setLoading(false);
    };

    deleteData();
  };

  return (
    <div className="container mx-4">
      {!loading ? (
        <div className="mt-24 mx-3 w-full flex flex-col justify-center">
          <h3 className="font-bold text-xl">
            Nombre de usuario: {data.username}
          </h3>
          <p className="font-bold text-xl">Email: {data.email}</p>
          {/*
          <p className="font-bold text-xl">Rol: {data.rol}</p> */}
          <div>
            {reservas.length > 0 ? (
              <div>
                <p className="mt-5 font-bold text-lg">Reservas:</p>
                <ul>
                  {reservas.map((item) => (
                    <li
                      key={item._id}
                      className="p-4 rounded-xl shadow-lg bg-green-200 dark:bg-teal-900 my-2 text-sm grid grid-row-2 mb-4"
                    >
                      <p className="text-lg">
                        Fecha de Entrada: {item.fechaInit.substring(0,10)}
                      </p>
                      <p className="text-lg">
                        Fecha de Salida: {item.fechaSalida.substring(0,10)}
                      </p>
                      <p className="text-base">
                        Pago total: ${item.totalimporte}
                      </p>
                      <p className="text-xl mt-3">Habitación:</p>
                      <p className="text-lg">Nombre: {item.room.name}</p>
                      <p className="text-lg mb-3">
                        Habitación: {item.room.type}
                      </p>
                      <button
                        onClick={(e) => deleteRow(item._id, e)}
                        className="bg-red-600 hover:bg-red-500 text-gray-100 font-bold rounded ease-linear transition-all duration-150 py-2 px-3 mt-2"
                      >
                        Eliminar Reserva
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h1 className="font-bold text-lg">No hay reservas :{"("}</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold">Cargando datos</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;

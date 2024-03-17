import React, { useEffect, useState } from "react";

import RoomService from "../services/room.service";
import AuthService from "../services/auth.service";
import ReservationService from "../services/reserv.service";
import Reservaciones from "../components/Reservaciones";

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
      datos.reservaciones.forEach(async (reserva) => {
        const room = await RoomService.getRoombyId(reserva.room);
        console.log(room.room);
        console.log(reserva);
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  const deleteRow = async (id, e) => {
    e.preventDefault();
    console.log("Eliminaste la reserva. Id: ", id);

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
    <div className="container">
      {!loading ? (
        <div className="mt-24">
          <h3 className="font-bold text-xl">
            Nombre de usuario: {data.username}
          </h3>
          <p className="font-bold text-xl">Id: {data.id}</p>
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
                      className="p-4 rounded-xl shadow-lg bg-green-200 dark:bg-teal-900 my-2 text-sm grid grid-row-2"
                    >
                      <p className="text-xl">Habitación: {item.room}</p>
                      <p className="text-lg">
                        Fecha de entrada: {item.fechaInit}
                      </p>
                      <p className="text-lg">
                        Fecha de entrada: {item.fechaSalida}
                      </p>
                      <p className="text-base">
                        Pago total: {item.totalimporte}
                      </p>
                      <button
                        onClick={(e) => deleteRow(item._id, e)}
                        className="btn btn-danger py-2 px-3 mt-2"
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
          <section className="container mt-20 mb-28">
            <div className="text-center">
              <h3 className="text-slate-900 dark:text-gray-100 text-3xl font-bold">
                Ingresa tu Reservación aquí:
              </h3>
            </div>
            <Reservaciones />
          </section>
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

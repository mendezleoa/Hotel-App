import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import RoomService from "../services/room.service";
import ReservationService from "../services/reserv.service";
import Loader from "../components/Loader";

function ReservationRoom() {
  const { id, datefrom, dateto } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalImporte, setTotalImporte] = useState(0);

  const desde = moment(datefrom, "DD-MM-YYYY");
  const hasta = moment(dateto, "DD-MM-YYYY");

  const totalDays = moment.duration(hasta.diff(desde)).asDays() + 1;

  const [newRecord, setNewRecord] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await RoomService.getRoombyId(id);
        setData(response.room);
        setTotalImporte(totalDays * response.room.tarifa);
      } catch (error) {
        console.error(
          "Error al obtener la información de la habitación:",
          error
        );
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddRecord = async () => {
    axios
      .post("http://localhost:5000/api/rooms", { title: newData })
      .then((res) => {
        setData([...data, res.data.rooms]);
        setNewRegistro("");
      })
      .catch((error) => {
        console.error("Error al agregar el blog:", error);
      });
  };

  const handleDeleteRecord = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el blog:", error);
      });
  };

  const handleNavigate = () => {
    navigate("/reserva");
  };

  const reservaRoom = async () => {
    const reservaDetalle = {
      room: data,
      fechaInit: datefrom,
      fechaSalida: dateto,
      totalimporte: totalImporte,
      totaldays: totalDays,
    };

    try {
      await ReservationService.newReservation(reservaDetalle);
      navigate("/profile")
    } catch (error) {
      console.log(error)
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
          <section className="text-gray-600 body-font overflow-hidden">
            <button
              className="mx-12 font-extrabold text-red-600 text-3xl"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate();
              }}
            >
              Cerrar
            </button>
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Habitación:
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {data.name}
                  </h1>
                  <div className="flex mb-4">
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Detalle
                    </a>
                  </div>
                  <p className="leading-relaxed mb-4">{data.comodidades}</p>
                  <p className="leading-relaxed mb-4">{data.type}</p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Desde:</span>
                    <span className="ml-auto text-gray-900">{datefrom}</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Hasta</span>
                    <span className="ml-auto text-gray-900">{dateto}</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Precio por Noche</span>
                    <span className="ml-auto text-gray-900">
                      ${data.tarifa}
                    </span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Cantidad de Noches</span>
                    <span className="ml-auto text-gray-900">{totalDays}</span>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${totalImporte}
                    </span>
                    <button
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={reservaRoom}
                    >
                      Confirmar Reservación
                    </button>
                  </div>
                </div>
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src="https://dummyimage.com/400x400"
                />
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default ReservationRoom;

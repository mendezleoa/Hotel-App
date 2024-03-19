import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import moment from "moment";

import RoomService from "../services/room.service";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Stars from "../components/Stars"

const { RangePicker } = DatePicker;

const Reservaciones = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await RoomService.getRooms()
        setData(response.rooms);
        setDatosFiltrados(response.rooms);
        const allTipos = response.rooms.map((room) => room.type);
        const uniqueTipos = [...new Set(allTipos)];
        setTipos(uniqueTipos);
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/reserva/${id}/${dateFrom}/${dateTo}`);
  };

  const handleFilter = (filtroCapacidad, filtroTipo) => {
    const filtered = data.filter(
      (room) =>
        parseInt(room.capacidad)===parseInt(filtroCapacidad) &&
        (filtroTipo === "" || room.type === filtroTipo)
    );
    setDatosFiltrados(filtered);
  };

  const handleCapacidadChange = (e) => {
    setFiltroCapacidad(e.target.value);
    handleFilter(e.target.value, filtroTipo);
  };

  const handleTipoChange = (e) => {
    setFiltroTipo(e.target.value);
    handleFilter(filtroCapacidad, e.target.value);
  };

  const filterByDate = (dates) => {
    setDateFrom(moment(dates[0].$d).format("DD-MM-YYYY"));
    setDateTo(moment(dates[1].$d).format("DD-MM-YYYY"));
  };

  return (
    <>
      <section className="text-gray-600 dark:text-slate-200 overflow-hidden">
        <div>
          <input
            type="number"
            min={1}
            max={10}
            value={filtroCapacidad}
            onChange={handleCapacidadChange}
            className="m-3 py-1.5 px-3 border border-gray-900 rounded-md text-slate-800 w-1/6"
            placeholder="Filtrar por Capacidad"
          />
          <select
            value={filtroTipo}
            onChange={handleTipoChange}
            className="m-3 py-1.5 px-3 border border-gray-900 rounded-md text-slate-800"
          >
            <option value="">Todos los tipos</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <RangePicker onChange={filterByDate} />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          datosFiltrados?.map((item) => (
            <div className="container px-5 py-4 mx-auto" key={item._id}>
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="imgroom"
                  className="lg:w-4/12 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={item.imagenes}
                />
                <div className="lg:w-8/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                    Habitación:
                  </h2>
                  <h1 className="text-gray-900 dark:text-slate-100 text-3xl title-font font-semibold mb-1">
                    {item.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <Stars stars={item.evaluacion}/>
                      <span className="text-gray-600 dark:text-gray-200 ml-3">
                        {item.review.length} Reviews
                      </span>
                    </span>
                  </div>
                  <p className="leading-relaxed">{item.comodidades}</p>
                  <p className="leading-relaxed">{item.descripcion}</p>
                  <div className="flex mt-6 items-center pb-2 border-b-2 border-gray-300 mb-3">
                    <div className="flex">
                      <span className="mr-3">Tipo: </span>
                      <h2 className="text-gray-900 dark:text-slate-300 text-2xl title-font font-medium mb-1">
                        {item.type}
                      </h2>
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Capacidad Máxima: </span>
                      <h2 className="text-gray-900 dark:text-slate-300 text-2xl title-font font-medium mb-1">
                        {item.capacidad}
                      </h2>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900 dark:text-slate-300">
                      ${item.tarifa}
                    </span>
                    <button
                      className="flex ml-auto text-white bg-[#0D6EFD] border-0 py-2 px-6 focus:outline-none hover:bg-[#0DCAF0] rounded"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item._id);
                      }}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Reservaciones;

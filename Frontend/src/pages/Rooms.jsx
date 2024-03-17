import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import moment from "moment";

import Error from "../components/Error";
import Loader from "../components/Loader";

const { RangePicker } = DatePicker;

const Rooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [newRegistro, setNewRegistro] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [dateFrom, setDatefrom] = useState();
  const [dateTo, setdateto] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setData(response.data.rooms);
        setDatosFiltrados(response.data.rooms);
        const allTipos = response.data.rooms.map((room) => room.type);
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

  const handleAddRoom = () => {
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

  const handleDeleteRoom = (id) => {
    axios
      .delete(`http://localhost:5000/api/rooms/${id}`)
      .then(() => {
        setData(data.filter((room) => room.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar la habitación:", error);
      });
  };

  const handleClick = (id) => {
    navigate(`/rooms/${id}`);
  };

  const handleFilter = (filtroNombre, filtroTipo) => {
    const filtered = data.filter(
      (room) =>
        room.name.toLowerCase().includes(filtroNombre.toLowerCase()) &&
        (filtroTipo === "" || room.type === filtroTipo)
    );
    setDatosFiltrados(filtered);
  };

  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
    handleFilter(e.target.value, filtroTipo);
  };

  const handleTipoChange = (e) => {
    setFiltroTipo(e.target.value);
    handleFilter(filtroNombre, e.target.value);
  };

  const filterByDate = (dates) => {
    setDatefrom(moment(dates[0].$d).format("DD-MM-YYYY"));
    setDateto(moment(dates[1].$d).format("DD-MM-YYYY"));
  };

  return (
    <>
      <section className="text-gray-600 dark:text-slate-200 overflow-hidden">
        <div>
          <input
            type="text"
            value={filtroNombre}
            onChange={handleNombreChange}
            className="m-3 py-1.5 px-3 border border-gray-900 rounded-md text-slate-800"
            placeholder="Filtrar por nombre"
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
                  alt="ecommerce"
                  className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src="https://dummyimage.com/400x400"
                />
                <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                    Habitación:
                  </h2>
                  <h1 className="text-gray-900 dark:text-slate-100 text-3xl title-font font-semibold mb-1">
                    {item.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-[#0D6EFD]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-[#0D6EFD]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-[#0D6EFD]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-[#0D6EFD]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-[#0D6EFD]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
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

export default Rooms;

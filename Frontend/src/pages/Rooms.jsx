import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Rooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [newRecord, setNewRecord] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:5000/api/rooms")
      .then((res) => {
        setData(res.data.rooms);
        setDatosFiltrados(res.data.rooms);
      })
      .catch((error) => {
        console.error("Error al obtener las habitaciones:", error);
        setError(error);
      });
    setLoading(false);
  }, []);

  const handleAddRecord = () => {
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

  const handleClick = (e) => {
    navigate(`/rooms/${e}`);
  };

  const handleFilter = () => {
    const filtered = data.filter((item) =>
      item.fecha.toLowerCase().includes(filtro.toLowerCase())
    );
    setDatosFiltrados(filtered);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div>
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Filtrar habitaciones..."
          />
          <button onClick={handleFilter}>Filtrar</button>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500">
              Error al cargar los datos
            </div>
          </div>
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
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Habitación:
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
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
                        className="w-4 h-4 text-indigo-500"
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
                        className="w-4 h-4 text-indigo-500"
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
                        className="w-4 h-4 text-indigo-500"
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
                        className="w-4 h-4 text-indigo-500"
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
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <span className="text-gray-600 ml-3">
                        {item.review.length} Reviews
                      </span>
                    </span>
                  </div>
                  <p className="leading-relaxed">{item.comodidades}</p>
                  <p className="leading-relaxed">{item.descripcion}</p>
                  <div className="flex mt-6 items-center pb-2 border-b-2 border-gray-300 mb-3">
                    <div className="flex">
                      <span className="mr-3">Tipo: </span>
                      <h2 className="text-gray-900 text-2xl title-font font-medium mb-1">
                        {item.type}
                      </h2>
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Capacidad Máxima: </span>
                      <h2 className="text-gray-900 text-2xl title-font font-medium mb-1">
                        {item.capacidad}
                      </h2>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${item.tarifa}
                    </span>
                    <button
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
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

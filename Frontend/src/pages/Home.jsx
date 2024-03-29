import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

function Home() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [weatherMostrar, setWeatherMostrar] = useState("");

  const urlAPI_Weather = `https://api.openweathermap.org/data/2.5/weather?q=Bocono,Ve&appid=eaed9e10df601aab920b0f2f1e13df89&units=metric`;

  useEffect(() => {
    setLoading(true);
    setCurrentUser(AuthService.getCurrentUser());

    const fetchWeather = async () => {
      await fetch(urlAPI_Weather)
        .then((response) => response.json())
        .then((weather) => {
          if (!weather.error) {
            setWeatherMostrar(weather.main.temp + "°C");
            setWeather(weather);
          }
          setLoading(false);
        });
    };

    fetchWeather();
  }, []);

  return (
    <>
      <section>
        <div className="pt-16">
          <div className="container px-3 mx-auto flex flex-wrap flex-col lg:flex-row items-center">
            <div className="flex flex-col w-full lg:w-2/5 justify-center text-center">
              <h1 className="my-4 text-5xl font-bold leading-tight">
                El Mejor Hotel de Todo el Estado
              </h1>
              <p className="text-lg md:text-xl mx-4">
                No lo decimos nosotros, lo dicen nuestros huéspedes.{" "}
                <span className="font-bold">Hotel Bocconnó</span> ha sido
                galardonado como el mejor hotel del estado Trujillo. ¿Por qué?
                Porque nos esforzamos en brindar un servicio excepcional,
                instalaciones de primera clase y una atención personalizada que
                supera todas las expectativas.
              </p>
              <Link
                to="/blogs"
                className="mt-6 mx-auto lg:mx-0  mb-2 bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded ease-linear transition-all duration-150 z-10"
              >
                Blogs
              </Link>
            </div>

            <div className="w-full md:w-3/5 py-6 text-center">
              <img className="w-full md:w-4/5 z-50" src="hab-2.jpg" />
            </div>
          </div>
        </div>

        <div className="relative -mt-12 lg:-mt-24">
          <svg
            viewBox="0 0 1428 174"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                transform="translate(-2.000000, 44.000000)"
                fill="#FFFFFF"
                fillRule="nonzero"
              >
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  id="Path-4"
                  opacity="0.200000003"
                ></path>
              </g>
              <g
                transform="translate(-4.000000, 76.000000)"
                fill="#FFFFFF"
                fillRule="nonzero"
              >
                <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
              </g>
            </g>
          </svg>
        </div>
      </section>
      <section className="bg-white pt-4 mb-4">
        <div className="mx-auto container relative">
          <div className="text-left">
            <h2 className="block antialiased tracking-normal text-4xl font-semibold text-slate-900 mb-8 leading-tight">
              Nuestras Habitaciones y Espacios Lujosos
            </h2>
          </div>
          <div className="lg:flex relative items-center lg:mb-4">
            <img
              className="lg:w-5/12 md:w-9/12 hidden md:flex md:ml-auto mx-auto"
              src="p-2.jpg"
              alt="Bocono 2"
            />
            <div className="lg:w-1/2 mx-3 md:mx-8">
              <ul className="pt-4 pb-12">
                <li className="my-4 text-slate-900">
                  <span className="font-bold">Suites Espaciosas:</span> Cada una
                  de nuestras suites está diseñada para ofrecer comodidad y
                  elegancia. Disfruta de amplios espacios, camas mullidas y
                  vistas panorámicas de las montañas.
                </li>
                <li className="my-4 text-slate-900">
                  <span className="font-bold">Villas Privadas:</span> Si buscas
                  privacidad absoluta, nuestras villas son ideales. Piscina
                  privada, jardines exquisitos y un ambiente exclusivo te
                  esperan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <section className="py-4 container">
          <div className="col-lg-6 mx-auto text-center">
            <h3 className="text-2xl mb-3">{`<Cargando>`}</h3>
          </div>
        </section>
      ) : (
        <>
          {weather ? (
            <section className="py-7 container">
              <h2 className="text-gradient text-info mb-1 text-2xl">
                Exelente clima y agradable ambiente.
              </h2>
              <h3 className="text-slate-900 dark:text-gray-300 mb-3 text-lg">
                Estamos actualmente a {weatherMostrar}
              </h3>
            </section>
          ) : (
            <section className="py-4 container">
              <div className="col-lg-6 mx-auto text-center">
                <h3 className="text-red-700 dark:text-red-500 text-2xl mb-3">{`<No han cargado los datos>`}</h3>
              </div>
            </section>
          )}
        </>
      )}
      {currentUser ? (
        <section className="container">
          <div className="text-center">
            <h3 className="text-slate-900 dark:text-gray-100 text-3xl font-bold">
              Ingresa tu reservacion aquí:{" "}
            </h3>
            <button className="my-4 bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded ease-linear transition-all duration-150">
              <Link to={"/reserva"}>Reservas</Link>
            </button>
          </div>
        </section>
      ) : (
        <section className="container">
          <div className="container">
            <h3 className="text-slate-900 dark:text-gray-100 text-xl mb-4 font-bold md:text-center">
              Inicia Sesión o Registrate para acceder a las reservaciones:
            </h3>
            <div className="grid grid-rows-2 md:grid-cols-2 items-center mx-auto">
              <li className="btn btn-primary m-1 lg:max-w-lg">
                <Link to={"/login"} className="nav-link px-0 py-1">
                  Login
                </Link>
              </li>
              <li className="btn btn-primary m-1 lg:max-w-lg">
                <Link to={"/register"} className="nav-link px-0 py-1">
                  Sign Up
                </Link>
              </li>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;

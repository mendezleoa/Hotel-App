import React, { useState, useRef } from "react";
import ReservationService from "../services/reserv.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">Este campo es necesario</div>
    );
  }
};

function Reservaciones() {
  const form = useRef();
  const checkBtn = useRef();

  const [selectedRoom, setSelectedRoom] = useState('orange');
  const [capacidad, setCapacidad] = useState(1);
  const [fechaInit, setFechaInit] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeCapacidad = (e) => {
    const capacidad = e.target.value;
    setCapacidad(capacidad);
  };

  const onChangeFechaInit = (e) => {
    const fechaInit = e.target.value;
    setFechaInit(fechaInit);
  };

  const onChangeFechaSalida = (e) => {
    const fechaInit = e.target.value;
    setFechaSalida(fechaInit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const user = localStorage.getItem("user");
      console.log(selectedRoom);
      ReservationService.newReservation(
        selectedRoom,
        capacidad,
        user,
        fechaInit,
        fechaSalida
      ).then(
        () => {
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <div className="form-group">
        <label>
          Habitación para seleccionar:
          <select
            name="selectedRoom"
            onChange={e => setSelectedRoom(e.target.value)}
            validations={[required]}
          >
            <option value="Habitacion1">Habitacion1</option>
            <option value="Habitacion2">Habitacion2</option>
            <option value="Habitacion3">Habitacion3</option>
          </select>
        </label>
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:grid-flow-col-dense">
          <div className="sm:m-1 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sm:mt-3">
              Cantidad de huéspedes:
            </label>
            <input
              type="number"
              placeholder="Capacidad"
              className="form-control"
              name="capacidad"
              min="1"
              max="10"
              valuedefault="1"
              value={capacidad}
              onChange={onChangeCapacidad}
              validations={[required]}
            />
          </div>
          <div className="sm:m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sm:mt-3">
              Fecha de reserva:
            </label>
            <input
              className="form-control form-icon-trailing far fa-calendar datepicker-toggle-icon"
              type="date"
              name="Fecha de reserva"
              value={fechaInit}
              onChange={onChangeFechaInit}
              validations={[required]}
            />
          </div>
          <div className="sm:m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sm:mt-3">
              Fecha de salida:
            </label>
            <input
              className="form-control form-icon-trailing far fa-calendar datepicker-toggle-icon"
              type="date"
              name="Fecha de salida"
              value={fechaSalida}
              onChange={onChangeFechaSalida}
              validations={[required]}
            />
          </div>
        </div>
        {message && (
          <div className="form-group mt-1">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
      <div className="form-group pt-3">
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading && <span className="spinner-border spinner-border-sm" />}
          <span>Enviar reservación</span>
        </button>
      </div>
      <button className="hidden" ref={checkBtn} />
    </form>
  );
}

export default Reservaciones;

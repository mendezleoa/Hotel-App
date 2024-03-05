import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

  const [habitacion, setHabitacion] = useState("");
  const [capacidad, setCapacidad] = useState(1);
  const [fechaInit, setFechaInit] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeHabitacion = (e) => {
    const habitacion = e.target.value;
    setHabitacion(habitacion);
  };

  const onChangeCapacidad = (e) => {
    const capacidad = e.target.value;
    setCapacidad(capacidad);
  };

  const onChangeFechaInit = (e) => {
    const fechaInit = e.target.value;
    setFechaInit(fechaInit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const user = localStorage.getItem("user");
      ReservationService.newReservation(
        habitacion,
        capacidad,
        user,
        fechaInit
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
    <Form onSubmit={handleSubmit} ref={form}>
      <div className="form-group">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Habitación para seleccionar:
        </label>
        <Input
          type="text"
          placeholder="Habitacion"
          className="form-control"
          name="habitacion"
          value={habitacion}
          onChange={onChangeHabitacion}
          validations={[required]}
        />
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:grid-flow-col-dense">
          <div className="sm:m-1 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sm:mt-3">
              Cantidad de huéspedes:
            </label>
            <Input
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
            <Input
              className="form-control form-icon-trailing far fa-calendar datepicker-toggle-icon"
              type="date"
              name="Fecha de reserva"
              placeholder="Fecha de reserva"
              value={fechaInit}
              onChange={onChangeFechaInit}
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
          {loading && (
            <span className="spinner-border spinner-border-sm" />
          )}
          <span>Enviar reservación</span>
        </button>
      </div>
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
}

export default Reservaciones;

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeHabitacion = (e) => {
    const habitacion = e.target.value;
    setHabitacion(habitacion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      ReservationService.newReservation(habitacion).then(
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
          Campo:
        </label>
        <Input
          type="text"
          placeholder="Habitacion"
          className="form-control"
          name="habitacion"
          value={habitacion}
          onChange={onChangeHabitacion}
          validations={[required]}
        ></Input>
      </div>
      {message && (
        <div className="form-group mt-1">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
}

export default Reservaciones;

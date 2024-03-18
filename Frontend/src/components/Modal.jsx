import React, { useEffect } from "react";
import RoomForm from "../pages/RoomForm";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="px-2 sm:px-6 py-3">
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Agregar
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto sm:max-w-xl max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 dark:bg-gray-800 outline-none focus:outline-none">
                <div className="flex items-start justify-between px-4 pt-4 rounded-t">
                  <h3 className="text-3xl font-semibold">Agregar Habitación</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <RoomForm setShowModal={setShowModal} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

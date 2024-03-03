import Reservaciones from "../components/Reservaciones.jsx";

function Home() {
  return (
    <>
      <div className="bg-blue text-gray p-4">
        <h1 className="text-4xl">¡Hola, mundo!</h1>
      </div>
      <section>
        <div className="container fs-3">
          <h1>Elemento 1</h1>
        </div>
        <div className="container fs-5">
          <h1>Elemento 2</h1>
        </div>
        <div className="container fs-5">
          <h1>Elemento 3</h1>
        </div>
        <div className="container fs-6">
          <h1>Elemento 4</h1>
        </div>
      </section>
      <section className="container">
        <Reservaciones />
      </section>
    </>
  );
}

export default Home;

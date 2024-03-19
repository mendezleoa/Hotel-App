const Footer = () => {
  return (
    <footer className="mt-auto rounded-lg shadow m-4 dark:bg-gray-800 bg-gray-100">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center karma-regular dark:text-gray-400">
          © 2024 Hotel Bocconno™ . Todos los derechos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 karma-bold">
              Sobre nosotros
            </a>
          </li>
          <li>
            <a href="mailto:mendezmorenol@uvm.edu.ve" className="hover:underline karma-bold">
              Contacto: mendezmorenol@uvm.edu.ve
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((error) => {
        console.error("Error al obtener los blogs:", error);
      });
  }, []);

  const handleAddBlog = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { title: newBlog })
      .then((res) => {
        setBlogs([...blogs, res.data]);
        setNewBlog("");
      })
      .catch((error) => {
        console.error("Error al agregar el blog:", error);
      });
  };

  const handleDeleteBlog = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el blog:", error);
      });
  };

  return (
    <section className="text-gray-600 body-font dark:bg-gray-900 dark:text-white bg-gray-100 overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <input
            type="text"
            value={newBlog}
            onChange={(e) => setNewBlog(e.target.value)}
            className="border p-2 mb-4"
          />
          <button
            onClick={handleAddBlog}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Blog
          </button>
          {blogs?.map((item) => (
            <div className="py-8 flex flex-wrap md:flex-nowrap" key={item.id}>
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  CATEGORY
                </span>
                <span className="mt-1 text-gray-500 text-sm dark:text-gray-400">
                  {item.title}
                </span>
                <button
                  onClick={() => handleDeleteBlog(item.id)}
                  className="text-red-500 dark:text-red-400"
                >
                  Eliminar
                </button>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-200 title-font mb-2">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed">{item.body}</p>
                <a
                  href="#"
                  className="text-indigo-500 dark:text-indigo-400 inline-flex items-center mt-4"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;

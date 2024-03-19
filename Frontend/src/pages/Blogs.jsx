import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import BlogsService from "../services/blogs.service";
import AuthService from "../services/auth.service";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");

  const [dataUser, setDataUser] = useState(undefined);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await BlogsService.newBlog(data);
    const response = await BlogsService.getBlogs();
    setBlogs(response.blogs);
    reset();
  };

  useEffect(() => {
    async function fetchData() {
      const auth = AuthService.getUserData()
        .then((res) => {
          setDataUser(res.user);
        })
        .catch((error) => {
          console.log(error);
        });
      const response = await BlogsService.getBlogs();
      setBlogs(response.blogs);
    }
    fetchData();
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

  const handleDeleteBlog = async (id) => {
    await BlogsService.deleteBlog(id);
    const response = await BlogsService.getBlogs();
    setBlogs(response.blogs);
  };

  return (
    <section className="text-gray-600 body-font dark:bg-gray-900 dark:text-white bg-gray-100 overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {blogs?.map((item) => (
            <div className="py-8 flex flex-wrap md:flex-nowrap" key={item._id}>
              {dataUser?.rol && (
                <button
                  onClick={() => handleDeleteBlog(item._id)}
                  className="text-red-500 hover:bg-red-400 dark:hover:bg-red-500 dark:text-red-400 hover:text-slate-800 mr-4 font-bold py-2 px-4 rounded ease-linear transition-all duration-150"
                >
                  Eliminar
                </button>
              )}
              <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-200 title-font mb-2">
                {item.mensaje}
              </h2>
            </div>
          ))}
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              type="text"
              id="mensaje"
              name="mensaje"
              maxLength="50"
              {...register("mensaje", { required: true, maxLength: 150 })}
            />
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-blue-700 hover:text-slate-100 dark:text-gray-100 font-bold mt-2 py-2 px-4 rounded ease-linear transition-all duration-150"
              value="Agregar Blog"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

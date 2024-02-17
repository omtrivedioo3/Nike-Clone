import { nikeLogo } from "../assets/images"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const Login = async (e) => {
    e.preventDefault();

    const { email, password } =
      user;
    if (
       email &&
      password
    ) {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data1 = await res.json();
      // console.log(data);
      alert(data1.message);
      if (data1.success) navigate("/home");
      // history.push("/login");
    } else {
      alert("Invlid input");
    }
  };

  return (
    <section class="flex flex-col md:flex-row h-screen items-center">

  <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
    <img src={nikeLogo} alt="" class="w-full h-full object-cover"/>
  </div>

  <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div class="w-full h-100">


      <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

      <form class="mt-6" onSubmit={Login}>
        <div>
          <label class="block text-gray-700">Email Address</label>
          <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Enter Email Address" 
          value={user.email}
          onChange={handleChange}
          class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
        </div>

        <div 
        class="mt-4">
        <label class="block text-gray-700">Password</label>
        <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder="Enter Password" 
        value={user.password}
        onChange={handleChange}
        minLength="5" 
        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required/>
        </div>

     

        <button type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>

             <p class="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? {" "}
                  <button
                    type="submit"
                    style={{ padding: "0rem 2rem" }}
                    class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </button>
                </p>
      </form>

    </div>
  </div>

</section>
  )
}

export default Login
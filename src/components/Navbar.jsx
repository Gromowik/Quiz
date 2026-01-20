
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { currentUser, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login"); // 'login' or 'register'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-6 flex flex-wrap gap-8 items-center justify-between text-lg shadow-lg">
      <div className="flex gap-8 items-center">
        <Link to="/" className="hover:underline font-bold text-2xl tracking-wide">Home</Link>
        <Link to="/html" className="hover:underline text-xl">HTML</Link>
        <Link to="/css" className="hover:underline text-xl">CSS</Link>
        <Link to="/js" className="hover:underline text-xl">JavaScript</Link>
        <Link to="/react" className="hover:underline text-xl">React</Link>
         <Link to="/card-editor" className="hover:underline text-xl">CardEditor</Link>
      </div>
      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <span className="mr-4 text-xl font-semibold">{currentUser.email}</span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded text-lg font-semibold">Logout</button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-4 py-2 rounded text-black text-lg w-44 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-4 py-2 rounded text-black text-lg w-44 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded text-lg font-semibold">
              {mode === "login" ? "Login" : "Register"}
            </button>
            <button
              type="button"
              className="underline text-base ml-2"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Register?" : "Login?"}
            </button>
            {error && <span className="text-red-200 text-base ml-2">{error}</span>}
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

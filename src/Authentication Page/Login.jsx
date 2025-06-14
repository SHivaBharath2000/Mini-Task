import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import "./Login.css";
import { loginApi } from "../API/api";
import { useContext } from "react";
function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuth } = useContext(globalContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //Login the page
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(form);
      if (response.token) {
        sessionStorage.setItem("token", "true");
        alert("Login Successful");
        navigate("/users");
      } else {
        console.log("Login failed: No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <label>
          <input type="checkbox" name="remember-me" id="remember-me" />
          Remember me
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      
      // Store user data if available
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Login successful!");
      navigate("/map"); // Redirect to dashboard or home page
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
    // if (response.ok) {
    //   localStorage.setItem("token", data.token);
    //   navigate("/map"); // Redirect to Map page
    // }
    
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/Signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered user: " + form.name);
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name"
          value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup
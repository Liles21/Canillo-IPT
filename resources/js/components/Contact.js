import React, { useEffect, useState } from "react";
import "../../sass/Contacts.scss"; // path to the SCSS below

function Contact() {
  const API_URL = "/api/contacts";

  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fetch failed");
      setContacts(data);
    } catch (err) {
      console.error(err);
      setStatus("Error loading contacts");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      setStatus(editingId ? "Contact updated!" : "Contact added!");
      setForm({ name: "", email: "", message: "" });
      setEditingId(null);
      fetchContacts();
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  const handleEdit = (c) => {
    setForm({ name: c.name, email: c.email, message: c.message });
    setEditingId(c.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setStatus("Contact deleted!");
      fetchContacts();
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="page-contact">
      <h2 className="page-title">Contact Manager</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-submit">
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      {status && <p className="status-msg">{status}</p>}

      <h3 className="list-title">All Contacts</h3>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length ? (
            contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(c)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;

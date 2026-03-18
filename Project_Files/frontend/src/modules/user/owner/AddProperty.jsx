import React, { useState } from "react";
import api from "../../../api";

function AddProperty() {
  const [form, setForm] = useState({
    type: "",
    address: "",
    amount: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/owner/property", form);
      alert("Property added!");
    } catch (err) {
      alert("Error adding property");
    }
  };

  return (
    <div>
      <h2>Add Property</h2>

      <form onSubmit={submit}>
        <input
          name="type"
          placeholder="Property Type"
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="amount"
          placeholder="Rent Amount"
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="contact"
          placeholder="Contact"
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;

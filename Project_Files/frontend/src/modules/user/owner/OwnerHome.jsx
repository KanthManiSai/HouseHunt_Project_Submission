import React, { useEffect, useState } from "react";
import api from "../../../api";

function OwnerHome() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await api.get("/property");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <h2>My Properties</h2>

      {properties.length === 0 && <p>No properties yet</p>}

      {properties.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{p.type}</h3>
          <p>Address: {p.address}</p>
          <p>Rent: ₹{p.amount}</p>
          <p>Status: {p.isAvailable ? "Available" : "Booked"}</p>
        </div>
      ))}
    </div>
  );
}

export default OwnerHome;

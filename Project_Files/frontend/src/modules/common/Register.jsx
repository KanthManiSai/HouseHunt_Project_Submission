import { useState } from "react";
import API from "../../api";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("Please enter a valid email.");
      return false;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setError("");
      await API.post("/users/register", data);
      setLoading(false);
      alert("Registered successfully!");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Register</h2>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />

        <button
          onClick={submit}
          disabled={loading}
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div style={styles.footer}>
          <span style={styles.link} onClick={() => alert("Go to login")}>
            Already have an account? Login
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f093fb, #f5576c)",
    fontFamily: "Arial, sans-serif",
  },
  box: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#f5576c",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    marginBottom: "15px",
    color: "red",
    fontSize: "14px",
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#f5576c",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

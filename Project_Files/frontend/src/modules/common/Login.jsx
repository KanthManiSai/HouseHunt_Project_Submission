import { useState } from "react";
import API from "../../api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!data.email || !data.password) {
      setError("Both email and password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setError("");
      const res = await API.post("/users/login", data);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      alert("Login successful!");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>

        {error && <div style={styles.error}>{error}</div>}

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
          onClick={login}
          disabled={loading}
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={styles.footer}>
          <span style={styles.link} onClick={() => alert("Forgot password flow")}>
            Forgot password?
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
    background: "linear-gradient(135deg, #71b7e6, #9b59b6)",
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
    backgroundColor: "#9b59b6",
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
    color: "#9b59b6",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

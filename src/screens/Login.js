import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      navigate(`/`);
      setLoading(false);
      setError("");

      console.log(user);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="login">
      <div className="form">
        <form onSubmit={handleLogin}>
          <h3 className="form_title">Welcome</h3>
          {error && <MessageBox> {error} </MessageBox>}
          <div className="inputDiv">
            <input
              type="email"
              required
              className="inputInfo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className="inputDiv">
            <input
              type="password"
              className="inputInfo"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <div className="loginBtn">
            {loading ? <LoadingBox /> : <button type="submit"> Login</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!loginValue || !passwordValue) {
      toast.warning("Please fill in username and password.");
      return;
    }

    const ok = login(loginValue, passwordValue);
    if (!ok) {
      toast.error("Invalid username or password. Try admin / 1234");
      return;
    }

    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-2">Login</h3>
              <p className="text-muted mb-4">Demo: <b>admin</b> / <b>1234</b></p>

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    placeholder="admin"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="1234"
                  />
                </div>

                <button className="btn btn-primary w-100">Sign In</button>
              </form>

              <div className="small text-muted mt-3">
                * In a real project, passwords are not stored this way. This is an educational example.
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-3 mb-0">
            If you remain inactive for too long, the <b>Idle Timer</b> will automatically log you out.
          </div>
        </div>
      </div>
    </div>
  );
}

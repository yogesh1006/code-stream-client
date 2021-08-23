import { React,useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./signup.css";
// import { useAuth } from "../../Contexts";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { API } from "../../api";
import toast from "react-hot-toast";
import Loader from "react-loader-spinner";

export function Signup() {
  // const { authDispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${API}/auth/register`, values)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      setLoading(false);

      history.push("/login");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="loginform">
      <h1 className="title">SignUp</h1>
      <div className="input">
        <label htmlFor="username">Username </label>
        <input
          id="username"
          name="username"
          type="text"
          className="input-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          size={35}
        />
        {formik.touched.username && formik.errors.username ? (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="input">
        <label htmlFor="name">Name </label>
        <input
          id="name"
          name="name"
          type="text"
          className="input-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          size={35}
        />
        {formik.touched.name && formik.errors.name ? (
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="input">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          size={35}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="input-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          size={35}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
      </div>

      <button className="btn btn-dark" type="submit">
        Signup
      </button>

      <div className="login-link">
        <p>
          Already Registered?
          <NavLink to="/login">
            <span style={{ color: "InfoBackground" }}>Signin</span>{" "}
          </NavLink>
        </p>
      </div>
      {loading && (
        <div className="load">
          <Loader type="TailSpin" color="#ffffff" height={35} width={35} />
        </div>
        )
       }
    </form>
  );
}

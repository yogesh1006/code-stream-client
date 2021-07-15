import { React} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts";
import "./login.css";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import { API } from "../../api";
import toast from "react-hot-toast";


export function Login() {
    const {authState, authDispatch} = useAuth();
//   const { state } = useLocation();
  const history = useHistory();
 


  console.log(authState);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios.post(`${API}/auth/login`,values)
    .then((response) => {
      console.log(response);

      let data= response.data.data
      localStorage?.setItem("jwt", JSON.stringify({ isUserLoggedIn: true, token: data.token }))
      localStorage?.setItem("user",JSON.stringify({username:data.username}))
      toast.success(response.data.message);
      authDispatch({type:"LOGIN",payload:data.token})
      history.push("/");
  
    }).catch(err =>{
      toast.error(err.response.data.message);
    });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="login-page">
        <div>
          <h1>Signin</h1>
        </div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Submit</button>
        <div className="mt-4 tracking-wide">
          <p>
            Don't have an Account?<NavLink to="/register"> Signup</NavLink>
          </p>
        </div>
      </form>
    </>
  );
}

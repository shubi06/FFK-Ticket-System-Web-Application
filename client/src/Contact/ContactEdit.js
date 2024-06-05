import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5178/api/contact/${params.id}`
        );
        myFormik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContact();
  }, [id]);

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Please enter the name";
      }
      if (!values.email) {
        errors.email = "Please enter the email";
      }
      if (!values.message) {
        errors.message = "Please enter the message";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `http://localhost:5178/api/contact/${params.id}`,
          values
        );
        setLoading(false);
        navigate("/portal/contacts");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h3>Edit Contact: {params.id}</h3>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Name</label>
              <input
                name="name"
                value={myFormik.values.name}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${
                  myFormik.errors.name ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.name}</span>
            </div>
            <div className="col-lg-6">
              <label>Email</label>
              <input
                name="email"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                type="email"
                className={`form-control ${
                  myFormik.errors.email ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.email}</span>
            </div>
            <div className="col-lg-12">
              <label>Message</label>
              <textarea
                name="message"
                value={myFormik.values.message}
                onChange={myFormik.handleChange}
                className={`form-control ${
                  myFormik.errors.message ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.message}</span>
            </div>
            <div className="col-lg-4 mt-3">
              <input
                disabled={isLoading}
                type="submit"
                value={isLoading ? "Updating..." : "Update"}
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactEdit;

import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EkipaCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      emriKlubit: "",
      trajneri: "",
      vitiThemelimit: "",
      nrTitujve: "",
      logo: null,
    },
    validate: (values) => {
      let errors = {};
      if (!values.emriKlubit)
        errors.emriKlubit = "Ju lutem shkruani emrin e klubit";
      if (!values.trajneri)
        errors.trajneri = "Ju lutem shkruani emrin e trajnerit";
      if (!values.vitiThemelimit)
        errors.vitiThemelimit = "Ju lutem shkruani vitin e themelimit";
      if (!values.nrTitujve)
        errors.nrTitujve = "Ju lutem shkruani numrin e titujve";
      if (!values.logo) errors.logo = "Ju lutem ngarkoni një logo";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("EmriKlubit", values.emriKlubit);
        formData.append("Trajneri", values.trajneri);
        formData.append("VitiThemelimit", values.vitiThemelimit);
        formData.append("NrTitujve", values.nrTitujve);
        formData.append("file", values.logo);

        console.log("Form Data: ", formData); // Debug log to check formData

        const response = await axios.post(
          "http://localhost:5178/api/Ekipa",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Server Response: ", response); // Debug log to check server response

        navigate("/portal/ekipa-list");
      } catch (error) {
        console.error("Error during form submission:", error);
        if (error.response) {
          console.error("Server Error Response: ", error.response); // Debug log to check server error response
          console.error("Error Data: ", error.response.data); // Log the error data from the server
          alert(
            "Failed to create Ekipa: " + JSON.stringify(error.response.data)
          );
        } else {
          alert("Failed to create Ekipa: " + error.message);
        }
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Emri Klubit</label>
            <input
              name="emriKlubit"
              value={formik.values.emriKlubit}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${
                formik.errors.emriKlubit ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.emriKlubit}</span>
          </div>

          <div className="col-lg-6">
            <label>Trajneri</label>
            <input
              name="trajneri"
              value={formik.values.trajneri}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${
                formik.errors.trajneri ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.trajneri}</span>
          </div>

          <div className="col-lg-6">
            <label>Viti Themelimit</label>
            <input
              name="vitiThemelimit"
              value={formik.values.vitiThemelimit}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.vitiThemelimit ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.vitiThemelimit}</span>
          </div>

          <div className="col-lg-6">
            <label>Nr Titujve</label>
            <input
              name="nrTitujve"
              value={formik.values.nrTitujve}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.nrTitujve ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.nrTitujve}</span>
          </div>

          <div className="col-lg-4 mt-3">
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Submitting..." : "Create"}
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EkipaCreate;
import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EkipaCreate() {
  const [isLoading, setLoading] = useState(false);
  const [superligaList, setSuperligaList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuperliga = async () => {
      try {
        const response = await axios.get("http://localhost:5178/api/Superliga");
        setSuperligaList(response.data);
      } catch (error) {
        console.error("Failed to fetch Superliga", error);
      }
    };
    fetchSuperliga();
  }, []);

  const formik = useFormik({
    initialValues: {
      emriKlubit: "",
      trajneri: "",
      vitiThemelimit: "",
      nrTitujve: "",
      superligaId: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.emriKlubit) errors.emriKlubit = "Please enter the club name";
      if (!values.trajneri) errors.trajneri = "Please enter the coach name";
      if (!values.vitiThemelimit) errors.vitiThemelimit = "Please enter the founding year";
      if (!values.nrTitujve) errors.nrTitujve = "Please enter the number of titles";
      if (!values.superligaId) errors.superligaId = "Please select a superliga";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:5178/api/Ekipa", values);
        navigate("/portal/ekipa-list");
      } catch (error) {
        console.error("Error during form submission:", error);
        alert("Failed to create Ekipa: " + (error.response ? JSON.stringify(error.response.data) : error.message));
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Club Name</label>
            <input
              name="emriKlubit"
              value={formik.values.emriKlubit}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${formik.errors.emriKlubit ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{formik.errors.emriKlubit}</span>
          </div>
          <div className="col-lg-6">
            <label>Coach</label>
            <input
              name="trajneri"
              value={formik.values.trajneri}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${formik.errors.trajneri ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{formik.errors.trajneri}</span>
          </div>
          <div className="col-lg-6">
            <label>Founding Year</label>
            <input
              name="vitiThemelimit"
              value={formik.values.vitiThemelimit}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${formik.errors.vitiThemelimit ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{formik.errors.vitiThemelimit}</span>
          </div>
          <div className="col-lg-6">
            <label>Number of Titles</label>
            <input
              name="nrTitujve"
              value={formik.values.nrTitujve}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${formik.errors.nrTitujve ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{formik.errors.nrTitujve}</span>
          </div>
          <div className="col-lg-6">
            <label>Superliga</label>
            <select
              name="superligaId"
              onChange={formik.handleChange}
              value={formik.values.superligaId}
              className={`form-control ${formik.errors.superligaId ? "is-invalid" : ""}`}
            >
              <option value="">Select Superliga</option>
              {superligaList.map((superliga) => (
                <option key={superliga.id} value={superliga.id}>
                  {superliga.emri}
                </option>
              ))}
            </select>
            {formik.errors.superligaId ? (
              <div className="invalid-feedback">{formik.errors.superligaId}</div>
            ) : null}
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

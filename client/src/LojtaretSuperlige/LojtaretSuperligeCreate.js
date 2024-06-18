import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LojtaretSuperligeCreate() {
  const [isLoading, setLoading] = useState(false);
  const [superligaList, setSuperligaList] = useState([]);
  const [ekipaList, setEkipaList] = useState([]);
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

    const fetchEkipa = async () => {
      try {
        const response = await axios.get("http://localhost:5178/api/Ekipa");
        setEkipaList(response.data);
      } catch (error) {
        console.error("Failed to fetch Ekipa", error);
      }
    };
    fetchEkipa();
  }, []);

  const formik = useFormik({
    initialValues: {
      emri: "",
      mbiemri: "",
      mosha: "",
      pozicioni: "",
      gola: "",
      asiste: "",
      nrFaneles: "",
      superligaID: "",
      ekipaId: "",
      foto: null,
    },
    validate: (values) => {
      let errors = {};
      if (!values.emri) errors.emri = "Ju lutem shkruani emrin e lojtarit";
      if (!values.mbiemri)
        errors.mbiemri = "Ju lutem shkruani mbiemrin e lojtarit";
      if (!values.mosha) errors.mosha = "Ju lutem shkruani moshen e lojtarit";
      if (!values.pozicioni)
        errors.pozicioni = "Ju lutem shkruani pozicionin e lojtarit";
      if (!values.gola) errors.gola = "Ju lutem shkruani golat e lojtarit";
      if (!values.asiste)
        errors.asiste = "Ju lutem shkruani asistet e lojtarit";
      if (!values.nrFaneles)
        errors.nrFaneles = "Ju lutem shkruani nrFaneles se lojtarit";
      if (!values.superligaID)
        errors.superligaID = "Ju lutem zgjidhni një superliga";
      if (!values.ekipaId) errors.ekipaId = "Ju lutem zgjidhni një ekip";
      if (!values.foto) errors.foto = "Ju lutem ngarkoni një foto";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        formData.append("file", values.foto); // Shtoni këtë linjë për të përfshirë skedarin

        const response = await axios.post(
          "http://localhost:5178/api/LojtaretSuperlige",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setLoading(false);
        navigate("/portal/lojtaret-superlige-list"); // Rruga e saktë për ridrejtim
      } catch (error) {
        console.error("Error during form submission:", error);
        if (error.response) {
          console.error("Server Error Response: ", error.response);
          console.error("Error Data: ", error.response.data);
          alert(
            "Failed to create Lojtari: " + JSON.stringify(error.response.data)
          );
        } else {
          alert("Failed to create Lojtari: " + error.message);
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
            <label>Emri</label>
            <input
              name="emri"
              value={formik.values.emri}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${
                formik.errors.emri ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.emri}</span>
          </div>

          <div className="col-lg-6">
            <label>Mbiemri</label>
            <input
              name="mbiemri"
              value={formik.values.mbiemri}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${
                formik.errors.mbiemri ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.mbiemri}</span>
          </div>

          <div className="col-lg-6">
            <label>Mosha</label>
            <input
              name="mosha"
              value={formik.values.mosha}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.mosha ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.mosha}</span>
          </div>

          <div className="col-lg-6">
            <label>Pozicioni</label>
            <input
              name="pozicioni"
              value={formik.values.pozicioni}
              onChange={formik.handleChange}
              type="text"
              className={`form-control ${
                formik.errors.pozicioni ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.pozicioni}</span>
          </div>

          <div className="col-lg-6">
            <label>Golat</label>
            <input
              name="gola"
              value={formik.values.gola}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.gola ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.gola}</span>
          </div>

          <div className="col-lg-6">
            <label>Asistet</label>
            <input
              name="asiste"
              value={formik.values.asiste}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.asiste ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.asiste}</span>
          </div>

          <div className="col-lg-6">
            <label>NrFaneles</label>
            <input
              name="nrFaneles"
              value={formik.values.nrFaneles}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.nrFaneles ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.nrFaneles}</span>
          </div>

          <div className="col-lg-6">
            <label htmlFor="superligaID">Superliga</label>
            <select
              id="superligaID"
              name="superligaID"
              onChange={formik.handleChange}
              value={formik.values.superligaID}
              className={`form-control ${
                formik.errors.superligaID ? "is-invalid" : ""
              }`}
            >
              <option value="">Select Superliga</option>
              {superligaList.map((superliga) => (
                <option key={superliga.id} value={superliga.id}>
                  {superliga.emri}
                </option>
              ))}
            </select>
            {formik.errors.superligaID ? (
              <div className="invalid-feedback">
                {formik.errors.superligaID}
              </div>
            ) : null}
          </div>

          <div className="col-lg-6">
            <label htmlFor="ekipaId">Ekipi</label>
            <select
              id="ekipaId"
              name="ekipaId"
              onChange={formik.handleChange}
              value={formik.values.ekipaId}
              className={`form-control ${
                formik.errors.ekipaId ? "is-invalid" : ""
              }`}
            >
              <option value="">Select Ekipi</option>
              {ekipaList.map((ekipa) => (
                <option key={ekipa.id} value={ekipa.id}>
                  {ekipa.emriKlubit}
                </option>
              ))}
            </select>
            {formik.errors.ekipaId ? (
              <div className="invalid-feedback">{formik.errors.ekipaId}</div>
            ) : null}
          </div>

          <div className="col-lg-6">
            <label>Foto</label>
            <input
              name="foto"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("foto", event.currentTarget.files[0]);
              }}
              className={`form-control ${
                formik.errors.foto ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.foto}</span>
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

export default LojtaretSuperligeCreate;

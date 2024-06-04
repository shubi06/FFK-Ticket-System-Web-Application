// src/components/KontabilitetiEdit.js
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function KontabilitetiEdit() {
  const params = useParams();
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchStaff();
    fetchKontabiliteti();
  }, [id]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Stafi");
      setStaffList(response.data);
    } catch (error) {
      console.error("Failed to fetch staff", error);
    }
  };

  const fetchKontabiliteti = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5178/api/Kontabiliteti/${params.id}`
      );
      console.log("Fetched data:", response.data);
      myFormik.setValues({
        stafiId: response.data.stafi.id,
        shpenzimetPershkrimi: response.data.shpenzimet.pershkrimi,
        data: response.data.data.split("T")[0],
        shumaTotale: response.data.shumaTotale,
      });
    } catch (error) {
      console.error("Error fetching Kontabiliteti data", error);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      stafiId: "",
      shpenzimetPershkrimi: "",
      data: "",
      shumaTotale: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.stafiId) errors.stafiId = "Ju lutem zgjidhni një staf";
      if (!values.shpenzimetPershkrimi)
        errors.shpenzimetPershkrimi =
          "Ju lutem shkruani përshkrimin e shpenzimeve";
      if (!values.data) errors.data = "Ju lutem shkruani datën";
      if (!values.shumaTotale)
        errors.shumaTotale = "Ju lutem shkruani shumën totale";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("Submitting values:", values);

        const response = await axios.put(
          `http://localhost:5178/api/Kontabiliteti/${params.id}`,
          {
            stafiId: values.stafiId,
            shpenzimetPershkrimi: values.shpenzimetPershkrimi,
            data: values.data,
            shumaTotale: values.shumaTotale,
          }
        );
        console.log("Response:", response);
        setLoading(false);
        navigate("/portal/kontabiliteti-list");
      } catch (error) {
        console.log("Error submitting form:", error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h3>Kontabiliteti Edit: {params.id} </h3>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Stafi</label>
              <select
                name="stafiId"
                value={myFormik.values.stafiId}
                onChange={myFormik.handleChange}
                className={`form-control ${
                  myFormik.errors.stafiId ? "is-invalid" : ""
                }`}
              >
                <option value="">Zgjidhni Stafi</option>
                {staffList.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.emri} {staff.mbiemri}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>{myFormik.errors.stafiId}</span>
            </div>

            <div className="col-lg-6">
              <label>Shpenzimet</label>
              <input
                name="shpenzimetPershkrimi"
                value={myFormik.values.shpenzimetPershkrimi}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${
                  myFormik.errors.shpenzimetPershkrimi ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>
                {myFormik.errors.shpenzimetPershkrimi}
              </span>
            </div>

            <div className="col-lg-6">
              <label>Data</label>
              <input
                name="data"
                value={myFormik.values.data}
                onChange={myFormik.handleChange}
                type="date"
                className={`form-control ${
                  myFormik.errors.data ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.data}</span>
            </div>

            <div className="col-lg-6">
              <label>Shuma Totale</label>
              <input
                name="shumaTotale"
                value={myFormik.values.shumaTotale}
                onChange={myFormik.handleChange}
                type="number"
                className={`form-control ${
                  myFormik.errors.shumaTotale ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>
                {myFormik.errors.shumaTotale}
              </span>
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

export default KontabilitetiEdit;

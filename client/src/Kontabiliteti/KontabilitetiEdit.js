// src/components/KontabilitetiEdit.js
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function KontabilitetiEdit() {
  const params = useParams();
  const [staffList, setStaffList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStaffAndExpenses = async () => {
      try {
        const staffResponse = await axios.get(
          "http://localhost:5178/api/Stafi"
        );
        setStaffList(staffResponse.data);
        const expensesResponse = await axios.get(
          "http://localhost:5178/api/Shpenzimet"
        );
        setExpensesList(expensesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    const fetchKontabiliteti = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5178/api/Kontabiliteti/${params.id}`
        );
        myFormik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching Kontabiliteti data", error);
      }
    };

    fetchStaffAndExpenses();
    fetchKontabiliteti();
  }, [id]);

  const myFormik = useFormik({
    initialValues: {
      stafiId: "",
      shpenzimetId: "",
      data: "",
      shumaTotale: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.stafiId) errors.stafiId = "Ju lutem zgjidhni një staf";
      if (!values.shpenzimetId)
        errors.shpenzimetId = "Ju lutem zgjidhni një shpenzim";
      if (!values.data) errors.data = "Ju lutem shkruani datën";
      if (!values.shumaTotale)
        errors.shumaTotale = "Ju lutem shkruani shumën totale";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `http://localhost:5178/api/Kontabiliteti/${params.id}`,
          values
        );
        setLoading(false);
        navigate("/portal/kontabiliteti-list");
      } catch (error) {
        console.log(error);
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
              <select
                name="shpenzimetId"
                value={myFormik.values.shpenzimetId}
                onChange={myFormik.handleChange}
                className={`form-control ${
                  myFormik.errors.shpenzimetId ? "is-invalid" : ""
                }`}
              >
                <option value="">Zgjidhni Shpenzimet</option>
                {expensesList.map((expense) => (
                  <option key={expense.id} value={expense.id}>
                    {expense.pershkrimi}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>
                {myFormik.errors.shpenzimetId}
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

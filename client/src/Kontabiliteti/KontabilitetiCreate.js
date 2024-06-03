// src/components/KontabilitetiCreate.js
import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KontabilitetiCreate() {
  const [isLoading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const navigate = useNavigate();

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
        console.error("Failed to fetch staff or expenses", error);
      }
    };
    fetchStaffAndExpenses();
  }, []);

  const formik = useFormik({
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
        const response = await axios.post(
          "http://localhost:5178/api/Kontabiliteti",
          values
        );
        console.log("Server Response: ", response);
        navigate("/portal/kontabiliteti-list");
      } catch (error) {
        console.error("Error during form submission:", error);
        if (error.response) {
          alert(
            "Failed to create Kontabiliteti: " +
              JSON.stringify(error.response.data)
          );
        } else {
          alert("Failed to create Kontabiliteti: " + error.message);
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
            <label>Stafi</label>
            <select
              name="stafiId"
              value={formik.values.stafiId}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.errors.stafiId ? "is-invalid" : ""
              }`}
            >
              <option value="">Zgjidhni Stafi</option>
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.emri} {staff.mbiemri}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{formik.errors.stafiId}</span>
          </div>

          <div className="col-lg-6">
            <label>Shpenzimet</label>
            <select
              name="shpenzimetId"
              value={formik.values.shpenzimetId}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.errors.shpenzimetId ? "is-invalid" : ""
              }`}
            >
              <option value="">Zgjidhni Shpenzimet</option>
              {expensesList.map((expense) => (
                <option key={expense.id} value={expense.id}>
                  {expense.pershkrimi}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{formik.errors.shpenzimetId}</span>
          </div>

          <div className="col-lg-6">
            <label>Data</label>
            <input
              name="data"
              value={formik.values.data}
              onChange={formik.handleChange}
              type="date"
              className={`form-control ${
                formik.errors.data ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.data}</span>
          </div>

          <div className="col-lg-6">
            <label>Shuma Totale</label>
            <input
              name="shumaTotale"
              value={formik.values.shumaTotale}
              onChange={formik.handleChange}
              type="number"
              className={`form-control ${
                formik.errors.shumaTotale ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{formik.errors.shumaTotale}</span>
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

export default KontabilitetiCreate;

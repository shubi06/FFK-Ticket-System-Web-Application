import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StafiDelete() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStafiData();
  }, []);

  let getStafiData = async () => {
    try {
      const stafi = await axios.get(
        `http://localhost:5178/api/Stafi/${params.id}`
      );
      myFormik.setValues(stafi.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStafi = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5178/api/Stafi/${params.id}`);
      setLoading(false);
      navigate("/portal/stafi-list");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      emri: "",
      mbiemri: "",
      pozita: "",
      paga: "",
      email: "",
      telefoni: "",
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`http://localhost:5178/api/Stafi/${params.id}`, values);
        setLoading(false);
        navigate("/portal/stafi-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h3>StafiEdit - Id : {params.id} </h3>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          {/* Fushat e formës */}
          <button
            type="button"
            onClick={deleteStafi}
            className="btn btn-danger mr-2"
          >
            Fshij
          </button>
          <input
            disabled={isLoading}
            type="submit"
            value={isLoading ? "Updating..." : "Update"}
            className=" btn btn-primary"
          />
        </form>
      </div>
    </>
  );
}

export default StafiDelete;

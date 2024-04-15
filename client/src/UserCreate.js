import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function  UserCreate(){
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const myFormik = useFormik(
        {
          initialValues: {
            emri: "",
            sponzori: "",
            numriSkuadrave: "",
          },

          // Validating Forms while entering the data
      validate: (values) => {
        let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

        if (!values.emri) {
          errors.emri = "Ju lutem shkruani emrin";
        }

        if (!values.sponzori) {
            errors.sponzori = "Ju lutem shkruani sponzorin";
          }

          if (!values.numriSkuadrave) {
            errors.numriSkuadrave = "Ju lutem vendosni nr e skuadrave";
          } 
     

     

        return errors;
      },

      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("http://localhost:5178/api/Superliga", values);
          navigate("/portal/user-list");
        } catch (error) {
          console.log(error);
          alert("Validation failed");
          setLoading(false);
        }

        console.log(values);
      }

    });

    return (
        <div className='container'>
    
          <form onSubmit={myFormik.handleSubmit}>
            <div className='row'>
              <div className="col-lg-6">
                <label>Emri</label>
                <input name='emri' value={myFormik.values.emri} onChange={myFormik.handleChange} type={"text"}
                  className={`form-control ${myFormik.errors.emri ? "is-invalid" : ""} `} />
                <span style={{ color: "red" }}>{myFormik.errors.emri}</span>
              </div>


              <div className="col-lg-6">
            <label>Sponzori</label>
            <input name='sponzori' value={myFormik.values.sponzori} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.sponzori ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.sponzori}</span>
          </div>


          <div className="col-lg-6">
            <label>numriSkuadrave</label>
            <input name='numriSkuadrave' value={myFormik.values.numriSkuadrave} onChange={myFormik.handleChange} type={"int"}
              className={`form-control ${myFormik.errors.numriSkuadrave ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.numriSkuadrave}</span>
          </div>

          <div className='col-lg-4 mt-3'>
            <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Create"} className=' btn btn-primary' />
          </div>
        </div>
      </form>
      {/* {JSON.stringify(myFormik.values)} */}
    </div>
  );
}

export default UserCreate
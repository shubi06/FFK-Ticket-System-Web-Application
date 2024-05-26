import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function StadiumiCreate(){
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [kombetarjaList, setKombetarjaList] = useState([]);


    useEffect(() => {
                 const fetchKombetarja = async () => {
                    try {
                        const response = await axios.get('http://localhost:5178/api/Kombetarja');
                        setKombetarjaList(response.data);
                     } catch (error) {
                         console.error('Failed to fetch kombetarja', error);
                     }
                 };
                 fetchKombetarja();
             }, []);
    const myFormik = useFormik(
        {
          initialValues: {
            emri: "",
            kapaciteti: "",
            vitiNdertuar: "",
            kombetarjaID:""

          },

          // Validating Forms while entering the data
      validate: (values) => {
        let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

        if (!values.emri) {
          errors.emri = "Please enter name";
        } else if (values.emri.length < 2) {
          errors.emri = "Name shouldn't be less than 3 letters";
        } else if (values.emri.length > 20) {
          errors.emri = "Name shouldn't be more than 20 letters";
        }

          if (!values.kapaciteti) {
            errors.mosha = "Ju lutem vendosni kapacitetin";
          } else if (isNaN(values.kapaciteti)) {
            errors.mosha = "Kapaciteti duhet të jetë një numër";
          } 

          if (!values.vitiNdertuar) {
            errors.vitiNdertuar = "Ju lutem vendosni vitin e ndertimit";
          }     

        return errors;
      },

      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("http://localhost:5178/api/Stadiumi", values);
          navigate("/portal/stadiumi-list");
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
            <label>Kapaciteti</label>
            <input name='kapaciteti' value={myFormik.values.kapaciteti} onChange={myFormik.handleChange} type={"int"}
              className={`form-control ${myFormik.errors.kapaciteti ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.kapaciteti}</span>
          </div>


          <div className="col-lg-6">
            <label>Viti Ndertimit</label>
            <input name='vitiNdertuar' value={myFormik.values.vitiNdertuar} onChange={myFormik.handleChange} type={"int"}
              className={`form-control ${myFormik.errors.vitiNdertuar ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.vitiNdertuar}</span>
          </div>

          
          <div className='form-group'>
                     <label htmlFor='kombetarjaID'>Kombetarja</label>
                     <select
                         id='kombetarjaID'
                         name='kombetarjaID'
                         onChange={myFormik.handleChange}
                         value={myFormik.values.kombetarjaID}
                         className={`form-control ${myFormik.errors.kombetarjaID ? 'is-invalid' : ''}`}
                     >
                         <option value="">Select Kombetarja</option>
                         {kombetarjaList.map(kombetarja => (
                             <option key={kombetarja.id} value={kombetarja.id}>
                                 {kombetarja.emri}
                             </option>
                         ))}
                     </select>
                     {myFormik.errors.kombetarjaID ? <div className='invalid-feedback'>{myFormik.errors.kombetarjaID}</div> : null}
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

export default StadiumiCreate


















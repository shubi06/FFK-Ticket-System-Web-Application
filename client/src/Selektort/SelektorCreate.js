import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function SelektorCreate(){
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
            mbiemri: "",
            mosha: "",
            nacionaliteti:"",
            vitetEKontrates:"",
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

        if (!values.mbiemri) {
            errors.mbiemri = "Please enter surname";
          } else if (values.mbiemri.length < 2) {
            errors.mbiemri = "Name shouldn't be less than 3 letters";
          } else if (values.emri.length > 20) {
            errors.mbiemri = "Name shouldn't be more than 20 letters";
          }

          if (!values.mosha) {
            errors.mosha = "Ju lutem vendosni moshën";
          } else if (isNaN(values.mosha)) {
            errors.mosha = "Moshë duhet të jetë një numër";
          } else if (parseInt(values.mosha) < 18) {
            errors.mosha = "Ju duhet të jeni mbi 18 vjeç për të regjistruar";
          }

          if (!values.vitetEKontrates) {
            errors.vitetEKontrates = "Ju lutem vendosni moshën";
          }
          
          if (!values.nacionaliteti) {
            errors.nacionaliteti = "Please enter surname";
          } else if (values.nacionaliteti.length < 2) {
            errors.nacionaliteti = "Name shouldn't be less than 3 letters";
          } else if (values.nacionaliteti.length > 20) {
            errors.nacionaliteti = "Name shouldn't be more than 20 letters";
          }

     

        return errors;
      },

      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("http://localhost:5178/api/Selektori", values);
          navigate("/portal/selektor-list");
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
            <label>Mbiemri</label>
            <input name='mbiemri' value={myFormik.values.mbiemri} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.mbiemri ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.mbiemri}</span>
          </div>


          <div className="col-lg-6">
            <label>Mosha</label>
            <input name='mosha' value={myFormik.values.mosha} onChange={myFormik.handleChange} type={"int"}
              className={`form-control ${myFormik.errors.mosha ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.mosha}</span>
          </div>

          <div className="col-lg-6">
            <label>Nacionaiteti</label>
            <input name='nacionaliteti' value={myFormik.values.nacionaliteti} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.nacionaliteti ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.nacionaliteti}</span>
          </div>

          <div className="col-lg-6">
            <label>Vitet e Kontrates</label>
            <input name='vitetEKontrates' value={myFormik.values.vitetEKontrates} onChange={myFormik.handleChange} type={"number"}
              className={`form-control ${myFormik.errors.vitetEKontrates ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.vitetEKontrates}</span>
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

export default SelektorCreate


















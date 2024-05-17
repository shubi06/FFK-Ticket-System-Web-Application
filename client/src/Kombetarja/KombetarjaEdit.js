import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function KombetarjaEdit() {
    const params = useParams();
    const [shtetiList, setShtetiList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const fetchShteti = async () => {
          try {
            const response = await axios.get("http://localhost:5178/api/Shteti");
            setShtetiList(response.data);
          } catch (error) {
            console.error('Error fetching Shteti data:', error);
          }
        };
    
        const fetchKombetarja = async () => {
          try {
            const response = await axios.get(`http://localhost:5178/api/Kombetarja/${params.id}`);
            myFormik.setValues(response.data);
          } catch (error) {
            console.error('Error fetching Kombetarja data:', error);
          }
        };
    
        fetchShteti();
        fetchKombetarja();
      }, [id]);
 

    const myFormik = useFormik({
        initialValues: {
            emri: "",
            shtetiID: "",
         
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

            if (!values.emri) {
              errors.emri = "Ju lutem shkruani emrin";
            }
    
            if (!values.shtetiID) {
                errors.shtetiID = "Ju lutem shkruani sponzorin";
              }
         
    
            return errors;
        },

        onSubmit: async (values) => {
            try { 
                setLoading(true);
                await axios.put(`http://localhost:5178/api/Kombetarja/${params.id}`, values);
                setLoading(false);
                navigate("/portal/kombetarja-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>KOMBETARJA Edit : {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Emri</label>
                            <input name='emri' value={myFormik.values.emri} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.emri ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.emri}</span>
                        </div>

                        {/* <div className="col-lg-6">
                            <label>SHTETI</label>
                            <input name='sponzori' value={myFormik.values.sponzori} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.sponzori ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.sponzori}</span>
                        </div>
                     */}
       

                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(myFormik.values)} */}
            </div>
        </>


    )
}

export default KombetarjaEdit

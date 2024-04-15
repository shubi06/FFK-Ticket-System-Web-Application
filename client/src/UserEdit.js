/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UserEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getUserData()
    }, [])

    let getUserData = async () => {
        try {
            const user = await axios.get(`http://localhost:5178/api/Superliga/${params.id}`);
            myFormik.setValues(user.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            emri: "",
            sponzori: "",
           numriSkuadrave: ""
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
                await axios.put(`http://localhost:5178/api/Superliga/${params.id}`, values);
                setLoading(false);
                navigate("/portal/user-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>SUPERLIGA Edit : {params.id} </h3>
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
                            <label>NrSkuadrave</label>
                            <input name='numriSkuadrave' value={myFormik.values.numriSkuadrave} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.numriSkuadrave ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.numriSkuadrave}</span>
                        </div>

                    

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

export default UserEdit
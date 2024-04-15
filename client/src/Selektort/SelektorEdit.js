import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function SelektorEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getSelektorData()
    }, [])

    let getSelektorData = async () => {
        try {
            const selektor = await axios.get(`http://localhost:5178/api/Selektori/${params.id}`);
            myFormik.setValues(selektor.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            emri: "",
            mbiemri: "",
            mosha: "",
        },
        validate: (values) => {
            let errors = {}   

            if (!values.emri) {
                errors.emri = "Please enter name";
            } else if (values.emri.length < 3) {
                errors.emri = "Name shouldn't be less than 3 letters";
            } else if (values.emri.length > 20) {
                errors.emri = "Name shouldn't be more than 20 letters";
            }

            if (!values.mbiemri) {
                errors.mbiemri = "Please enter surname";
            } else if (values.mbiemri.length < 3) {
                errors.mbiemri = "Surname shouldn't be less than 3 letters";
            } else if (values.mbiemri.length > 20) {
                errors.mbiemri = "Surname shouldn't be more than 20 letters";
            }

            if (!values.mosha) {
                errors.mosha = "Please enter age";
            } else if (isNaN(values.mosha)) {
                errors.mosha = "Age must be a number";
            } else if (parseInt(values.mosha) < 18) {
                errors.mosha = "You must be over 18 years old to register";
            }

            return errors;
        },
      
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`http://localhost:5178/api/Selektori/${params.id}`, values);
                setLoading(false);
                navigate("/portal/selektor-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
        

    return (
        <>
            <h3>SelektorEdit - Id : {params.id} </h3>
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
                            <input name='mosha' value={myFormik.values.mosha} onChange={myFormik.handleChange} type={"number"}
                                className={`form-control ${myFormik.errors.mosha ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.mosha}</span>
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

export default SelektorEdit
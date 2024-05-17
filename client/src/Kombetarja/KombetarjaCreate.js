// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function KombetarjaCreate() {
//     const [isLoading, setLoading] = useState(false);
//     const [shtetiList, setShtetiList] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchShteti = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5178/api/Shteti');
//                 setShtetiList(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch shteti', error);
//             }
//         };
//         fetchShteti();
//     }, []);

    // const formik = useFormik({
    //     initialValues: {
    //         emri: "",
    //         shtetiID: ""
    //     },
    //     validate: values => {
    //         let errors = {};
    //         if (!values.emri) {
    //             errors.emri = "Ju lutem shkruani emrin e kombetarjes";
    //         }
    //         if (!values.shtetiID) {
    //             errors.shtetiID = "Ju lutem zgjidhni një shtet";
    //         }
    //         return errors;
    //     },
    //     onSubmit: async values => {
    //         try {
    //             setLoading(true);
    //             const payload = {
    //                 ...values,
    //                 shtetiID: parseInt(values.shtetiID) // Ensure shtetiID is sent as an integer
    //             };
    //             await axios.post("http://localhost:5178/api/Kombetarja", payload);
    //             navigate("/portal/kombetarja-list");
    //         } catch (error) {
    //             console.error("Error during form submission:", error);
    //             alert("Failed to create Kombetarja: " + error.message);
    //             setLoading(false);
    //         }
    //     }
    // });

//     return (
//         <div className='container'>
//             <h3>Create Kombetarja</h3>
//             <form onSubmit={formik.handleSubmit}>
//                 <div className='form-group'>
//                     <label htmlFor='emri'>Emri</label>
//                     <input
//                         id='emri'
//                         name='emri'
//                         type='text'
//                         onChange={formik.handleChange}
//                         value={formik.values.emri}
//                         className={`form-control ${formik.errors.emri ? 'is-invalid' : ''}`}
//                     />
//                     {formik.errors.emri ? <div className='invalid-feedback'>{formik.errors.emri}</div> : null}
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='shtetiID'>Shteti</label>
//                     <select
//                         id='shtetiID'
//                         name='shtetiID'
//                         onChange={formik.handleChange}
//                         value={formik.values.shtetiID}
//                         className={`form-control ${formik.errors.shtetiID ? 'is-invalid' : ''}`}
//                     >
//                         <option value="">Select Shteti</option>
//                         {shtetiList.map(shteti => (
//                             <option key={shteti.id} value={shteti.id}>
//                                 {shteti.emri}
//                             </option>
//                         ))}
//                     </select>
//                     {formik.errors.shtetiID ? <div className='invalid-feedback'>{formik.errors.shtetiID}</div> : null}
//                 </div>
//                 <button type='submit' className='btn btn-primary' disabled={isLoading}>
//                     {isLoading ? 'Creating...' : 'Create'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default KombetarjaCreate;
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KombetarjaCreate() {
    const [isLoading, setLoading] = useState(false);
    const [shtetiList, setShtetiList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
                 const fetchShteti = async () => {
                    try {
                        const response = await axios.get('http://localhost:5178/api/Shteti');
                         setShtetiList(response.data);
                     } catch (error) {
                         console.error('Failed to fetch shteti', error);
                     }
                 };
                 fetchShteti();
             }, []);

             const formik = useFormik({
                initialValues: {
                    emri: "",
                    shtetiID: ""
                },
                validate: values => {
                    let errors = {};
                    if (!values.emri) {
                        errors.emri = "Ju lutem shkruani emrin e kombetarjes";
                    }
                    if (!values.shtetiID) {
                        errors.shtetiID = "Ju lutem zgjidhni një shtet";
                    }
                    return errors;
                },
                onSubmit: async values => {
                    try {
                        setLoading(true);
                        const payload = {
                            ...values,
                            shtetiID: parseInt(values.shtetiID) // Ensure shtetiID is sent as an integer
                        };
                        await axios.post("http://localhost:5178/api/Kombetarja", payload);
                        navigate("/portal/kombetarja-list");
                    } catch (error) {
                        console.error("Error during form submission:", error);
                        alert("Failed to create Kombetarja: " + error.message);
                        setLoading(false);
                    }
                }
            });


    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className="col-lg-6">
                        <label>Emri</label>
                        <input 
                            name='emri' 
                            value={formik.values.emri} 
                            onChange={formik.handleChange} 
                            type={"text"}
                            className={`form-control ${formik.errors.emri ? "is-invalid" : ""}`} />
                        <span style={{ color: "red" }}>{formik.errors.emri}</span>
                    </div>

                    <div className='form-group'>
                     <label htmlFor='shtetiID'>Shteti</label>
                     <select
                         id='shtetiID'
                         name='shtetiID'
                         onChange={formik.handleChange}
                         value={formik.values.shtetiID}
                         className={`form-control ${formik.errors.shtetiID ? 'is-invalid' : ''}`}
                     >
                         <option value="">Select Shteti</option>
                         {shtetiList.map(shteti => (
                             <option key={shteti.id} value={shteti.id}>
                                 {shteti.emri}
                             </option>
                         ))}
                     </select>
                     {formik.errors.shtetiID ? <div className='invalid-feedback'>{formik.errors.shtetiID}</div> : null}
                 </div>

                    <div className='col-lg-4 mt-3'>
                        <input 
                            disabled={isLoading} 
                            type="submit" 
                            value={isLoading ? "Submitting..." : "Create"} 
                            className='btn btn-primary' />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default KombetarjaCreate;

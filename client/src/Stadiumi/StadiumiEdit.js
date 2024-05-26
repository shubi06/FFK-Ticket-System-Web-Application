import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function StadiumiEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getStadiumiData()
    }, [])

    let getStadiumiData = async () => {
        try {
            const stadiumi = await axios.get(`http://localhost:5178/api/Stadiumi/${params.id}`);
            myFormik.setValues(stadiumi.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            emri: "",
            kapaciteti: "",
            vitiNdertuar: "",
        },
        validate: (values) => {
            let errors = {}   

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
                await axios.put(`http://localhost:5178/api/Stadiumi/${params.id}`, values);
                setLoading(false);
                navigate("/portal/stadiumi-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
        

    return (
        <>
            <h3>StadiumiEdit - Id : {params.id} </h3>
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

export default StadiumiEdit
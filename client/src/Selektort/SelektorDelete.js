import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SelektorDelete() {
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

    const deleteSelektor = async () => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:5178/api/Selektori/${params.id}`);
            setLoading(false);
            navigate("/portal/selektor-list");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const myFormik = useFormik({
        initialValues: {
            emri: "",
            mbiemri: "",
            mosha: "",
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
    });

    return (
        <>
            <h3>SelektorEdit - Id : {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    {/* Fushat e formës */}
                    <button type="button" onClick={deleteSelektor} className="btn btn-danger mr-2">
                        Fshij
                    </button>
                    <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                </form>
            </div>
        </>
    );
}

export default SelektorDelete;

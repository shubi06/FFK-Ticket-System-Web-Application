import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NdeshjaEdit() {
    const params = useParams();
    const [ekipat, setEkipat] = useState([]);
    const [statuset, setStatuset] = useState([]);
    const [superligat, setSuperligat] = useState([]);
    const [referet, setReferet] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ekipaRes, statusiRes, superligaRes, referiRes] = await Promise.all([
                    axios.get('http://localhost:5178/api/Ekipa'),
                    axios.get('http://localhost:5178/api/Statusi'),
                    axios.get('http://localhost:5178/api/Superliga'),
                    axios.get('http://localhost:5178/api/Referi')
                ]);

                setEkipat(ekipaRes.data);
                setStatuset(statusiRes.data);
                setSuperligat(superligaRes.data);
                setReferet(referiRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setEkipat([]);
                setStatuset([]);
                setSuperligat([]);
                setReferet([]);
            }
        };

        const fetchMatch = async () => {
            try {
                const response = await axios.get(`http://localhost:5178/api/NdeshjaSuperliges/${params.id}`);
                formik.setValues(response.data);
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        };

        fetchData();
        fetchMatch();
    }, [params.id]);

    const formik = useFormik({
        initialValues: {
            Ekipa1: '',
            Ekipa2: '',
            DataENdeshjes: '',
            StatusiId: '',
            SuperligaId: '',
            ReferiId: '',
            GolaEkipa1: '',
            GolaEkipa2: ''
        },
        validate: values => {
            const errors = {};
            if (!values.Ekipa1) {
                errors.Ekipa1 = 'Please select the first team';
            }

            if (!values.Ekipa2) {
                errors.Ekipa2 = 'Please select the second team';
            }

            if (!values.DataENdeshjes) {
                errors.DataENdeshjes = 'Please enter the match date';
            }

            if (!values.StatusiId) {
                errors.StatusiId = 'Please select the status';
            }

            if (!values.SuperligaId) {
                errors.SuperligaId = 'Please select the Superliga';
            }

            if (!values.ReferiId) {
                errors.ReferiId = 'Please select the referee';
            }

            // Only require goals if the match status is "Played" (StatusiId === 1)
            if (values.StatusiId === '1' && (values.GolaEkipa1 === '' || values.GolaEkipa2 === '')) {
                errors.GolaEkipa1 = 'Please enter the goals for the first team';
                errors.GolaEkipa2 = 'Please enter the goals for the second team';
            }

            return errors;
        },
        onSubmit: async (values) => {
            // Remove goal fields if the match is not played
            const requestData = { ...values };
            if (values.StatusiId !== '1') {
                requestData.GolaEkipa1 = null;
                requestData.GolaEkipa2 = null;
            }

            setLoading(true);
            try {
                await axios.put(`http://localhost:5178/api/NdeshjaSuperliges/${params.id}`, requestData);
                navigate("/portal/ndeshja-superlige-list");
            } catch (error) {
                console.error('Submission failed', error.response ? error.response.data : error.message);
                alert('Failed to update match. Please try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    const filteredEkipat = ekipat.filter(ekip => ekip.id !== parseInt(formik.values.Ekipa1));

    return (
        <>
            <h3>Edit Match: {params.id} </h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Ekipa1">Ekipa 1</label>
                    <select
                        className="form-control"
                        id="Ekipa1"
                        name="Ekipa1"
                        value={formik.values.Ekipa1}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Team 1</option>
                        {ekipat.map(ekip => (
                            <option key={ekip.id} value={ekip.id}>
                                {ekip.emriKlubit}
                            </option>
                        ))}
                    </select>
                    {formik.errors.Ekipa1 && <div className="text-danger">{formik.errors.Ekipa1}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="Ekipa2">Ekipa 2</label>
                    <select
                        className="form-control"
                        id="Ekipa2"
                        name="Ekipa2"
                        value={formik.values.Ekipa2}
                        onChange={formik.handleChange}
                        disabled={!formik.values.Ekipa1}
                    >
                        <option value="">Select Team 2</option>
                        {filteredEkipat.map(ekip => (
                            <option key={ekip.id} value={ekip.id}>
                                {ekip.emriKlubit}
                            </option>
                        ))}
                    </select>
                    {formik.errors.Ekipa2 && <div className="text-danger">{formik.errors.Ekipa2}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="DataENdeshjes">Data E Ndeshjes</label>
                    <input
                        type="date"
                        className="form-control"
                        id="DataENdeshjes"
                        name="DataENdeshjes"
                        value={formik.values.DataENdeshjes}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.DataENdeshjes && <div className="text-danger">{formik.errors.DataENdeshjes}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="StatusiId">Statusi</label>
                    <select
                        className="form-control"
                        id="StatusiId"
                        name="StatusiId"
                        value={formik.values.StatusiId}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Status</option>
                        {statuset.map(status => (
                            <option key={status.id} value={status.id}>
                                {status.emri}
                            </option>
                        ))}
                    </select>
                    {formik.errors.StatusiId && <div className="text-danger">{formik.errors.StatusiId}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="SuperligaId">Superliga</label>
                    <select
                        className="form-control"
                        id="SuperligaId"
                        name="SuperligaId"
                        value={formik.values.SuperligaId}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Superliga</option>
                        {superligat.map(superliga => (
                            <option key={superliga.id} value={superliga.id}>
                                {superliga.emri}
                            </option>
                        ))}
                    </select>
                    {formik.errors.SuperligaId && <div className="text-danger">{formik.errors.SuperligaId}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ReferiId">Referi</label>
                    <select
                        className="form-control"
                        id="ReferiId"
                        name="ReferiId"
                        value={formik.values.ReferiId}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Referee</option>
                        {referet.map(referi => (
                            <option key={referi.referi_ID} value={referi.referi_ID}>
                                {referi.emri} {referi.mbiemri}
                            </option>
                        ))}
                    </select>
                    {formik.errors.ReferiId && <div className="text-danger">{formik.errors.ReferiId}</div>}
                </div>
                {formik.values.StatusiId === '1' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="GolaEkipa1">Golat e Ekipës 1</label>
                            <input
                                type="number"
                                className="form-control"
                                id="GolaEkipa1"
                                name="GolaEkipa1"
                                value={formik.values.GolaEkipa1}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.GolaEkipa1 && <div className="text-danger">{formik.errors.GolaEkipa1}</div>}
                        </div>
                        <div className="form-group">
                            <label html
               For="GolaEkipa2">Golat e Ekipës 2</label>
<input
                             type="number"
                             className="form-control"
                             id="GolaEkipa2"
                             name="GolaEkipa2"
                             value={formik.values.GolaEkipa2}
                             onChange={formik.handleChange}
                         />
{formik.errors.GolaEkipa2 && <div className="text-danger">{formik.errors.GolaEkipa2}</div>}
</div>
</>
)}
<button type="submit" className="btn btn-primary" disabled={isLoading}>
{isLoading ? "Updating..." : "Update Match"}
</button>
</form>
</>
);
}

export default NdeshjaEdit;
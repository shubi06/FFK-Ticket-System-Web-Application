/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ShtetiView() {
    const params = useParams();
    const [shtetiList, setShtetiList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getShtetet();
        console.log("welcome to userview");
    }, []);

    let getShtetet = async () => {
        try {
            const user = await axios.get(`http://localhost:5178/api/Shteti/${params.id}`);
            // console.log(user);
            setShtetiList(user.data);
            // console.log(userList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }

    return (
        <>
            <div>ShtetiView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                        <th>Id</th>
                                            <th>Emri</th>
                                  
                                        </tr>
                                    </thead>
                          
                                    <tbody>
                                        <tr>
                                            <td>{shtetiList.id}</td>
                                            <td> {shtetiList.emri} </td>
                                      
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </>

    )
}

export default ShtetiView
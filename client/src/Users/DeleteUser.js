import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getUserById } from '../Services/UserService';

function DeleteUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response = await getUserById(id);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteUser(id);
            alert('User deleted successfully');
            navigate("/portal/list-users");
        } catch (error) {
            console.error("Error deleting user:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Delete User</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Are you sure you want to delete the following user?</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    <button onClick={() => navigate("/portal/list-users")} className="btn btn-secondary">Cancel</button>
                </div>
            )}
        </div>
    );
}

export default DeleteUser;

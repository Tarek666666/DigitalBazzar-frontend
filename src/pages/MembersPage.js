import React, { useState, useEffect } from "react";
import "../css/ordersPage.css";

function MembersPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    async function fetchMembers() {
        setLoading(true);
        fetch("https://digital-bazzar-backend.herokuapp.com/admin/dashboard/members", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.membersInDb) {
                    setLoading(false);
                    setError(false);
                    setMembers(data.membersInDb);
                } else {
                   
                    window.location.href = 'https://digital-bazzar.netlify.app/'
                }
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
                setErrorMessage(error);
            });
    
    }

    useEffect(() => {
      
        fetchMembers();
    }, []);
    return (
      <div className="members-table-container">
          <table className='order-table'>
            <thead>
                {loading && (
                    <tr>
                        <th>LOADING ....</th>
                    </tr>
                )}
                {!loading && (
                    <tr>
                        <th>MEMBER ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADRESS</th>
                        <th>PHONE</th>
                        <th>ROLE</th>
                        <th>VERIFIED</th>
                    </tr>
                )}
            </thead>
            {!loading && (
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{member.username}</td>
                            <td>{member.email}</td>
                            <td> {member.adress} </td>
                            <td>{member.phone}</td>
                            <td>{member.role}</td>
                            <td>{member.verified ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
      </div>
    );
}

export default MembersPage;

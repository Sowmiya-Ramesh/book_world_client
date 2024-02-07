import React, { useEffect, useState } from 'react';
import TableList from '../../shared/Table/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Members = () => {
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate();
    const [payload, setPayload] = useState({ mem_name: '', mem_email: '' });
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false); // Track the edit popup state

    const getMembersList = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/members");
            const members = await response.json();
            console.log(members);
            setMemberList(members);
        } catch (err) {
            console.log(err);
        }
    };

    const getMemberById = async (selectedMemberId) => {
        try {
            if (selectedMemberId) {
                const res = await fetch(`http://localhost:5000/api/members/${selectedMemberId}`);

                if (res.ok) {
                    const memberData = await res.json();
                    console.log(memberData);

                    if (memberData) {
                        setPayload({
                           mem_name: memberData.mem_name || '',
                           mem_email: memberData.mem_email || '',
                        });
                    } else {
                        console.error('Unexpected response format:', memberData);
                    }
                } else {
                    console.error('Failed to fetch member data:', res.status, res.statusText);
                }
            }
        } catch (err) {
            console.error('Error fetching member data:', err);
        } finally {
            //   setShowLoader(false);
        }
    };
    console.log(payload);
    console.log(selectedMemberId);

    const updateMember = async () => {
        try {
            if (selectedMemberId) {
                setEditPopupOpen(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            // setShowLoader(false);
        }
    };

    const handleUpdate = (id, editedData) => {
        setPayload({
            mem_name: editedData.mem_name || '',
            mem_email: editedData. mem_email || '',
        });
        try {
            if (selectedMemberId) {
                const updatePayload = {
                    mem_name: editedData.mem_name,
                    mem_email: editedData. mem_email,
                };
                console.log(editedData)

                axios.put(`http://localhost:5000/api/members/${selectedMemberId}`, updatePayload);
                navigate('/members');
                getMembersList()
                alert('Member updated')
            }
        } catch (err) {
            console.error(err);
        } finally {
            setEditPopupOpen(false);
        }
    };

    useEffect(() => {
        getMembersList();
    }, []);

    return (
        <div>
            <TableList
                tableList={memberList}
                title={'Members'}
                addTitle={'ADD MEMBER'}
                handleUpdate={updateMember}
                setSelectedId={setSelectedMemberId}
                selectedId={selectedMemberId}
                isEditPopupOpen={isEditPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                handleEditUpdate={handleUpdate} 
            />
        </div>
    );
};

export default Members;

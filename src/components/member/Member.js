import React, { useEffect, useState } from 'react';
import TableList from '../../shared/Table/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Members = () => {
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate();
    const [payload, setPayload] = useState({ member_name: '', member_publisher: '' });
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
                            book_name: memberData.book_name || '',
                            // member_publisher: memberData.member_publisher || '',
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

    const updateMember = async () => {
        try {
            if (selectedMemberId) {
                // Handle opening the edit popup
                setEditPopupOpen(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            // setShowLoader(false);
        }
    };

    const handleUpdate = (id, editedData) => {
        // Handle updating the payload with the edited data
        setPayload({
            book_name: editedData.book_name || '',
            // book_publisher: editedData.book_publisher || '',
            // Add other fields as needed
        });

        // Now you can proceed with the save changes logic
        try {
            if (selectedMemberId) {
                const updatePayload = {
                    book_name: editedData.book_name,
                    // book_publisher: editedData.book_publisher,
                    // Add other fields as needed
                };

                axios.put(`http://localhost:5000/api/members/${selectedMemberId}`, updatePayload);
                navigate('/members');
                getMembersList()
                alert('Member updated')
            }
        } catch (err) {
            console.error(err);
        } finally {
            // Close the edit popup after handling the update
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
                handleEditUpdate={handleUpdate} // Pass handleUpdate to the TableList component
            />
        </div>
    );
};

export default Members;

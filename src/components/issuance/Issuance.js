import React, { useEffect, useState } from 'react';
import TableList from '../../shared/Table/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Issuance = () => {
    const [issuanceList, setIssuanceList] = useState([]);
    const navigate = useNavigate();
    const [payload, setPayload] = useState({ book_name: '', book_publisher: '' });
    const [selectedIssuanceId, setSelectedIssuanceId] = useState(null);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false); // Track the edit popup state

    const getIssuanceList = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/issuance");
            const issuance = await response.json();
            console.log(issuance);
            setIssuanceList(issuance);
        } catch (err) {
            console.log(err);
        }
    };

    const getIssuanceById = async (selectedIssuanceId) => {
        try {
            if (selectedIssuanceId) {
                const res = await fetch(`http://localhost:5000/api/issuance/${selectedIssuanceId}`);

                if (res.ok) {
                    const issuanceData = await res.json();
                    console.log(issuanceData);

                    if (issuanceData) {
                        setPayload({
                            // book_name: bookData.book_name || '',
                            // book_publisher: bookData.book_publisher || '',
                        });
                    } else {
                        console.error('Unexpected response format:', issuanceData);
                    }
                } else {
                    console.error('Failed to fetch book data:', res.status, res.statusText);
                }
            }
        } catch (err) {
            console.error('Error fetching issuance data:', err);
        } finally {
            //   setShowLoader(false);
        }
    };
    console.log(payload);

    const updateIssuance = async () => {
        try {
            if (selectedIssuanceId) {
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
            // book_name: editedData.book_name || '',
            // book_publisher: editedData.book_publisher || '',
            // Add other fields as needed
        });

        // Now you can proceed with the save changes logic
        try {
            if (selectedIssuanceId) {
                const updatePayload = {
                    // Issuance_name: editedData.book_name,
                    // book_publisher: editedData.book_publisher,
                    // Add other fields as needed
                };

                axios.put(`http://localhost:5000/api/issuance/${selectedIssuanceId}`, updatePayload);
                navigate('/issuance');
                getIssuanceList()
                alert('Issuance updated')
            }
        } catch (err) {
            console.error(err);
        } finally {
            // Close the edit popup after handling the update
            setEditPopupOpen(false);
        }
    };

    useEffect(() => {
        getIssuanceList();
    }, []);

    return (
        <div>
            <TableList
                tableList={issuanceList}
                title={'ISSUANCE'}
                addTitle={'ADD ISSUANCE'}
                handleUpdate={updateIssuance}
                setSelectedId={setSelectedIssuanceId}
                selectedId={selectedIssuanceId}
                isEditPopupOpen={isEditPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                handleEditUpdate={handleUpdate} // Pass handleUpdate to the TableList component
            />
        </div>
    );
};

export default Issuance;

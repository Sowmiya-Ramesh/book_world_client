import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableList from '../../shared/Table/Table';

const ReturnStatus = () => {
    const [pendingReturns, setPendingReturns] = useState([]);
    const [givenDay, setGivenDay] = useState(new Date().toISOString().split('T')[0]); // Use ISO date format for consistency

    useEffect(() => {
        fetchPendingReturns();
    }, [givenDay]);

    // ReturnStatus of the pending books
    const fetchPendingReturns = async () => {
        try {
            const [booksResponse, membersResponse, issuancesResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/books'),
                axios.get('http://localhost:5000/api/members'),
                axios.get('http://localhost:5000/api/issuance')
            ]);

            const books = booksResponse?.data;
            const members = membersResponse?.data;
            const issuances = issuancesResponse?.data;

            console.log(givenDay)
            const filteredIssuances = issuances.filter(issuance => {
                console.log(issuance.target_return_date.split('T')[0])
                return issuance.target_return_date.split('T')[0] === givenDay;
            });

            const pendingReturnsData = filteredIssuances.map(issuance => {
                const member = members.find(member => member?.mem_id?.member_id === issuance?.issuance_member);
                const book = books.find(book => book?.book_id === issuance?.book_id);
                console.log(member);
                console.log(book)
                return {
                    issuance_id: issuance?.issuance_id,
                    member_name: member?.mem_name,
                    book_name: book?.book_name,
                    target_return_date: issuance?.target_return_date
                };
            });
            console.log(pendingReturnsData)

            setPendingReturns(pendingReturnsData);
        } catch (error) {
            console.error('Error fetching pending returns:', error);
        }
    };

    return (
        <div>
            <TableList
                tableList={pendingReturns}
                title={'PENDING RETURNS'}
            />
        </div>
    );
};

export default ReturnStatus;

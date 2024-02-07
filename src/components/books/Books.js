import React, { useEffect, useState } from 'react';
import TableList from '../../shared/Table/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = () => {
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();
    const [payload, setPayload] = useState({ book_name: '', book_publisher: '' });
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const getBooksList = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/books");
            const books = await response.json();
            console.log(books);
            setBookList(books);
        } catch (err) {
            console.log(err);
        }
    };

    const getBookById = async (selectedBookId) => {
        try {
            if (selectedBookId) {
                const res = await fetch(`http://localhost:5000/api/books/${selectedBookId}`);

                if (res.ok) {
                    const bookData = await res.json();
                    console.log(bookData);

                    if (bookData) {
                        setPayload({
                            book_name: bookData.book_name || '',
                            book_publisher: bookData.book_publisher || '',
                        });
                    } else {
                        console.error('Unexpected response format:', bookData);
                    }
                } else {
                    console.error('Failed to fetch book data:', res.status, res.statusText);
                }
            }
        } catch (err) {
            console.error('Error fetching book data:', err);
        }
    };
    console.log(payload);

    const updateBook = async () => {
        try {
            if (selectedBookId) {
                setEditPopupOpen(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = (id, editedData) => {
        setPayload({
            book_name: editedData.book_name || '',
            book_publisher: editedData.book_publisher || '',

        });

        try {
            if (selectedBookId) {
                const updatePayload = {
                    book_name: editedData.book_name,
                    book_publisher: editedData.book_publisher,

                };

                axios.put(`http://localhost:5000/api/books/${selectedBookId}`, updatePayload);
                navigate('/books');
                getBooksList()
                alert('Book updated')
            }
        } catch (err) {
            console.error(err);
        } finally {
            setEditPopupOpen(false);
        }
    };

    useEffect(() => {
        getBooksList();
    }, []);

    return (
        <div>
                <TableList
                    tableList={bookList}
                    title={'BOOKS'}
                    addTitle={'ADD BOOK'}
                    handleUpdate={updateBook}
                    setSelectedId={setSelectedBookId}
                    selectedId={selectedBookId}
                    isEditPopupOpen={isEditPopupOpen}
                    setEditPopupOpen={setEditPopupOpen}
                    handleEditUpdate={handleUpdate}
                />
        </div>
    );
};

export default Books;

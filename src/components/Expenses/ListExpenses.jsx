import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBTypography, MDBCard, MDBCardBody, MDBTableHead, MDBTable, MDBTableBody, MDBInput, MDBCardTitle } from 'mdb-react-ui-kit';
import { db } from '../Services/firebase';
import Navbar from '../Header/Navbar';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Footer from '../Footer/Footer';
import '../../App.css'

export default function ListExpenses() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expensesCollection = collection(db, 'expenses');
                const expensesSnapshot = await getDocs(expensesCollection);
                const expensesList = expensesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setExpenses(expensesList);
                setFilteredExpenses(expensesList);
                calculateTotal(expensesList);
            } catch (err) {
                console.error("Erro ao buscar despesas:", err);
                setError("Erro ao buscar despesas. Tente novamente mais tarde.");
            }
        };
        fetchExpenses();
    }, []);

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            return timestamp.toDate().toLocaleDateString(); // Formata para uma string de data legível
        }
        return '';
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'expenses', id));
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            setExpenses(updatedExpenses);
            handleFilterChange(); // Chame a função de filtro diretamente após deletar
        } catch (err) {
            console.error("Erro ao deletar despesa:", err);
            setError("Erro ao deletar despesa. Tente novamente mais tarde.");
        }
    };

    const handleFilterChange = () => {
        if (filterMonth && filterYear) {
            const filtered = expenses.filter(expense => {
                const date = expense.expenseDate.toDate();
                return (
                    date.getMonth() + 1 === parseInt(filterMonth) &&
                    date.getFullYear() === parseInt(filterYear)
                );
            });
            setFilteredExpenses(filtered);
            calculateTotal(filtered);
        } else {
            setFilteredExpenses(expenses);
            calculateTotal(expenses);
        }
    };

    const calculateTotal = (expenseList) => {
        const totalValue = expenseList.reduce((sum, expense) => sum + (expense.value || 0), 0);
        setTotal(totalValue);
    };

    return (
        <>
            <Navbar />
            <div className="table-responsive">
                <MDBContainer className="text-center py-5">
                    <MDBTypography tag="h1" className="display-4 text-primary">
                        Gerenciamento de Hospedagem
                    </MDBTypography>
                    <MDBTypography tag="p" className="lead">
                        Relatório de despesas
                    </MDBTypography>
                </MDBContainer>

                {error && <p className="text-danger">{error}</p>}

                <MDBContainer className="mb-4">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBInput
                                label="Mês (1-12)"
                                type="number"
                                min="1"
                                max="12"
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(e.target.value)}
                                className="mb-3"
                            />
                            <MDBInput
                                label="Ano (ex: 2024)"
                                type="number"
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="mb-3"
                            />
                            <MDBBtn onClick={handleFilterChange}>Filtrar</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>

                <MDBContainer>
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBTable>
                                <MDBTableHead light>
                                    <tr>
                                        <th scope="col">Data da Despesa</th>
                                        <th scope="col">Nome da Despesa</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {filteredExpenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{formatDate(expense.expenseDate)}</td>
                                            <td>{expense.expenseName}</td>
                                            <td>{expense.value.toFixed(2)}</td>
                                            <td>
                                                <MDBBtn onClick={() => navigate(`/editExpense/${expense.id}`)}>Editar</MDBBtn>
                                                <MDBBtn color='danger' className='ms-2' onClick={() => handleDelete(expense.id)}>Deletar</MDBBtn>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBContainer className="d-flex justify-content-center mt-4">
                        <MDBCard className="text-center" style={{ width: '300px' }}>
                            <MDBCardBody className='custom-card'>
                                <MDBCardTitle><b>Total de despesas</b></MDBCardTitle>
                                <MDBTypography tag="h5" className="mt-3">
                                    R$ {total.toFixed(2)}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                </MDBContainer>
            </div >
            <Footer />
        </>
    );
}

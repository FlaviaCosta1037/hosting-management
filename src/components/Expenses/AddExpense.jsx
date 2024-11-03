import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBContainer, MDBTypography, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Navbar from '../Header/Navbar';
import { db } from '../Services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';



export default function AddExpense() {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    expenseDate: '',
    expenseName: '',
    value: 0,
  });

  // Função para adicionar a despesa
  const handleAddExpense = async () => {
    try {
      await addDoc(collection(db, 'expenses'), {
        expenseDate: new Date(expense.expenseDate),
        expenseName: expense.expenseName,
        value: Number(expense.value), // Garante que o valor seja numérico
      });
      alert('Despesa adicionada com sucesso!');
      // Resetar os campos após salv3ar
      setExpense({
        expenseDate: '',
        expenseName: '',
        value: 0,
      });
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
      alert('Erro ao adicionar despesa.');
    }
  };

  return (
    <>
      <Navbar /><br />
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <MDBContainer className="text-center py-5">
        <MDBTypography tag="h1" className="display-4 text-primary">
          Gerenciamento de Despesas
        </MDBTypography>
        <MDBTypography tag="p" className="lead">
          Adicione uma despesa agora!
        </MDBTypography>
      </MDBContainer>

      <MDBContainer>
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBInput
              label="Data da Despesa"
              value={expense.expenseDate}
              onChange={(e) => setExpense({ ...expense, expenseDate: e.target.value })}
              id="expenseDateInput"
              type="date"
              className="mb-3"
            />
            <MDBInput
              label="Nome da Despesa"
              value={expense.expenseName}
              onChange={(e) => setExpense({ ...expense, expenseName: e.target.value })}
              id="expenseNameInput"
              type="text"
              className="mb-3"
            />
            <MDBInput
              label="Valor da Despesa"
              value={expense.value}
              onChange={(e) => setExpense({ ...expense, value: e.target.value })}
              id="valueInput"
              type="number"
              className="mb-3"
            />

            <MDBRow className="mt-3">
              <MDBCol>
                <MDBBtn onClick={handleAddExpense}>Adicionar Despesa</MDBBtn>
              </MDBCol>
              <MDBCol className="text-end">
                <MDBBtn color='danger' onClick={() => navigate('/expenses')}>Voltar</MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      </div>
      <Footer></Footer>
    </>
  );
}
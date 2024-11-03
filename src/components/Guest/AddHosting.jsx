import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn, MDBContainer, MDBTypography, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Navbar from '../Header/Navbar';
import { db } from '../Services/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore'; 
import Footer from '../Footer/Footer';
import '../../App.css'

export default function AddHosting() {
  const navigate = useNavigate();
  const [customerCPF, setCustomerCPF] = useState('');
  const [customer, setCustomer] = useState(null);
  const [hosting, setHosting] = useState({
    dateCheckin: '',
    dateCheckout: '',
    numberOfDays: 0,
    dailyRate: 0,
    total: 0,
  });
  const [error, setError] = useState(''); // State to store error message

  // Função para buscar o cliente pelo CPF
  const handleSearchCustomer = async () => {
    try {
      const customerQuery = query(
        collection(db, 'customers'),
        where('cpf', '==', customerCPF)
      );
      const customerSnapshot = await getDocs(customerQuery);

      if (customerSnapshot.empty) {
        alert('Cliente não encontrado. Cadastre um novo cliente');
        setCustomer(null);
      } else {
        const customerData = customerSnapshot.docs[0].data();
        setCustomer({ id: customerSnapshot.docs[0].id, ...customerData });
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      alert('Erro ao buscar cliente.');
    }
  };

  // Função para calcular a quantidade de diárias e o valor total
  const calculateDaysAndTotal = () => {
    const checkinDate = new Date(hosting.dateCheckin);
    const checkoutDate = new Date(hosting.dateCheckout);
    const dailyRate = Number(hosting.dailyRate);

    if (checkinDate && checkoutDate > checkinDate) {
      const timeDifference = checkoutDate - checkinDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Converte de milissegundos para dias
      const total = daysDifference * dailyRate; // Calcula o valor total

      setHosting((prev) => ({
        ...prev,
        numberOfDays: daysDifference,
        total: total,
      }));
    } else {
      setHosting((prev) => ({
        ...prev,
        numberOfDays: 0,
        total: 0,
      }));
    }
  };

  useEffect(() => {
    calculateDaysAndTotal();
  }, [hosting.dateCheckin, hosting.dateCheckout, hosting.dailyRate]);

  const checkDateAvailability = async () => {
    try {
      const hostingQuery = query(collection(db, 'hosting'));
      const hostingSnapshot = await getDocs(hostingQuery);
  
      const newCheckinDate = new Date(hosting.dateCheckin);
      const newCheckoutDate = new Date(hosting.dateCheckout);
  
      for (const doc of hostingSnapshot.docs) {
        const existingCheckinDate = doc.data().dateCheckin.toDate();
        const existingCheckoutDate = doc.data().dateCheckout.toDate();
  
        // Verifica se a nova reserva entra em conflito com a reserva existente
        if (
          (newCheckinDate >= existingCheckinDate && newCheckinDate < existingCheckoutDate) ||
          (newCheckoutDate > existingCheckinDate && newCheckoutDate <= existingCheckoutDate) ||
          (newCheckinDate <= existingCheckinDate && newCheckoutDate >= existingCheckoutDate)
        ) {
          return true; // Retorna true se houver conflito
        }
      }
      return false; // Retorna false se não houver conflito
    } catch (error) {
      console.error('Erro ao verificar disponibilidade de datas:', error);
      return false; // Se ocorrer um erro, assume que as datas estão disponíveis
    }
  };


  const handleAddHosting = async () => {
    const isDateUnavailable = await checkDateAvailability();
    if (isDateUnavailable) {
      setError('Data indisponível. Já existe uma reserva para o período selecionado.'); // Define a mensagem de erro
      return; // Impede a adição da hospedagem
    }
  
    try {
      await addDoc(collection(db, 'hosting'), {
        customerId: customer.id,
        dateCheckin: Timestamp.fromDate(new Date(hosting.dateCheckin)), // Converte para Timestamp
        dateCheckout: Timestamp.fromDate(new Date(hosting.dateCheckout)), // Converte para Timestamp
        numberOfDays: hosting.numberOfDays,
        dailyRate: hosting.dailyRate,
        total: hosting.total,
      });
      alert('Hospedagem adicionada com sucesso!');
      // Resetar os campos após salvar
      setHosting({
        dateCheckin: '',
        dateCheckout: '',
        numberOfDays: 0,
        dailyRate: 0,
        total: 0,
      });
      setCustomer(null);
      setCustomerCPF('');
      setError(''); // Limpa mensagem de erro
    } catch (error) {
      console.error('Erro ao adicionar hospedagem:', error);
      alert('Erro ao adicionar hospedagem.');
    }
  };

  return (
    <>
      <Navbar /><br />
      <div className="table-responsive">
      <MDBContainer className="text-center py-5">
        <MDBTypography tag="h1" className="display-4 text-primary">
          Gerenciamento de Hospedagem
        </MDBTypography>
        <MDBTypography tag="p" className="lead">
          Adicione uma reserva agora!
        </MDBTypography>
      </MDBContainer>

      <MDBContainer>
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBInput
              label="CPF do Cliente"
              value={customerCPF}
              onChange={(e) => setCustomerCPF(e.target.value)}
              id="cpfInput"
              type="text"
              className="mb-3" // Adiciona um espaço inferior
            />
            <MDBBtn onClick={handleSearchCustomer} className="mb-3">Buscar Cliente</MDBBtn>

            {customer && (
              <>
                <h3>Cliente Selecionado:</h3>
                <p>Nome: {customer.nome}</p>
                <p>CPF: {customer.cpf}</p>

                <MDBInput
                  label="Data de Check-in"
                  value={hosting.dateCheckin}
                  onChange={(e) => {
                    setHosting({ ...hosting, dateCheckin: e.target.value });
                    calculateDaysAndTotal(); // Atualiza a quantidade de diárias e o total
                  }}
                  id="checkinInput"
                  type="date"
                  className="mb-3" // Adiciona um espaço inferior
                />
                <MDBInput
                  label="Data de Check-out"
                  value={hosting.dateCheckout}
                  onChange={(e) => {
                    setHosting({ ...hosting, dateCheckout: e.target.value });
                    calculateDaysAndTotal(); // Atualiza a quantidade de diárias e o total
                  }}
                  id="checkoutInput"
                  type="date"
                  className="mb-3" // Adiciona um espaço inferior
                />
                <MDBInput
                  label="Valor da Diária"
                  value={hosting.dailyRate}
                  onChange={(e) => {
                    const dailyRate = e.target.value;
                    setHosting({ ...hosting, dailyRate });
                    calculateDaysAndTotal(); // Calcula o total com base na nova diária
                  }}
                  id="dailyRateInput"
                  type="number"
                  className="mb-3" // Adiciona um espaço inferior
                />
                <MDBInput
                  label="Quantidade de Diárias"
                  type="number"
                  value={hosting.numberOfDays}
                  readOnly
                  id="numberOfDaysInput"
                  className="mb-3" // Adiciona um espaço inferior
                />
                <MDBInput
                  label="Valor Total"
                  value={hosting.total}
                  readOnly
                  id="totalInput"
                  type="number"
                  className="mb-3" // Adiciona um espaço inferior
                />
                
                {error && <p className="text-danger">{error}</p>} {/* Mensagem de erro */}

                <MDBRow className="mt-3">
                  <MDBCol>
                    <MDBBtn onClick={handleAddHosting}>Adicionar Hospedagem</MDBBtn>
                  </MDBCol>
                  <MDBCol className="text-end">
                    <MDBBtn color='danger' onClick={() => navigate('/hosting')}>Voltar</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      </div>
      <Footer></Footer>
    </>
  );
}

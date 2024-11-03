import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn, MDBContainer, MDBTypography, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Navbar from '../Header/Navbar';
import { db } from '../Services/firebase';
import { doc, getDoc, updateDoc,Timestamp } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import '../../App.css'

export default function EditHosting() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hosting, setHosting] = useState({
    dateCheckin: '',
    dateCheckout: '',
    numberOfDays: 0,
    dailyRate: 0,
    total: 0,
  });

  // Função para buscar a hospedagem pelo ID
  useEffect(() => {
    const fetchHosting = async () => {
      const hostingId = location.pathname.split('/').pop(); // Pega o ID da URL
      const hostingRef = doc(db, 'hosting', hostingId);
      const hostingSnapshot = await getDoc(hostingRef);

      if (hostingSnapshot.exists()) {
        setHosting({ id: hostingSnapshot.id, ...hostingSnapshot.data() });
      } else {
        alert('Hospedagem não encontrada.');
      }
    };

    fetchHosting();
  }, [location.pathname]);

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

  // Função para lidar com a atualização da hospedagem
  const handleUpdateHosting = async () => {
    try {
      const hostingRef = doc(db, 'hosting', hosting.id);
      await updateDoc(hostingRef, {
        dateCheckin: Timestamp.fromDate(new Date(hosting.dateCheckin)), // Converte para Timestamp
        dateCheckout: Timestamp.fromDate(new Date(hosting.dateCheckout)), // Converte para Timestamp
        numberOfDays: hosting.numberOfDays,
        dailyRate: hosting.dailyRate,
        total: hosting.total,
      });
      alert('Hospedagem atualizada com sucesso!');
      navigate('/hosting'); // Redireciona para a lista de hospedagens após a atualização
    } catch (error) {
      console.error('Erro ao atualizar hospedagem:', error);
      alert('Erro ao atualizar hospedagem.');
    }
  };

  return (
    <>
      <Navbar /><br />
      <div className="table-responsive">
      <MDBContainer className="text-center py-5">
        <MDBTypography tag="h1" className="display-4 text-primary">
          Editar Hospedagem
        </MDBTypography>
      </MDBContainer>

      <MDBContainer>
            <MDBInput
              label="Data de Check-in"
              value={hosting.dateCheckin}
              onChange={(e) => setHosting({ ...hosting, dateCheckin: e.target.value })}
              id="checkinInput"
              type="date"
              className="mb-3"
            />
            <MDBInput
              label="Data de Check-out"
              value={hosting.dateCheckout}
              onChange={(e) => setHosting({ ...hosting, dateCheckout: e.target.value })}
              id="checkoutInput"
              type="date"
              className="mb-3"
            />
            <MDBInput
              label="Valor da Diária"
              value={hosting.dailyRate}
              onChange={(e) => {
                const dailyRate = e.target.value;
                setHosting({ ...hosting, dailyRate });
                calculateDaysAndTotal(); // Atualiza a quantidade de diárias e o total
              }}
              id="dailyRateInput"
              type="number"
              className="mb-3"
            />
            <MDBInput
              label="Quantidade de Diárias"
              type="number"
              value={hosting.numberOfDays}
              readOnly
              id="numberOfDaysInput"
              className="mb-3"
            />
            <MDBInput
              label="Valor Total"
              value={hosting.total}
              readOnly
              id="totalInput"
              type="number"
              className="mb-3"
            />

            <MDBRow className="mt-3">
              <MDBCol>
                <MDBBtn onClick={handleUpdateHosting}>Atualizar Hospedagem</MDBBtn>
              </MDBCol>
              <MDBCol className="text-end">
                <MDBBtn color='danger' onClick={() => navigate('/hosting')}>Voltar</MDBBtn>
              </MDBCol>
            </MDBRow>
      </MDBContainer>
      </div>
      <Footer>
      </Footer>
    </>
  );
}

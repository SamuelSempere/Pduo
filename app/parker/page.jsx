
'use client';
import React, { useEffect, useState } from "react";
import styles from './../page.module.css'

const token = '6d12f40595883dbaef7e30f2272165df6ba49a7c9a9ad7f1abc3f23ed8980694274daa88d297532c340f8dc875ae5662ce6f51b2fb6103e01fe339e7d206787ec519cf80d76d843735d7fa0ce31f8b66e8998526853846526e96b2db61d4b6db4420f33998059bc2fa2bdfb505a0e6b61fd27fde5bb1bf130ff1fc0fb99e2c06';


const Parker = () => {
  const [vehiculo, setTipoVehiculo] = useState('');
  const [tamano, setTamaño] = useState('');
  const [direccion, setDireccion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      vehiculo,
      tamano,
      direccion
    };
console.log(data)
    try {
      const response = await fetch('http://127.0.0.1:1337/api/garages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data})
      });

      const responseData = await response.json();
      console.log(responseData); // Realiza alguna acción con la respuesta de la API
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className={styles.container}>
<div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo de vehículo:</label>
        <select value={vehiculo} onChange={(e) => setTipoVehiculo(e.target.value)}>
          <option value="Coche">Coche</option>
          <option value="Moto">Moto</option>
        </select>
      </div>

      <div>
        <label>Tamaño:</label>
        <select value={tamano} onChange={(e) => setTamaño(e.target.value)}>
          <option value="Pequeño (3.6 x 1,6m)">Pequeño (3.6 x 1,6m)</option>
          <option value="Mediano (4,5 X 1,8m)">Mediano (4,5 X 1,8m)</option>
          <option value="Grande (5 x 1,9m)">GGrande (5 x 1,9m)</option>
        </select>
      </div>
      <button type="submit">Enviar</button>
    </form>
    </div>
  </div>
  );
};

export default Parker;
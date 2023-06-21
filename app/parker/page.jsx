'use client';
const tokenStrapi = process.env.NEXT_PUBLIC_API_STRAPI;
const token = process.env.NEXT_PUBLIC_API_PLACES;

import React, { useState } from "react";
import styles from './../page.module.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Map from '../components/map';
import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/client';


const Parker = () => {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [entreSemana, setEntreSemana] = useState(false);
  const [entreSemanaHorarioDesde, setEntreSemanaHorarioDesde] = useState();
  const [entreSemanaHorarioHasta, setEntreSemanaHorarioHasta] = useState();
  const [entreSemana24, setEntreSemana24] = useState(false);
  const [finSemanaHorarioDesde, setFinSemanaHorarioDesde] = useState();
  const [finSemanaHorarioHasta, setFinSemanaHorarioHasta] = useState();
  const [finSemana, setFinSemana] = useState(false);
  const [finSemana24, setFinSemana24] = useState(false);
  const [tamano, setTamaño] = useState('Pequeño (3,6 x 1,6m)');
  const [cargaElectrica, setCargaElectrica] = useState(false);
  const [periodo, setPeriodo] = useState('Indefinido');
  const [planta, setPlanta] = useState('Planta baja');  
  const [propiedad, setPropiedad] = useState('Propiedad');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [valor, setValor] = useState('0');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      tamano,
      direccion: address,
      latitud,
      longitud,
      entreSemana,
      entreSemanaHorarioDesde,
      entreSemanaHorarioHasta,
      entreSemana24,
      finSemana,
      finSemanaHorarioDesde,
      finSemanaHorarioHasta,
      finSemana24,
      cargaElectrica,
      periodo,
      planta,
      propiedad,
      valor
    };
    console.log(data)
    try {
      const response = await fetch('http://127.0.0.1:1337/api/garages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStrapi}`
        },
        body: JSON.stringify({ data })
      });

      const responseData = await response.json();
      console.log(responseData); // Realiza alguna acción con la respuesta de la API
    } catch (error) {
      console.error(error);
    }
  };

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'es',
      }
    },
    debounce: 800,
    googleMapsApiKey: token,
    scriptOptions: {
      onload: () => handleScriptLoad(),
    },
  });

  const { user, error, isLoading } = useUser();
  const handleScriptLoad = () => {
    setShowMap(true);
  };

  const handleInput = (e) => {
    setShowMap(false);
    setValue(e.target.value);
    setAddress(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address, false);
    setAddress(address);
    setShowMap(true)
    clearSuggestions();

    getGeocode({ address })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLatitud(lat),
          setLongitud(lng)
      }
      )
      .catch((error) => {
        console.log('Error retrieving geolocation:', error);
      });
  };


  return (
    <div className={styles.container}>
      <div className={styles.container_columns}>
        <div className={styles.container_columns_left}>
          <h1>¡Hola {user ? user.given_name : "Parker"}! </h1><br/>
          <p>Indícanos los datos de tu plaza y te enviaremos aquellos conductores compatibles e interesados en ella.</p><br/>
          <p>Tú decides con quien contactar. Sin costes ni compromiso. 🙂</p>
        </div>
        <div className={styles.container_columns_right_parent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Dónde se ubica tu plaza?</h2>
              <div className={styles.div_center}><p>Indica el nº para ser más precisos en la búqueda</p></div>
              <input
                value={value}
                onChange={handleInput}
                placeholder="Calle, número, CP, población"
                className={styles.formulario}
              />
              {status === 'OK' && (
                <ul className={styles.suggestions_list}>
                  {data.map(({ place_id, description }) => (
                    <div className={styles.suggestions} key={place_id} onClick={() => handleSelect(description)}>
                      <Image alt="fondo parking" className={styles.park_image} width={15} height={21} src='/parking-ico.png' />{description}
                    </div>
                  ))}
                </ul>
              )}
              <div>

                <br />
                {showMap && (
                  <Map address={address} />
                )}
              </div>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿En qué horario la ofreces?</h2>
              <div className={styles.formulario_horario}>
                  <input className={styles.formulario_checkbox} value={entreSemana} type="checkbox" onClick={() => setEntreSemana(!entreSemana)}/> Entre semana
                  <input className={styles.formulario_date} step="60" onChange={(e) => setEntreSemanaHorarioDesde(e.target.value)} type="time"/> a 
                  <input className={styles.formulario_date} step="60" onChange={(e) => setEntreSemanaHorarioHasta(e.target.value)} type="time"/>
                  <input className={styles.formulario_checkbox} type="checkbox" onClick={() => setEntreSemana24(!entreSemana24)}/> 24 Horas     
              </div>
              <div className={styles.formulario_horario}>
              <input className={styles.formulario_checkbox} type="checkbox" onClick={() => setFinSemana(!finSemana)}/> Fin de semana
              <input className={styles.formulario_date} step="60" onChange={(e) => setFinSemanaHorarioDesde(e.target.value)} type="time"/> a 
              <input className={styles.formulario_date} step="60" onChange={(e) => setFinSemanaHorarioHasta(e.target.value)} type="time"/>
              <input className={styles.formulario_checkbox} type="checkbox" onClick={() => setFinSemana24(!finSemana24)}/> 24 Horas     
          </div>
              <div></div>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Durante qué periodo de alquiler?</h2>
              <select className={styles.formulario} value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                <option value="Indefinido">Indefinido</option>
                <option value="< de un mes"> Menos de un mes </option>
                <option value="1-6 Meses">1-6 Meses</option>
                <option value="6-12 Meses">6-12 Meses</option>
                <option value="Más de un año">Más de un año</option>
              </select>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Para qué vehiculo es adecuada?</h2>
              <select className={styles.formulario} value={tamano} onChange={(e) => setTamaño(e.target.value)}>
                <option value="Pequeño (3,6 x 1,6m)">Pequeño (3,6 x 1,6m)</option>
                <option value="Mediano (4,5 x 1,8m)">Mediano (4,5 x 1,8m)</option>
                <option value="Grande (5 x 1,9m)">Grande (5 x 1,9m)</option>
                <option value="Pequeño (3,6 x 1,6m)">Moto</option>
              </select>
              <div className={styles.div_center}>
              <input className={styles.formulario_checkbox} type="checkbox" onClick={() => setCargaElectrica(!cargaElectrica)}/> Carga para vehículo electrico
              </div>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿En qué planta se situa?</h2>
              <select className={styles.formulario} value={planta} onChange={(e) => setPlanta(e.target.value)}>
              <option value="Planta Baja">Planta baja</option>
              <option value="-1">-1</option>
              <option value="-2">-2</option>
              <option value="-3">-3</option>
            </select>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Tienes plaza en propiedad o es alquilada?</h2>
              <select className={styles.formulario} value={propiedad} onChange={(e) => setPropiedad(e.target.value)}>
              <option value="Propiedad">Propiedad</option>
              <option value="Alquilada">Alquilada</option>
              </select>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Por cuánto la alquilas?</h2>
              <input className={styles.formulario_importe} value={valor} type='number' min="1" max="200" onChange={(e) => setValor(e.target.value)}></input> €/mes
            </div>
            <div>
            <button type="submit">Enviar</button>
            </div>
            </form>
        </div>
    </div>
    </div>
  );
};

export default withPageAuthRequired(Parker);

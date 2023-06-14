'use client';
const tokenStrapi = process.env.NEXT_PUBLIC_API_STRAPI;
const token = process.env.NEXT_PUBLIC_API_PLACES;

import React, { useState } from "react";
import styles from './../page.module.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Map from '../components/map';
import Image from 'next/image'



const Parker = () => {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [tamano, setTamaño] = useState('Pequeño (3,6 x 1,6m)');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      vehiculo,
      tamano,
      direccion: address,
      latitud,
      longitud
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
    debounce: 500,
    googleMapsApiKey: token,
    scriptOptions: {
      onload: () => handleScriptLoad(),
    },
  });


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
          <h1>¡Hola Parker!</h1>
          <p>Indícanos los datos de tu plaza y te enviaremos aquellos conductores compatibles e interesados en ella.</p>
          <p>Tú decides con quien contactar. Sin costes ni compromiso. 🙂</p>
        </div>
        <div className={styles.container_columns_right_parent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Dónde se ubica tu plaza?</h2>
              <p>Indica el nº para ser más precisos en la búqueda</p>
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
                      <Image className={styles.park_image} width={15} height={21} src='/parking-ico.png' />{description}
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
                  <input className={styles.formulario_checkbox} type="checkbox"/> Entre semana
                  <input className={styles.formulario_date} type="time" step="3600000" /> a 
                  <input className={styles.formulario_date} type="time" step="3600000" />
                  <input className={styles.formulario_checkbox} type="checkbox"/> 24 Horas     
              </div>
              <div className={styles.formulario_horario}>
              <input className={styles.formulario_checkbox} type="checkbox"/> Fin de semana
              <input className={styles.formulario_date} type="time" step="3600000" /> a 
              <input className={styles.formulario_date} type="time" step="3600000" />
              <input className={styles.formulario_checkbox} type="checkbox"/> 24 Horas     
          </div>
              <div></div>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Durante qué periodo de alquiler?</h2>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Para qué vehiculo es adecuada?</h2>
              <label>Tamaño:</label>
              <select value={tamano} onChange={(e) => setTamaño(e.target.value)}>
                <option value="Pequeño (3,6 x 1,6m)">Moto</option>
                <option value="Pequeño (3,6 x 1,6m)">Pequeño (3,6 x 1,6m)</option>
                <option value="Mediano (4,5 x 1,8m)">Mediano (4,5 x 1,8m)</option>
                <option value="Grande (5 x 1,9m)">Grande (5 x 1,9m)</option>
              </select>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿En qué planta se situa?</h2>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Tienes plaza en propiedad o es alquilada?</h2>
            </div>
            <div className={styles.container_columns_right}>
              <h2 className={styles.title_h2}>¿Por cuando la alquilas al mes?</h2>
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

export default Parker;
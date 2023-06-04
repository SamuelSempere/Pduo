const token = 'AIzaSyCziTRCAS24xZAsN9cjqhI4w_oUE8velIw'
import { Londrina_Outline } from 'next/font/google';
import React, { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { loadGoogleMapsScript } from 'use-places-autocomplete';

const AddressForm = () => {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    googleMapsApiKey: token,
    scriptOptions: {
      onload: () => handleScriptLoad(),
    },
  });

  const handleScriptLoad = () => {
    loadGoogleMapsScript(() => {
      setShowMap(true);
    });
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    setAddress(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();

    getGeocode({ address })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng })=>{
        setLatitud(lat),
        setLongitud(lng)
      }
      )
      .then(() => {
        console.log('Latitude:', latitud);
        console.log('Longitude:', longitud);
      })
      .catch((error) => {
        console.log('Error retrieving geolocation:', error);
      });
  };

  return (
    <div>
    {latitud}<br/>{longitud}
    <br/>
      <input
        value={value}
        onChange={handleInput}
        placeholder="Enter an address"
      />
      {status === 'OK' && (
        <ul>
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
      <p>Address: {address}</p>
      {showMap && (
        <div id="map" style={{ height: '400px', marginTop: '20px' }}></div>
      )}
    </div>
  );
};

export default AddressForm;

import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const Countries = ({ handleCountryChange, country }) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };
    fetchAPI();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.componentWrapper}>
      <span className={styles.selectedCountry}>{country || "Global"}</span>
      <div className={styles.inputWrapper}>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Select a country'
        />
        <button
          href='#'
          className='close'
          onClick={(() => setSearchTerm(""), () => handleCountryChange(""))}>
          x
        </button>
      </div>

      <div className={styles.flagsWrapper}>
        {filteredCountries.map((country, i) => (
          <div className={styles.countryWrapper}>
            <ReactCountryFlag
              svg
              style={{
                width: "5em",
                height: "5em",
              }}
              title={country.name}
              countryCode={country && country.iso2}
              className={styles.flags}
              onClick={() => handleCountryChange(country.name)}
            />
            <span className={styles.countryName}>{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;

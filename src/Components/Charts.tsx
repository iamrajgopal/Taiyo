import React, { useState, useEffect } from "react";
import {HomeIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';


interface Data {
  cases: number;
  deaths: number;
  recovered: number;
}

interface Country {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  countryInfo: {
    flag: string;
  };
}

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

function Charts() {
  const [selectedButton, setSelectedButton] = useState("");
  const [worldTotalData, setWorldTotalData] = useState<Data | null>(null);
  const [countryCasesData, setCountryCasesData] = useState<Country[]>([]);
  const [graphData, setGraphData] = useState<HistoricalData | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("https://disease.sh/v3/covid-19/all")
      .then((data: Data) => setWorldTotalData(data))
      .catch((error) => console.error("Error fetching world total data:", error));

    fetchData("https://disease.sh/v3/covid-19/countries")
      .then((data: Country[]) => setCountryCasesData(data))
      .catch((error) => console.error("Error fetching country cases data:", error));

    fetchData("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((data: HistoricalData) => setGraphData(data))
      .catch((error) => console.error("Error fetching graph data:", error));
  }, []);

  const renderContent = () => {
    if (selectedButton === "worldTotal" && worldTotalData) {
      return (
        <div className='border border-red-500 rounded p-4 inline-block'>
          <h2>Total Cases: {worldTotalData.cases}</h2>
          <h2>Total Deaths: {worldTotalData.deaths}</h2>
          <h2>Total Recovered: {worldTotalData.recovered}</h2>
        </div>
      );
    }
    if (selectedButton === "countryCases" && countryCasesData) {
      return (
        <div className="flex gap-2 flex-wrap justify-center align-center">
          {countryCasesData.map((country) => (
            <div key={country.country} className="border border-red-500 rounded p-4 inline-block  ">
              <h2>Country: {country.country}</h2>
              <img src={country.countryInfo.flag} alt={country.country} />
              <h2>Total Deaths: {country.deaths}</h2>
              <h2>Total Cases: {country.cases}</h2>
              <h2>Total Recovered: {country.recovered}</h2>
            </div>
          ))}
        </div>
      );
    }
    if (selectedButton === "graphData" && graphData) {
      return <div>{JSON.stringify(graphData)}</div>;
    }
    return null;
  };

  return (
    <>
      <nav className="bg-blue-500 h-16 flex justify-center items-center mb-5">
        <Link to="/">
          <HomeIcon className="w-10 h-10 text-white" />
        </Link>

        <div className="flex gap-10">
          <button
            onClick={() => handleButtonClick("worldTotal")}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            World Total Case
          </button>
          <button
            onClick={() => handleButtonClick("countryCases")}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Cases Countrywise
          </button>
          <button
            onClick={() => handleButtonClick("graphData")}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Graph
          </button>
        </div>
      </nav>

      {renderContent()}
    </>
  );
}

export default Charts;

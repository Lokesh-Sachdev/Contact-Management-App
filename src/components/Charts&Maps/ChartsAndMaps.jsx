import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from '../../styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsAndMaps = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Fetch world-wide data
  const { data: worldData } = useQuery('worldData', () =>
    fetch('https://disease.sh/v3/covid-19/all').then((response) =>
      response.json()
    )
  );

  // Fetch country-specific data
  const { data: countriesData } = useQuery('countriesData', () =>
    fetch('https://disease.sh/v3/covid-19/countries').then((response) =>
      response.json()
    )
  );

  // Fetch historical graph data
  const { data: graphData } = useQuery('graphData', () =>
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(
      (response) => response.json()
    )
  );

  // Prepare data for the line graph
  const lineGraphData = {
    labels: Object.keys(graphData?.cases || {}),
    datasets: [
      {
        label: 'Total Cases',
        data: Object.values(graphData?.cases || {}),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        fill: true,
      },
    ],
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'll',
          },
        },
      },
    },
  };

  // Render the Charts And Maps
  return (
    <div className={`${styles.paddings} grow overflow-y-auto bg-[#E2F1FF]`}>
      <h1 className={`${styles.heroHeading}`}>COVID-19 Charts And Maps</h1>

      {worldData && (
        <div>
          <h2 className={`${styles.subheading}`}>World-wide Data</h2>
          <p className="text-[#687798]">Total Cases: {worldData.cases}</p>
          <p className="text-[#687798]">Total Deaths: {worldData.deaths}</p>
          <p className="text-[#687798]">
            Total Recovered: {worldData.recovered}
          </p>
        </div>
      )}

      {countriesData && (
        <div>
          <h2 className={`${styles.subheading}`}>Country-specific Data</h2>
          <MapContainer
            style={{ height: '400px' }}
            center={[0, 0]}
            zoom={3}
            maxBounds={[
              [90, -180],
              [-90, 180],
            ]}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countriesData.map((country) => (
              <Marker
                key={country.countryInfo.iso2}
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Total Cases: {country.cases}</p>
                    <p>Total Deaths: {country.deaths}</p>
                    <p>Total Recovered: {country.recovered}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {graphData && (
        <div className="max-w-7xl mt-8">
          <h2 className={`${styles.subheading}`}>Historical Data</h2>
          <Line data={lineGraphData} />
        </div>
      )}
    </div>
  );
};

export default ChartsAndMaps;

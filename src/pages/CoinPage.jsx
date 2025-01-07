import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { CoinObject } from '../function/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coins/CoinInfo';
import { getCoinData } from '../function/getCoinData';
import { getCoinPrices } from '../function/getCoinPrice';
import LineChart from '../components/Coins/LineChart';
import { converDate } from '../function/convertDate';
import SelectDays from '../components/Coins/SelectDays';
import { SettingChartdata } from '../function/settingChartData';
import Toggle from '../components/Coins/Toggle';
import Footer from '../components/common/footer';

function CoinPage() {
  const { id } = useParams(); // Extract coin ID from the URL
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [coinData, setCoinData] = useState(null); // Store coin data
  const [days, setDays] = useState(30); // Default days for price chart
  const [chartData, setChartData] = useState({}); // Store chart data
  const [priceType, setpriceType] = useState('prices');

  useEffect(() => {
    let isMounted = true; // To prevent memory leaks if the component unmounts
    if (id) {
      getData(isMounted);
    }
    return () => {
      isMounted = false; // Cleanup
    };
  }, [id]);

const getData = async (isMounted) => {
  try {
    const coinData = await getCoinData(id);
    if (!coinData) {
      console.error("Coin data is undefined or null");
      return;
    }

    if (isMounted) {
      CoinObject(coinData, setCoinData);
      const prices = await getCoinPrices(id, days,priceType);
      if (prices?.length > 0) {
        SettingChartdata(setChartData, prices);
        setIsLoading(false);
      }
    }
  } catch (error) {
    console.error("Error fetching coin data:", error);
    setIsLoading(false); // Ensure loader is hidden on error
  }
};


  const handleDaysChange = async (event) => {
    setIsLoading(true);
    const selectedDays = event.target.value;
    setDays(selectedDays);
    try {
      const prices = await getCoinPrices(id, selectedDays,priceType);
      if (prices.length > 0) {
        SettingChartdata(setChartData, prices);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching prices for selected days:", error);
      setIsLoading(false);
    }
  };

  

  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setpriceType(newType);
    const prices = await getCoinPrices(id, days , newType);
      if (prices.length > 0) {
        SettingChartdata(setChartData, prices);
      }
      setIsLoading(false);
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <Toggle priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}  />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default CoinPage;

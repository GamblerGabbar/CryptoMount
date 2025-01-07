import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/common/Header';
import Tabs from '../components/Dashboard/Tabs';
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationControlled from '../components/Pagination';
import Loader from '../components/common/Loader';
import ErrorBoundary from '../components/common/ErrorBoundary'; // Recommended to create
import Footer from '../components/common/footer';

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Memoized filtered coins to prevent unnecessary re-renders
  const filteredCoins = useMemo(() => {
    return coins.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol?.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  // Memoized paginated coins
  const paginatedCoins = useMemo(() => {
    const data = search ? filteredCoins : coins;
    const startIndex = (page - 1) * 10;
    return data.slice(startIndex, startIndex + 10);
  }, [page, search, coins, filteredCoins]);

  // Fetch Coins with improved error handling
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: '100',
            page: '1',
            sparkline: 'false',
          },
        });

        setCoins(response.data);
        setPage(1);
      } catch (err) {
        console.error('Failed to fetch coins:', err);
        setError(err.message || 'An error occurred while fetching coins');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Page Change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle Search Change
  const onSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setPage(1); // Reset to first page on new search
  };

  // Error rendering
  if (error) {
    return (
      <div>
        <Header />
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <ErrorBoundary>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search 
            search={search} 
            onSearchChange={onSearchChange} 
          />
          <Tabs coins={paginatedCoins} />
          
          {!search && (
            <PaginationControlled
              count={Math.ceil(filteredCoins.length / 10)}
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
      <Footer />
    </ErrorBoundary>
    
  );
}

export default DashboardPage;
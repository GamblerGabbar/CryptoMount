export const CoinObject = (data, setCoin) => {
  if (!data) {
    console.error("Invalid data structure:", data);
    return;
  }

  setCoin({
    id: data.id || "N/A",
    name: data.name || "Unknown",
    symbol: data.symbol || "N/A",
    image: data.image?.large || "default-image-url.png", // Fallback image
    desc: data.description?.en || "Description not available",
    price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
    total_volume: data.market_data?.total_volume?.usd || 0,
    current_price: data.market_data?.current_price?.usd || 0,
    market_cap: data.market_data?.market_cap?.usd || 0,
  });
};

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register Chart.js components
ChartJS.register(...registerables);

function LineChart({ chartData, priceType }) {
  // Dynamic Y-axis configuration based on price type
  const getYAxisConfig = (type) => {
    const configs = {
      prices: {
        title: 'Price in USD',
        callback: (value) => `$${value.toLocaleString()}`,
        min: 0
      },
      market_caps: {
        title: 'Market Cap (USD)',
        callback: (value) => `$${(value / 1_000_000_000).toLocaleString()}B`,
        min: 0
      },
      total_volumes: {
        title: 'Total Volume (USD)',
        callback: (value) => `$${(value / 1_000_000).toLocaleString()}M`,
        min: 0
      }
    };

    return configs[type] || configs.prices;
  };

  // Memoize chart options to prevent unnecessary re-renders
  const chartOptions = useMemo(() => {
    const yAxisConfig = getYAxisConfig(priceType);

    return {
      responsive: true,
      maintainAspectRatio: false,
      
      // Interaction configuration
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
      
      // Scales configuration
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date',
            color: '#666',
            font: {
              size: 12,
              weight: 'normal'
            }
          },
          grid: {
            color: 'rgba(100, 100, 100, 0.1)', // Very light grey
            borderColor: 'rgba(100, 100, 100, 0.2)',
            drawBorder: false,
            tickColor: 'transparent',
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            color: '#666',
            font: {
              size: 10
            }
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: yAxisConfig.title,
            color: '#666',
            font: {
              size: 12,
              weight: 'normal'
            }
          },
          grid: {
            color: 'rgba(100, 100, 100, 0.1)', // Very light grey
            borderColor: 'rgba(100, 100, 100, 0.2)',
            drawBorder: false,
            tickColor: 'transparent',
          },
          min: yAxisConfig.min,
          ticks: {
            beginAtZero: true,
            color: '#666',
            font: {
              size: 10
            },
            callback: function(value) {
              return yAxisConfig.callback(value);
            }
          }
        }
      },
      
      // Plugins configuration
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255,255,255,0.2)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          callbacks: {
            label: function(context) {
              const yAxisConfig = getYAxisConfig(priceType);
              return `${yAxisConfig.title}: ${yAxisConfig.callback(context.parsed.y)}`;
            }
          }
        }
      },
      
      // Hover configuration
      hover: {
        mode: 'nearest',
        intersect: true
      },
      
      // Animation configuration
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      }
    };
  }, [priceType]); // Depend on priceType to recalculate options

  // Render check to prevent errors
  if (!chartData || !chartData.datasets || !chartData.labels) {
    return (
      <div 
        style={{ 
          height: '300px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: '#888'
        }}
      >
        No chart data available
      </div>
    );
  }

  return (
    <div 
      style={{ 
        position: 'relative', 
        height: '300px', 
        width: '100%' 
      }}
    >
      <Line 
        data={chartData} 
        options={chartOptions} 
      />
    </div>
  );
}

export default LineChart;
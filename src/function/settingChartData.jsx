import { converDate } from "./convertDate"

export const SettingChartdata = (setChartData,prices) => {
    setChartData({ 
                  labels: prices.map((price) => converDate(price[0])),
                  datasets: [{
                    data:  prices.map((price) => price[1]),
                    fill: true,
                    borderColor: "#3a80e9",
                    borderWidth: 2,
                    backgroundColor: 'rgba(58, 128, 233, 0.1)',
                     tension: 0.1,
                     pointRadius:0.25,
                    }
                ]
            })
}
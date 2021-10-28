import React from "react";

import { Line } from "react-chartjs-2";

const LineChart = () => {
    return (
        <div>
            <Line
                data={{
                    labels: ["May", "Jun", "July", "Aug", "Sep", "Oct"],
                    datasets: [
                        {
                            label: "# Triệu VNĐ",
                            data: [13, 17.2, 9.8, 14.3, 16.89, 18.43],
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",

                            borderWidth: 1,
                        },
                        // {
                        //   label: 'Quantity',
                        //   data: [47, 52, 67, 58, 9, 50],
                        //   backgroundColor: 'orange',
                        //   borderColor: 'red',
                        // },
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            stacked: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default LineChart;

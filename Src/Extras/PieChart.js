import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

//   const pieChartData = [
//     { name: 'Home', population: 15, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#fff', legendFontSize: 15,  },
//     { name: 'Tic-Tac-Toe', population: 30, color: 'pink', legendFontColor: '#fff', legendFontSize: 15 },
//     { name: 'HangMan', population: 20, color: 'red', legendFontColor: '#fff', legendFontSize: 15 },
//     { name: 'Whack-A-Mole', population: 5, color: '#ffffff', legendFontColor: '#fff', legendFontSize: 15 },
//     { name: 'Books', population: 10, color: '#000', legendFontColor: '#fff', legendFontSize: 15 },
//     { name: 'Articles', population: 7, color: 'yellow', legendFontColor: '#fff', legendFontSize: 15 },
//     { name: 'News', population: 8, color: 'orange', legendFontColor: '#fff', legendFontSize: 15 },
//     { name: 'Rewards', population: 2, color: 'gray', legendFontColor: '#fff', legendFontSize: 15 }
//   ]

const Dashboard = {
    labels: ["Home"], // optional
    data: [0.4],
    colors:['#30A453']
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity:0,
    color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  

  class piechart extends React.Component{
      render(){
        const graphStyle = {
            marginVertical: 8,
            // padding: 10,
            ...chartConfig.style
          }
      return(
        <ProgressChart
        data={Dashboard}
        width={300}
        height={220}
        strokeWidth={15}
        // strokeWidth={40}
        radius={40}
        chartConfig={chartConfig}
        hideLegend={true}
        withCustomBarColorFromData={Dashboard.colors}
        />


      

      )
      }
  }

//   <ProgressChart
//   data={data}
//   width={300}
//   height={220}
//   strokeWidth={16}
//   radius={20}
//   chartConfig={chartConfig}
//   hideLegend={false}
//   />

  export default piechart;
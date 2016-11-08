import React from 'react'
import axios from 'axios'
import ChartJS from 'chart.js'
import './chart.sass'


const chartCreator = {

  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        { display: true,
          gridLines: {
            display: true
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  },

  init: function() {
    const ctx = document.getElementById('chart')

    this.chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: this.options
    })
  },

  update: function(data) {
    this.chart.data.labels = data.labels
    this.chart.data.datasets = data.datasets
    this.chart.update()
  }
}



export default class Chart extends React.Component {
  constructor() {
    super()

    this.state = {
      chartData: {}
    }
  }

  componentDidMount() {
    chartCreator.init()
  }

  componentWillReceiveProps(next) {
    if (next.chartData) {
      console.log(next.chartData)
      chartCreator.update(next.chartData)
    }
  }

  render() {
    return(
      <div className="chart__container">
        <canvas id="chart"></canvas>
      </div>
    )
  }
}

import React from 'react'
import { useState ,useEffect} from 'react'
import {Bar} from 'react-chartjs-2';
import {getData} from '../data/apiData'


function BarChartScreen() {
    const [labelData, setLabelData] = useState([]);
    const [confirmedData, setConfirmedData] = useState([]);
    const [deathsData, setDeathsData] = useState([]);
    const data = (canvas)=>{
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0,90,100,0);
        const gradient1 = ctx.createLinearGradient(0,90,100,0);

        gradient.addColorStop(0,"#74ebd5")
        gradient.addColorStop(0.5,"#fad0c4")
        gradient.addColorStop(1,"#ACB6E5")

        gradient1.addColorStop(0,"#ff9a9e")
        gradient1.addColorStop(0.5,"#fad0c4")
        gradient1.addColorStop(1,"#fad0c4")
        return{
            labels:labelData,
            datasets:[
                {
                    barPercentage: 0.5,
                    barThickness: 10,
                    maxBarThickness: 100,
                    minBarLength: 2,
                    label:"Confirmed",
                    data:confirmedData,
                    backgroundColor: gradient,
                    borderWidth: 1
                },
                {
                    barPercentage: 0.5,
                    barThickness: 10,
                    maxBarThickness: 100,
                    minBarLength: 2,
                    label:"Death",
                    data:deathsData,
                    backgroundColor: gradient1,
                    borderWidth: 1
                }
            ]
        }
    }
    const options ={
        responsive : true,
        tooltips: {
            mode: "index",
            intersect: false,
        },
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true,
                }
            }]
        },
        hover:{
            mode:"nearest",
            intersect:true
        },
        legend:{
            display: true,
            position:"bottom",
            labels: {
                fontColor:'rgba(242,38,19,1)'
            }
        }
        
    }
    const getChartData= async () =>{
        try {
            let labelsArray =[];
            let confirmedArray = [];
            let deathsArray = [];
            const data = await getData();
            data.forEach(e => {
                labelsArray.push(e.reportDate);
                confirmedArray.push(e.confirmed.total);
                deathsArray.push(e.deaths.total);
            });
            setLabelData(labelsArray)
            setConfirmedData(confirmedArray)
            setDeathsData(deathsArray)
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        getChartData()

    }, [])
    return (
        <div>
            <Bar data={data} options={options}/>
        </div>
    )
}

export default BarChartScreen

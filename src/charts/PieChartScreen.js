import React from 'react'
import { useState ,useEffect} from 'react'
import {Pie} from 'react-chartjs-2';
import {getPieData} from '../data/apiData'

function PieChartScreen() {
    const [confirmedData, setConfirmedData] = useState(0);
    const [deathsData, setDeathsData] = useState(0);
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
            labels:["Confirmed","Deaths"],
            datasets:[
                {
                    label:"data",
                    data:[confirmedData,deathsData],
                    backgroundColor: [gradient,gradient1],
                    borderColor: [gradient,gradient1],
                    borderWidth: 1
                },
               
            ]
        }
    }
    const options ={
        responsive : true,
        pie:{
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enable: true,
                format: `<b>{point.name}</b>: {point.percentage:.1f}%`
            }
        }
    }
    const getChartData= async () =>{
        try {
            let confirmedData = 0;
            let deathsData =0;
            const data = await getPieData();
  
            if(data !== null){
                const {confirmed,deaths} = data;
                const total = confirmed.value + deaths.value;
                confirmedData = parseFloat(((confirmed.value / total)*100).toFixed(2))
                deathsData = parseFloat(((deaths.value / total)*100).toFixed(2))
            }
            setConfirmedData(confirmedData)
            setDeathsData(deathsData)
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        getChartData()

    }, [])
    return (
       <Pie data={data} options={options}/>
    )
}

export default PieChartScreen

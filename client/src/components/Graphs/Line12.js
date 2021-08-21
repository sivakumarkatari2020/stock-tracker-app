import React from 'react';
import { Line } from 'react-chartjs-2';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const stylesheet = makeStyles({
    graph1: {
        width: '300px',
        minWidth: '300px',
        height: '200px',
        padding: '10px',
        background: '#FFF',
        borderRadius: '5px',
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'contain',
        overflow: 'auto',
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',

        '@media (max-width:500px)': {
            width: '95%',
            minWidth: '300px',
            margin: '20px 0',
        },
    },
})

function Line12(props) {
    const {startTimes,data1,data2} = props;
    const styles = stylesheet();

    let labelValues = startTimes.map(() => '');
    let dataValues1 = [];
    let dataValues2 = [];

    for(let i=0;i<data1.length;i++){
        if(data1[i] === null && i>0){
            dataValues1.push(dataValues1[i-1]);
        }
        else{
            dataValues1.push(data1[i]);
        }
    }

    for(let i=0;i<data2.length;i++){
        if(data2[i] === null && i>0){
            dataValues2.push(dataValues2[i-1]);
        }
        else{
            dataValues2.push(data2[i]);
        }
    }

    const graphData = {
        labels : labelValues,
        datasets : [{
            label: 'max_call_chng_oi',
            data: dataValues1,
            responsive: true,
            borderColor: 'red',
            fill: false,
            borderWidth: 2,
            pointBorderColor: '#000',
            pointBackgroundColor: '#000',
            pointRadius: 0,
            pointHoverRadius: 5,
        },
        {
            label: 'max_put_chng_oi',
            data: dataValues2,
            responsive: true,
            borderColor: 'green',
            fill: false,
            borderWidth: 2,
            pointBorderColor: '#000',
            pointBackgroundColor: '#000',
            pointRadius: 0,
            pointHoverRadius: 5,
        }
        ],
        options:{
            title:{
                display:true,
                text:'Sample graph',
                fontSize:25,
            },
            legend:{
                display: false,
            },
            scales:{
                xAxes: [{
                    display: false
                }],
                yAxes: [
                    {
                        ticks: {
                            fontSize: 12,
                        }
                    }
                ]
            }
        }
    }

    return (
        <Box component="div" className={styles.graph1}>
            <Line
                data={graphData}
                width={200}
                height={400}
                options={{ maintainAspectRatio: false }}
            ></Line>
        </Box>
    )
}

export default Line12

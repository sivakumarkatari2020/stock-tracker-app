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

function Line9(props) {
    const {startTimes,data} = props;
    const styles = stylesheet();

    let labelValues = startTimes.map(() => '');
    let dataValues = [];

    for(let i=0;i<data.length;i++){
        if(data[i] === null && i>0){
            dataValues.push(dataValues[i-1]);
        }
        else{
            dataValues.push(data[i]);
        }
    }

    const graphData = {
        labels : labelValues,
        datasets : [{
            label: 'min_pain_put',
            data: dataValues,
            responsive: true,
            borderColor: '#9417E2',
            fill: true,
            borderWidth: 2,
            pointBorderColor: '#000',
            pointBackgroundColor: '#000',
            pointRadius: 0,
            pointHoverRadius: 5,
        }],
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

export default Line9

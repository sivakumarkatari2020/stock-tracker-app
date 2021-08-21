import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Line1 from './Line1';
import Line2 from './Line2';
import Line3 from './Line3';
import Line4 from './Line4';
import Line5 from './Line5';
import Line6 from './Line6';
import Line7 from './Line7';
import Line8 from './Line8';
import Line9 from './Line9';
import Line10 from './Line10';
import Line11 from './Line11';
import Line12 from './Line12';

const stylesheet = makeStyles({
    main: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#39bed5', 
        color: 'white',
        margin: 0,
        padding: '10px 10px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems: 'center',

        '@media (max-width:1300px)': {
            height: '100%',
        },
    },
})

function Graphs(props) {

    const {match : {params}} = props;
    const stockname = params.stock;
    const startdate = params.date;
    
    const styles = stylesheet();

    const [startTimes,getstartTimes] = useState([]);
    const [firstOidata10,getFirstOidata10] = useState([]);
    const [firstChangedata10,getFirstChangedata10] = useState([]);
    const [firstOidata5,getFirstOidata5] = useState([]);
    const [firstChangedata5,getFirstChangedata5] = useState([]);
    const [OIratio,getOIratio] = useState([]);
    const [VOLratio,getVOLratio] = useState([]);
    const [maxCall,getmaxCall] = useState([]);
    const [maxPut,getmaxPut] = useState([]);
    const [minPain,getminPain] = useState([]);
    const [minPainCall,getminPainCall] = useState([]);
    const [putTotalOi,getputTotalOi] = useState([]);
    const [callTotalOi,getcallTotalOi] = useState([]);

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/timeValues/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].start_time);
                }
                getstartTimes(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/firstOi10/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].first_10_oi_sum_ratio);
                }
                getFirstOidata10(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/firstChange10/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].first_10_oi_change_sum_ratio);
                }
                getFirstChangedata10(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/firstOi5/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].first_5_oi_sum_ratio);
                }
                getFirstOidata5(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/firstChange5/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].first_5_oi_change_sum_ratio);
                }
                getFirstChangedata5(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/OIratio/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].OI_Ratio);
                }
                getOIratio(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/VOLratio/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].vol_Ratio);
                }
                getVOLratio(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/maxCall/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].max_call_chng_oi);
                }
                getmaxCall(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/maxPut/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].max_put_chng_oi);
                }
                getmaxPut(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/minPain/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].min_pain_put);
                }
                getminPain(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/minPainCall/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].min_pain_call);
                }
                getminPainCall(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/putTotal/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].put_total_oi);
                }
                getputTotalOi(arr);
            })
        }
    },[stockname,startdate])

    useEffect(()=>{
        if(stockname!=="" && startdate!==""){
            axios.get(`http://localhost:5000/callTotal/${stockname}/${startdate}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i].call_total_oi);
                }
                getcallTotalOi(arr);
            })
        }
    },[stockname,startdate])

    return (
        <Box component="div" className={styles.main}>
            <Line1
                startTimes={startTimes}
                data={firstOidata10}
            ></Line1>
            <Line2
                startTimes={startTimes}
                data={firstChangedata10}
            ></Line2>
            <Line3
                startTimes={startTimes}
                data={firstOidata5}
            ></Line3>
            <Line4
                startTimes={startTimes}
                data={firstChangedata5}
            ></Line4>
            <Line5
                startTimes={startTimes}
                data={OIratio}
            ></Line5>
            <Line6
                startTimes={startTimes}
                data={VOLratio}
            ></Line6>
            <Line7
                startTimes={startTimes}
                data={maxCall}
            ></Line7>
            <Line8
                startTimes={startTimes}
                data={maxPut}
            ></Line8>
            <Line9
                startTimes={startTimes}
                data={minPain}
            ></Line9>
            <Line10
                startTimes={startTimes}
                data={minPainCall}
            ></Line10>
            <Line11
                startTimes={startTimes}
                data1={putTotalOi}
                data2={callTotalOi}
            ></Line11>
            <Line12
                startTimes={startTimes}
                data1={maxCall}
                data2={maxPut}
            ></Line12>
        </Box>
    )
}

export default Graphs

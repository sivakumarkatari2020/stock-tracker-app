import React,{useState,useEffect} from 'react';
import { Box,InputLabel,MenuItem,Select,FormControl,Button,Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';

const useStyles = makeStyles({
    rowFlexer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '30px 0',
        padding: '10px',
        backgroundColor: '#FFF',
        borderRadius: '5px',
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',

        '@media (max-width:1100px)': {
            width: '100%',
            padding: '10px 15px',
        },
        '@media (max-width:780px)': {
            width: '95%',
            padding: '10px 15px',
        },
        '@media (max-width:500px)': {
            width: '95%',
            flexDirection: 'column',
        }
    },
    innerFlexer: {
        width : '50%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width:780px)': {
            width: '60%',
            padding: '10px 15px',
        },
        '@media (max-width:500px)': {
            width: '95%',
            flexDirection: 'column',
        }
    },
    selectionBox: {
        minWidth: '200px',
        '@media (max-width:780px)': {
            minWidth: '180px',
        },
        '@media (max-width:500px)': {
            width: '250px',
            margin: '20px 0'
        },
    },
    btnGrp:{
        width : '300px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',

        '@media (max-width:780px)': {
            width: '220px',
        },
        '@media (max-width:500px)': {
            width: '300px',
            margin: '20px 0'
        },
    },
    button:{
        boxShadow: 'none',
        border: 'none',
        height: '40px',
        backgroundColor: 'FF5600',

        '@media (max-width:780px)': {
            width: '100px',
        },
    },
    buttonFade:{
        boxShadow: 'none',
        border: 'none',
        height: '40px',
        background: '#e0ebeb',

        '@media (max-width:780px)': {
            width: '100px',
        },
    },
    link:{
        color : 'white',
        display: 'flex',
        width: '70px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',

        '@media (max-width:780px)': {
            width: '50px',
        },
    }
});

const formStyles = makeStyles((theme)=>({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

function Preface(props) {
    const {stock,date,stockList,dateList,setDateList,selectedStock,selectedDate,getData} = props;

    const classes = useStyles();
    const forms = formStyles();

    const [isStockselected, selectStock] = useState(false);
    const [openStock, setOpenStock] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [isValuesObtained,gotValues] = useState(false);
    const [url,setUrl] = useState('');

    function refreshData(){
        if(stock!=="" && date!==""){
            getData([]);
            axios.get(`http://localhost:5000/stockData/${stock}/${date}`)
            .then((response) => response.data)
            .then((result)=>{
                let arr = [];
                for(let i=0;i<result.length;i++){
                    arr.push(result[i]);
                }
                getData(arr);
            })
        }
    }

    useEffect(()=>{
        let url = `http://localhost:3000/graph/${stock}/${date}`;
        setUrl(url);
    },[stock,date])

    return (
        <Box className={classes.rowFlexer}>
            <Box className={classes.innerFlexer}>
                <FormControl className={forms.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">SELECT STOCK</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            open={openStock}
                            onClose={() => {setOpenStock(false);}}
                            onOpen={() => {setOpenStock(true);}}
                            value={stock}
                            onChange={(event) => {
                                let val = event.target.value;
                                selectedStock(val);
                                selectStock(true);

                                let url = `http://localhost:5000/stockDates/${val}`;
                                console.log(url);
                                axios.get(url)
                                .then((response)=> response.data)
                                .then((result)=>{
                                    let arr = [];
                                    for(let i=0;i<result.length;i++){
                                        arr.push(result[i].start_date);
                                    }
                                    setDateList(arr);
                                })
                            }} 
                            className={classes.selectionBox}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                            stockList.map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)
                            }
                        </Select>
                </FormControl>
                {
                    isStockselected
                    ? <FormControl className={forms.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">SELECT START DATE</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                open={openDate}
                                onClose={() => {setOpenDate(false);}}
                                onOpen={() => {setOpenDate(true);}}
                                value={date}
                                onChange={(event) => {
                                    selectedDate(event.target.value);
                                    gotValues(true);
                                }}
                                className={classes.selectionBox}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                dateList.map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)
                                }
                            </Select>
                    </FormControl>
                    : <FormControl className={classes.formControl} disabled>
                        <InputLabel id="demo-simple-select-disabled-label">SELECT START DATE</InputLabel>
                        <Select
                            labelId="demo-simple-select-disabled-label"
                            id="demo-simple-select-disabled"
                            value={date}
                            onChange={()=>{}}
                            className={classes.selectionBox}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                }
            </Box>
            <Box className={classes.btnGrp}>
                {
                    isValuesObtained
                    ? <Button 
                            variant="contained" 
                            color="primary" 
                            endIcon={<TimelineIcon />}
                            className={classes.button}
                        >
                            <Link
                                href={url}
                                variant="body2"
                                target="_blank"
                                className={classes.link}
                            >Graph</Link>
                    </Button>
                    : <Button 
                        variant="disabled" 
                        color="primary" 
                        endIcon={<TimelineIcon />}
                        className={classes.buttonFade}
                        >Graph</Button>
                }
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<RefreshIcon />}
                    className={classes.button}
                    onClick={refreshData}
                >Refresh</Button>
            </Box>
        </Box>
    )
}

export default Preface

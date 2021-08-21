import React  from 'react';
import { Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Preface from './Preface';
import StockBoard from './StockBoard';

const useStyles = makeStyles({
    main: {
        backgroundColor: '#F2F3F5', 
        background: 'linear-gradient(to bottom,#39bed5 50%,#F9F9F9 50%)',
        color: 'white',
        height: '100vh',
        margin: 0,
        padding: '30px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent : 'center',
        alignItems: 'center',

        '@media (max-width:500px)': {
            height: '100%',
        },
    },
});

function Main(props) {

    const classes = useStyles();
    const {stock,date,stocks,dates,setStock,setDate,data,getData} = props;

    return (
        <Box component="div" className={classes.main}>
            <Preface 
                stock={stock}
                date={date}
                stockList={stocks}
                dateList={dates}
                selectedStock={setStock}
                selectedDate={setDate}
                getData={getData}
            ></Preface>
            <StockBoard
                data={data}
            >
            </StockBoard>
        </Box>
    )
}

export default Main

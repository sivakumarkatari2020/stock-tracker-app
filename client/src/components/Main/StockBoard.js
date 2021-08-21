import React,{useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tableContainer: {
        width: '100%',
        height: '80vh',
        background: '#FFF',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',

        '@media (max-width:1100px)': {
            width: '100%',
        },
        '@media (max-width:780px)': {
            width: '100%',
        },
        '@media (max-width:500px)': {
            width: '100%',
            height: '500px',
        },
    },
    table: {
        padding: '20px',
        overflow: 'auto',
        borderRadius: '20px',
        background: '#FFF',
        color: '#000',
    },
    headRow: {
        height: '60px',
        overflow: 'hidden',
        position: 'sticky',
        top: '0',
        background: '#00306A',
    },
    headCells: {
        whiteSpace: 'nowrap',
        color: 'white',
    },
    tableRow: {
        transition: '0.5s',
        height: '20px',
        "&:hover": {
            backgroundColor: '#e0ebeb'
        }
    },
    rowCells: {
        padding: '5px',
    },
    preRow: {
        width: '100%',
        height : '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    preCell: {
        boxShadow: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader1: {
        display: 'block',
        width: '10px',
        height: '10px',
        margin: '3px',
        borderRadius: '50%',
        background: 'teal',
        animation: `$pulsate .5s infinite`, 
    },
    loader2: {
        display: 'block',
        width: '10px',
        height: '10px',
        margin: '3px',
        borderRadius: '50%',
        background: 'teal',
        animation: `$pulsate .6s infinite`, 
    },
    loader3: {
        display: 'block',
        width: '10px',
        height: '10px',
        margin: '3px',
        borderRadius: '50%',
        background: 'teal',
        animation: `$pulsate .7s infinite`, 
    },
    "@keyframes pulsate": {
        "0%": {
            opacity: 0,
        },
        "100%": {
            opacity: 1,
        }
    },
});

function StockBoard(props) {

    const {data} = props;
    const styles = useStyles();

    const [isDataloaded,dataLoaded] = useState(false);
    const [isInit,finishInit] = useState(true);

    const columnArr = ['stock_name', 'spot_price', 'start_time', 'positional_range', 'call_neg_count', 'put_neg_count', 'first_10_oi_sum_ratio', 'first_10_oi_change_sum_ratio', 'first_5_oi_sum_ratio', 'first_5_oi_change_sum_ratio', 'OI_Ratio','vol_Ratio', 'max_call_chng_oi', 'max_put_chng_oi', 'max_call_oi', 'max_put_oi','max_pain_put', 'min_pain_put', 'max_pain_put_str_prc', 'min_pain_put_str_prc', 'max_pain_call', 'min_pain_call', 'max_pain_call_str_prc', 'min_pain_call_str_prc'];

    useEffect(()=>{
        if(data.length > 0){
            dataLoaded(true);
            finishInit(false);
        }else{
            dataLoaded(false);
        }
    },[data])

    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} aria-label="simple table">
                <TableHead>
                    <TableRow className={styles.headRow}>
                        <TableCell className={styles.headCells} key='id'>SL no.</TableCell>
                        {columnArr.map((column) => (
                            <TableCell className={styles.headCells} key={column}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {
                isDataloaded
                ? <TableBody>
                    {
                    data.map((row,id=0) => (
                        <TableRow key={++id} className={styles.tableRow}>
                            <TableCell className={styles.rowCells} align="center" key={`id${id}`}>{++id}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.stock_name || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.spot_price || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.start_time || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.positional_range || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.call_neg_count || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.put_neg_count || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.first_10_oi_sum_ratio || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.first_10_oi_change_sum_ratio || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.first_5_oi_sum_ratio || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.first_5_oi_change_sum_ratio || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.OI_Ratio || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.vol_Ratio || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_call_chng_oi || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_put_chng_oi || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_call_oi || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_put_oi || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_pain_put || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.min_pain_put || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_pain_put_str_prc || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.min_pain_put_str_prc || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_pain_call || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.min_pain_call || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.max_pain_call_str_prc || '--'}</TableCell>
                            <TableCell className={styles.rowCells} align="center" key={uuidv4()}>{row.min_pain_call_str_prc || '--'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                : <TableBody>
                    {
                        isInit
                        ? <TableRow></TableRow>
                        : <TableRow className={styles.preRow}>
                            <TableCell className={styles.preCell}>
                                    <span className={styles.loader1}></span>
                                    <span className={styles.loader2}></span>
                                    <span className={styles.loader3}></span>
                            </TableCell>
                        </TableRow>
                    }
                    </TableBody>
                }
            </Table>
        </TableContainer>
    )
}

export default StockBoard

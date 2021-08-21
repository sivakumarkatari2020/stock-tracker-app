const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 5000;

//Middleware
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(express.json());
app.use(cors());

let data = '';

app.get('/columnNames', (err,res) => {
    const sqlQuery = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'tbl_master_entries' && (COLUMN_NAME = 'spot_price' || COLUMN_NAME = 'start_time' || COLUMN_NAME = 'call_total_oi' || COLUMN_NAME = 'call_total_volume' || COLUMN_NAME = 'call_neg_count' || COLUMN_NAME = 'put_neg_count' || COLUMN_NAME = 'first_10_oi_sum_ratio' || COLUMN_NAME = 'first_10_oi_change_sum_ratio' || COLUMN_NAME = 'six_call_iv_sum' || COLUMN_NAME = 'six_put_iv_sum' || COLUMN_NAME = 'first_15_put_oi_sum' || COLUMN_NAME = 'first_15_put_oi_change_sum' || COLUMN_NAME = 'first_15_put_vol')";
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/stockNames',(err,res)=>{
    const sqlQuery = "SELECT distinct(stock_name) FROM tbl_master_entries";
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/stockDates/:name',(req,res)=>{
    let stock_name = req.params.name;
    const sqlQuery = `SELECT distinct(start_date) FROM tbl_master_entries WHERE stock_name='${stock_name}' `;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/stockData/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT stock_name, spot_price, start_time, positional_range, call_neg_count, put_neg_count, first_10_oi_sum_ratio, first_10_oi_change_sum_ratio, first_5_oi_sum_ratio, first_5_oi_change_sum_ratio, put_total_oi/call_total_oi AS OI_Ratio, put_total_volume/call_total_volume AS vol_Ratio, max_call_chng_oi, max_put_chng_oi, max_call_oi, max_put_oi,max_pain_put, min_pain_put, max_pain_put_str_prc, min_pain_put_str_prc, max_pain_call, min_pain_call, max_pain_call_str_prc, min_pain_call_str_prc from tbl_master_entries WHERE stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/timeValues/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT start_time FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/firstOi10/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT first_10_oi_sum_ratio FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/firstChange10/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT first_10_oi_change_sum_ratio FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/firstOi5/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT first_5_oi_sum_ratio FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/firstChange5/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT first_5_oi_change_sum_ratio FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/OIratio/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT put_total_oi/call_total_oi AS OI_Ratio FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/VOLratio/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT put_total_volume/call_total_volume AS vol_Ratio FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/maxCall/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT max_call_chng_oi FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/maxPut/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT max_put_chng_oi FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/minPain/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT min_pain_put FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/minPainCall/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT min_pain_call FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/putTotal/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT put_total_oi FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/callTotal/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT call_total_oi FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/callChange/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT max_call_chng_oi FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/putChange/:stock/:date',(req,res)=>{
    let stock_name = req.params.stock;
    let start_date = req.params.date;
    const sqlQuery = `SELECT max_put_change_oi FROM tbl_master_entries where stock_name='${stock_name}' && start_date='${start_date}'`;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            data = result;
            res.send(data);
        }
    })
})

app.get('/', (req, res) => {
    res.send('this is home page!')
})

//app.use(express.static(path.join(__dirname,'')))

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

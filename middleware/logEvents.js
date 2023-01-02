const { v4:uuid } = require('uuid');
const { format } = require('date-fns');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
 
process.on('log', (message)=> logEvents( message )); // logevent가 발생하면 처리 함 

const logEvents = async (message)=>{
    const dateTime = `${format( new Date(), 'yyyy-MM-dd  HH:mm:ss')}`;
    const logItem = `\n${dateTime}  ${uuid()}  ${message}`;
    console.log(logItem);

    try{
        if(!fs.existsSync( path.join(__dirname, '../logs'))){
            await fsPromise.mkdir(path.join(__dirname, '../logs'))
        }
        await fsPromise.appendFile(
            path.join(__dirname, '../logs', 'eventLog.txt'),
            logItem
        )
    }catch(err){
        throw err; 
    }finally{

    }
}

const  logger = (req, res, next)=>{
    logEvents( `${req.method} ${req.url}` );
    // logEvents에서 12번째 라인에서 console 하고 있음  
    next();
}

process.on( 'uncaughtException', (err)=>{
    console.log( err  );
})

module.exports =  { logEvents , logger}
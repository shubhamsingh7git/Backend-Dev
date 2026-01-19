const os=require('os');
const fs=require('fs');
const totalMemory=os.totalmem()/(1024*1024*1024);
const freeMemory=os.freemem()/(1024*1024*1024);
const platform=os.platform();
const cpu=os.cpus()[0].model;

// console.log("Total Memory",totalMemory,freeMemory,platform,cpu);


const timestamp=new Date().toLocaleString();
const log=`
time: ${timestamp}
free memory:${freeMemory}`

setInterval(()=>{
    fs.appendFile("./system_info.txt", log,(err)=>{
        if(err){
            console.log(err);
        }
    })
}, 500);
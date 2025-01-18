const express = require('express');
const os = require('os'); // require the os module
const cluster = require('cluster');
const app = express();
 
//app.use(express.json())


const numCPUs= os.cpus().length;
console.log(numCPUs)

if(cluster.isPrimary){
    console.log('primary process'+process.pid)
    for(let i=0;i<numCPUs;i++){
        cluster.fork()
    }
    
}
else {
      app.get("/",(req,res)=>{
        return res.json({message:`helo from express server ${process.pid}`})
      })
    app.listen(3006, () => {
      
      console.log("Server is running on port 3006");
    });
  }




 
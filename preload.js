const { ipcRenderer } = require("electron")

function takeScreenShot(){
    console.log('take screenshot function call ')
    ipcRenderer.send('screenshot:capture',{})
    ipcRenderer.on('screenshot:captured',(e,data) => {
        console.log('captured --data --> ',data);
    })
}

setInterval(()=>{
    takeScreenShot()
},2000)
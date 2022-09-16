const { ipcRenderer } = require("electron")

let screenshotArray = []

function takeScreenShot(){
    console.log('take screenshot function call ')
    ipcRenderer.send('takeScreenshot',{})
}

setInterval(()=>{
    takeScreenShot()
},5000);

ipcRenderer.on('screenshot',(e,data) => {
    console.log('captured --data --> ',data);
    screenshotArray.push(data);

    let addScreenDom = document.getElementById('add-screen');

    let a = document.createElement('div');
    a.className="col-3"
    
    screenshotArray.forEach(element => {
        a.innerHTML = `
                        <div class="card">
                            <img src="${data?.base64}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Name - ${data?.name}</h5>
                                <h6> Id - ${data?.displayId} </h6>
                            </div>
                        </div>    `

        addScreenDom.appendChild(a);
    });

})
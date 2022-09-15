const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');


let win;

function createWindow(){
    win = new BrowserWindow({
        width:600,
        height:600,
        backgroundColor:"#ffffff",
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(__dirname,'preload.js')
        }
    })

    win.loadURL(`file://${__dirname}/dist/electron/index.html`);

    win.webContents.openDevTools();

    win.on('closed', function() {
        win = null;
    })
}

app.on('ready',createWindow)

app.on('window-all-closed',function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate',function(){
    if(win == null){
        createWindow();
    }
})

ipcMain.on('screenshot:capture',(e)=>{

    console.log('main method call')
    desktopCapturer.getSources({types:['screen'],thumbnailSize:{width:1080, height: 720}})
    .then(source =>{
        let img = source[0].name;
        win.webContents.send('screenshot:captured   ',img);

        console.log('img --> ',img);
    })
})
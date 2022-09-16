const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');


let win;

function createWindow(){
    win = new BrowserWindow({
        width:600,
        height:600,
        backgroundColor:"#ffffff",
        icon:`file://${__dirname}/dist/assets/icon.png`,
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

ipcMain.on('takeScreenshot',(e)=>{

    console.log('main method call')
    desktopCapturer.getSources({types:['screen'],thumbnailSize:{width:1080, height: 720}})
    .then(source =>{
        let img = {
            base64: source[0].thumbnail.toDataURL(),
            name: source[0].name,
            displayId: source[0].display_id
        };
        win.webContents.send('screenshot',img);

        console.log('img --> ',img);
    })
})
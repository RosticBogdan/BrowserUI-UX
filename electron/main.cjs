const { app, BrowserWindow, ipcMain } = require('electron');
const { enable } = require('@electron/remote/main');
const Store = require('electron-store');
const path = require('path');

const store = new Store();

enable();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      enableRemoteModule: true
    }
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle IPC messages
ipcMain.on('save-history', (event, historyItem) => {
  const history = store.get('history', []);
  history.push(historyItem);
  store.set('history', history);
});

ipcMain.on('get-history', (event) => {
  event.returnValue = store.get('history', []);
});

ipcMain.on('clear-history', () => {
  store.set('history', []);
});

ipcMain.on('save-bookmark', (event, bookmark) => {
  const bookmarks = store.get('bookmarks', []);
  bookmarks.push(bookmark);
  store.set('bookmarks', bookmarks);
});

ipcMain.on('get-bookmarks', (event) => {
  event.returnValue = store.get('bookmarks', []);
});

ipcMain.on('save-settings', (event, settings) => {
  store.set('settings', settings);
});

ipcMain.on('get-settings', (event) => {
  event.returnValue = store.get('settings', {
    homepage: 'https://google.com',
    searchEngine: 'Google',
    darkMode: fa
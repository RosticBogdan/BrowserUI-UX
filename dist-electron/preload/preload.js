import s from "electron";
var i = {};
const { contextBridge: d, ipcRenderer: n } = s;
d.exposeInMainWorld("electron", {
  store: {
    get: (e) => n.sendSync("get-store", e),
    set: (e, r) => n.send("set-store", e, r)
  },
  ipcRenderer: {
    send: (e, ...r) => n.send(e, ...r),
    on: (e, r) => {
      n.on(e, (t, ...o) => r(...o));
    },
    once: (e, r) => {
      n.once(e, (t, ...o) => r(...o));
    },
    removeListener: (e, r) => {
      n.removeListener(e, r);
    }
  }
});
export {
  i as default
};

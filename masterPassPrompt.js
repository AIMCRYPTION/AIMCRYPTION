const { ipcMain, Menu, BrowserWindow } = require('electron')
const { VIEWS, WINDOW_OPTS } = require('../config')
const MasterPass = require('../core/MasterPass')
const MasterPassKey = require('../core/MasterPassKey')
const logger = require('electron-log')
const menuTemplate = require('./menu')
const title = 'MasterPass'

exports.title = title

exports.window = function (global, resetOnly, callback) {
  let noMP = true // init noMP flag with false
  let error = null
  const CLOSE_TIMEOUT = 2000
  
  // creates a new BrowserWindow
  let win = new BrowserWindow({
    width: 300,
    height: 460,
    title,
    ...WINDOW_OPTS
  })
  // create menu from menuTemplate and set
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
  const qs = resetOnly ? '?reset=true' : ''
  // loads masterpassprompt.html view into the BrowserWindow
  win.loadURL(VIEWS.MASTERPASSPROMPT + qs)

  let webContents = win.webContents

  ipcMain.on('checkMasterPass', function (event, masterpass) {
    logger.verbose('IPCMAIN: checkMasterPass emitted. Checking MasterPass...')
    // Check user submitted MasterPass
    MasterPass.check(masterpass)
      .then(res => {
        if (res.match) {
          // Password matches
          logger.info('IPCMAIN: PASSWORD MATCHES!')
          // Save MasterPassKey (while program is running)
          global.MasterPassKey = new MasterPassKey(res.key)
          // Save for next time
          MasterPass.save(masterpass)
          // send result match result to masterpassprompt.html
          webContents.send('checkMasterPassResult', {
            err: null,
            match: res.match
          })
          noMP = false
          // Close after 1 second
          setTimeout(function () {
            // close window (invokes 'closed') event
            win.close()
          }, CLOSE_TIMEOUT)
        } else {
          logger.warn('IPCMAIN: PASSWORD DOES NOT MATCH!')
          webContents.send('checkMasterPassResult', {
            err: null,
            match: res.match
          })
        }
      })
      .catch(err => {
        // Inform user of error (on render side)
        webContents.send('checkMasterPassResult', err.message)
        // set error
        error = err
        // Close after 1 second
        setTimeout(function () {
          // close window (invokes 'closed') event
          win.close()
        }, CLOSE_TIMEOUT)
      })
  })

  ipcMain.on('setMasterPass', function (event, masterpass) {
    // setMasterPass event triggered by render proces
    logger.verbose('IPCMAIN: setMasterPass emitted Setting Masterpass...')
    // derive MasterPassKey, genPassHash and set creds globally
    MasterPass.set(masterpass)
      .then(mpkey => {
        // set the derived MasterPassKey globally
        global.MasterPassKey = new MasterPassKey(mpkey)
        return
      })
      .then(() => {
        // save the credentials used to derive the MasterPassKey
        return global.mdb.saveGlobalObj('creds')
      })
      .then(() => {
        // Inform user that the MasterPass has successfully been set
        logger.verbose('IPCMAIN: Masterpass has been reset successfully')
        webContents.send('setMasterPassResult', null)
      })
      .catch(err => {
        // Inform user of the error that occured while setting the MasterPass
        webContents.send('setMasterPassResult', err.message)
        error = err
      })
  })

  win.on('closed', function () {
    logger.info('win.closed event emitted for PromptWindow')
    // send error and noMP back to callee (masterPassPromptWindow Promise)
    if (callback) callback(error || noMP)
    // close window by setting it to nothing (null)
    win = null
  })

  return win
}

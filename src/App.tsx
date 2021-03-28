import React, { createRef, useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { Button, Grid, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import ReactJson from 'react-json-view'
import MuiAlert from '@material-ui/lab/Alert'
const WebSocket = require('ws')

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#5a4f7c'
    }
  }
})

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#5a4f7c'
    },
    '& .Mui-focused': {
      color: '#e7e7e7'
    }
  }
})

const App = () => {
  const classes = useStyles()
  const [url, setUrl] = useState<string>('')
  const [data, setData] = useState<any>({})
  const [socketData, setSocketData] = useState({})

  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const [ws, setWs] = useState<WebSocket>()

  function connectToSocket () {
    if (url.length > 1) {
      try {
        const server = new WebSocket(url)

        setWs(server)
        server.on('open', () => server.send('Hello from desktop'))
        server.on('message', (msg) => {
          try {
            const parsed = JSON.parse(msg)
            setSocketData(parsed)
          } catch (e) {
            setSocketData({message: msg})
          }
        })
        setOpen(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  function sendData () {
    ws?.send(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ margin: 10, width: '90vw', marginLeft: 'auto', marginRight: 'auto' }}>
        <Grid item xs={10}>
          <form style={{ marginRight: 10 }}>
            <TextField id="outlined-basic"
              label="Enter websocket url"
              variant="outlined"
              className={classes.root}
              fullWidth
              onChange={(x) => setUrl(x.target.value)}
              InputLabelProps={{
                style: { color: theme.palette.primary.main }
              }}
            />
          </form>
        </Grid>
        <Grid item xs>
          <Button variant={'contained'} color={'primary'} onClick={() => connectToSocket()}>Connect</Button>
        </Grid>
      </Grid>
      <Grid container style={{ margin: 10, width: '90vw', marginLeft: 'auto', marginRight: 'auto' }} spacing={2}>
        <Grid item>
          <Typography variant="h5" component="h2">
            Data
          </Typography>
          <JSONInput
            id='a_unique_id'
            locale={ locale }
            height='550px'
            onChange={(item) => setData(item.json)}
          />
          <div style={{ marginTop: 10, marginLeft: 'auto' }}>
            <Button variant={'contained'} color={'primary'} onClick={() => sendData()}>Send data</Button>
          </div>
        </Grid>
        <Grid item>
          <ReactJson src={socketData} theme={'ocean'}/>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled">Connected to the socket!</MuiAlert>
      </Snackbar>
      <GlobalStyle/>
    </ThemeProvider>
  )
}

render(<App />, mainElement)

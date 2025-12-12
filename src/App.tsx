import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';
import custom from "./theme/custom.ts";

import Router from './router'

const muiTheme = createTheme(theme, custom);

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App

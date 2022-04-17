import React from 'react'
import ReactDOM from 'react-dom'
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, createTheme } from 'baseui';
import { BrowserRouter as Router } from "react-router-dom";
import App from './pages'
import ErrorBoundary from "./components/ErrorBoundary"

const engine = new Styletron();

const primitives = {
  primary: '#2C5282',
  primary50: '#EBF8FF',
  primary100: '#BEE3F8',
  primary200: '#90CDF4',
  primary300: '#63B3ED',
  primary400: '#4299E1',
  primary500: '#3182CE',
  primary600: '#2B6CB0',
  primary700: '#2C5282',
};
const overrides = {
  colors: {
  },
};
const theme = createTheme(primitives, overrides);



ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <Router>

            <App />

          </Router>
        </BaseProvider>
      </StyletronProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

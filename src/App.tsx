import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { Widget } from './components/Widget';
import { ThemeProvider } from './infrastructure/providers/ThemeProvider';
import { ForecastModeEnum } from './domain/types/WidgetProps';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/daily_forecast" element={<Widget mode={ ForecastModeEnum.DAILY } />} />
            <Route path="/hourly_forecast" element={<Widget mode={ ForecastModeEnum.HOURLY } />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App

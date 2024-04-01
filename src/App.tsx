import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { Widget } from './components/Widget';
import { ThemeProvider } from './infrastructure/providers/ThemeProvider';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/forecast" element={<Widget />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App

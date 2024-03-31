import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { Widget } from './components/Widget';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/widget" element={<Widget latitude={60.1695} longitude={24.9354} days={1} theme="dark" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App

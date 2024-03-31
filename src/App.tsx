import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Widget } from './components/Widget';

const client = new ApolloClient({
  uri: import.meta.env.APP_GRAPHQL_API_URL,
  cache: new InMemoryCache()
});

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

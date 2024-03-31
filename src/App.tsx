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
          <Route path="/forecast" element={<Widget />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App

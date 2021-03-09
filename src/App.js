import { ApolloProvider } from '@apollo/client';
import { client as apolloClient } from './graph-ql'
import { Todos } from './components/Todos'

function App() {
  return (
    <ApolloProvider client={apolloClient} >
      <div className="App">
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;

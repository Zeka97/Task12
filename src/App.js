import './App.css';

import { BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import CustomRoutes from './components/CustomRoutes/CustomRoutes';
import Layout from './components/Layout/Layout';

const queryClient = new QueryClient()

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
          <Layout>
            <CustomRoutes />
          </Layout>
        </BrowserRouter>
  </QueryClientProvider>
  );
}

export default App;

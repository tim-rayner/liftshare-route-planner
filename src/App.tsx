import { Route, Routes } from 'react-router-dom';
import Layout from './layout/layout';
import LandingPage from './pages/landing/landing';
import NavigationBar from './navigation/navbar';



function App() {
  //localhost:3000
  return (
    <main className="app">
      <NavigationBar/>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
      </Layout>
    </main>
  );
}

export default App;

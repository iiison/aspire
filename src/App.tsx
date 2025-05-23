import './App.css';
import { NotificationProvider } from './contexts/NotificationProvider';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <NotificationProvider>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </NotificationProvider>
  );
}

export default App;

import './App.css';
import { DisplayPortData } from './components/DisplayPortData';
import { usePortData } from './hooks/usePortData';

export function App() {
  const { portData, error } = usePortData();

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!portData) {
    return <p>Loading...</p>;
  }

  return <DisplayPortData portData={portData} />;
}

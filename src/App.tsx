import { DisplayPortData } from './components/DisplayPortData';
import { usePortData } from './hooks/usePortData';

export function App() {
  const { portData, error } = usePortData();

  if (error) {
    return <p>{error.message}. Ensure you have internet connection.</p>;
  }

  if (!portData) {
    const template = document.querySelector('template#loading-spinner')!;
    return <div dangerouslySetInnerHTML={{ __html: template.innerHTML }} />;
  }

  return <DisplayPortData portData={portData} />;
}

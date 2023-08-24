import './App.css';
import Statistics from './pages/Statistics';
import { WineDataProvider } from './providers/WineDataProvider';

function App() {
  return (
    <div className="App">
      <WineDataProvider>
        <Statistics />
      </WineDataProvider>
    </div>
  );
}

export default App;

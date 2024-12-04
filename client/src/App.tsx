import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '@/components/home';
import PollDashboard from './components/polls';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />

        <Route path="polls">
          <Route path=":pollId" element={<PollDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

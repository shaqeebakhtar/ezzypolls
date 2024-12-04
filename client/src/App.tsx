import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '@/components/home';
import CreatePoll from './components/polls';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />

        <Route path="poll">
          <Route path=":pollId/create" element={<CreatePoll />} />
          <Route path=":pollId/vote" element={<CreatePoll />} />
          <Route path=":pollId/present" element={<CreatePoll />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

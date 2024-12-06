import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '@/components/home';
import Create from './components/polls/create';
import Vote from './components/polls/vote';
import Present from './components/polls/present';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />

        <Route path="poll">
          <Route path=":pollId/create" element={<Create />} />
          <Route path=":pollId/vote" element={<Vote />} />
          <Route path=":pollId/present" element={<Present />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

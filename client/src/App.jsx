import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => (
  <BrowserRouter>
    <header className="flex justify-between items-center w-full p-4 bg-white border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={ logo } alt="logo" className="w-28 object-contain" />
      </Link>

      <Link
        to="/create-post"
        className="px-4 py-2 text-white font-medium bg-blue rounded-md"
      >
        Create
      </Link>
    </header>

    <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)] bg-dimWhite">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/create-post" element={ <CreatePost /> } />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;

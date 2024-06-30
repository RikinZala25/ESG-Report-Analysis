import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Ratings = lazy(() => import('./Pages/Ratings'));
const Allocation = lazy(() => import('./Pages/Allocation'));
const ReportAnalyser = lazy(() => import('./Pages/ReportAnalyser'));
const RatingPage = lazy(() => import('./Pages/RatingPage'));

const App = () => {
	return (
		<>
			<NavBar />
			<Suspense fallback={<div className="container">Loading...</div>}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
          			<Route path="/ratings" element={<Ratings />} />
					<Route path="/ratings/:symbol" element={<RatingPage />} />
					<Route path="/allocation" element={<Allocation />} />
          			<Route path="/report-analyser" element={<ReportAnalyser />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
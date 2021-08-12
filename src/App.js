import "./App.css"
import AddEvent from "./components/AddEvent"
import EventCalendar from "./components/EventCalendar"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
	return (
		<div>
			<Navbar />
			<AddEvent />
			<EventCalendar />
			<Footer />
		</div>
	)
}

export default App

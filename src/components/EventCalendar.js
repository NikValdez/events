import format from "date-fns/format"
import getDay from "date-fns/getDay"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import React, { useEffect, useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-datepicker/dist/react-datepicker.css"
import { eventsRef } from "../firebase"

const locales = {
	"en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})

const events = [
	{
		title: "Big Meeting",
		start: new Date(2021, 6, 0),
		end: new Date(2021, 6, 0)
	},
	{
		title: "Vacation",
		start: new Date(2021, 6, 7),
		end: new Date(2021, 6, 10)
	},
	{
		title: "Conference",
		start: new Date(2021, 6, 20),
		end: new Date(2021, 6, 23)
	}
]

function EventCalendar() {
	const [ allEvents, setAllEvents ] = useState(events)

	useEffect(() => {
		getEvents()
	}, [])

	function getEvents() {
		const response = eventsRef
		response.on("value", function(snapshot) {
			let events = snapshot.val()
			setAllEvents(Object.values(events))
			// setAllEvents([ events ])
		})
	}
	// console.log(allEvents)

	return (
		<div>
			<Calendar
				localizer={localizer}
				events={allEvents}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500, margin: "50px", zIndex: 1 }}
			/>
		</div>
	)
}

export default EventCalendar

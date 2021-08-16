import { addMinutes } from "date-fns"
import format from "date-fns/format"
import getDay from "date-fns/getDay"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import React, { useEffect, useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-datepicker/dist/react-datepicker.css"
import { eventsRef } from "../firebase"
import SingleEvent from "./SingleEvent"

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

function EventCalendar() {
	const [ allEvents, setAllEvents ] = useState([])
	const [ eventModal, setEventModal ] = useState(false)
	const [ eventData, setEventData ] = useState([])

	useEffect(() => {
		getEvents()
	}, [])

	function getEvents() {
		const response = eventsRef
		response.on("value", function(snapshot) {
			let events = snapshot.val()
			setAllEvents(Object.values(events))
		})
	}

	function handleShow() {
		setEventModal(true)
	}

	function closeModal() {
		setEventModal(false)
	}

	return (
		<div>
			<Calendar
				data-testid="event-calendar"
				localizer={localizer}
				events={allEvents}
				startAccessor="start"
				views={[ "month", "agenda" ]}
				popup
				onSelectEvent={(event) => {
					handleShow()
					setEventData(event)
				}}
				endAccessor={(event) => {
					return addMinutes(new Date(event.end), 1)
				}}
				style={{ height: 500, margin: "50px", zIndex: 1 }}
				eventPropGetter={(events) => ({
					style: {
						backgroundColor: "#446df6"
					}
				})}
			/>
			<SingleEvent eventModal={eventModal} closeModal={closeModal} eventData={eventData} />
		</div>
	)
}

export default EventCalendar

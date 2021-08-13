import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { eachDayOfInterval } from "date-fns/esm"
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Modal from "react-modal"
import { eventsRef } from "../firebase"
import { customStyles } from "../styles/modalStyles"

Modal.setAppElement("#root")

function AddEvent() {
	const [ newEvent, setNewEvent ] = useState({ title: "", start: "", end: "" })
	const [ takenDays, setTakenDays ] = useState()
	const [ modalIsOpen, setIsOpen ] = useState(false)

	useEffect(() => {
		const response = eventsRef
		if (response) {
			response.on("value", function(snapshot) {
				let events = snapshot.val()
				let onlyEvents = Object.values(events)
				let dayInterval = onlyEvents
					.map((e) => eachDayOfInterval({ start: new Date(e.start), end: new Date(e.end) }))
					.flat()
				setTakenDays(dayInterval)
			})
		}
	}, [])

	function openModal() {
		setIsOpen(true)
	}

	function closeModal() {
		setIsOpen(false)
	}
	function handleAddEvent() {
		const event = {
			title: newEvent.title,
			start: newEvent.start.toString(),
			end: newEvent.end.toString()
		}
		eventsRef.push(event)
		setNewEvent({ title: "", start: "", end: "" })
		setIsOpen(false)
	}

	function verifyDates() {
		if (!newEvent.start || !newEvent.end || !newEvent.title) {
			return true
		}
		if (newEvent.start > newEvent.end) {
			return true
		}

		const getDatesAfterStart = takenDays.filter((date) => date > newEvent.start)

		if (newEvent.end > getDatesAfterStart[0]) {
			return true
		}
	}

	return (
		<div>
			<button onClick={openModal} className="add-event-button">
				Add Event <FontAwesomeIcon icon={faPlus} />
			</button>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Events Modal">
				<h2 className="add-event-title">Add Event</h2>
				<div className="event-fields">
					<input
						type="text"
						placeholder="Add Title"
						value={newEvent.title}
						onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
					/>
					<DatePicker
						placeholderText="Start Date"
						selected={newEvent.start}
						dateFormat="yyyy, MM, dd"
						onChange={(start) => setNewEvent({ ...newEvent, start })}
						excludeDates={takenDays}
					/>
					<DatePicker
						placeholderText="End Date"
						selected={newEvent.end}
						dateFormat="yyyy, MM, dd"
						onChange={(end) => setNewEvent({ ...newEvent, end })}
						excludeDates={takenDays}
					/>
					<button className="modal-button" onClick={handleAddEvent} disabled={verifyDates()}>
						Add Event
					</button>
				</div>
			</Modal>
		</div>
	)
}

export default AddEvent

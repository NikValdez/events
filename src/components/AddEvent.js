import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Modal from "react-modal"
import { eventsRef } from "../firebase"
import { customStyles } from "../styles/modalStyles"

function AddEvent() {
	const [ newEvent, setNewEvent ] = useState({ title: "", start: "", end: "" })
	const [ allEvents, setAllEvents ] = useState()

	const [ modalIsOpen, setIsOpen ] = useState(false)

	function openModal() {
		setIsOpen(true)
	}

	// function afterOpenModal() {
	// 	// references are now sync'd and can be accessed.
	// 	subtitle.style.color = "#f00"
	// }

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

	return (
		<div>
			<button onClick={openModal}>Add Event</button>
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
					/>
					<DatePicker
						placeholderText="End Date"
						selected={newEvent.end}
						dateFormat="yyyy, MM, dd"
						onChange={(end) => setNewEvent({ ...newEvent, end })}
					/>
					<button className="modal-button" onClick={handleAddEvent}>
						Add Event
					</button>
				</div>
			</Modal>
		</div>
	)
}

export default AddEvent

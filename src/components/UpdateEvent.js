import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Modal from "react-modal"
import { eventsRef } from "../firebase"
import { customStyles } from "../styles/modalStyles"




// Modal.setAppElement("#root")

function UpdateEvent({ eventStart, eventEnd, eventTitle, modalClose}) {
	const [ modalIsOpen, setIsOpen ] = useState(false)
	const [ updateEvent, setUpdateEvent ] = useState({ title: "", start: "", end: "" })
	const [ takenDays, setTakenDays ] = useState(null)
	const [ maxDate, setMaxDate ] = useState(null)

	useEffect(
		() => {
			if (eventStart) {
				setUpdateEvent({title: eventTitle, start: eventStart, end: eventEnd})
			}
		},
		[eventEnd, eventStart, eventTitle]
	)

	useEffect(() => {
		const response = eventsRef
		response.on("value", function(snapshot) {
			let events = snapshot.val()
			let onlyEvents = Object.values(events)
			let dayInterval = onlyEvents
				.map((e) => eachDayOfInterval({ start: new Date(e.start), end: new Date(e.end) }))
				.flat()
			setTakenDays(dayInterval)
		})
	}, [])

	useEffect(
		() => {
			if (takenDays) {
				const getDatesAfterStart = takenDays.filter((date) => date > updateEvent.start)

				const sortedDates = getDatesAfterStart.sort((a, b) => a - b)

				setMaxDate(sortedDates[0])
			}
		},
		[ updateEvent, takenDays ]
	)

	function openModal() {
		setIsOpen(true)
	}

	function closeModal() {
		setIsOpen(false)
	}

	
	function handleUpdate() {
		const event = {
			title: updateEvent.title,
			start: updateEvent.start.toString(),
			end: updateEvent.end.toString()
		}
		const response = eventsRef
		response.on("value", function(snapshot) {
			let events = snapshot.val()
			const asArray = Object.entries(events);
			asArray.filter((e) => {
				if(e[1].start === eventStart) {
						eventsRef.child(e[0]).update(event)
					}
			})
			
		})
		closeModal()
		modalClose()
	}

	function verifyDates() {
		if (!updateEvent.start || !updateEvent.end || !updateEvent.title) {
			return true
		}
		if (updateEvent.start > updateEvent.end) {
			return true
		}

		const getDatesAfterStart = takenDays.filter((date) => date > updateEvent.start)

		if (updateEvent.end > getDatesAfterStart[0]) {
			return true
		}
	}


	return (
		<div>
				<button className="modal-button" onClick={openModal}>
					Update Event
				</button>

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Events Modal" ariaHideApp={false}>
				<h2 className="add-event-title">Update Event</h2>
				<div className="event-data">
					{eventStart ? (
						<>
				
					<div className="event-fields">
					<input
						type="text"
						placeholder="Update Title"
						value={updateEvent.title}
						onChange={(e) => setUpdateEvent({ ...updateEvent, title: e.target.value })}
						/>
					<DatePicker
						placeholderText="Start Date"
						selected={new Date(updateEvent.start)}
						dateFormat="yyyy, MM, dd"
						onChange={(start) => setUpdateEvent({ ...updateEvent, start })}
						excludeDates={takenDays}
						/>
					<DatePicker
						placeholderText="End Date"
						selected={new Date(updateEvent.end)}
						dateFormat="yyyy, MM, dd"
						onChange={(end) => setUpdateEvent({ ...updateEvent, end })}
						excludeDates={takenDays}
						maxDate={maxDate}
						/>
					</div>
					<div className="bottom-buttons">

					<button className="modal-button " onClick={() => handleUpdate()} disabled={verifyDates()}>
				Update Event	
				</button>
					</div>
					</>
					): null}
				</div>
			</Modal>
		</div>
	)
}

export default UpdateEvent 

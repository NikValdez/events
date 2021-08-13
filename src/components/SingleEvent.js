import format from "date-fns/format"
import React, { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import Modal from "react-modal"
import { eventsRef } from "../firebase"
import { customStyles } from "../styles/modalStyles"

Modal.setAppElement("#root")

function SingleEvent({ eventModal, closeModal, eventData }) {
	const [ modalIsOpen, setIsOpen ] = useState(false)

	useEffect(
		() => {
			if (eventModal) {
				openModal()
			}
		},
		[ eventModal ]
	)

	// useEffect(() => {
	// 	const response = eventsRef
	// 	response.on("value", function(snapshot) {
	// 		let events = snapshot.val()
	// 		let onlyEvents = Object.values(events)
	// 		let dayInterval = onlyEvents
	// 			.map((e) => eachDayOfInterval({ start: new Date(e.start), end: new Date(e.end) }))
	// 			.flat()
	// 		setTakenDays(dayInterval)
	// 	})
	// }, [])

	function openModal() {
		setIsOpen(true)
	}

	function modalClose() {
		setIsOpen(false)
		closeModal()
	}
	
	function handleDelete() {
		console.log(eventsRef)
		
		// let response = eventsRef
		if(window.confirm("Are you sure you want to delete this event?")) {
			eventsRef.child("-MgwnvLZw4_QvWrFM7kX").remove()

		}
	}

	return (
		<div>
			<Modal isOpen={modalIsOpen} onRequestClose={modalClose} style={customStyles} contentLabel="Events Modal">
				<h2 className="add-event-title">Event</h2>
				<div className="event-data">
					{eventData.start ? (
						<>
					<h2 className="event-title">{eventData.title}</h2>
					<p className="event-date"> 
					{format(new Date(eventData.start), "yyyy-MM-dd")} -
					{format(new Date(eventData.end), "yyyy-MM-dd")}
					</p>
					</>
					): null}
				</div>
				<button className="modal-button" onClick={handleDelete}>
					Delete Event
				</button>
			</Modal>
		</div>
	)
}

export default SingleEvent

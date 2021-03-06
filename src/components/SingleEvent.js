import format from "date-fns/format"
import React, { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import Modal from "react-modal"
import { eventsRef } from "../firebase"
import { customStyles } from "../styles/modalStyles"
import UpdateEvent from "./UpdateEvent"

// Modal.setAppElement("#root")

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


	function openModal() {
		setIsOpen(true)
	}

	function modalClose() {
		setIsOpen(false)
		closeModal()
	}
	
	function handleDelete(start) {
		const response = eventsRef
		response.on("value", function(snapshot) {
			let events = snapshot.val()
			const asArray = Object.entries(events);
			const arrayItems = asArray.filter((e) => {
				if(e[1].start === start) {
					if(window.confirm("Are you sure you want to delete this event?")) {
						eventsRef.child(e[0]).remove()
					}
				
				}
			})


		
		})
		modalClose()
	}

	return (
		<div>
			<Modal isOpen={modalIsOpen} onRequestClose={modalClose} style={customStyles} contentLabel="Events Modal" ariaHideApp={false}>
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
				<div className="bottom-buttons">
				<button className="modal-button delete-button" onClick={() => handleDelete(eventData.start)}>
					Delete Event
				</button>
				<UpdateEvent eventStart={eventData.start} eventEnd={eventData.end} eventTitle={eventData.title} modalClose={modalClose}/>
				</div>
			</Modal>
		</div>
	)
}

export default SingleEvent

import React from "react"
import calendar from "../calendar.png"

export default function Navbar() {
	return (
		<div className="nav">
			<p>
				<img src={calendar} alt="Calendar Icon" /> MakeShift Events
			</p>
		</div>
	)
}

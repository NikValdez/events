import { render } from "@testing-library/react"
import React from "react"
import AddEvent from "../components/AddEvent"
import EventCalendar from "../components/EventCalendar"

test("renders event calendar on load", () => {
	const { container } = render(<EventCalendar />)
	expect(container.getElementsByClassName("rbc-calendar").length).toBe(1)
})

test("renders Add Event button", () => {
	const { getByText } = render(<AddEvent />)
	const button = getByText("Add Event")
	expect(button).toBeInTheDocument()
})

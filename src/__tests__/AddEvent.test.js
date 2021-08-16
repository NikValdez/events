import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import AddEvent from "../components/AddEvent"

test("opens modal, checks button is disabled and fills in input", async () => {
	render(<AddEvent />)
	const openModal = screen.getByTestId("modal-button")
	fireEvent.click(openModal)
	const button = screen.getByTestId("submit-button")
	expect(button).toBeInTheDocument()
	expect(button).toBeDisabled()

	const title = screen.getByPlaceholderText("Add Title")
	fireEvent.change(title, { target: { value: "Test Title" } })
	expect(screen.getByPlaceholderText("Add Title")).toHaveValue("Test Title")
})

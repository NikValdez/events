import { render, screen } from "@testing-library/react"
import App from "../App"

test("renders Title as MakeShift Events", () => {
	render(<App />)
	const title = screen.getByText(/MakeShift Events/i)
	expect(title).toBeInTheDocument()
})

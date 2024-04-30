import { render, screen, fireEvent } from "@testing-library/react";
import MusicPosition from "./music-position";

test("renders music position component with correct values", () => {
  const duration = 300;
  const currentTime = 150;
  const onChange = jest.fn();

  render(<MusicPosition duration={duration} currentTime={currentTime} onChange={onChange} />);

  // Assert that the current time and duration are rendered correctly
  const currentTimeElement = screen.getByText("02:30");
  expect(currentTimeElement).toBeInTheDocument();

  const durationElement = screen.getByText("05:00");
  expect(durationElement).toBeInTheDocument();

  // Assert that the input range value is set correctly
  const inputRangeElement = screen.getByRole("slider");
  expect(inputRangeElement).toHaveValue("150");

  // Simulate a change event on the input range
  fireEvent.change(inputRangeElement, { target: { value: "200" } });

  // Assert that the onChange callback is called with the new progress value
  expect(onChange).toHaveBeenCalledWith(200);
});

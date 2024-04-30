import { render, screen } from "@testing-library/react";
import PlayList from "./playlist";

test("renders playlist with files", () => {
  const files = [{ name: "file1.mp3" }, { name: "file2.mp3" }, { name: "file3.mp3" }] as File[];
  const setPlayingIndex = jest.fn();
  render(<PlayList files={files} playingIndex={0} setPlayingIndex={setPlayingIndex} />);

  // Assert that the "Now Playing" heading is rendered
  const headingElement = screen.getByText(/Now Playing/i);
  expect(headingElement).toBeInTheDocument();

  // Assert that each file in the playlist is rendered
  files.forEach(file => {
    const fileElement = screen.getByText(file.name);
    expect(fileElement).toBeInTheDocument();
  });
});

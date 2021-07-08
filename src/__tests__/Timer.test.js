import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Timer from "../containers/Timer.js";

describe("Timer", () => {
  it("Renders Intro text when the app loads", () => {
    render(<Timer />);
    const linkElement = screen.getByText(
      /How long do you want to set a timer for in Minutes?/i
    );
    expect(linkElement).toBeInTheDocument();
  });
});

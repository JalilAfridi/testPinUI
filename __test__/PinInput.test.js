import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PinInput from "./PinInput";

describe("PinInput", () => {
  it("renders the correct number of input elements", () => {
    const { getAllByTestId } = render(<PinInput length={3} />);
    const inputElements = getAllByTestId("pin-input");
    expect(inputElements).toHaveLength(3);
  });

  it("calls onComplete prop with correct values when last input element is filled", () => {
    const onComplete = jest.fn();
    const { getAllByTestId } = render(<PinInput length={3} onComplete={onComplete} />);
    const inputElements = getAllByTestId("pin-input");
    fireEvent.change(inputElements[0], { target: { value: "1" } });
    fireEvent.change(inputElements[1], { target: { value: "2" } });
    fireEvent.change(inputElements[2], { target: { value: "3" } });
    expect(onComplete).toHaveBeenCalledWith(["1", "2", "3"]);
  });

  it("limits paste to the number of remaining input elements", () => {
    const { getAllByTestId } = render(<PinInput length={3} />);
    const inputElements = getAllByTestId("pin-input");
    fireEvent.paste(inputElements[0], { clipboardData: { getData: () => "12345" } });
    expect(inputElements[0].value).toBe("1");
    expect(inputElements[1].value).toBe("2");
    expect(inputElements[2].value).toBe("3");
  });

  it("does not update input element if pasted character does not match regex prop", () => {
    const { getAllByTestId } = render(<PinInput length={1} regex={/\d/} />);
    const inputElements = getAllByTestId("pin-input");
    fireEvent.paste(inputElements[0], { clipboardData: { getData: () => "a" } });
    expect(inputElements[0].value).toBe("");
  });

   it("focuses previous input element on backspace when current input element is empty", () => {
        const { getAllByTestId } = render(<PinInput length={3} />);
        const inputElements = getAllByTestId("pin-input");
        fireEvent.change(inputElements[0], { target: { value: "1" } });
        fireEvent.keyDown(inputElements[0], { key: "Backspace" });
        expect(document.activeElement).toEqual(inputElements[0]);
        fireEvent.keyDown(inputElements[0], { key: "Backspace" });
        expect(document.activeElement).toEqual(inputElements[1]);
      });
    
      it("applies fancyUI styles correctly", () => {
        const { getAllByTestId } = render(<PinInput length={1} fancyUI />);
        const inputElement = getAllByTestId("pin-input")[0];
        expect(inputElement).toHaveStyle("background: linear-gradient(to bottom, #f2f2f2, #e6e6e6)");
        expect(inputElement).toHaveStyle("box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3)");
        expect(inputElement).toHaveStyle("color: #333");
        fireEvent.focus(inputElement);
        expect(inputElement).toHaveStyle("background: linear-gradient(to bottom, #ffb3b3, #ff6666)");
        expect(inputElement).toHaveStyle("box-shadow: 0 0 0 3px rgba(255, 100, 100, 0.5)");
      });
    });
    

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    max: 100,
    value: 50,
    step: 1,
    onChange: mockOnChange,
    readOnly: false,
  };

  it("Отрисовка данных input", () => {
    render(<ProgressBar {...defaultProps} />);

    const input = screen.getByRole("slider") as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.max).toBe("100");
    expect(input.value).toBe("50");
    expect(input.step).toBe("1");
    expect(input.type).toBe("range");
  });

  it("Вызывает onChange при перемещении ползунка", () => {
    render(<ProgressBar {...defaultProps} />);

    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "75" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});

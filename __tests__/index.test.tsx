import { fireEvent, render, screen } from "@testing-library/react";
import { DebouncedInput } from "../src";

const DEBOUNCE_MS = 500;
const PLACEHOLDER_TEXT = "debounced-input";

function sleep(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

// FIXME: this fixes jsdom issue with structuredClone: https://github.com/jsdom/jsdom/issues/3363
global.structuredClone = jest.fn((val: object) => ({ ...val }));

describe("DebouncedInput", () => {
  it("renders without setting the timeout", () => {
    render(<DebouncedInput placeholder={PLACEHOLDER_TEXT} />);
    const domNode = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    expect(domNode).toBeTruthy();
  });

  it("renders with custom set timeout", () => {
    render(
      <DebouncedInput placeholder={PLACEHOLDER_TEXT} debounceMs={DEBOUNCE_MS} />
    );
    const domNode = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    expect(domNode).toBeTruthy();
  });

  it("does not fire onChange before set timeout", async () => {
    let hasChanged = false;

    render(
      <DebouncedInput
        placeholder={PLACEHOLDER_TEXT}
        debounceMs={DEBOUNCE_MS}
        onChange={() => (hasChanged = true)}
      />
    );

    const domNode = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    fireEvent.change(domNode, { target: { value: "a" } });

    await sleep(DEBOUNCE_MS - 100);
    expect(hasChanged).toBe(false);
  });

  it("fires onChange after set timeout", async () => {
    let hasChanged = false;

    render(
      <DebouncedInput
        placeholder={PLACEHOLDER_TEXT}
        debounceMs={DEBOUNCE_MS}
        onChange={() => (hasChanged = true)}
      />
    );

    const domNode = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    fireEvent.change(domNode, { target: { value: "a" } });

    await sleep(DEBOUNCE_MS + 100);
    expect(hasChanged).toBe(true);
  });
});

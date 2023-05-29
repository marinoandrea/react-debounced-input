import { fireEvent, render, screen } from "@testing-library/react";
import { DebouncedInput } from "../../../src";

const DEBOUNCE_MS = 500;
const PLACEHOLDER_TEXT = "debounced-input";

function sleep(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

test("onChange not fired before set timeout", async () => {
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

test("onChange fired after set timeout", async () => {
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

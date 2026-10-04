import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { expect, test, vi } from "vitest";
import App from "./App";
import { reducer } from "./redux/reducer";

const renderApp = () => {
  const store = configureStore({ reducer });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  return store;
};

test("renders the todo app and its existing filters", () => {
  renderApp();

  expect(screen.getByRole("heading", { name: "Todo App" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Completed" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveValue("");
});

test("adds, edits, completes, filters and removes a todo through Redux", async () => {
  const user = userEvent.setup();
  const store = renderApp();

  await user.type(screen.getByRole("textbox"), "Learn Redux");
  await user.click(screen.getByRole("button", { name: "" }));

  expect(store.getState()).toEqual([
    { id: expect.any(Number), item: "Learn Redux", completed: false },
  ]);
  const textarea = screen.getByDisplayValue("Learn Redux");
  expect(textarea).toBeDisabled();
  const card = textarea.closest("li");
  const [editButton, completeButton] = within(card).getAllByRole("button");
  await user.click(editButton);
  expect(textarea).toHaveFocus();
  expect(textarea).toBeEnabled();
  await user.clear(textarea);
  await user.type(textarea, "Learn Redux Toolkit{Enter}");
  expect(textarea).toBeDisabled();
  expect(store.getState()[0].item).toBe("Learn Redux Toolkit");

  await user.click(completeButton);
  expect(store.getState()[0].completed).toBe(true);
  await waitFor(
    () => expect(screen.queryByDisplayValue("Learn Redux Toolkit")).not.toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole("button", { name: "Completed" }));
  expect(screen.getByDisplayValue("Learn Redux Toolkit")).toBeDisabled();
  expect(screen.getByText("done")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Active" }));
  await waitFor(
    () => expect(screen.queryByDisplayValue("Learn Redux Toolkit")).not.toBeInTheDocument(),
    { timeout: 2000 }
  );
  await user.click(screen.getByRole("button", { name: "All" }));
  const completedCard = screen.getByDisplayValue("Learn Redux Toolkit").closest("li");
  const [, removeButton] = within(completedCard).getAllByRole("button");
  await user.click(removeButton);
  expect(store.getState()).toEqual([]);
  await waitFor(
    () => expect(screen.queryByDisplayValue("Learn Redux Toolkit")).not.toBeInTheDocument(),
    { timeout: 2000 }
  );
}, 10000);

test("retains the existing empty-input alert without adding a todo", async () => {
  const alert = vi.spyOn(window, "alert").mockImplementation(() => {});
  const user = userEvent.setup();
  const store = renderApp();

  await user.click(screen.getByRole("button", { name: "" }));

  expect(alert).toHaveBeenCalledExactlyOnceWith("Input is Empty");
  expect(store.getState()).toEqual([]);
  alert.mockRestore();
});

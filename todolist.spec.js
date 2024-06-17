import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom/vitest";
import { screen, fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import fs from "fs";
import path from "path";

// 讀取並設置 HTML 文件
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
document.body.innerHTML = html;
// 初始化並加載 JavaScript
require("./todolist2");
describe("To-Do List", async () => {
  let container;

  it("應能夠新增任務", async () => {
    const taskTitleInput = screen.getByTestId("taskTitle");
    const addButton = screen.getByTestId("addTaskBtn");

    await fireEvent.change(taskTitleInput, {
      target: { value: "Test Task" },
    });

    await userEvent.click(addButton);
    const todoTitleInput = screen.getByTestId("todoTitleInput");

    expect(todoTitleInput.value).toBe("Test Task");
  });

  it("應能夠編輯任務", async () => {
    const editButton = screen.getAllByTestId("editTaskBtn")[0];

    await userEvent.click(editButton);

    const todoTitleInput = screen.getByTestId("todoTitleInput");

    await fireEvent.change(todoTitleInput, {
      target: { value: "Edited Task" },
    });

    await userEvent.click(editButton);

    expect(todoTitleInput.value).toBe("Edited Task");
  });

  it("應能夠刪除任務", async () => {
    const todoTitleInput = screen.getByTestId("todoTitleInput");
    const deleteButton = screen.getByTestId("deleteTaskBtn");

    await userEvent.click(deleteButton);

    expect(todoTitleInput).not.toBeInTheDocument();
  });
});

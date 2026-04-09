import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import * as storeHooks from "@/store/store";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Sidebar component", () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(storeHooks, "useAppDispatch").mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("Отображает имя пользователя из state", () => {
    jest.spyOn(storeHooks, "useAppSelector").mockReturnValue("Alice");
    render(<Sidebar />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  test("Клик на logout вызывает dispatch и router.push", () => {
    jest.spyOn(storeHooks, "useAppSelector").mockReturnValue("Alice");
    render(<Sidebar />);
    const logoutBtn = document.querySelector(".sidebar__icon");
    if (logoutBtn) {
      fireEvent.click(logoutBtn);
    }
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockPush).toHaveBeenCalledWith("/auth/signin");
  });

  test("Отображает три ссылки на категории с картинками", () => {
    jest.spyOn(storeHooks, "useAppSelector").mockReturnValue("Alice");
    render(<Sidebar />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/music/category/1");
    expect(hrefs).toContain("/music/category/2");
    expect(hrefs).toContain("/music/category/3");
  });
});

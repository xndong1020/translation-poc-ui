import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectsList from "./ProjectsList";

test("renders Hello World link", () => {
  render(<ProjectsList />);
  const linkElement = screen.getByText(/Hello User/i);
  expect(linkElement).toBeInTheDocument();
});

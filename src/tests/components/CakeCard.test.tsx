/**
 * @jest-environment jsdom
 */

import React from "react"; // Add this import
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import CakeCard from "../../components/CakeCard";
import { Cake } from "../../types/cake";

const mockCake: Cake = {
  id: 1,
  name: "Chocolate Cake",
  comment: "Delicious",
  imageUrl: "url1",
  yumFactor: 5,
};

const MockCakeCard = () => (
  <MemoryRouter>
    <CakeCard cake={mockCake} />
  </MemoryRouter>
);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CakeCard", () => {
  it("renders cake name and imageUrl correctly", () => {
    render(<MockCakeCard />);

    const cakeName = screen.getByText(/Chocolate Cake/i);
    const cakeImageUrl = screen.getByText(/url1/i);

    expect(cakeName).toBeInTheDocument();
    expect(cakeImageUrl).toBeInTheDocument();
  });

  it("navigates to the correct cake detail page when clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<MockCakeCard />);

    const cakeCard = screen.getByTestId("cake-card");

    fireEvent.click(cakeCard);

    expect(mockNavigate).toHaveBeenCalledWith("/cakes/1");
  });

  it("applies the correct hover style", () => {
    const { container } = render(<MockCakeCard />);

    const card = container.querySelector("div");

    if (card) {
      expect(card).toHaveStyle("cursor: pointer");
      expect(card).toHaveStyle("max-width: 345px");

      fireEvent.mouseEnter(card);

      expect(card).toHaveStyle("transform: scale(1.05)");
    }
  });
});

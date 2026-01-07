import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import Carlist from "./Carlist";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("CarList tests", () => {
  test("component renders", () => {
    render(<Carlist />, { wrapper });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("Cars are fetched", async () => {
    render(<Carlist />, { wrapper });
    await waitFor(() => screen.getByText(/New car/i));
    expect(screen.getByText(/Ford/i)).toBeInTheDocument();
  });

  test("Open new car modal", async () => {
    render(<Carlist />, { wrapper });
    await waitFor(() => screen.getByText(/New car/i));
    await userEvent.click(screen.getByText(/New car/i));
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});

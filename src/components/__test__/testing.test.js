import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { Contact } from "../Contact";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("App Components", () => {

  describe("Header Component", () => {
    test("should load header and login button", () => {
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </BrowserRouter>
      );

      const loginButton = screen.getByRole("button");
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe("Contact Component", () => {
    test("renders Contact Us heading", () => {
      render(<Contact />);
      const heading = screen.getByRole("heading", { name: /contact us/i });
      expect(heading).toBeInTheDocument();
    });

    test("renders form heading", () => {
      render(<Contact />);
      const formHeading = screen.getByRole("heading", { name: /send us a message/i });
      expect(formHeading).toBeInTheDocument();
    });

    test("renders submit button", () => {
      render(<Contact />);
      const button = screen.getByRole("button", { name: /submit/i });
      expect(button).toBeInTheDocument();
    });
  });

});

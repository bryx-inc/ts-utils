import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAnchorEl } from "./useAnchorEl";

const TestUseAnchorElComponent = () => {
  const [anchorEl, setAnchorEl, unsetAnchorEl] = useAnchorEl();
  const open = !!anchorEl;

  return (
    <>
      <div>open: {`${open}`}</div>
      <div onClick={(e) => setAnchorEl(e)}>set</div>
      <div onClick={() => unsetAnchorEl()}>unset</div>
    </>
  );
};

test("useAnchorEl", async () => {
  render(<TestUseAnchorElComponent />);

  expect(screen.getByText(/open/).textContent).toContain("false");

  userEvent.click(screen.getByText("set"));

  await waitFor(() =>
    expect(screen.getByText(/open/).textContent).toContain("true")
  );

  userEvent.click(screen.getByText("unset"));

  await waitFor(() =>
    expect(screen.getByText(/open/).textContent).toContain("false")
  );
});

import { render } from "@shared/testUtils";
import { Avatar } from "./Avatar";

describe("Default Avatar", () => {
  it("should render correctly when no variant is passed", () => {
    const { asFragment } = render(
      <Avatar
        size={100}
        src="https://res.cloudinary.com/pensionbee/image/upload/w_200,h_200/v1611330623/Jasper_new_headshot_hrywvw.png"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
describe("Highlighted Avatar", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Avatar
        size={100}
        src="https://res.cloudinary.com/pensionbee/image/upload/w_200,h_200/v1611330623/Jasper_new_headshot_hrywvw.png"
        isHighlighted
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

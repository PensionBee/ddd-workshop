import { fireEvent, render } from "@shared/testUtils";
import { Accordion } from "./Accordion";

const accordionItems = [
  {
    id: "item-1",
    heading: "Heading 1",
    content: "Content 1",
  },
  {
    id: "item-2",
    heading: "Heading 2",
    content: "Content 2",
  },
  {
    id: "item-3",
    heading: "Heading 3",
    content: "Content 3",
  },
];

describe("Default Accordion", () => {
  it("should render correctly", () => {
    const { queryByText, getByText, asFragment } = render(
      <Accordion items={accordionItems} />
    );

    // Check that the correct elements are rendered/visible
    accordionItems.forEach((item) => {
      expect(getByText(item.heading)).toBeVisible();
      expect(queryByText(item.content)).toBeNull();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should show the correct dropdown content when a heading is clicked", () => {
    const { queryByText, getByText, asFragment } = render(
      <Accordion items={accordionItems} />
    );

    // Open the first item
    const firstItemHeading = getByText(accordionItems[0].heading);
    fireEvent.click(firstItemHeading);

    // Check that only the first item content is visible
    expect(getByText(accordionItems[0].content)).toBeVisible();
    expect(queryByText(accordionItems[1].content)).toBeNull();
    expect(queryByText(accordionItems[2].content)).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should close open content when another heading is clicked", () => {
    const { queryByText, getByText, asFragment } = render(
      <Accordion items={accordionItems} />
    );

    // Open the first item
    const firstItemHeading = getByText(accordionItems[0].heading);
    fireEvent.click(firstItemHeading);

    // Check that only the first item content is visible
    expect(getByText(accordionItems[0].content)).toBeVisible();
    expect(queryByText(accordionItems[1].content)).toBeNull();
    expect(queryByText(accordionItems[2].content)).toBeNull();

    // Open the second item
    const secondItemHeading = getByText(accordionItems[1].heading);
    fireEvent.click(secondItemHeading);

    // Check that only the second item content is visible
    expect(queryByText(accordionItems[0].content)).toBeNull();
    expect(getByText(accordionItems[1].content)).toBeVisible();
    expect(queryByText(accordionItems[2].content)).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should close open content when an open item's heading is clicked again", () => {
    const { queryByText, getByText, asFragment } = render(
      <Accordion items={accordionItems} />
    );

    // Open the third item
    const thirdItemHeading = getByText(accordionItems[2].heading);
    fireEvent.click(thirdItemHeading);

    // Check that only the third item content is visible
    expect(queryByText(accordionItems[0].content)).toBeNull();
    expect(queryByText(accordionItems[1].content)).toBeNull();
    expect(getByText(accordionItems[2].content)).toBeVisible();

    // Close the third item
    fireEvent.click(thirdItemHeading);

    // Check that all content is hidden
    accordionItems.map((item) => {
      return expect(queryByText(item.content)).toBeNull();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Initially Open Accordion", () => {
  it("should show the first item content on render", () => {
    const { queryByText, getByText, asFragment } = render(
      <Accordion isInitiallyOpen items={accordionItems} />
    );

    expect(getByText(accordionItems[0].content)).toBeVisible();
    expect(queryByText(accordionItems[1].content)).toBeNull();
    expect(queryByText(accordionItems[2].content)).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });
});

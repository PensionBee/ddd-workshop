import React, { useState } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import {
  StyledAccordion,
  StyledContent,
  StyledHeading,
  StyledItem,
  StyledTrigger,
} from "./Accordion.styled";
import { LargeSystemIcon } from "../Svg/Svg";

export type AccordionItem = {
  id: string;
  heading: React.ReactNode;
  content: React.ReactNode;
};

export type AccordionProps = {
  /** A list of accordion items */
  items: AccordionItem[];
  /** Whether the accordion should initially be open */
  isInitiallyOpen?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  isInitiallyOpen = false,
  ...props
}) => {
  const [activeItem, setActiveItem] = useState(
    isInitiallyOpen ? items[0].id : null
  );

  const handleValueChange = (value: string) => {
    return setActiveItem(value);
  };

  return (
    <StyledAccordion
      data-rc="Accordion"
      collapsible
      type="single"
      defaultValue={isInitiallyOpen ? items[0].id : undefined}
      onValueChange={handleValueChange}
      {...props}
    >
      {items.map((item) => {
        return (
          <StyledItem value={item.id} key={item.id}>
            <RadixAccordion.Header>
              <StyledTrigger>
                <LargeSystemIcon
                  icon={activeItem === item.id ? "MinusYellow" : "PlusYellow"}
                  w={16}
                  h={16}
                  m={2}
                  mr={20}
                />
                <StyledHeading>{item.heading}</StyledHeading>
              </StyledTrigger>
            </RadixAccordion.Header>
            <StyledContent>{item.content}</StyledContent>
          </StyledItem>
        );
      })}
    </StyledAccordion>
  );
};

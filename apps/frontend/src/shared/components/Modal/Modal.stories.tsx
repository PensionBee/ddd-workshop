import { Button } from "@shared/components/Button";
import type { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";

export default {
  title: "Shared/Modal",
  component: Modal,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Modal>;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div>Modal content</div>
        <Button onClick={handleClose}>Close</Button>
      </Modal>
    </>
  );
};

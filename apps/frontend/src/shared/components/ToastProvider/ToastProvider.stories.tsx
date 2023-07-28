import { Button, type ButtonProps } from "@shared/components/Button";
import { Box } from "@shared/components/Box";
import {
  emitToastError,
  emitToastInfo,
  emitToastPromise,
  emitToastSuccess,
} from "@shared/utils/toast";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ToastProvider } from "./ToastProvider";

export default {
  title: "Shared/Toast Notifications",
  component: Button,
  decorators: [
    (Story) => (
      <>
        <Box d="flex" p={20}>
          <Story />
          <ToastProvider />
        </Box>
      </>
    ),
  ],
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Button>;

const NotificationTemplate: ComponentStory<typeof Button> = (
  args: ButtonProps
) => {
  return <Button {...args} />;
};

export const Success = NotificationTemplate.bind({});
Success.args = {
  onClick: () => emitToastSuccess("Event was successful!"),
  children: "Emit Success Toast",
};
export const Error = NotificationTemplate.bind({});
Error.args = {
  onClick: () => emitToastError("Event had an error!"),
  children: "Emit Error Toast",
};
export const Info = NotificationTemplate.bind({});
Info.args = {
  onClick: () => emitToastInfo("Some useful information."),
  children: "Emit Info Toast",
};

const asyncWaitThenSuccess = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("Success"), 5000);
  });

const handlePromiseSuccessButtonClick = async () => {
  return emitToastPromise(asyncWaitThenSuccess(), {
    pending: "Loading... (5 Seconds)",
    success: "Success!",
    error: "Failed!",
  });
};

export const PromiseSuccess = NotificationTemplate.bind({});
PromiseSuccess.args = {
  onClick: handlePromiseSuccessButtonClick,
  children: "Emit Promise Success",
};

const asyncWaitThenFail = () =>
  new Promise((_, reject) => {
    setTimeout(() => reject("Failed"), 5000);
  });

const handlePromiseErrorButtonClick = async () => {
  return emitToastPromise(asyncWaitThenFail(), {
    pending: "Loading... (5 Seconds)",
    success: "Success!",
    error: "Failed!",
  });
};

export const PromiseError = NotificationTemplate.bind({});
PromiseError.args = {
  onClick: handlePromiseErrorButtonClick,
  children: "Emit Promise Fail",
};

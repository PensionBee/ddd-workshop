import { useEffect, useState } from "react";
import type { ComponentMeta } from "@storybook/react";
import { Loader } from "./Loader";

export default {
  title: "Shared/Loader",
  component: Loader,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Loader>;

export const Default = () => <Loader />;

export const ContentLoading = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded !== false) return;
    setTimeout(() => setLoaded(true), 2000);
  }, [loaded]);

  if (!loaded) return <Loader />;

  return <button onClick={() => setLoaded(false)}>Reload</button>;
};

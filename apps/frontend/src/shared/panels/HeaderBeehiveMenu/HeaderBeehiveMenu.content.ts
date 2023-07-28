import type { NavMenuItem } from "@shared/components/Nav/Nav.types";

type HeaderBeehiveMenuContentProps = {
  beehiveMenu?: {
    canAccessBalance?: boolean;
    canAccessAnalytics?: boolean;
    canAccessContributions?: boolean;
    canAccessVerifyDetails?: boolean;
    canAccessTransfers?: boolean;
    canAccessWithdrawals?: boolean;
    canAccessInvestmentPathways?: boolean;
    canAccessPensionReport?: boolean;
    canAccessPlan?: boolean;
  };
};

export const getDynamicHeaderBeehiveMenuContent = (
  menuPermissions?: HeaderBeehiveMenuContentProps
) => {
  return [
    {
      children: "Balance",
      href: "/beehive/dashboard",
      hidden: !menuPermissions?.beehiveMenu?.canAccessBalance,
    },
    {
      children: "Analytics",
      href: "/beehive/dashboard/analytics",
      hidden: !menuPermissions?.beehiveMenu?.canAccessAnalytics,
    },
    {
      children: "Contributions",
      href: "/beehive/dashboard/contributions",
      hidden: !menuPermissions?.beehiveMenu?.canAccessContributions,
    },
    { children: "Add a pension", href: "/beehive/dashboard/add" },
    {
      children: "Verify my details",
      href: "/beehive/dashboard/id",
      hidden: !menuPermissions?.beehiveMenu?.canAccessVerifyDetails,
    },
    {
      children: "Transfers",
      href: "/beehive/dashboard/tracker",
      hidden: !menuPermissions?.beehiveMenu?.canAccessTransfers,
    },
    {
      children: "Withdrawals",
      href: "/beehive/dashboard/withdrawals",
      hidden: !menuPermissions?.beehiveMenu?.canAccessWithdrawals,
    },
    {
      children: "Investment pathways",
      href: "/beehive/dashboard/investment-pathways",
      hidden: !menuPermissions?.beehiveMenu?.canAccessInvestmentPathways,
    },
    {
      children: "Detailed pension report",
      href: "/beehive/dashboard/report",
      hidden: !menuPermissions?.beehiveMenu?.canAccessPensionReport,
    },
    { children: "Support", href: "/beehive/dashboard/help-support" },
    {
      children: "Account",
      subList: [
        {
          children: "My Plan",
          href: "/beehive/dashboard/my-plan",
          hidden: !menuPermissions?.beehiveMenu?.canAccessPlan,
        },
        { children: "My Profile", href: "/beehive/dashboard/profile" },
        { children: "Beneficiaries", href: "/beehive/dashboard/beneficiaries" },
        {
          children: "Documents & Resources",
          href: "/beehive/dashboard/documents-resources",
        },
        {
          children: "Two-factor authentication",
          href: "/beehive/dashboard/two-factor",
        },
        {
          children: "Refer a friend",
          href: "/beehive/dashboard/rewards",
          icon: "Heart",
        },
      ],
    },
  ] satisfies NavMenuItem[];
};

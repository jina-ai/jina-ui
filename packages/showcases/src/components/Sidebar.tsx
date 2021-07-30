import React from "react";
import { useRouter } from "next/router";

type SidebarItemProps = {
  url: string;
  children: React.ReactNode;
  selected: boolean;
};
const SidebarItem = ({ children, url, selected }: SidebarItemProps) => {
  return (
    <a
      className={`block text-gray-600 my-8 p-2${
        selected ? " font-bold text-primary-500" : ""
      }`}
      href={url}
    >
      {children}
    </a>
  );
};

const items = [
  { url: "/pdf", title: "PDF Showcase" },
  { url: "/e-commerce", title: "E-commerce Showcase" },
  { url: "/gaming", title: "Gaming Showcase" },
];

export const Sidebar = () => {
  const { asPath } = useRouter();
  return (
    <div className="bg-gray-50 w-72 px-6">
      {items.map(({ url, title }) => (
        <SidebarItem url={url} selected={url === asPath} key={url}>
          {title}
        </SidebarItem>
      ))}
    </div>
  );
};

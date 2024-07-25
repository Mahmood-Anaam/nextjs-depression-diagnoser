

import {
  IconLayoutDashboard,
  IconFaceId,
  IconDatabase,
  IconMessageChatbot,
  IconMail,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const navigationData = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Diagnoser",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    navlabel: true,
    role:'ADMIN',
    subheader: "Dashboard",
  },
  {
    id: uniqueId(),
    title: "Users",
    role:'ADMIN',
    icon: IconDatabase,
    href: "/admin",
  },
  {
    id: uniqueId(),
    title: "Admins",
    role:'ADMIN',
    icon: IconDatabase,
    href: "/admin",
  },

  {
    id: uniqueId(),
    title: "Doctors",
    role:'ADMIN',
    icon: IconDatabase,
    href: "/admin",
  },


  {
    navlabel: true,
    subheader: "Setting",
  },
  {
    id: uniqueId(),
    title: "My Acount",
    icon: IconMail,
    href: "/pro",
  },
];

export default navigationData;

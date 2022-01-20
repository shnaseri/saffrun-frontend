import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "dashboard",
    title: "صفحه اصلی",
    type: "item",
    icon: <Icon.Home size={20} />,

    navLink: "/",
  },
  {
    type: "groupHeader",
    groupTitle: "اطلاعات کاربر",
  },
  {
    id: "identity",
    title: "مشخصات فردی",
    type: "item",
    icon: <Icon.User size={20} />,
    navLink: "/personal-info",
  },
  {
    id: "works",
    title: "کسب و کار ",
    type: "item",
    icon: <Icon.Briefcase size={20} />,
    navLink: "/work-info",
  },
  {
    id: "trade",
    title: "تراکنش های مالی",
    type: "item",
    icon: <Icon.DollarSign size={20} />,
    navLink: "/trade-info",
  },
  {
    id: "messages",
    title: "اعلانات",
    type: "item",
    icon: <Icon.MessageCircle size={20} />,
    navLink: "/notifications",
  },
  {
    id: "received_comments",
    title: "مشاهده نظرات",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/received-comments",
  },
  {
    type: "groupHeader",
    groupTitle: "نوبت دهی",
  },

  {
    id: "booking_creation",
    title: "ایجاد نوبت",
    type: "item",
    icon: <Icon.PlusCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/book-creation",
  },

  {
    id: "my_reservation",
    title: "نوبت های من",
    type: "item",
    icon: <Icon.List size={20} />,
    navLink: "/my-reservation",
  },

  {
    type: "groupHeader",
    groupTitle: "رویداد",
  },

  {
    id: "event_creation",
    title: "ایجاد رویداد",
    type: "item",
    icon: <Icon.PlusSquare size={20} />,
    navLink: "/event-creation",
  },
  {
    id: "my_events",
    title: "رویداد های من",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/my-events",
  },

  {
    type: "groupHeader",
    groupTitle: "پشتیبانی",
  },
  {
    id: "about_us",
    title: "درباره ما",
    type: "item",
    icon: <Icon.Info size={20} />,
    navLink: "/about-us",
  },
  {
    id: "call_us",
    title: "تماس با ما",
    type: "item",
    icon: <Icon.PhoneCall size={20} />,
    navLink: "/call-us",
  },
];

export default navigationConfig;

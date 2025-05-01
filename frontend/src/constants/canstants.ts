import {
    FaHandHoldingMedical,
    FaHandHoldingWater,
    FaUserGraduate,
  } from "react-icons/fa";
  import { HiMiniUserGroup } from "react-icons/hi2";
  import {
    GiBowlOfRice,
    GiDeerHead,
    GiIndianPalace,
    GiPlantWatering,
  } from "react-icons/gi";
  import { FaPeopleRoof } from "react-icons/fa6";
  import { TbBulbFilled } from "react-icons/tb";
  import { MdCardTravel } from "react-icons/md";
  import { SiBookstack } from "react-icons/si";

export const sidebarTags = [
  { name: "Home", path: "/" },
  { name: "Topics", path: "/" },
  { name: "About", path: "/" },
  { name: "Stories", path: "/" },
  { name: "Our Impact", path: "/" },
  { name: "Brand Campaigns", path: "/" },
  { name: "Contact", path: "/" },
  { name: "Advertise with us", path: "/" },
];

export const categoriesTags = [
    { name: "Changemakers", path: "", icon: HiMiniUserGroup },
    { name: "Sustainability", path: "", icon: FaHandHoldingWater },
    { name: "Farming", path: "", icon: GiPlantWatering },
    { name: "Startup", path: "", icon: FaPeopleRoof },
    { name: "Wildlife", path: "", icon: GiDeerHead },
    { name: "Innovation", path: "", icon: TbBulbFilled },
    { name: "Helath Care", path: "", icon: FaHandHoldingMedical },
    { name: "Culture", path: "", icon: GiIndianPalace },
    { name: "Food", path: "", icon: GiBowlOfRice },
    { name: "Travel", path: "", icon: MdCardTravel },
    { name: "History", path: "", icon: SiBookstack },
    { name: "Education", path: "", icon: FaUserGraduate },
  ];
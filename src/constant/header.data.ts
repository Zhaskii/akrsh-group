import { IconType } from "react-icons";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { StaticImageData } from "next/image";
import logo from "@/assets/logo/logo.jpg";

export interface Brand {
  name: string;
  logo: string | StaticImageData;
  href: string;
}

export interface SocialLink {
  icon: IconType;
  href?: string;
  brands?: Brand[];
}

export interface MenuItem {
  label: string;
  href: string;
  isDropdown?: boolean;
  subMenu?: {
    name: string;
    href?: string;
    nestedItems?: { name: string; href: string }[];
  }[];
}

export const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    isDropdown: true,
    subMenu: [
      { name: "About Us", href: "/about" },
      {
        name: "Chairman / Managing Director",
        nestedItems: [
          { name: "Profile", href: "/md-message" },
          { name: "Gallery", href: "/md-gallery" },
        ],
      },
      { name: "Chief Executive Officer", href: "/ceo-message" },
      { name: "Companies & Brand", href: "/companies-brands" },
      {
        name: "Beyond Business",
        nestedItems: [{ name: "Arksh Helps", href: "/arksh-help" }],
      },
    ],
  },
  { label: "Arkshism", href: "/arkshism" },
  { label: "Involvements", href: "#", isDropdown: true }, // This uses involvements.header.ts
  { label: "News Room", href: "/news" },
  { label: "Blogs", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/arksh-group/",
  },
  {
    icon: FaFacebookF,
    brands: [
      {
        name: "Arksh Group",
        logo: logo,
        href: "https://www.facebook.com/Arksh.Group",
      },
      {
        name: "Dream Skin Nepal",
        logo: "https://arkshgroup.com/storage/social-media-icons/FiLviRGnFJkr3KXCTYJBbPTychyLy3Z0RA9gWmcA.jpg",
        href: "https://www.facebook.com/Dream.Skin.Nepal/",
      },
      {
        name: "Arksh Food",
        logo: "https://arkshgroup.com/storage/social-media-icons/451108005_473189905648553_4162736636233028142_n.jpg",
        href: "https://www.facebook.com/Arksh.Food/",
      },
      {
        name: "Hotrl Peaceland",
        logo: "https://arkshgroup.com/storage/social-media-icons/pdeLPaWZmJE16d24s0sOoW0gOLV1DMosnhriflv9.jpg",
        href: "https://www.facebook.com/Hotel.Peaceland/",
      },
      {
        name: "Arksh Motors",
        logo: "https://arkshgroup.com/storage/social-media-icons/459405065_122100409418524006_822313891558187477_n.jpg",
        href: "https://www.facebook.com/Arksh.Motors/",
      },
      {
        name: "Nirvana Physiotherapy & Welness Center",
        logo: "https://arkshgroup.com/storage/social-media-icons/nirvana%20new%20shades%20and%20bold-.png",
        href: "https://www.facebook.com/Nirvana.Physio.Wellness/",
      },
      {
        name: "Arksh Agro",
        logo: "https://arkshgroup.com/storage/social-media-icons/485122420_122102952416803648_2672758428825753568_n.png",
        href: "https://www.facebook.com/Arksh.Agro/",
      },
      {
        name: "Lifestyle Holidays",
        logo: "https://arkshgroup.com/storage/social-media-icons/459732338_1054843959667512_6017052397712276251_n.jpg",
        href: "https://www.facebook.com/Lifestyle.Holidays.Nepal/",
      },
    ],
  },
  {
    icon: FaInstagram,
    brands: [
      {
        name: "Arksh Group",
        logo: logo,
        href: "https://www.instagram.com/arksh.group",
      },
      {
        name: "Dream Skin Nepal",
        logo: "https://arkshgroup.com/storage/social-media-icons/FiLviRGnFJkr3KXCTYJBbPTychyLy3Z0RA9gWmcA.jpg",
        href: "https://www.instagram.com/dream.skin.nepal",
      },
      {
        name: "Arksh Food",
        logo: "https://arkshgroup.com/storage/social-media-icons/451108005_473189905648553_4162736636233028142_n.jpg",
        href: "https://www.instagram.com/arksh.food",
      },
      {
        name: "Hotrl Peaceland",
        logo: "https://arkshgroup.com/storage/social-media-icons/pdeLPaWZmJE16d24s0sOoW0gOLV1DMosnhriflv9.jpg",
        href: "https://www.instagram.com/hotel.peaceland",
      },
      {
        name: "Arksh Motors",
        logo: "https://arkshgroup.com/storage/social-media-icons/459405065_122100409418524006_822313891558187477_n.jpg",
        href: "https://www.instagram.com/arksh.motors",
      },
      {
        name: "Nirvana Physiotherapy & Welness Center",
        logo: "https://arkshgroup.com/storage/social-media-icons/nirvana%20new%20shades%20and%20bold-.png",
        href: "https://www.instagram.com/nirvana.physio.wellness",
      },
      {
        name: "Arksh Agro",
        logo: "https://arkshgroup.com/storage/social-media-icons/485122420_122102952416803648_2672758428825753568_n.png",
        href: "https://www.instagram.com/arksh.agro",
      },
      {
        name: "Lifestyle Holidays",
        logo: "https://arkshgroup.com/storage/social-media-icons/459732338_1054843959667512_6017052397712276251_n.jpg",
        href: "https://www.instagram.com/lifestyle.holidays.nepal",
      },
    ],
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@arkshgroup",
  },
  {
    icon: FaTiktok,
    brands: [
      {
        name: "Arksh Group",
        logo: logo,
        href: "https://www.tiktok.com/@arksh.group",
      },
      {
        name: "Dream Skin Nepal",
        logo: "https://arkshgroup.com/storage/social-media-icons/FiLviRGnFJkr3KXCTYJBbPTychyLy3Z0RA9gWmcA.jpg",
        href: "https://www.tiktok.com/@dream.skin.nepal",
      },
      {
        name: "Arksh Food",
        logo: "https://arkshgroup.com/storage/social-media-icons/451108005_473189905648553_4162736636233028142_n.jpg",
        href: "https://www.tiktok.com/@arksh.food",
      },
      {
        name: "Hotrl Peaceland",
        logo: "https://arkshgroup.com/storage/social-media-icons/pdeLPaWZmJE16d24s0sOoW0gOLV1DMosnhriflv9.jpg",
        href: "https://www.tiktok.com/@hotel.peaceland",
      },
      {
        name: "Arksh Motors",
        logo: "https://arkshgroup.com/storage/social-media-icons/459405065_122100409418524006_822313891558187477_n.jpg",
        href: "https://www.tiktok.com/@arksh.motors",
      },
      {
        name: "Nirvana Physiotherapy & Welness Center",
        logo: "https://arkshgroup.com/storage/social-media-icons/nirvana%20new%20shades%20and%20bold-.png",
        href: "https://www.tiktok.com/@nirvana.physio.wellness",
      },
      {
        name: "Arksh Agro",
        logo: "https://arkshgroup.com/storage/social-media-icons/485122420_122102952416803648_2672758428825753568_n.png",
        href: "https://www.tiktok.com/@arksh.agro",
      },
    ],
  },
];

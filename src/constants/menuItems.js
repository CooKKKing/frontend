import { RiDashboardFill } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { MdRecommend } from "react-icons/md";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

export const menuItems = [
    { name: '메인', icon: <RiDashboardFill/> },
    { name: '추천메뉴', icon: <MdRecommend /> },
    { name: '도감', icon: <MdCollectionsBookmark /> },
    { name: '마이페이지', icon: <FaUserCircle /> },
    { name: '밥풀상점', icon: <FaStore /> },
    { name: '로그아웃', icon: <FiLogOut /> },
  ];

  //로그인 전
  // <HiUserAdd /> => 회원가입
  // <FiLogIn /> => 로그인

  
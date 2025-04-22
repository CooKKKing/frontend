import { RiDashboardFill } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { MdRecommend } from "react-icons/md";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

export const menuItems = [
    { name: '메인', icon: <RiDashboardFill/>, path: '/' },
    { name: '추천메뉴', icon: <MdRecommend /> , path: '/recommend'},
    { name: '도감', icon: <MdCollectionsBookmark /> , path: '/dictionary'},
    { name: '마이페이지', icon: <FaUserCircle /> , path: '/mypage'},
    { name: '밥풀상점', icon: <FaStore /> , path: '/shop'},
    { name: '랭킹', icon: <FaStore /> , path: '/ranking'},
    // { name: '로그아웃', icon: <FiLogOut /> , path: '/logout'},
    // { name: '회원가입', icon: <HiUserAdd /> , path: '/signup'},
    { name: '로그인', icon: <FiLogIn /> , path: '/login'},
  ];

export const categoryItems = [
    { name: '전체' },
    { name: '한식' },
    { name: '중식' },
    { name: '일식' },
    { name: '양식' },
    { name: '분식' },
];

  //로그인 전
  // <HiUserAdd /> => 회원가입
  // <FiLogIn /> => 로그인

  
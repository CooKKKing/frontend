import { RiDashboardFill } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { MdRecommend } from "react-icons/md";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { PiRankingFill } from "react-icons/pi";
import { useUser } from "../hooks/useUser";


export const menuItems = [
  { name: '메인', icon: <RiDashboardFill/>, path: '/' },
  { name: '추천메뉴', icon: <MdRecommend /> , path: '/recommend'},
  { name: '도감', icon: <MdCollectionsBookmark /> , path: '/dictionary'},
  { name: '마이페이지', icon: <FaUserCircle /> , path: '/mypage'},
  { name: '상점', icon: <FaStore /> , path: '/shop'},
  { name: '랭킹', icon: <PiRankingFill /> , path: '/ranking'},
  { name: '로그아웃', icon: <FiLogOut /> , path: '/logout'},
];

export const beforeLoginMenuItems = [
  { name: '메인', icon: <RiDashboardFill/>, path: '/' },
  { name: '회원가입', icon: <HiUserAdd /> , path: '/signup'},
  { name: '로그인', icon: <FiLogIn /> , path: '/login'},
];

export const mobileMenuItems = [
    { name: '메인', icon: <RiDashboardFill/>, path: '/' },
    // { name: '추천메뉴', icon: <MdRecommend /> , path: '/recommend'},
    { name: '도감', icon: <MdCollectionsBookmark /> , path: '/dictionary'},
    { 
      name: '마이페이지',
      icon: <FaUserCircle />,
      arrowIcon: <IoIosArrowDown />,
      isDropdown: true,
      subMenus: [
        { name: '내 게시글', path: '/mypage' },
        { name: '프로필 수정', path: '/mypage/profile-edit' },
        { name: '도전과제', path: '/mypage/challenges' },
        { name: '칭호', path: '/mypage/titles' },
        { name: '북마크 리스트', path: '/mypage/bookmarks' },
        { name: '비밀번호 변경', path: '/mypage/change-password' },
        { name: '회원탈퇴', path: '/mypage/withdrawal' },
      ]
    },
    { name: '상점',
      icon: <FaStore /> , 
      arrowIcon: <IoIosArrowDown />,
      isDropdown: true,
      subMenus: [
        { name: '밥풀 상점', path: '/shop/' },
        { name: '밥풀 내역', path: '/shop/history' },
      ]
    },
    { name: '랭킹', icon: <PiRankingFill /> , path: '/ranking'},
    { name: '로그아웃', icon: <FiLogOut /> , path: '/logout'},
];

export const beforeLoginMobileMenuItems = [
  { name: '메인', icon: <RiDashboardFill/>, path: '/' },
  { name: '회원가입', icon: <HiUserAdd /> , path: '/signup'},
  { name: '로그인', icon: <FiLogIn /> , path: '/login'},
];

export const categoryItems = [
    { name: '전체' },
    { name: '한식' },
    { name: '중식' },
    { name: '일식' },
    { name: '양식' },
    { name: '기타' },
];

  //로그인 전
  // <HiUserAdd /> => 회원가입
  // <FiLogIn /> => 로그인

  
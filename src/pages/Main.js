import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodGrid from '../components/FoodGrid';
import Category from '../components/Category';
import Pagination from '../components/Pagination';  
import PageTitle from '../components/PageTitle';
import { getRecipeAllList } from '../api/queries/recipeService';
import { getMenuAllList } from '../api/queries/menuService';
import LoadingBar from '../components/LoadingBar';
import { useUser } from '../hooks/useUser';
import ProfileChange from './ProfileChange';
const Main = () => {

  return (
    <>
    <ProfileChange />
     
    </>
  );
};

export default Main;

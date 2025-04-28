import { useCallback } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { loginService } from '../api/mutations/userServices';
import { getCurrentUser } from '../api/queries/userServices';
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // member 상태를 useQuery로 관리
  const { data: member, isLoading } = useQuery({
    queryKey: ["member"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      console.log("data",data);
      queryClient.setQueryData(["member"], data.member);
      queryClient.invalidateQueries();
    },
  });

  const login = useCallback(
    (credentials) => {
      return loginMutation.mutateAsync(credentials);
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("achievedChallenges");
    localStorage.removeItem("bookmarks");
    localStorage.removeItem("challenges");

    navigate("/");

    queryClient.invalidateQueries(["member"]);
    queryClient.setQueryData(["member"], null);
  }, [queryClient, localStorage.getItem("accessToken")]);

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem("accessToken");
  }, []);

  return { 
    member, 
    login, 
    logout, 
    isLoading,
    isAuthenticated
  };
}; 
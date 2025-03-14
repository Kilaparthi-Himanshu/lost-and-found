import { useQuery } from "@tanstack/react-query";
import { getUserIdAndPosts } from "../actions/getUserIdandPosts";

type UserAndPosts = Awaited<ReturnType<typeof getUserIdAndPosts>>;

export const useGetUserIdAndPosts = (options?: {
    onSuccess?: (data: UserAndPosts) => void;
    onError?: (error: Error) => void;
}) => {
    return useQuery({
        queryFn: () => getUserIdAndPosts(),
        queryKey: ["posts"],
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });
}
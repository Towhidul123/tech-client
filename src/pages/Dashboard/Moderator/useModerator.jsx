import { useQuery } from "@tanstack/react-query";


import UseAxiosSecure from "../AllUsers/UseAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";


const useModerator = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.email, 'isModerator'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is Moderator', user)
            const res = await axiosSecure.get(`/users/mod/${user.email}`);
            // console.log(res.data);
            return res.data?.moderator;
        }
    })
    return [isModerator, isModeratorLoading]
};

export default useModerator;
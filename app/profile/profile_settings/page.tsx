import { getCurrentUser, getCurrentUserWithProfile } from "@/app/lib/data/user";
import EditProfile from "./ProfileSettingClient";

export default async function ProfileSettings(){
    const {user, profile} = await getCurrentUserWithProfile()
    


    return(
        <>
            <EditProfile
                email={user.email as string}
                fullName={profile.full_name}
            ></EditProfile>
        </>
    )
}
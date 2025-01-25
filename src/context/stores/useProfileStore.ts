import { Profile } from "@/src/models";
import { useState } from "react";

export const useProfileStore = () => {
    const initialState: Profile = { name: "John Doe", age: 30, address: { city: "New York", zip: 10001 } };
    const [profile, setProfile] = useState(initialState);
    const updateProfile = (newProfile: Profile) => {
        setProfile(newProfile);
    }
    return {
        profile,
        updateProfile,
    };
}
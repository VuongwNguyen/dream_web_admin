"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface UserContextType {
    fullname: string;
    avatar: string;
    setUserData: (data: { fullname?: string; avatar?: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [fullname, setFullname] = useState<string>("Username");
    const [avatar, setAvatar] = useState<string>(
        "https://i.pinimg.com/564x/b4/c9/e6/b4c9e629c472e0b7ed57268384d09e5f.jpg"
    );

    useEffect(() => {
        const name = Cookies.get("fullname") ?? "Username";
        const avt = Cookies.get("avatar") ??
            "https://i.pinimg.com/564x/b4/c9/e6/b4c9e629c472e0b7ed57268384d09e5f.jpg";
        setFullname(name);
        setAvatar(avt);
    }, []);

    const setUserData = (data: { fullname?: string; avatar?: string }) => {
        if (data.fullname) {
            setFullname(data.fullname);
            Cookies.set("fullname", data.fullname);
        }
        if (data.avatar) {
            setAvatar(data.avatar);
            Cookies.set("avatar", data.avatar);
        }
    };

    return (
        <UserContext.Provider value={{ fullname, avatar, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

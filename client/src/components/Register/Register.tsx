"use client";
import { useAddNewUserMutation, useGetUsersQuery } from "@/Api/UserApi";
import { IUser } from "@/Types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [username, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [addUser] = useAddNewUserMutation();
  const { data: users } = useGetUsersQuery();
  const router = useRouter();
  const handleAddUser = async () => {
    try {
      const newUser: IUser = {
        id: Date.now(),
        name: username,
        password: userPassword,
        role: "user",
        cart: [],
      };

      if (username !== "" && userPassword !== "") {
        const userExists = users?.some((user) => user.name === newUser.name);
        if (!userExists) {
          const result = await addUser(newUser).unwrap();
          router.push("/");
        } else {
          alert("Такой пользователь уже есть");
        }
      } else {
        alert("Имя пользователя и пароль должны быть не пустыми");
      }

      setUserName("");
      setUserPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {users?.map((user) => {
          return <div className="text-black">{user.name}</div>;
        })}
      </div>
      <div className="flex justify-center align-center p-10 m-10 max-w-[500px]">
        <input
          className="p-5 text-black"
          value={username}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value);
          }}
        />
        <input
          className="p-5 text-black"
          value={userPassword}
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={handleAddUser}>Register</button>
    </div>
  );
};

export default Register;

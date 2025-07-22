"use client";

import Skeleton from "@/app/components/Skeleton";
import { User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/api/users");
      return response.data;
    },
    staleTime: 1000 * 60,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Select Assignee"></Select.Trigger>
      <Select.Content>
        {users?.map((u) => (
          <Select.Item key={u.id} value={u.id}>
            {u.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;

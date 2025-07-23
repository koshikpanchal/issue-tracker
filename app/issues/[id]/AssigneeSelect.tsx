"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "null" ? null : userId,
      })
      .catch((err) => {
        toast.error("Failed to update assignee");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId ?? "null"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Select Assignee"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/api/users");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export default AssigneeSelect;

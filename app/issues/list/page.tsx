import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components/index";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface IssuesPageProps {
  searchParams: { status?: Status; orderBy?: keyof Issue };
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  const columns: { label: string; value: keyof Issue; classNames?: string }[] =
    [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", classNames: "hidden md:table-cell" },
      {
        label: "Created",
        value: "createdAt",
        classNames: "hidden md:table-cell",
      },
    ];

  const statuses = Object.values(Status);
  const param = await searchParams;
  const status = statuses.includes(param.status!) ? param.status : undefined;

  const orderBy = columns.map((column) => column.value).includes(param.orderBy!)
    ? { [param.orderBy || "title"]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface" className="mt-5">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                className={column.classNames}
                key={column.value}
              >
                <Link href={{ query: { ...param, orderBy: column.value } }}>
                  {column.label}
                </Link>
                {column.value === param.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

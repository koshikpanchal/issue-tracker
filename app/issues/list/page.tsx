import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Status } from "@/app/generated/prisma";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface IssuesPageProps {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  const statuses = Object.values(Status);
  const param = await searchParams;
  const status = statuses.includes(param.status!) ? param.status : undefined;
  const where = { status };

  const orderBy = columnNames.includes(param.orderBy!)
    ? { [param.orderBy || "title"]: "asc" }
    : undefined;

  const page = parseInt(param.page, 10) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={param} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

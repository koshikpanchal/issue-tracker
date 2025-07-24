import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Flex direction="column" gap="6">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

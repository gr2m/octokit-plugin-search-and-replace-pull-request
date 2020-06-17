import type { Octokit as Core } from "@octokit/core";
import type { paginateRest } from "@octokit/plugin-paginate-rest";
import type { createPullRequest } from "octokit-plugin-create-pull-request";

export type Octokit = Core &
  ReturnType<typeof paginateRest> &
  ReturnType<typeof createPullRequest>;

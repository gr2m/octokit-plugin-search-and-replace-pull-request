import type { Octokit } from "@octokit/core";
import type { Octokit as OctokitWithRequiredPlugins } from "./types";

import { createSearchAndReplacePullRequest } from "./search-and-replace-pull-request";
import { VERSION } from "./version";

/**
 * @param octokit Octokit instance
 */
export function searchAndReplacePullRequest(octokit: Octokit) {
  return {
    createSearchAndReplacePullRequest: createSearchAndReplacePullRequest.bind(
      null,
      octokit as OctokitWithRequiredPlugins
    ),
  };
}
searchAndReplacePullRequest.VERSION = VERSION;

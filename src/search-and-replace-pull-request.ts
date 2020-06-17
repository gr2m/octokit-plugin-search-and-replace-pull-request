import type { Octokit } from "./types";
import type { createPullRequest } from "octokit-plugin-create-pull-request";

export type Options = {
  owner: string;
  repo: string;
  title: string;
  body: string;
  head: string;
  base?: string;
  terms: SearchAndReplace[];
};

type SearchAndReplace = {
  search: string;
  replace: string;
};

export async function createSearchAndReplacePullRequest(
  octokit: Octokit,
  { owner, repo, title, body, head, base, terms }: Options
) {
  /* istanbul ignore if */
  if (!octokit.paginate) {
    throw new Error(
      "[octokit-plugin-search-and-replace-pull-request] The @octokit/plugin-paginate-rest plugin is required"
    );
  }

  /* istanbul ignore if */
  if (!octokit.createPullRequest) {
    throw new Error(
      "[octokit-plugin-search-and-replace-pull-request] The octokit-plugin-create-pull-request plugin is required"
    );
  }

  const allChanges: createPullRequest.Changes[] = [];

  for (const { search, replace } of terms) {
    const changes: Required<createPullRequest.Changes> = {
      commit: `Replace ${search} with ${replace}`,
      files: {},
    };

    for await (const response of octokit.paginate.iterator("GET /search/code", {
      q: `${search} repo:${owner}/${repo} in:file`,
    })) {
      for (const result of response.data) {
        changes.files[result.path] = ({ encoding, content }) => {
          return Buffer.from(content, encoding)
            .toString()
            .replace(new RegExp(`\\b${search}\\b`, "g"), replace);
        };
      }

      if (Object.keys(changes.files).length === 0) {
        changes.commit += " (no matches)";
      }

      allChanges.push(changes);
    }
  }

  return await octokit.createPullRequest({
    owner,
    repo,
    title,
    body,
    head,
    base,
    changes: allChanges,
  });
}

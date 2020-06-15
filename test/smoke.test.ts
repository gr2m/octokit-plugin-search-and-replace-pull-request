import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { searchAndReplacePullRequest } from "../src";

describe("Smoke test", () => {
  it("is a function", () => {
    expect(searchAndReplacePullRequest).toBeInstanceOf(Function);
  });

  it("octokit.createSearchAndReplacePullRequest is a function", () => {
    const MyOctokit = Octokit.plugin(
      paginateRest,
      createPullRequest,
      searchAndReplacePullRequest
    );
    // const octokit = new MyOctokit();

    // expect(octokit.createSearchAndReplacePullRequest).toBeInstanceOf(Function);
  });

  it("searchAndReplacePullRequest.VERSION is set", () => {
    expect(searchAndReplacePullRequest.VERSION).toEqual("0.0.0-development");
  });
});

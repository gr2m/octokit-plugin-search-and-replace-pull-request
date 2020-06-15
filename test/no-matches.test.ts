import { Octokit as Core } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { searchAndReplacePullRequest } from "../src";
const Octokit = Core.plugin(
  paginateRest,
  createPullRequest,
  searchAndReplacePullRequest
);

test("no-matches", async () => {
  const fixtures = require("./fixtures/no-matches");
  const fixturePr = fixtures[fixtures.length - 1].response;
  const octokit = new Octokit();

  octokit.hook.wrap("request", (_, options) => {
    const currentFixtures = fixtures.shift();
    const {
      baseUrl,
      method,
      url,
      request,
      headers,
      mediaType,
      ...params
    } = options;

    expect(currentFixtures.request.method).toEqual(options.method);
    expect(currentFixtures.request.url).toEqual(options.url);

    Object.keys(params).forEach((paramName) => {
      expect(currentFixtures.request[paramName]).toStrictEqual(
        params[paramName]
      );
    });
    return currentFixtures.response;
  });

  const pr = await octokit.createSearchAndReplacePullRequest({
    owner: "gr2m",
    repo: "pull-request-test",
    title: "Test",
    body: "",
    head: "test",
    terms: [
      {
        search: "foo",
        replace: "bar",
      },
    ],
  });

  expect(pr).toStrictEqual(fixturePr);
  expect(fixtures.length).toEqual(0);
});

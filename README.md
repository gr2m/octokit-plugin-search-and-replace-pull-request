# octokit-plugin-search-and-replace-pull-request

> Octokit plugin to replace a term across all repository files via a pull request

[![@latest](https://img.shields.io/npm/v/octokit-plugin-search-and-replace-pull-request.svg)](https://www.npmjs.com/package/octokit-plugin-search-and-replace-pull-request)
[![Build Status](https://github.com/gr2m/octokit-plugin-search-and-replace-pull-request/workflows/Test/badge.svg)](https://github.com/gr2m/octokit-plugin-search-and-replace-pull-request/actions?query=workflow%3ATest+branch%3Amain)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=gr2m/octokit-plugin-search-and-replace-pull-request)](https://dependabot.com/)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `octokit-plugin-search-and-replace-pull-request` and [`@octokit/core`](https://github.com/octokit/core.js) (or core-compatible module) directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { Octokit } from "https://cdn.pika.dev/@octokit/core";
  import { searchAndReplacePullRequest } from "https://cdn.pika.dev/octokit-plugin-search-and-replace-pull-request";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core octokit-plugin-search-and-replace-pull-request`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const { searchAndReplacePullRequest } = require("octokit-plugin-search-and-replace-pull-request");
```

</td></tr>
</tbody>
</table>

```js
octokit.createSearchAndReplacePullRequest({
  owner: "octocat",
  repo: "hello-world",
  search: "master",
  replace: "main",
});

```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
  
## License

[MIT](LICENSE)

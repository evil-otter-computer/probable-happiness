const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput("token") || process.env.GITHUB_TOKEN;
const context = github.context;

const client = new github.GitHub(token);

const isEmployee = await client.orgs.checkMembershipForUser({
  org: "github",
  username: context.payload.pull_request.user.login,
});

core.setOutput("employee", isEmployee);
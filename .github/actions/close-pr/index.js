const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput("token") || process.env.GITHUB_TOKEN;
const context = github.context;

const client = new github.GitHub(token);

core.info("Commenting on pull request explaining to the user why their pull request is being closed");

const body = `This PR is being automatically closed because we do not accept contributions to this repository.`;
await client.issues.createComment({
  ...context.repo,
  issue_number: context.issue.number,
  body,
});

core.info("Closing pull request");
await client.pulls.update({
  ...context.repo,
  pull_number: context.issue.number,
  state: "closed",
});

core.info("Done");
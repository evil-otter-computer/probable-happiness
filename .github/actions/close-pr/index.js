const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput("token") || process.env.GITHUB_TOKEN;
const context = github.context;

const client = new github.GitHub(token);

core.info("Commenting on pull request explaining to the user why their pull request is being closed");

const body = `This PR is being automatically closed because we do not accept contributions to this repository.`;

async function commentOnPR() {
  await client.issues.createComment({
    ...context.repo,
    issue_number: context.issue.number,
    body,
  });
}
commentOnPR();

core.info("Closing pull request");
async function closePr() {
  await client.pulls.update({
    ...context.repo,
    pull_number: context.issue.number,
    state: "closed",
  });
}
closePr();

core.info("Done");
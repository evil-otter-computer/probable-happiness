import * as core from '@actions/core';
import * as github from '@actions/github';

const token = core.getInput("token") || process.env.GITHUB_TOKEN;
const context = github.context;

const client = new github.GitHub(token);

async function checkEmployee() {
  return await client.orgs.checkMembershipForUser({
    org: "github",
    username: context.payload.pull_request.user.login,
  });
}

const isEmployee = checkEmployee();

core.setOutput("employee", isEmployee);
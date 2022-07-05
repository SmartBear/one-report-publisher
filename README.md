[![Run Tests](https://github.com/SmartBear/one-report-publisher/actions/workflows/test.yaml/badge.svg)](https://github.com/SmartBear/one-report-publisher/actions/workflows/test.yaml)

# OneReport Publisher

This is a tool that publishes test results to SmartBear OneReport. It is intended to be used in Continuous Integration workflows.

The tool supports the following file formats:

- JUnit XML
- Cucumber JSON
- Cucumber Messages
- Zip files (containing any of the above)

If the publisher is executed on a [supported CI server](https://github.com/cucumber/ci-environment#supported-ci-servers),
it will also send the following git metadata along with the test results:

- Repository URL
- Commit SHA
- Current Branch
- Current Tag (if available)

## GitHub Actions

Add a step _after_ all tests have run. The `if: ${{ always() }}` ensures results are published even if a previous test
step failed.

```yml
- name: 'Publish to OneReport'
  if: ${{ always() }}
  uses: smartbear/one-report-publisher@v0.6.0
  with:
    # Can be omitted if ONE_REPORT_PROJECT_ID is defined
    project-id: F5222E06-BA05-4C82-949A-2FE537B6F59F
    # Can be omitted if ONE_REPORT_TOKEN is defined
    token: ${{ secrets.ONE_REPORT_TOKEN }}
    # Can be omitted if ONE_REPORT_URL is defined
    url: ${{ env.ONE_REPORT_URL }}
    reports: ./reports/**/*.{xml,json,ndjson,zip}
```

See [action.yml](./action.yml) for a full reference of available input options.

## Command Line Reference

The command-line tool can be used in any CI pipeline that has the `npx` command available (it needs to have Node.js installed).

```
npx @smartbear/one-report-publisher@v0.6.0 --help

Usage: one-report-publisher [options]

Options:
  -u, --url <url>           OneReport URL. Defaults to $ONE_REPORT_URL
  -p, --project-id <id>     OneReport project id. Defaults to $ONE_REPORT_PROJECT_ID
  -t, --token <token>       OneReport token. Defaults to $ONE_REPORT_TOKEN
  -r, --reports <glob...>   Glob to the files to publish
  -m, --max-time <seconds>  Max time for each request
  -i, --ignore-error        Exit with 0 even if a timeout or error occurred
  --no-zip                  Do not zip non .zip files
  -h, --help                display help for command
```

Example:

```
npx @smartbear/one-report-publisher@0.6.0 \
  --project-id F5222E06-BA05-4C82-949A-2FE537B6F59F \
  --token ${ONE_REPORT_TOKEN} \
  --reports ./reports/**/*.{xml,json,ndjson,zip}
```

## CircleCI

Add a step _after_ all tests have run. You have to make sure the command is running in a docker image that has Node.js
installed (for example [cimg/node](https://circleci.com/developer/images/image/cimg/node)).

```yml
- run:
    name: Publish test results to OneReport
    command: |
      npx @smartbear/one-report-publisher@0.6.0 \
        --project-id F5222E06-BA05-4C82-949A-2FE537B6F59F \
        --token ${ONE_REPORT_TOKEN} \
        --reports ./reports/**/*.{xml,json,ndjson,zip}
```

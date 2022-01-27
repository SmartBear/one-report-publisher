[![Run Tests](https://github.com/SmartBear/one-report-publisher/actions/workflows/test.yaml/badge.svg)](https://github.com/SmartBear/one-report-publisher/actions/workflows/test.yaml)

# OneReport Publisher

This is a tool that publishes test results to SmartBear OneReport. It is intended to be used in Continuous Integration workflows.

The tool supports the following file formats:

- JUnit XML
- Cucumber JSON
- Cucumber Messages
- Zip files (containing any of the above)

The tool will also send Git metadata to OneReport:

- Repository URL
- Commit SHA
- Current Branch
- Current Tag (if available)

The Git metadata is detected from environment variables defined by the CI server. See [cucumber/ci-environment](https://github.com/cucumber/ci-environment#readme)
for details about [supported CI servers](https://github.com/cucumber/ci-environment#supported-ci-servers).

## Command Line

The command-line tool can be launched with the Node.js `npx` command:

```
npx @smartbear/one-report-publisher@v0.0.13 --help

Usage: one-report-publisher [options]

Options:
  -o, --organization-id <id>  OneReport organization id
  -p, --password <password>   OneReport password
  -r, --reports <glob>        Glob to the files to publish
  -u, --url <url>             OneReport URL (default: "https://one-report.vercel.app")
  -h, --help                  display help for command
```

Example:

```
npx @smartbear/one-report-publisher@0.0.13 --organization-id F5222E06-BA05-4C82-949A-2FE537B6F59F --password ${ONE_REPORT_PASSWORD} --reports "./reports/**/*.{xml,json,ndjson,zip}"
```

The command-line tool can be used in any CI pipeline that has the `npx` command available

## GitHub Actions

The GitHub Action can be used as follows:

```yml
- name: 'Publish to OneReport'
  uses: smartbear/one-report-publisher@v0.0.13
  with:
    organization-id: F5222E06-BA05-4C82-949A-2FE537B6F59F
    password: ${{ secrets.ONE_REPORT_PASSWORD }}
    reports: ./reports/**/*.{xml,json,ndjson,zip}
```

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.0] - 2022-08-15
### Changed
- Use new publishing API ([e8b0695ecdae025ce0e0d734e2cdcc119c5a79f9](https://github.com/SmartBear/one-report-publisher/commit/e8b0695ecdae025ce0e0d734e2cdcc119c5a79f9))

### Fixed
- Make `~` expansion work on Windows

## [0.7.0] - 2022-07-12
### Changed
- Changed `ONE_REPORT_TOKEN` to `ONE_REPORT_REFRESH_TOKEN`
- Changed the `--token` command-line option to `--refresh-token`
- Changed the `token` GitHub action input to `refresh-token`.

## [0.6.0] - 2022-07-05
### Added
- If an error is thrown it contains the response body

### Changed
- Changed the main response from report urls to test cycle ids
- Changed the console output from report urls to array of test cycle ids
- Changed the `--organization` command-line option to `--project-id`.
- Changed the `organization` GitHub action input to `project-id`.
- Renamed the `ONE_REPORT_ORGANIZATION` environment variable to `ONE_REPORT_PROJECT_ID`

## [0.5.0] - 2022-06-29
### Changed
- Added the ability to pick up `ONE_REPORT_ORGANIZATION`, `ONE_REPORT_TOKEN`, `ONE_REPORT_URL` environment variables, so GitHub Action inputs or command-line options do not need to be specified.
- Changed the `--organization-id` command-line option to `--organization`.
- Changed the `organization-id` GitHub action input to `organization`.

## [0.4.0] - 2022-06-22
### Changed
- Changed basic auth to JWT token authentication [OR-7](https://smartbear.atlassian.net/browse/OR-7?atlOrigin=eyJpIjoiYmNiNDhjZTliYWMwNDBjZGFjZDAzYWU1YmFiM2Q3ZmUiLCJwIjoiaiJ9)

## [0.3.2] - 2022-03-04
### Fixed
- Update @cucumber/ci-environment

## [0.3.1] - 2022-03-04
### Fixed
- Provide correct SHA for GitHub Actions

## [0.3.0] - 2022-02-09
### Added
- Add new `--max-time <seconds>` option
- Add new `--ignore-error` option

## [0.2.0] - 2022-02-07
### Added
- Basic Auth authentication has been added

### Changed
- The GitHub Action must specify `username`
- The CLI must specify `--username`
- The CLI shortopt `-u` is an alias for `--username` (and not `--url` as it was in previous versions)

### Removed
- Vercel authentication (password only) has been removed

## [0.1.0] - 2022-01-31
### Added
- Zip non `.zip` files by default. This can be overriden by specifying `zip: false` (GitHub Action) or `--no-zip` (Command Line)

## [0.0.14] - 2022-01-27
### Fixed
- Expand `~` in report globs [#3](https://github.com/SmartBear/one-report-publisher/pull/2)

## [0.0.13] - 2022-01-27
### Fixed
- Fix `--reports` option in CLI [#2](https://github.com/SmartBear/one-report-publisher/pull/2)

## [0.0.12] - 2022-01-26
### Fixed
- Add shebang in CLI

## [0.0.11] - 2022-01-26
### Added
- Added a command-line, making it possible to run with `npx @smartbear/one-report-publisher`

## [0.0.10] - 2022-01-26
### Added
- Made output more verbose when a file can not be published

## [0.0.9] - 2022-01-26
### Added
- Support publication of .zip files
- Support publication of .ndjson files

## [0.0.8] - 2022-01-26
### Fixed
- Put publishing back into test workflow

## [0.0.7] - 2022-01-26
### Fixed
- Extract separate workflow for publishing results

## [0.0.6] - 2022-01-26
### Fixed
- Fix release workflow again

## [0.0.5] - 2022-01-26
### Fixed
- Fix release workflow again

## [0.0.4] - 2022-01-26
### Fixed
- Fix release workflow again

## [0.0.3] - 2022-01-26
### Fixed
- Fix release workflow again

## [0.0.2] - 2022-01-26
### Fixed
- Fix release workflow

## [0.0.1] - 2022-01-26
### Added
- First release

[Unreleased]: https://github.com/smartbear/one-report-publisher/compare/v0.8.0...HEAD
[0.8.0]: https://github.com/smartbear/one-report-publisher/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/smartbear/one-report-publisher/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/smartbear/one-report-publisher/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/smartbear/one-report-publisher/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/smartbear/one-report-publisher/compare/v0.3.2...v0.4.0
[0.3.2]: https://github.com/smartbear/one-report-publisher/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/smartbear/one-report-publisher/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/smartbear/one-report-publisher/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/smartbear/one-report-publisher/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/smartbear/one-report-publisher/compare/v0.0.14...v0.1.0
[0.0.14]: https://github.com/smartbear/one-report-publisher/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/smartbear/one-report-publisher/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/smartbear/one-report-publisher/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/smartbear/one-report-publisher/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/smartbear/one-report-publisher/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/smartbear/one-report-publisher/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/smartbear/one-report-publisher/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/smartbear/one-report-publisher/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/smartbear/one-report-publisher/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/smartbear/one-report-publisher/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/smartbear/one-report-publisher/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/smartbear/one-report-publisher/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/smartbear/one-report-publisher/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/smartbear/one-report-publisher/compare/f2861360b67450d42e32f0e6708ea6aa795688d1...v0.0.1

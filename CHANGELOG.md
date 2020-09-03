# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.2.0] - 2017-09-03
### Added
- Added support for x-cloak to avoid flickering when navigating to cached versions

### Changed
- Update CDN link to use npm
- *BC*: Order of import is now relevant. Script should go before Alpine Js.

## [v0.1.4] - 2017-08-29
### Fixed
- (Internal) Previous version was wrong on npm

## [v0.1.3] - 2017-08-29
### Fixed
- Mutation observer didn't restart correctly after the turbolinks:load event, causing issues with Livewire for some use cases

## [v0.1.2] - 2017-08-15
### Fixed
- When using x-for and navigating back to the page using the browser history, all sibling elements (same parent) after a template tag were erroneously removed.

## [v0.1.1] - 2017-08-15
### Added
- Documentation for Npm

## [v0.1.0] - 2017-06-23
### Added
- Initial Release

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.2.0...HEAD
[v0.2.0]: https://github.com/SimoTod/alpine-turbolinks-adapter/compare/v0.1.4...v0.2.0
[v0.1.4]: https://github.com/SimoTod/alpine-turbolinks-adapter/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/SimoTod/alpine-turbolinks-adapter/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/SimoTod/alpine-turbolinks-adapter/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/SimoTod/alpine-turbolinks-adapter/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/SimoTod/alpine-turbolinks-adapter/releases/tag/v0.1.0

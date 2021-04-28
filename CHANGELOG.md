# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.3] - 2021-04-28

### Fixed

-   Fixed Alpine components not initialising after 4xx-5xx responses when submitting forms

## [v1.0.2] - 2021-03-05

### Changed

-   x-cloak will now preserve the custom attribute value when specified

## [v1.0.1] - 2021-01-02

### Fixed

-   Typo in documentation

## [v1.0.0] - 2021-01-02

### Added

-   Added support for hotwired/turbo

### Changed

-   Renamed project from alpine-turbolinks-adapter to alpine-turbo-drive-adapter

## [v0.3.0] - 2020-09-27

### Added

-   Added support for legacy browsers (e.g. IE11)

## [v0.2.1] - 2020-09-07

### Fixed

-   Fixed bug when using Livewire+Turbolink causing the mutation observer not to start in certain scenarios

## [v0.2.0] - 2020-09-03

### Added

-   Added support for x-cloak to avoid flickering when navigating to cached versions

### Changed

-   Update CDN link to use npm
-   _BC_: Order of import is now relevant. Script should go before Alpine Js.

## [v0.1.4] - 2020-08-29

### Fixed

-   (Internal) Previous version was wrong on npm

## [v0.1.3] - 2020-08-29

### Fixed

-   Mutation observer didn't restart correctly after the turbolinks:load event, causing issues with Livewire for some use cases

## [v0.1.2] - 2020-08-15

### Fixed

-   When using x-for and navigating back to the page using the browser history, all sibling elements (same parent) after a template tag were erroneously removed.

## [v0.1.1] - 2020-08-15

### Added

-   Documentation for Npm

## [v0.1.0] - 2020-06-23

### Added

-   Initial Release

[Unreleased]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v1.0.3...HEAD

[v1.0.3]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v1.0.2...v1.0.3

[v1.0.2]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v1.0.1...v1.0.2

[v1.0.1]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v1.0.0...v1.0.1

[v1.0.0]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.3.0...v1.0.0

[v0.3.0]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.2.1...v0.3.0

[v0.2.1]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.2.0...v0.2.1

[v0.2.0]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.1.4...v0.2.0

[v0.1.4]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.1.3...v0.1.4

[v0.1.3]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.1.2...v0.1.3

[v0.1.2]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.1.1...v0.1.2

[v0.1.1]: https://github.com/SimoTod/alpine-turbo-drive-adapter/compare/v0.1.0...v0.1.1

[v0.1.0]: https://github.com/SimoTod/alpine-turbo-drive-adapter/releases/tag/v0.1.0

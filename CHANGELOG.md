## [1.0.0-beta.10](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-05-29)


### :compass: API Documentation Changes

* **toBeMultiLineStringGeometry:** add the min point count error to the JSDoc API ([01f6c4b](https://github.com/M-Scott-Lassiter/jest-geojson/commit/01f6c4b59f5a15a4edc8fddecc74bcdf845c367e))


### :dart: Test Changes

* **toBeMultiLineStringGeometry:** fix coordinate out of range test that ([d6fe2ac](https://github.com/M-Scott-Lassiter/jest-geojson/commit/d6fe2ac0bf70b1c2d2bf22b7cf227ecfabb85a34))
* **toBeMultiPointGeometry:** fix typo in test and core function that was omitting coverage ([bc10f4e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/bc10f4e64fc6ac443dc9f0b7ac615843408a21ff))


### :gift: Feature Changes

* **toBePolygonGeometry:** add new matcher ([3b9d18d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/3b9d18d33342bfc933c232cc28d83dbf4e541d32)), closes [#13](https://github.com/M-Scott-Lassiter/jest-geojson/issues/13)

## [1.0.0-beta.9](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-05-28)


### :dart: Test Changes

* **toBeLineStringGeometry:** add a stress test with many points ([22df5c7](https://github.com/M-Scott-Lassiter/jest-geojson/commit/22df5c7fafe6f6a7db34c46dbbfdb56c505edbb7))


### :lady_beetle: Bug Fixes

* **toBeLineStringGeometry:** prohibit single coordinate in "coordinates" member ([ee5de52](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ee5de52c9e3e6fecd6c5aa99b9fc8ded0604884b)), closes [/datatracker.ietf.org/doc/html/rfc7946#section-3](https://github.com/M-Scott-Lassiter//datatracker.ietf.org/doc/html/rfc7946/issues/section-3) [#11](https://github.com/M-Scott-Lassiter/jest-geojson/issues/11)


### :gift: Feature Changes

* **toBeMultiLineStringGeometry:** add new matcher ([3d3a15e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/3d3a15e30b776bbcb44b906b7a0bac900d9367a6)), closes [#12](https://github.com/M-Scott-Lassiter/jest-geojson/issues/12)

## [1.0.0-beta.8](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-05-27)


### :gift: Feature Changes

* **toBeLineStringGeometry:** add new matcher ([54416a5](https://github.com/M-Scott-Lassiter/jest-geojson/commit/54416a5749b81120a618b8b472e1862e720f4108)), closes [#11](https://github.com/M-Scott-Lassiter/jest-geojson/issues/11)


### :compass: API Documentation Changes

* change JSDoc param types to avoid using GeoJSON unknown types ([06ac03a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/06ac03a6d8c7c274a17e80c22ebf5d623bf48f06))

## [1.0.0-beta.7](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2022-05-26)


### :gift: Feature Changes

* **toBeMultiPointGeometry:** add new matcher ([9a12752](https://github.com/M-Scott-Lassiter/jest-geojson/commit/9a12752ad0d28451562f9499b991e42b388831f6)), closes [#10](https://github.com/M-Scott-Lassiter/jest-geojson/issues/10)

## [1.0.0-beta.6](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-05-26)


### :gift: Feature Changes

* **toBePointGeometry:** add new matcher ([9973afa](https://github.com/M-Scott-Lassiter/jest-geojson/commit/9973afa52ec4ae81dde8976277bc9d0b95aef26b)), closes [#9](https://github.com/M-Scott-Lassiter/jest-geojson/issues/9)

## [1.0.0-beta.5](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-05-25)


### :compass: API Documentation Changes

* update JSDoc descriptions of coordinate core functions ([f5658f3](https://github.com/M-Scott-Lassiter/jest-geojson/commit/f5658f3a981aea534514d7457a6cf281c8fbe45c))
* **isValidCoordinate:** update returns description ([70bd43e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/70bd43eba7bc1ebde699a36e351ae92307416ba0))
* **isValidCoordinate:** update the error and parameter descriptions ([7e3e8ed](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7e3e8ed9e8603d8295ee77f4391dd3fe4077af91))


### :gift: Feature Changes

* **isValidBoundingBox:** add new matcher ([9a8b7ed](https://github.com/M-Scott-Lassiter/jest-geojson/commit/9a8b7ed39381e61a51c8d27878ff3b47a6a92c2a)), closes [#8](https://github.com/M-Scott-Lassiter/jest-geojson/issues/8)

## [1.0.0-beta.4](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-05-25)


### :building_construction: Build Changes

* **package:** add entry points for all, boundingboxes, and coordinates ([8c1d312](https://github.com/M-Scott-Lassiter/jest-geojson/commit/8c1d312d01d2c74e969a6598e11a44a3f5255113))


### :gift: Feature Changes

* **isValid2DBoundingBox:** add new matcher function ([7fe56f3](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7fe56f359d4f87bc1b6aa709498e5c316e58bce2)), closes [#6](https://github.com/M-Scott-Lassiter/jest-geojson/issues/6)
* **isValid3DBoundingBox:** add new matcher ([6ee8cc6](https://github.com/M-Scott-Lassiter/jest-geojson/commit/6ee8cc6b9ce57b72cb20eaa9a044279ee289d741)), closes [#7](https://github.com/M-Scott-Lassiter/jest-geojson/issues/7)


### :dart: Test Changes

* **isValid2DBoundingBox:** fix typo in test descriptions ([df94c27](https://github.com/M-Scott-Lassiter/jest-geojson/commit/df94c276b2932046d133a6e2e2cecce88f43f9b3))


### :compass: API Documentation Changes

* update JSDoc organization ([7ab7eca](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7ab7eca06bbc67acde85a7f7d06fac4388a1c953))

## [1.0.0-beta.3](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-05-24)


### :gift: Feature Changes

* split package exports into matcher and core functionality ([a7340d9](https://github.com/M-Scott-Lassiter/jest-geojson/commit/a7340d9cd0f57a207322941a6abc8a8f1524c1b0)), closes [#5](https://github.com/M-Scott-Lassiter/jest-geojson/issues/5)

## [1.0.0-beta.2](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-05-24)


### :building_construction: Build Changes

* move release configuration into a separate shareable file ([fa6e50d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/fa6e50d8b3facad9902d749fb69adcc45ba734fe))
* **package:** update the commitizen config for customized scopes ([ac05626](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ac05626a146717f0b7b64a7f34d5e269f593b652))


### :gift: Feature Changes

* **isValidCoordinate:** add new matcher function ([d7e5b70](https://github.com/M-Scott-Lassiter/jest-geojson/commit/d7e5b70ae19d2a2285af6a49414f4d552dc2c374)), closes [#4](https://github.com/M-Scott-Lassiter/jest-geojson/issues/4)

## 1.0.0-beta.1 (2022-05-19)


### :dart: Test Changes

* setup the project testing framework ([6a95c37](https://github.com/M-Scott-Lassiter/jest-geojson/commit/6a95c376de7c38cbee76679d88e997f8e64a245d))


### :gift: Feature Changes

* **isValid2DCoordinate:** add new matcher function ([527bbc4](https://github.com/M-Scott-Lassiter/jest-geojson/commit/527bbc463c64e30546ff8def60776a07165adc64)), closes [#1](https://github.com/M-Scott-Lassiter/jest-geojson/issues/1)
* **isValid3DCoordinate:** add new matcher function ([0329231](https://github.com/M-Scott-Lassiter/jest-geojson/commit/0329231078764b5f031fb307a882b6d371cf9c9d)), closes [#2](https://github.com/M-Scott-Lassiter/jest-geojson/issues/2)


### :building_construction: Build Changes

* add conventional-changelog-conventionalcommits as dev dependency ([7361d79](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7361d796a713e5c19aefe5b9fb4fab07189d1089)), closes [#3](https://github.com/M-Scott-Lassiter/jest-geojson/issues/3)
* setup initial project environment ([b468a41](https://github.com/M-Scott-Lassiter/jest-geojson/commit/b468a418918737be357a957e920f3a9140c7c872))

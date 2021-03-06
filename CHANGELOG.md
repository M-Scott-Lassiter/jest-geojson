## [1.6.0](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.5.0...v1.6.0) (2022-06-12)


### :compass: API Documentation Changes

* **toHaveGeometryCount:** improve error messages and description for nested GeometryCollections behavior ([01fe745](https://github.com/M-Scott-Lassiter/jest-geojson/commit/01fe745a8880d097fefc029a44bdde58e7bd872d))


### :lady_beetle: Bug Fixes

* **toHaveGeometryCount:** correct issue where empty collections would fail when provided with a valid range ([93dadff](https://github.com/M-Scott-Lassiter/jest-geojson/commit/93dadff88e1f7aba0102696960efc35257a54e2d)), closes [#58](https://github.com/M-Scott-Lassiter/jest-geojson/issues/58)


### :gift: Feature Changes

* **toHaveMaxGeometryCount:** add new matcher ([8a1f103](https://github.com/M-Scott-Lassiter/jest-geojson/commit/8a1f103e13a5cf1ec423cc6e769ef007b78227dd)), closes [#47](https://github.com/M-Scott-Lassiter/jest-geojson/issues/47)
* **toHaveMinGeometryCount:** add new matcher ([c71c21a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/c71c21af35fc4d7d167f2b5757610e56620a3fff)), closes [#45](https://github.com/M-Scott-Lassiter/jest-geojson/issues/45)

## [1.5.0](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.4.0...v1.5.0) (2022-06-11)


### :gift: Feature Changes

* **toHaveGeometryCount:** add new matcher ([b4bff1c](https://github.com/M-Scott-Lassiter/jest-geojson/commit/b4bff1c21213e86fde3e56f05a71f76b1120956e)), closes [#48](https://github.com/M-Scott-Lassiter/jest-geojson/issues/48)

## [1.4.0](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.3.0...v1.4.0) (2022-06-10)


### :gift: Feature Changes

* **toBeMultiPolygonWithHole:** add new matcher ([6668a1b](https://github.com/M-Scott-Lassiter/jest-geojson/commit/6668a1be664d1873958cde50e6ad7b0d76bd646f)), closes [#44](https://github.com/M-Scott-Lassiter/jest-geojson/issues/44)
* **toBePolygonWithHole:** add new matcher ([3eb435c](https://github.com/M-Scott-Lassiter/jest-geojson/commit/3eb435c518df590543a59cc4816d2ac9714ee9a5)), closes [#43](https://github.com/M-Scott-Lassiter/jest-geojson/issues/43)
* add Typescript support for the matchers ([602c33b](https://github.com/M-Scott-Lassiter/jest-geojson/commit/602c33bc11b58f831a2994e14da4e4ad5910e739)), closes [#42](https://github.com/M-Scott-Lassiter/jest-geojson/issues/42)

## [1.3.0](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.2.0...v1.3.0) (2022-06-08)


### :gift: Feature Changes

* **toHaveNumericID:** add new matcher ([56e3e4c](https://github.com/M-Scott-Lassiter/jest-geojson/commit/56e3e4c5c2c79aec9380ab82ad525f3d0efa9c47)), closes [#38](https://github.com/M-Scott-Lassiter/jest-geojson/issues/38)
* **toHaveStringID:** add new matcher ([cefddd6](https://github.com/M-Scott-Lassiter/jest-geojson/commit/cefddd674204402299f569bfbb2df21287a2c8e9)), closes [#37](https://github.com/M-Scott-Lassiter/jest-geojson/issues/37)

## [1.2.0](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.1.0...v1.2.0) (2022-06-07)


### :gift: Feature Changes

* **toHaveID:** add new matcher ([5bae7f0](https://github.com/M-Scott-Lassiter/jest-geojson/commit/5bae7f042d79c7e01ab2189792def2d7e462b285)), closes [#36](https://github.com/M-Scott-Lassiter/jest-geojson/issues/36)


### :compass: API Documentation Changes

* **toHaveID:** fix documentation typo. ([c0f731b](https://github.com/M-Scott-Lassiter/jest-geojson/commit/c0f731bc8625df4ab49772e11cefa8342ee84d64))

## [1.1.0](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0...v1.1.0) (2022-06-04)


### :gift: Feature Changes

* **toBeValidGeoJSON:** add new matcher ([bf67420](https://github.com/M-Scott-Lassiter/jest-geojson/commit/bf67420c415df5a0762ad428e5ad58faca52e017)), closes [#26](https://github.com/M-Scott-Lassiter/jest-geojson/issues/26)

## 1.0.0 (2022-06-02)


### :compass: API Documentation Changes

* **toBeMultiLineStringGeometry:** add the min point count error to the JSDoc API ([01f6c4b](https://github.com/M-Scott-Lassiter/jest-geojson/commit/01f6c4b59f5a15a4edc8fddecc74bcdf845c367e))
* change JSDoc param types to avoid using GeoJSON unknown types ([06ac03a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/06ac03a6d8c7c274a17e80c22ebf5d623bf48f06))
* **all:** cleanup JSDoc formatting and standardize API examples ([300a96d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/300a96d7798e4cd3918dbd2248619da5b541f0a6))
* update JSDoc descriptions of coordinate core functions ([f5658f3](https://github.com/M-Scott-Lassiter/jest-geojson/commit/f5658f3a981aea534514d7457a6cf281c8fbe45c))
* update JSDoc organization ([7ab7eca](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7ab7eca06bbc67acde85a7f7d06fac4388a1c953))
* **isValidCoordinate:** update returns description ([70bd43e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/70bd43eba7bc1ebde699a36e351ae92307416ba0))
* **isValidCoordinate:** update the error and parameter descriptions ([7e3e8ed](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7e3e8ed9e8603d8295ee77f4391dd3fe4077af91))


### :lady_beetle: Bug Fixes

* add bounding box validity checking to geometry core functions and matchers ([ac6a9a1](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ac6a9a10615cf8e66aed01e63032d03ba5e4aa95)), closes [/datatracker.ietf.org/doc/html/rfc7946#section-5](https://github.com/M-Scott-Lassiter//datatracker.ietf.org/doc/html/rfc7946/issues/section-5) [#9](https://github.com/M-Scott-Lassiter/jest-geojson/issues/9) [#10](https://github.com/M-Scott-Lassiter/jest-geojson/issues/10) [#11](https://github.com/M-Scott-Lassiter/jest-geojson/issues/11) [#12](https://github.com/M-Scott-Lassiter/jest-geojson/issues/12) [#13](https://github.com/M-Scott-Lassiter/jest-geojson/issues/13) [#14](https://github.com/M-Scott-Lassiter/jest-geojson/issues/14) [#16](https://github.com/M-Scott-Lassiter/jest-geojson/issues/16) [#29](https://github.com/M-Scott-Lassiter/jest-geojson/issues/29)
* **toBeLineStringGeometry:** prohibit single coordinate in "coordinates" member ([ee5de52](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ee5de52c9e3e6fecd6c5aa99b9fc8ded0604884b)), closes [/datatracker.ietf.org/doc/html/rfc7946#section-3](https://github.com/M-Scott-Lassiter//datatracker.ietf.org/doc/html/rfc7946/issues/section-3) [#11](https://github.com/M-Scott-Lassiter/jest-geojson/issues/11)


### :dart: Test Changes

* add 'Feature' and 'FeatureCollection' to test list of disallowed geometry type values ([f139a09](https://github.com/M-Scott-Lassiter/jest-geojson/commit/f139a09c47df09d0ccd5c71b67ad07fbb566ba6e))
* **toBeLineStringGeometry:** add a stress test with many points ([22df5c7](https://github.com/M-Scott-Lassiter/jest-geojson/commit/22df5c7fafe6f6a7db34c46dbbfdb56c505edbb7))
* **toBeGeometryCollection:** add an unrecognizable geometry to the invalid tests ([5c041c6](https://github.com/M-Scott-Lassiter/jest-geojson/commit/5c041c66c7b3c67858cc622533e466c707299166))
* **toBeGeometryCollection:** add robust snapshot tests, verify coordinates treated as foreign member ([472d12d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/472d12d92db9f4e799d7ea8e66e603553f133831)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32) [#33](https://github.com/M-Scott-Lassiter/jest-geojson/issues/33)
* **isValid2DBoundingBox:** add robust snapshot tests ([4363710](https://github.com/M-Scott-Lassiter/jest-geojson/commit/4363710e8718ceb832882ac3f48ad6559ff85806)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValid2DCoordinate:** add robust snapshot tests ([ae92f67](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ae92f67fcee3f5a81e8f829c549f59acbde7adab)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValid3DBoundingBox:** add robust snapshot tests ([a37ec48](https://github.com/M-Scott-Lassiter/jest-geojson/commit/a37ec485e8d2b32498c053c0252504011cb3adfc)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValid3DCoordinate:** add robust snapshot tests ([56fbf92](https://github.com/M-Scott-Lassiter/jest-geojson/commit/56fbf921bbabf6f4ee9c99f84c83ab85b7fff180)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValidBoundingBox:** add robust snapshot tests ([063b94e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/063b94ec11198675684b52a7acfcf0303b2e5db3)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValidCoordinate:** add robust snapshot tests ([7b4a804](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7b4a8040ba2c028d07451567929b07e99fd496c4)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeAnyGeometry:** add robust snapshot tests ([8a6e611](https://github.com/M-Scott-Lassiter/jest-geojson/commit/8a6e61190e0c54752504590a56128c6d874f693b)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeLineStringGeometry:** add robust snapshot tests ([cfaed46](https://github.com/M-Scott-Lassiter/jest-geojson/commit/cfaed46a9480ef542dc7cb2b9c66be0c31469d24)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiLineStringGeometry:** add robust snapshot tests ([57dc767](https://github.com/M-Scott-Lassiter/jest-geojson/commit/57dc7674baa69db9d83150dc85122b5b29b46753)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiPointGeometry:** add robust snapshot tests ([36013e1](https://github.com/M-Scott-Lassiter/jest-geojson/commit/36013e114b2929f43a38d44e448e5aa1092d4327)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiPolygonGeometry:** add robust snapshot tests ([df1c23a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/df1c23af95ed197da9b4fb83180960d99326519f)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBePointGeometry:** add robust snapshot tests ([fd5c516](https://github.com/M-Scott-Lassiter/jest-geojson/commit/fd5c5169e6bd8201a0cc25abc1a22452962debee)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBePolygonGeometry:** add robust snapshot tests ([1c9df69](https://github.com/M-Scott-Lassiter/jest-geojson/commit/1c9df6962f49430aeb2d55983d5d833dfbdd8170)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiLineStringGeometry:** fix coordinate out of range test that ([d6fe2ac](https://github.com/M-Scott-Lassiter/jest-geojson/commit/d6fe2ac0bf70b1c2d2bf22b7cf227ecfabb85a34))
* **toBeMultiPointGeometry:** fix typo in test and core function that was omitting coverage ([bc10f4e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/bc10f4e64fc6ac443dc9f0b7ac615843408a21ff))
* **isValid2DBoundingBox:** fix typo in test descriptions ([df94c27](https://github.com/M-Scott-Lassiter/jest-geojson/commit/df94c276b2932046d133a6e2e2cecce88f43f9b3))
* setup the project testing framework ([6a95c37](https://github.com/M-Scott-Lassiter/jest-geojson/commit/6a95c376de7c38cbee76679d88e997f8e64a245d))


### :gift: Feature Changes

* **isValid2DBoundingBox:** add new matcher function ([7fe56f3](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7fe56f359d4f87bc1b6aa709498e5c316e58bce2)), closes [#6](https://github.com/M-Scott-Lassiter/jest-geojson/issues/6)
* **isValid2DCoordinate:** add new matcher function ([527bbc4](https://github.com/M-Scott-Lassiter/jest-geojson/commit/527bbc463c64e30546ff8def60776a07165adc64)), closes [#1](https://github.com/M-Scott-Lassiter/jest-geojson/issues/1)
* **isValid3DCoordinate:** add new matcher function ([0329231](https://github.com/M-Scott-Lassiter/jest-geojson/commit/0329231078764b5f031fb307a882b6d371cf9c9d)), closes [#2](https://github.com/M-Scott-Lassiter/jest-geojson/issues/2)
* **isValidCoordinate:** add new matcher function ([d7e5b70](https://github.com/M-Scott-Lassiter/jest-geojson/commit/d7e5b70ae19d2a2285af6a49414f4d552dc2c374)), closes [#4](https://github.com/M-Scott-Lassiter/jest-geojson/issues/4)
* **isValid3DBoundingBox:** add new matcher ([6ee8cc6](https://github.com/M-Scott-Lassiter/jest-geojson/commit/6ee8cc6b9ce57b72cb20eaa9a044279ee289d741)), closes [#7](https://github.com/M-Scott-Lassiter/jest-geojson/issues/7)
* **isValidBoundingBox:** add new matcher ([9a8b7ed](https://github.com/M-Scott-Lassiter/jest-geojson/commit/9a8b7ed39381e61a51c8d27878ff3b47a6a92c2a)), closes [#8](https://github.com/M-Scott-Lassiter/jest-geojson/issues/8)
* **toBeAnyGeometry:** add new matcher ([ed7c3eb](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ed7c3ebf567f033998d88a4b963f16abaecfc1db)), closes [#15](https://github.com/M-Scott-Lassiter/jest-geojson/issues/15)
* **toBeFeature:** add new matcher ([551aa7f](https://github.com/M-Scott-Lassiter/jest-geojson/commit/551aa7f3b3875eb5fd9c0b184051ccc286bdfb0f)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32) [#24](https://github.com/M-Scott-Lassiter/jest-geojson/issues/24)
* **toBeFeatureCollection:** add new matcher ([21fe044](https://github.com/M-Scott-Lassiter/jest-geojson/commit/21fe044425d4d747ff22434c96898cd3173446fe)), closes [#25](https://github.com/M-Scott-Lassiter/jest-geojson/issues/25)
* **toBeGeometryCollection:** add new matcher ([63cc919](https://github.com/M-Scott-Lassiter/jest-geojson/commit/63cc919d4afaa257b1dd881af1b513c6bc6d66ee)), closes [#16](https://github.com/M-Scott-Lassiter/jest-geojson/issues/16)
* **toBeLineStringGeometry:** add new matcher ([54416a5](https://github.com/M-Scott-Lassiter/jest-geojson/commit/54416a5749b81120a618b8b472e1862e720f4108)), closes [#11](https://github.com/M-Scott-Lassiter/jest-geojson/issues/11)
* **toBeMultiLineStringGeometry:** add new matcher ([3d3a15e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/3d3a15e30b776bbcb44b906b7a0bac900d9367a6)), closes [#12](https://github.com/M-Scott-Lassiter/jest-geojson/issues/12)
* **toBeMultiPointGeometry:** add new matcher ([9a12752](https://github.com/M-Scott-Lassiter/jest-geojson/commit/9a12752ad0d28451562f9499b991e42b388831f6)), closes [#10](https://github.com/M-Scott-Lassiter/jest-geojson/issues/10)
* **toBeMultiPolygonGeometry:** add new matcher ([41fef3a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/41fef3a452c2045d976b6603bfe989fd65c346a0)), closes [#14](https://github.com/M-Scott-Lassiter/jest-geojson/issues/14)
* **toBePointGeometry:** add new matcher ([9973afa](https://github.com/M-Scott-Lassiter/jest-geojson/commit/9973afa52ec4ae81dde8976277bc9d0b95aef26b)), closes [#9](https://github.com/M-Scott-Lassiter/jest-geojson/issues/9)
* **toBePolygonGeometry:** add new matcher ([3b9d18d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/3b9d18d33342bfc933c232cc28d83dbf4e541d32)), closes [#13](https://github.com/M-Scott-Lassiter/jest-geojson/issues/13)
* split package exports into matcher and core functionality ([a7340d9](https://github.com/M-Scott-Lassiter/jest-geojson/commit/a7340d9cd0f57a207322941a6abc8a8f1524c1b0)), closes [#5](https://github.com/M-Scott-Lassiter/jest-geojson/issues/5)


### :building_construction: Build Changes

* add conventional-changelog-conventionalcommits as dev dependency ([7361d79](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7361d796a713e5c19aefe5b9fb4fab07189d1089)), closes [#3](https://github.com/M-Scott-Lassiter/jest-geojson/issues/3)
* **package:** add entry points for all, boundingboxes, and coordinates ([8c1d312](https://github.com/M-Scott-Lassiter/jest-geojson/commit/8c1d312d01d2c74e969a6598e11a44a3f5255113))
* move release configuration into a separate shareable file ([fa6e50d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/fa6e50d8b3facad9902d749fb69adcc45ba734fe))
* **package:** rename matcher loader entry script ([5221d6d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/5221d6dc37d1aab39d950436f399d64ba7d1f436))
* setup initial project environment ([b468a41](https://github.com/M-Scott-Lassiter/jest-geojson/commit/b468a418918737be357a957e920f3a9140c7c872))
* **package:** update the commitizen config for customized scopes ([ac05626](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ac05626a146717f0b7b64a7f34d5e269f593b652))
* **devDependencies:** upgrade Jest to v28.1, specify peerDependency at >v24.0.0 ([22d1614](https://github.com/M-Scott-Lassiter/jest-geojson/commit/22d1614710be25eb3d3e1a50a4b3f91bf1c08c45)), closes [#30](https://github.com/M-Scott-Lassiter/jest-geojson/issues/30)
* **package:** upgrade min required Node version to 16 ([58a9824](https://github.com/M-Scott-Lassiter/jest-geojson/commit/58a982495173d771ad309f342a45a7037fd8ad2d))
* **package:** upgrade minimum required node version from 10 to 14 to match LTS schedule ([1e8a8bb](https://github.com/M-Scott-Lassiter/jest-geojson/commit/1e8a8bb3e2c5e91b6b171d0316264c06622f4464))

## [1.0.0-beta.16](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2022-06-02)


### :gift: Feature Changes

* **toBeFeatureCollection:** add new matcher ([21fe044](https://github.com/M-Scott-Lassiter/jest-geojson/commit/21fe044425d4d747ff22434c96898cd3173446fe)), closes [#25](https://github.com/M-Scott-Lassiter/jest-geojson/issues/25)

## [1.0.0-beta.15](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2022-06-02)


### :gift: Feature Changes

* **toBeFeature:** add new matcher ([551aa7f](https://github.com/M-Scott-Lassiter/jest-geojson/commit/551aa7f3b3875eb5fd9c0b184051ccc286bdfb0f)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32) [#24](https://github.com/M-Scott-Lassiter/jest-geojson/issues/24)


### :dart: Test Changes

* add 'Feature' and 'FeatureCollection' to test list of disallowed geometry type values ([f139a09](https://github.com/M-Scott-Lassiter/jest-geojson/commit/f139a09c47df09d0ccd5c71b67ad07fbb566ba6e))
* **toBeGeometryCollection:** add an unrecognizable geometry to the invalid tests ([5c041c6](https://github.com/M-Scott-Lassiter/jest-geojson/commit/5c041c66c7b3c67858cc622533e466c707299166))
* **toBeGeometryCollection:** add robust snapshot tests, verify coordinates treated as foreign member ([472d12d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/472d12d92db9f4e799d7ea8e66e603553f133831)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32) [#33](https://github.com/M-Scott-Lassiter/jest-geojson/issues/33)
* **isValid2DBoundingBox:** add robust snapshot tests ([4363710](https://github.com/M-Scott-Lassiter/jest-geojson/commit/4363710e8718ceb832882ac3f48ad6559ff85806)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValid2DCoordinate:** add robust snapshot tests ([ae92f67](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ae92f67fcee3f5a81e8f829c549f59acbde7adab)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValid3DBoundingBox:** add robust snapshot tests ([a37ec48](https://github.com/M-Scott-Lassiter/jest-geojson/commit/a37ec485e8d2b32498c053c0252504011cb3adfc)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValid3DCoordinate:** add robust snapshot tests ([56fbf92](https://github.com/M-Scott-Lassiter/jest-geojson/commit/56fbf921bbabf6f4ee9c99f84c83ab85b7fff180)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValidBoundingBox:** add robust snapshot tests ([063b94e](https://github.com/M-Scott-Lassiter/jest-geojson/commit/063b94ec11198675684b52a7acfcf0303b2e5db3)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **isValidCoordinate:** add robust snapshot tests ([7b4a804](https://github.com/M-Scott-Lassiter/jest-geojson/commit/7b4a8040ba2c028d07451567929b07e99fd496c4)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeAnyGeometry:** add robust snapshot tests ([8a6e611](https://github.com/M-Scott-Lassiter/jest-geojson/commit/8a6e61190e0c54752504590a56128c6d874f693b)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeLineStringGeometry:** add robust snapshot tests ([cfaed46](https://github.com/M-Scott-Lassiter/jest-geojson/commit/cfaed46a9480ef542dc7cb2b9c66be0c31469d24)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiLineStringGeometry:** add robust snapshot tests ([57dc767](https://github.com/M-Scott-Lassiter/jest-geojson/commit/57dc7674baa69db9d83150dc85122b5b29b46753)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiPointGeometry:** add robust snapshot tests ([36013e1](https://github.com/M-Scott-Lassiter/jest-geojson/commit/36013e114b2929f43a38d44e448e5aa1092d4327)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBeMultiPolygonGeometry:** add robust snapshot tests ([df1c23a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/df1c23af95ed197da9b4fb83180960d99326519f)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBePointGeometry:** add robust snapshot tests ([fd5c516](https://github.com/M-Scott-Lassiter/jest-geojson/commit/fd5c5169e6bd8201a0cc25abc1a22452962debee)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)
* **toBePolygonGeometry:** add robust snapshot tests ([1c9df69](https://github.com/M-Scott-Lassiter/jest-geojson/commit/1c9df6962f49430aeb2d55983d5d833dfbdd8170)), closes [#32](https://github.com/M-Scott-Lassiter/jest-geojson/issues/32)

## [1.0.0-beta.14](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-06-01)


### :lady_beetle: Bug Fixes

* add bounding box validity checking to geometry core functions and matchers ([ac6a9a1](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ac6a9a10615cf8e66aed01e63032d03ba5e4aa95)), closes [#9](https://github.com/M-Scott-Lassiter/jest-geojson/issues/9) [#10](https://github.com/M-Scott-Lassiter/jest-geojson/issues/10) [#11](https://github.com/M-Scott-Lassiter/jest-geojson/issues/11) [#12](https://github.com/M-Scott-Lassiter/jest-geojson/issues/12) [#13](https://github.com/M-Scott-Lassiter/jest-geojson/issues/13) [#14](https://github.com/M-Scott-Lassiter/jest-geojson/issues/14) [#16](https://github.com/M-Scott-Lassiter/jest-geojson/issues/16) [#29](https://github.com/M-Scott-Lassiter/jest-geojson/issues/29)

## [1.0.0-beta.13](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-05-30)


### :gift: Feature Changes

* **toBeGeometryCollection:** add new matcher ([63cc919](https://github.com/M-Scott-Lassiter/jest-geojson/commit/63cc919d4afaa257b1dd881af1b513c6bc6d66ee)), closes [#16](https://github.com/M-Scott-Lassiter/jest-geojson/issues/16)

## [1.0.0-beta.12](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-05-30)


### :gift: Feature Changes

* **toBeAnyGeometry:** add new matcher ([ed7c3eb](https://github.com/M-Scott-Lassiter/jest-geojson/commit/ed7c3ebf567f033998d88a4b963f16abaecfc1db)), closes [#15](https://github.com/M-Scott-Lassiter/jest-geojson/issues/15)


### :compass: API Documentation Changes

* **all:** cleanup JSDoc formatting and standardize API examples ([300a96d](https://github.com/M-Scott-Lassiter/jest-geojson/commit/300a96d7798e4cd3918dbd2248619da5b541f0a6))

## [1.0.0-beta.11](https://github.com/M-Scott-Lassiter/jest-geojson/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-05-30)


### :gift: Feature Changes

* **toBeMultiPolygonGeometry:** add new matcher ([41fef3a](https://github.com/M-Scott-Lassiter/jest-geojson/commit/41fef3a452c2045d976b6603bfe989fd65c346a0)), closes [#14](https://github.com/M-Scott-Lassiter/jest-geojson/issues/14)

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

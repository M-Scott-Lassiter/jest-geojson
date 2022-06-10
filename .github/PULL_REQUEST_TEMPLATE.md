## Proposed Changes

(Describe your changes here to communicate why this pull request should get merged. What does it do, and why?)

## Pull Request Checklist

Please check if your PR fulfills the following requirements:

-   [ ] I have read the [CONTRIBUTING](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/CONTRIBUTING.md) guidelines
-   [ ] My commits follow the [appropriate guidance](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/CONTRIBUTING.md#commits)
-   [ ] I certify that I have the appropriate permissions to add these changes to the repository

## New Matcher Submission Checklist

-   [ ] Open an issue with detailed description of the purpose and required behavior
-   <u>Create Core Function (If Applicable)</u>
    -   [ ] Create a core function under `src/core/<category>`
    -   [ ] Register the core function in `src/core.js`
    -   [ ] Add a verification test to `tests/core.test.js`
    -   [ ] Document the function using JSDoc. Refer to the issue. Include good and bad examples.
-   <u>Create Matcher Function</u>
    -   [ ] Create a matcher function under `src/matchers/<category>`
    -   [ ] Register the matcher in `src/matchers.js`
    -   [ ] Add a verification test to `tests/matchers.test.js`
    -   [ ] Add the matcher to `src/index.d.ts`
    -   [ ] Add the matcher to the `.cz-config.js` list (alphabetical order under the `allMatchers` variable)
    -   [ ] Document the matcher using JSDoc. Refer to the issue. Include good and bad examples.
-   [ ] Create a test for the matcher under `tests/<category>`
-   [ ] Verify all tests pass and have 100% coverage
-   [ ] Add the matcher to the README.md list (alphabetical order within category)
-   [ ] Run the `build` script locally

Issues Addressed: (e.g. #1, #5, #22)

## Other Information

Any other information important to this PR.

## Proposed Changes

(Describe your changes here to communicate why this pull request should get merged. What does it do, and why?)

## Pull Request Checklist

Please check if your PR fulfills the following requirements:

-   [ ] I have read the [CONTRIBUTING](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/CONTRIBUTING.md) guidelines
-   [ ] My commits follow the [appropriate guidance](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/CONTRIBUTING.md#commits)
-   [ ] I certify that I have the appropriate permissions to add these changes to the repository
-   [ ] An issue is open for the changes proposed

## Non-Matcher Checklist

-   [ ] I have added/updated tests for new code changes (if applicable)
-   [ ] Documentation has been added/updated (if applicable)
-   [ ] I built (`npm run build`) locally and pushed all changes

## New Matcher Checklist

-   <u>Create Core Function</u>
    -   [ ] Create a core function under `src/core/<category>`
    -   [ ] Document the function using JSDoc. Refer to the issue.
    -   [ ] Register the core function in `src/core.js`
-   <u>Create Matcher Function</u>
    -   [ ] Create a matcher function under `src/matchers/<category>`
    -   [ ] Document the matcher using JSDoc. Refer to the issue.
    -   [ ] Register the matcher in `src/matchers.js`
-   <u>Add Testing</u>
    -   [ ] Create a test for the matcher under `tests/<category>`
    -   [ ] Add a test to `tests/core.test.js`
    -   [ ] Add a test to `matchers.test.js`
    -   [ ] Verify all tests pass and have 100% coverage
-   <u>Setup</u>
    -   [ ] Register the matcher under `src/setup/all.js`
    -   [ ] Register the matcher under `src/setup/<category>.js`
-   [ ] Add the matcher to the README.md list (alphabetical order within category)
-   [ ] I built (`npm run build`) locally and pushed all changes

Issues Addressed: (e.g. #1, #5, #22)

## Other Information

Any other information important to this PR.

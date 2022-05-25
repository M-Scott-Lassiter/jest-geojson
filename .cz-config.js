// When adding new matchers, place them in alphabetical order inside the appropriate category

const coordinateMatchers = [
    { name: 'isValid2DBoundingBox' },
    { name: 'isValid2DCoordinate' },
    { name: 'isValid3DCoordinate' },
    { name: 'isValidCoordinate' }
]

const boundingBoxMatchers = []

const geometryMatchers = []

const geometryCollectionMatchers = []

const featureMatchers = []

const featureCollectionMatchers = []

const functionalMatchers = []

const allMatchers = [
    ...coordinateMatchers,
    ...boundingBoxMatchers,
    ...geometryMatchers,
    ...geometryCollectionMatchers,
    ...featureMatchers,
    ...featureCollectionMatchers,
    ...functionalMatchers
]

const documentationScopes = [
    { name: 'contributing' },
    { name: 'code of conduct' },
    { name: 'license' },
    { name: 'readme' },
    { name: 'security' }
]

module.exports = {
    types: [
        {
            value: 'api',
            name: 'api:      Non-functional changes to code API documentation that help other developers understand how to use a tool or feature (i.e. intellisense)'
        },
        {
            value: 'build',
            name: 'build:    Changes that affect the build system configuration, package scripts, or dev dependencies (i.e. adds/remove/modify/update)'
        },
        {
            value: 'ci',
            name: 'ci:       Changes to CI configuration files and scripts (e.g. release configs, YAML scripts)'
        },
        { value: 'docs', name: 'docs:     Documentation only changes' },
        { value: 'feat', name: 'feat:     Adds a new feature' },
        {
            value: 'fix',
            name: 'fix:      Fixes a bug in an existing feature. Also used for non-dev dependency updates.'
        },
        {
            value: 'perf',
            name: 'perf:     A code change that improves performance'
        },
        {
            value: 'refactor',
            name: 'refactor: A code change that neither fixes a bug nor adds a feature'
        },
        { value: 'revert', name: 'revert:   Revert to a commit' },
        { value: 'test', name: 'test:     Add missing tests or correct existing tests' }
    ],

    scopes: [...allMatchers, ...documentationScopes],

    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'TICKET-',
    ticketNumberRegExp: '\\d{1,5}',

    // it needs to match the value for field type. Eg.: 'fix'
    scopeOverrides: {
        api: allMatchers,
        ci: [{ name: 'publish' }, { name: 'test' }, { name: 'hooks' }, { name: 'templates' }],
        build: [
            { name: 'dependencies' },
            { name: 'devDependencies' },
            { name: 'scripts' },
            { name: 'package' }
        ],
        docs: documentationScopes,
        feat: allMatchers,
        fix: allMatchers,
        perf: allMatchers,
        refactor: allMatchers,
        test: allMatchers
    },

    // override the messages, defaults are as follows
    messages: {
        type: "Select the type of change that you're committing:",
        scope: '\nDenote the SCOPE of this change (optional):',
        // used if allowCustomScopes is true
        customScope: 'Denote the SCOPE of this change:',
        subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
        body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
        breaking: 'List any BREAKING CHANGES (optional):\n',
        footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?'
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    // skip any questions you want
    // skipQuestions: ['body'],

    // limit subject length
    subjectLimit: 100,
    breaklineChar: '|', // It is supported for fields body and footer.
    footerPrefix: 'Resolves:'
    // askForBreakingChangeFirst : true, // default is false
}

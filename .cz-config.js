module.exports = {
    types: [
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

    scopes: [
        { name: 'api' },
        { name: 'contributing' },
        { name: 'license' },
        { name: 'readme' },
        { name: 'security' }
    ],

    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'TICKET-',
    ticketNumberRegExp: '\\d{1,5}',

    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
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
    // breaklineChar: '|', // It is supported for fields body and footer.
    footerPrefix: 'Resolves:'
    // askForBreakingChangeFirst : true, // default is false
}

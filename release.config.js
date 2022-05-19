module.exports = {
    branches: ['main', 'next', { name: 'beta', channel: 'beta', prerelease: true }],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'angular',
                releaseRules: [{ scope: 'api', release: 'patch' }]
            }
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                presetConfig: {
                    types: [
                        {
                            type: 'build',
                            section: ':building_construction: Build Changes',
                            hidden: false
                        },
                        { type: 'ci', hidden: true },
                        { type: 'docs', hidden: true },
                        { type: 'feat', section: ':gift: Feature Changes', hidden: false },
                        { type: 'fix', section: ':lady_beetle: Bug Fixes', hidden: false },
                        {
                            type: 'perf',
                            section: ':fast_forward: Performance Improvements',
                            hidden: false
                        },
                        { type: 'refactor', hidden: true },
                        { type: 'test', section: ':dart: Test Changes', hidden: false }
                    ]
                },
                writerOpts: {
                    commitsSort: ['subject', 'scope']
                }
            }
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md'
            }
        ],
        '@semantic-release/npm',
        ['@semantic-release/github'],
        [
            '@semantic-release/git',
            {
                assets: [
                    'index.js',
                    'README.md',
                    'API.md',
                    'CHANGELOG.md',
                    'CONTRIBUTING.md',
                    'LICENSE',
                    'package.json',
                    'package-lock.json'
                ],
                // eslint-disable-next-line no-template-curly-in-string
                message: 'docs: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}' // These variables are used in the CD script by semantic-release
            }
        ]
    ],
    preset: 'angular'
}

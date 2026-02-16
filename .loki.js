module.exports = {
    configurations: {
        'chrome.docker': {
            target: 'chrome.docker',
            storybookUrl: 'http://host.docker.internal:6006',
            chromeFlags: ['--no-sandbox', '--disable-gpu', '--headless'],
        },
    },
};
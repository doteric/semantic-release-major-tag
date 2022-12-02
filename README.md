# semantic-release-major-tag

A package for [semantic-release](https://github.com/semantic-release/semantic-release) that creates or updates the major tag (`v2` for example) for you depending on the release version. The plugin works only on the `success` step of `semantic-release`.

## Why?

Motivation: https://github.com/semantic-release/semantic-release/issues/1515

## Setup

1. Install

```
npm install --save-dev semantic-release-major-tag
# or
yarn add -D semantic-release-major-tag
```

2. Include the plugin inside the `plugins` section of the `semantic-release` configuration.

```
{
  "plugins": [
    // ...
    "semantic-release-major-tag",
    // ...
  ]
}
```

## Settings

`customTags` (optional, defaults to `[v${major}]`) - An array of the tags format to be created.  
Use `${major}`, `${minor}` or `${patch}` as strings to specify where you would like the specific version number to be present.

Example:

```
{
  "plugins": [
    // ...
    ["semantic-release-major-tag", {
      "customTags": ["v${major}-example", "example-${major}.${minor}"],
    }],
    // ...
  ]
}
```

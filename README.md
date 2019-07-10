# xlsx-props

Manupulate Excel workbook properties.

## Features

- List workbook properties
- Remove workbook properties

## Installation

WIP

```sh
git clone https://github.com/m5d215/xlsx-props.git
cd xlsx-props
yarn install
yarn build
export PATH=$PATH:$PWD/build
```

## Usage

```sh
$ xlsx-props ls personal.xlsx
[
  {
    "name": "dc:creator",
    "attributes": {},
    "children": [
      "m5d215" ⚠️ EXPOSED!!
    ]
  },
  ...
]

$ xlsx-props rm personal.xlsx anonymous.xlsx
$ xlsx-props ls anonymous.xlsx
[]
```

# md-merge

A zero-dependency Node.js CLI tool that merges Markdown files into a single `merged-markdown.md`, with `---` between each file, with optional recursive folder support.

## Requirements

- [Node.js](https://nodejs.org) (any recent version)

## Usage

Run it from the folder containing your notes:

```
node md-merge.js        # current folder only
node md-merge.js -r     # current folder and all subfolders
```

If the script lives elsewhere, call it by path. It always merges the folder you run it from:

```
node C:\tools\md-merge.js -r
```

## Output

`merged-markdown.md` is created in the folder you run the script from:

```
contents of first file

---

contents of second file
```

## Notes

- Files are merged in alphabetical order.
- `merged-markdown.md` is skipped, so re-running is safe.
- With `-r`, `node_modules` and hidden folders (like `.git`) are skipped.
- Files are read and written as UTF-8.

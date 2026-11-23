import { extractTags } from "../../data-import/markdown-file";
import * as common from "../../data-import/common";
import { FrontMatterCache } from "obsidian";
import { PageMetadata, ListItem } from "data-model/markdown";
import { Link } from "data-model/value";
import { DateTime } from "luxon";

describe("Frontmatter Tags", () => {
    test("Empty", () => expect(extractTags({} as FrontMatterCache)).toEqual([]));
    test("No Tags", () => expect(extractTags({ a: 1, b: 2 } as any as FrontMatterCache)).toEqual([]));
    test("One Tag", () => expect(extractTags({ tag: "hello" } as any as FrontMatterCache)).toEqual(["#hello"]));
    test("Two Tag", () =>
        expect(extractTags({ tag: ["hello", "goodbye"] } as any as FrontMatterCache)).toEqual(["#hello", "#goodbye"]));
    test("Two Tag String", () =>
        expect(extractTags({ tag: "hello goodbye" } as any as FrontMatterCache)).toEqual(["#hello", "#goodbye"]));
    test("Two Tag String Comma", () =>
        expect(extractTags({ tag: "hello, goodbye" } as any as FrontMatterCache)).toEqual(["#hello", "#goodbye"]));
});

describe("Task Tags", () => {
    test("Empty", () => expect(common.extractTags("hello")).toEqual(new Set([])));
    test("One Tag", () => expect(common.extractTags("and text #hello")).toEqual(new Set(["#hello"])));
    test("Two Tags", () =>
        expect(common.extractTags("#and/thing text #hello")).toEqual(new Set(["#and/thing", "#hello"])));
    test("Comma Delimited", () =>
        expect(common.extractTags("#one,#two, #three")).toEqual(new Set(["#one", "#two", "#three"])));
    test("Semicolon Delimited", () =>
        expect(common.extractTags("#one;;;#two; #three")).toEqual(new Set(["#one", "#two", "#three"])));
    test("Parenthesis", () =>
        expect(common.extractTags("[#one]]#two;;#four()() #three")).toEqual(
            new Set(["#one", "#two", "#four", "#three"])
        ));
});

describe("Metadata initialization", () => {
    test("requires page file statistics while accepting an empty file", () => {
        expect(() => new PageMetadata("test.md")).toThrow("Page metadata must include");
        const time = DateTime.fromMillis(0);
        const page = new PageMetadata("test.md", { ctime: time, mtime: time, size: 0 });
        expect(page.lists).toEqual([]);
        expect(page.size).toBe(0);
    });

    test("rejects incomplete list items", () => {
        expect(() => new ListItem()).toThrow("List item metadata is missing required fields");
    });

    test("initializes list items with zero-valued positions and default collections", () => {
        const link = Link.file("test.md");
        const position = { start: { line: 0, col: 0, offset: 0 }, end: { line: 0, col: 1, offset: 1 } };
        const item = new ListItem({
            symbol: "-",
            link,
            section: link,
            text: "",
            line: 0,
            lineCount: 1,
            list: 0,
            position,
        });
        const time = DateTime.fromMillis(0);
        const page = new PageMetadata("test.md", { ctime: time, mtime: time, size: 0, lists: [item] });
        expect(page.lists[0].fields.size).toBe(0);
        expect(page.lists[0].links).toEqual([]);
        expect(page.lists[0].line).toBe(0);
    });
});

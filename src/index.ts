// Basic API type.
export type { DataviewApi } from "./api/plugin-api.js";
export type { DataviewInlineApi, DataviewInlineIOApi } from "./api/inline-api.js";

// Core Dataview types.
export type { DateTime, Duration } from "luxon";
export type {
    Link,
    DataObject,
    LiteralType,
    Literal,
    LiteralRepr,
    WrappedLiteral,
    LiteralWrapper,
    Widget,
} from "./data-model/value.js";

export type { Result, Success, Failure } from "./api/result.js";
export type { DataArray } from "./api/data-array.js";

// Dataview Index.
export type { ListItem, PageMetadata } from "./data-model/markdown.js";
export type { FullIndex, PrefixIndex, IndexMap } from "./data-index/index.js";

// Serialized types which describe all outputs of serialization.
export type { SMarkdownPage, SListEntry, STask } from "./data-model/serialized/markdown.js";

// Useful utilities for directly using dataview parsers.
export {
    DURATION_TYPES,
    DATE_SHORTHANDS,
    KEYWORDS,
    ExpressionLanguage,
    EXPRESSION,
    parseField,
} from "./expression/parse.js";
export { QUERY_LANGUAGE } from "./query/parse.js";
export { Query } from "./query/query.js";

////////////////////
// Implementation //
////////////////////

import type { DataviewApi } from "./api/plugin-api.js";

import "obsidian";
import type { App } from "obsidian";

// Utility functions.
/**
 * Get the current Dataview API from the app if provided; if not, it is inferred from the global API object installed
 * on the window.
 */
export const getAPI = (app?: App): DataviewApi | undefined => {
    if (app) return app.plugins.plugins.dataview?.api;
    else return window.DataviewAPI;
};

/** Determine if Dataview is enabled in the given application. */
export const isPluginEnabled = (app: App) => app.plugins.enabledPlugins.has("dataview");

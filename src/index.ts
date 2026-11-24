// Basic API type.
export { DataviewApi } from "./api/plugin-api.js";
export { DataviewInlineApi, DataviewInlineIOApi } from "./api/inline-api.js";

// Core Dataview types.
export { DateTime, Duration } from "luxon";
export {
    Link,
    DataObject,
    LiteralType,
    Literal,
    LiteralRepr,
    WrappedLiteral,
    LiteralWrapper,
    Widget,
} from "./data-model/value.js";

export { Result, Success, Failure } from "./api/result.js";
export { DataArray } from "./api/data-array.js";

// Dataview Index.
export { ListItem, PageMetadata } from "./data-model/markdown.js";
export { FullIndex, PrefixIndex, IndexMap } from "./data-index/index.js";

// Serialized types which describe all outputs of serialization.
export { SMarkdownPage, SListEntry, STask } from "./data-model/serialized/markdown.js";

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

// Settings.
export { DataviewSettings, DEFAULT_SETTINGS as DEFAULT_DATAVIEW_SETTINGS } from "./settings.js";

////////////////////
// Implementation //
////////////////////

import { DataviewApi } from "./api/plugin-api.js";

import "obsidian";
import { App } from "obsidian";

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

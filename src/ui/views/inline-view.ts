import { FullIndex } from "../../data-index/index.js";
import { Field } from "../../expression/field.js";
import { App } from "obsidian";
import { executeInline } from "../../query/engine.js";
import { DataviewSettings } from "../../settings.js";
import { renderErrorPre, renderValue } from "../render.js";
import { DataviewRefreshableRenderer } from "../refreshable-view.js";
import { tryOrPropagate } from "../../util/normalize.js";

/** Refreshable renderer which renders inline instead of in a div. */
export class DataviewInlineRenderer extends DataviewRefreshableRenderer {
    // The box that the error is rendered in, if relevant.
    errorbox?: HTMLElement;

    constructor(
        public field: Field,
        public fieldText: string,
        public container: HTMLElement,
        public target: HTMLElement,
        public index: FullIndex,
        public origin: string,
        public settings: DataviewSettings,
        public app: App
    ) {
        super(container, index, app, settings);
    }

    async render() {
        this.errorbox?.remove();
        let result = tryOrPropagate(() => executeInline(this.field, this.origin, this.index, this.settings));
        if (!result.successful) {
            this.errorbox = this.container.createEl("div");
            renderErrorPre(this.errorbox, "Dataview (for inline query '" + this.fieldText + "'): " + result.error);
        } else {
            let temp = document.createElement("span");
            temp.addClasses(["dataview", "dataview-inline-query"]);
            await renderValue(this.app, result.value, temp, this.origin, this, this.settings, false);

            this.target.replaceWith(temp);
        }
    }
}

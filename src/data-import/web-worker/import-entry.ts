/** Entry-point script used by the index as a web worker. */
import { runImport } from "./import-impl.js";
import { Transferable } from "../../data-model/transferable.js";
import { CachedMetadata, FileStats } from "obsidian";

if (typeof (global as any).WorkerGlobalScope === 'function') {
    // Loaded in a real Web Worker (eg: on Electron).
    // We do not have to do anything.
} else {
    // Loaded in a NodeJS worker thread.
    // Turn global into a mock WorkerGlobalScope.
    // var self = (global as any).self = global as any as WindowOrWorkerGlobalScope;
    const threads = require("node:worker_threads");
    const self = (global as any).self = global as any as {
        onmessage?: (evt: MessageEvent) => void;
        postMessage?: (message: any) => void;
    };
    self.postMessage = (message: any) => {
        threads.parentPort!.postMessage(message);
    };
    threads.parentPort!.on('message', (data: any) => {
        self.onmessage?.(new MessageEvent('message', { data }));
    });
}


// Avoid "undefined variable" errors
var self = global.self;

/** An import which can fail and raise an exception, which will be caught by the handler. */
function failableImport(path: string, contents: string, stat: FileStats, metadata?: CachedMetadata) {
    if (metadata === undefined || metadata === null) {
        throw Error(`Cannot index file, since it has no Obsidian file metadata.`);
    }

    return runImport(path, contents, stat, metadata);
}

self.onmessage = async evt => {
    try {
        let { path, contents, stat, metadata } = evt.data;
        let result = failableImport(path, contents, stat, metadata);
        (postMessage as any)({ path: evt.data.path, result: Transferable.transferable(result) });
    } catch (error) {
        console.log(error);
        (postMessage as any)({
            path: evt.data.path,
            result: {
                $error: `Failed to index file: ${evt.data.path}: ${error}`,
            },
        });
    }
};

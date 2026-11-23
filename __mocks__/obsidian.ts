import EventEmitter from "events";

/** Basic obsidian abstraction for any file or folder in a vault. */
export abstract class TAbstractFile {
    /**
     * @public
     */
    declare vault: Vault;
    /**
     * @public
     */
    declare path: string;
    /**
     * @public
     */
    declare name: string;
    /**
     * @public
     */
    declare parent: TFolder;
}

/** Tracks file created/modified time as well as file system size. */
export interface FileStats {
    /** @public */
    ctime: number;
    /** @public */
    mtime: number;
    /** @public */
    size: number;
}

/** A regular file in the vault. */
export class TFile extends TAbstractFile {
    declare stat: FileStats;
    declare basename: string;
    declare extension: string;
}

/** A folder in the vault. */
export class TFolder extends TAbstractFile {
    declare children: TAbstractFile[];

    isRoot(): boolean {
        return false;
    }
}

export class Vault extends EventEmitter {
    getFiles() {
        return [];
    }
    trigger(name: string, ...data: any[]): void {
        this.emit(name, ...data);
    }
}

export class Component {
    registerEvent() {}
}

/**
 * configuratiuon for options of table
 */
export class TableConfig {
    public identifier: string;
    public tableKeys: any;
    public tableColumns: Array<string>;
    public tableTitle: string;
    public allowPagination: boolean;
    public itemsperpage: number;
    public targets: Targets;
    public permissions: Array<string>;
    public filters: Filters;
    public allowPrint: boolean;
    public actions: ActionsButtons;
    public model: Model;
    public change: number;
    /**
     * constructor
     * @param options 
     */
    constructor(options: {
        identifier?: string;
        tableKeys?: any;
        tableColumns?: Array<string>;
        tableTitle?: string;
        allowPagination?: boolean;
        itemsperpage?: number;
        targets?: Targets;
        permissions?: Array<string>;
        filters?: any;
        allowPrint?: boolean;
        actions?: ActionsButtons;
        model?: Model;
        change?: number;
    } = {}) {
        this.tableKeys = options.tableKeys || [];
        this.tableColumns = options.tableColumns || [];
        this.tableTitle = options.tableTitle || 'Default Title';
        this.allowPagination = options.allowPagination || false;
        this.itemsperpage = options.itemsperpage || 10;
        this.targets = options.targets;
        this.identifier = options.identifier || 'Id';
        this.permissions = options.permissions || [];
        this.filters = options.filters || new Filters({
            columnsAllowSearch: [],
            allColumnsAllowSearch: false,
            allColumnsAllowSort: false,
            allowSearchGlobal: false,
            columnsAllowSort: []
        });
        this.allowPrint = options.allowPrint || false;
        this.actions = options.actions || new ActionsButtons({
            create: false, edit: false, delete: false
        });
        this.model = options.model || new Model({
            structure: {},
            extractFrom: {}
        });
        this.change = options.change || 1;
    }
}
/**
 * Filters Options
 */
export class Filters {
    public allowSearchGlobal: boolean;
    public columnsAllowSearch: Array<number>;
    public allColumnsAllowSearch: boolean;
    public allColumnsAllowSort: boolean;
    public columnsAllowSort: Array<number>;
    constructor(options: {
        columnsAllowSearch?: Array<number>;
        allColumnsAllowSearch?: boolean;
        allColumnsAllowSort?: boolean;
        allowSearchGlobal?: boolean;
        columnsAllowSort?: Array<number>;
    } = {}) {
        this.columnsAllowSearch = options.columnsAllowSearch || [];
        this.allColumnsAllowSearch = options.allColumnsAllowSearch || false;
        this.allColumnsAllowSort = options.allColumnsAllowSort || false;
        this.allowSearchGlobal = options.allowSearchGlobal || false;
        this.columnsAllowSort = options.columnsAllowSort || [];
    }
}
/**
 * Targets of api
 */
export class Targets {
    public targetApi: string;
    public targetGetMethod: string;
    public targetEdit: string;
    public parameters: any;
    public allowParameters: boolean;
    constructor(options: {
        targetApi?: string;
        targetGetMethod?: string;
        targetEdit?: string;
        parameters?: any;
        allowParameters?: boolean;
    } = {}) {
        this.allowParameters = options.allowParameters || true;
        this.targetApi = options.targetApi || '';
        this.targetGetMethod = options.targetGetMethod || 'getpage';
        this.targetEdit = options.targetEdit || 'getById';
        this.parameters = options.parameters || [];
    }
}
/**
 * For Buttons
 */
export class ActionsButtons {
    public allowActionsColumn: boolean;
    public create: boolean;
    public delete: boolean;
    public edit: boolean;
    public newButtons: Array<NewButton>;
    constructor(options: {
        allowActionsColumn?: boolean;
        create?: boolean;
        edit?: boolean;
        delete?: boolean;
        newButtons?: Array<NewButton>;
    } = {}) {
        this.allowActionsColumn = options.allowActionsColumn;
        this.create = options.create || false;
        this.delete = options.delete || false;
        this.edit = options.edit || false;
        this.newButtons = options.newButtons || [];
    }
}
/**
 * For create new Buttons
 */
export class NewButton {
    public name: string;
    public target: string;
    public icon: string;
    public className: string;
    public identifier: string;
    constructor(options: {
        name?: string;
        target?: string;
        icon?: string;
        className?: string;
        identifier?: string;
    } = {}) {
        this.name = options.name || '';
        this.icon = options.icon || '';
        this.target = options.target || '';
        this.className = options.className || '';
        this.identifier = options.identifier || '';
    }
}
export class Model {
    public structure: any;
    public extractFrom: any;
    constructor(options: {
        structure?: any;
        extractFrom?: any;
    } = {}) {
        this.structure = options.structure;
        this.extractFrom = options.extractFrom;
    }
}
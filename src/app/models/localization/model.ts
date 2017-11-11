export class LocalizationCreateModel {
    public newKey: string;
    public localizedStrings: any;
    constructor(newKey: string, localizedStrings: any) {
        this.localizedStrings = localizedStrings;
        this.newKey = newKey;
    }
}
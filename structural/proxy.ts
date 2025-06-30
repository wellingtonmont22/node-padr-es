
export interface Report {
    id: string;
    title: string;
    getPdf(): Promise<ArrayBuffer>;
}

class RealReport implements Report {
    constructor(
        public readonly id: string,
        public readonly title: string,
    ) { }

    async getPdf(): Promise<ArrayBuffer> {
        return Promise.resolve(new ArrayBuffer(0)); 
    }
}

class ReportProxy implements Report {
    private real?: RealReport;
    private cachedPdf?: ArrayBuffer;

    constructor(
        public readonly id: string,
        public readonly title: string,
    ) { }

    async getPdf(): Promise<ArrayBuffer> {
        if (this.cachedPdf) return this.cachedPdf;

        if (!this.real) {
            this.real = new RealReport(this.id, this.title);
        }
        this.cachedPdf = await this.real.getPdf();
        return this.cachedPdf;
    }
}

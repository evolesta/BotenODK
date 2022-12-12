// -- Stratey pattern definities --

export interface IBaseChart {
    // definieer strategy functies
    calculateYaxis(): void;
    calculateXaxis(): void;
    drawChart(): void;
}

// - Data modellen voor het initeren van de grafiekdata -
export class chartData {
    labels: string[];
    datasets: dataset[];
    options?: chartOptions;
}

export class dataset {
    data: number[];
    label: string;
}

export class chartOptions {
    yAmountSteps?: number = 10;
}

// Context klasse die aangeroepen wordt door het component
export class Context {

    private _strategy: IBaseChart; // private global variabele voor de strategy

    // constructor om de eerste strategy te bepalen
    constructor(strategy: IBaseChart) {
        this._strategy = strategy;
    }

    // setter om de strategy later te wijzigen
    public setStrategy(strategy: IBaseChart) {
        this._strategy = strategy;
    }

    // invoker om de strategy uit te voeren
    public drawChart(): void {
        this._strategy.drawChart();
    }
}
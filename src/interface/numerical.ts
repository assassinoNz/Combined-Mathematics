export interface NewtonRaphsonIteration {
    x: number;
    y: number;
    df: number;
    p: number;
}

export interface SecantIteration {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    p: number;
}

export interface BisectionIteration {
    a: number;
    b: number;
    signA: number;
    signB: number;
    p: number;
    signP: number;
}

export interface EulerIteration {
    x: number;
    y: number;
    dy: number;
    h: number;
    p: number;
}
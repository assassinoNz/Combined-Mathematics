import { NewtonRaphsonIteration, SecantIteration, BisectionIteration, EulerIteration } from "../interface/numerical.ts";
import { RootMath, DiffEqMath } from "../lib/numerical.ts";

export class Roots {
    /**
     * Generates a tabular visualization for Newton-Raphson iterations
     * @param f The function for which the root should be calculated
     * @param df Derivative of the function
     * @param x Initial guess for the root
     * @param tolerance Maximum difference between two consecutive roots
     */
    static newtonRaphson(f: (x:number) => number, df: (x:number) => number, x: number, tolerance = 10e-5) {
        const iterations: NewtonRaphsonIteration[] = [];
        
        for (const iteration of RootMath.newtonRaphson(f, df, x, tolerance)) {
            iterations.push(iteration);
        }

        console.table(iterations);
    }

    /**
     * Generates a tabular visualization for secant iterations
     * @param f The function for which the root should be calculated
     * @param x0 Initial guess1 for the root
     * @param x1 Initial guess2 for the root which must be more closer to the root than x0
     * @param tolerance Maximum difference between two consecutive roots
     */
    static secant(f: (x:number) => number, x0: number, x1: number, tolerance = 10e-5) {
        const iterations: SecantIteration[] = [];
        
        for (const iteration of RootMath.secant(f, x0, x1, tolerance)) {
            iterations.push(iteration);
        }

        console.table(iterations);
    }

    /**
     * Generates a tabular visualization for bisection iterations
     * @param f The function for which the root should be calculated
     * @param a Minimum of the interval
     * @param b Maximum of the interval
     * @param tolerance Maximum range of a bisected interval
     */
    static bisection(f: (x:number) => number, a: number, b: number, tolerance = 10e-5) {
        const iterations: BisectionIteration[] = [];
        
        for (const iteration of RootMath.bisection(f, a, b, tolerance)) {
            iterations.push(iteration);
        }

        console.table(iterations);
    }
}

export class DiffEqs {
    /**
     * Generates a tabular visualization for euler iterations
     * @param dy Derivative of the function
     * @param x Minimum of the interval
     * @param xn Maximum of the interval
     * @param y Dependant variable value at x
     * @param i Number of iterations
     */
    static euler(dy: (x:number, y:number) => number, x: number, xn: number, y: number, i: number) {
        const iterations: EulerIteration[] = [];
        
        for (const iteration of DiffEqMath.euler(dy, x, xn, y, i)) {
            iterations.push(iteration);
        }

        console.table(iterations);
    }
}
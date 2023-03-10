import { NewtonRaphsonIteration, SecantIteration, BisectionIteration, EulerIteration } from "../interface/numerical.ts";

export class RootMath {
    /**
     * Approximates the root of a function using Newton-Raphson method
     * @param f The function for which the root should be calculated
     * @param df Derivative of the function
     * @param x Initial guess for the root
     * @param tolerance Maximum difference between two consecutive roots
     */
    static* newtonRaphson(f: (x:number) => number, df: (x:number) => number, x: number, tolerance = 10e-5) {
        let iteration: NewtonRaphsonIteration;
        let i = 0;
        let difference = Infinity;
        
        while (difference >= tolerance && i <= 100) {
            iteration = {
                x: x,
                y: f(x),
                df: df(x),
                p: NaN
            };

            iteration.p = x - iteration.y/iteration.df;
            [x, difference, i] = [iteration.p, Math.abs(x-iteration.p), i+1];
            
            yield iteration;
        }
    }

    /**
     * Approximates the root of a function using secant method
     * @param f The function for which the root should be calculated
     * @param x0 Initial guess1 for the root
     * @param x1 Initial guess2 for the root which must be more closer to the root than x0
     * @param tolerance Maximum difference between two consecutive roots
     */
    static* secant(f: (x:number) => number, x0: number, x1: number, tolerance = 10e-5) {
        let iteration: SecantIteration;
        let i = 0;
        let difference = Infinity;

        while (difference >= tolerance  && i <= 100) {
            iteration = {
                x0: x0,
                x1: x1,
                y0: f(x0),
                y1: f(x1),
                p: NaN
            };

            iteration.p = x1 - iteration.y1*(x1-x0)/(iteration.y1-iteration.y0);
            [x0, x1, difference, i] = [x1, iteration.p, Math.abs(x1-iteration.p), i+1];
            
            yield iteration;
        }
    }

    /**
     * Approximates the root of a function using bisection method
     * @param f The function for which the root should be calculated
     * @param a Minimum of the interval
     * @param b Maximum of the interval
     * @param tolerance Maximum range of a bisected interval
     */
    static* bisection(f: (x:number) => number, a: number, b: number, tolerance = 10e-5) {
        let iteration: BisectionIteration;
        let i = 0;

        while (Math.abs(a-b) >= tolerance && i <= 100) {
            iteration = {
                a: a,
                b: b,
                signA: Math.sign(f(a)),
                signB: Math.sign(f(b)),
                p: NaN,
                signP: NaN
            };

            if (iteration.signA == 0) {
                //CASE: "a" is the root
                iteration.p = a;
                iteration.signP = iteration.signA;
                break;
            } else if (iteration.signB == 0) {
                //CASE: "b" is the root
                iteration.p = b;
                iteration.signP = iteration.signB;
                break;
            } else if (iteration.signA != iteration.signB) {
                //CASE: Intermediate value theorem guarantees a root within [a,b]
                iteration.p = (a+b)/2;
                iteration.signP = Math.sign(f(iteration.p));

                if (iteration.signP != iteration.signA) {
                    //CASE: Middle point have a different sign than at "a"
                    b = iteration.p;
                } else {
                    //CASE: Middle point have a different sign than at "b"
                    a = iteration.p;
                }
            } else {
                //CASE: Intermediate value theorem cannot guarantee a root within [a,b]
                break;
            }

            yield iteration;

            i++;
        }
    }
}

export class DerivativeMath {
    /**
     * Approximates the derivative of a function using forward finite difference method
     * @param f The function for which the root should be calculated
     * @param x Point at which the derivative should be found
     * @param h Step size
     * @returns Derivative of f at x
     */
    static forwardDifference(f: (x:number) => number, x: number, h: number) {
        return (f(x+h)-f(x))/h;
    }

    /**
     * Approximates the derivative of a function using backward finite difference method
     * @param f The function for which the root should be calculated
     * @param x Point at which the derivative should be found
     * @param h Step size
     * @returns Derivative of f at x
     */
    static backwardDifference(f: (x:number) => number, x: number, h: number) {
        return (f(x)-f(x-h))/h;
    }

    /**
     * Approximates the derivative of a function using centered finite difference method
     * @param f The function for which the root should be calculated
     * @param x Point at which the derivative should be found
     * @param h Step size
     * @returns Derivative of f at x
     */
    static centeredDifference(f: (x:number) => number, x: number, h: number) {
        return (f(x+h)-f(x-h))/(2*h);
    }
}

export class IntegralMath {

}

export class DiffEqMath {
    /**
     * Approximates the solution of an ordinary differential equation using Euler method
     * @param dy Derivative of the function
     * @param x Minimum of the interval
     * @param xn Maximum of the interval
     * @param y Dependant variable value at x
     * @param n Number of iterations
     */
    static* euler(dy: (x:number, y:number) => number, x: number, xn: number, y: number, n: number) {
        let iteration: EulerIteration;
        
        for (let i = 0; i < n; i++) {
            iteration = {
                x: x,
                y: y,
                dy: dy(x,y),
                h: (xn-x)/(n-i), //WARNING: Due to limitations of binary64, h must be calculated per iteration
                p: NaN
            };

            iteration.p = y + iteration.h*iteration.dy;
            [x, y] = [x+iteration.h, iteration.p];
            
            yield iteration;
        }
    }
}
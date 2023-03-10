import { Roots, DiffEqs } from "./src/consumer/numerical.ts";

Roots.newtonRaphson((x:number) => Math.exp(x)-2*x, (x:number) => Math.exp(x)-2, 2);
// Roots.secant((x:number) => x**2-4, 5, 4);
// Roots.bisection((x:number) => x**2-4, 0, 5);

// DiffEqs.euler((x: number, y: number) => 1/(2*y), 1, 2, 1, 5);
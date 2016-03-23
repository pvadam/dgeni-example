import { Logger } from "./logger";

/**
 * @name helloDgeni
 * @description  My application
 */
export class MyApp {
    
    /**
     * @description  Display a greeting
     * @param {string} name The name of the person to greet
     */
    public greet(name: string): any {
        (new Logger() as any).log('hello ' + name);
    }
}
import { PeriodInterface } from "./PeriodInterface";

/**
 * @class GenericPeriod
 */
 export class GenericPeriod implements PeriodInterface{

   /**
    * @var string
    */
   protected name: string;

   /**
    * @param name
    */
   constructor(name: string) {
      this.name = name;
   }

   /**
    * @return {string}
    */
   getName(): string {
      return this.name;
   }

   /**
    * @param name
    * @returns 
    */
   setName(name: string): GenericPeriod {
      this.name = name;
      return this;
   }
}
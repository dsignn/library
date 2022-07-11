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
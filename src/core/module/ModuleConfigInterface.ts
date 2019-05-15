/**
 *
 */
import {ContainerAwareInterface} from "../../container/index";

export interface ModuleConfigInterface extends ContainerAwareInterface {

    init();
}
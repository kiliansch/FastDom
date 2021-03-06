import { ClassConstructor, ComponentsInputs } from '../interfaces/component';

import { FastDomNode } from '../interfaces/node';
import { Observer } from '../observer/observer';
import { fdObject } from '../observer/fdObject';
import { removeAllListenersComponent } from '../misc/misc';

export function createComponent<T extends Component>(
  classProvider: ClassConstructor<T>,
  inputs: ComponentsInputs = {},
): FastDomNode {
  const instance = new classProvider(inputs);
  instance.template.instance = instance;
  return instance.template;
}

export class Component {
  protected reactive: { [key: string]: Observer<any> } = {};
  protected fdObjects: { [key: string]: fdObject<any> } = {};
  protected fdStyles: { [key: string]: fdObject<any> | Observer<string> } = {};
  public template: FastDomNode;
  protected onDestroy() {}
  protected onInit() {}

  reInit() {
    Object.keys(this.fdStyles).forEach(key => {
      this.fdStyles[key].reInit();
    });
    Object.keys(this.fdObjects).forEach(key => {
      this.fdObjects[key].reInit();
    });
    Object.keys(this.reactive).forEach(key => {
      this.reactive[key].reInit();
    });
    this.onInit();
  }

  destroy(...args: any) {
    const force = args[0];
    if (force === true) {
      removeAllListenersComponent(this.template);
    }
    Object.keys(this.fdObjects).forEach(key => {
      this.fdObjects[key].destroy(...args);
    });
    Object.keys(this.reactive).forEach(key => {
      this.reactive[key].destroy(...args);
    });
    Object.keys(this.fdStyles).forEach(key => {
      this.fdStyles[key].destroy(...args);
    });
    this.onDestroy();
  }
}

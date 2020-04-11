import ViewController from './ViewController';

/**
 * This class represents API for Connector.
 * All interactions with Connector must happen only through it.
 */
class Connector {
  constructor(anchorElement, model) {
    this._model = model;
    this._viewController = new ViewController(anchorElement, this._model);
  }

  /**
   * Create Connector instance.
   *
   * @param {HTMLElement} anchorElement An element the Connector instance to be inserted in.
   * @param {Model} model Model instance with Connector data.
   *
   * @returns {Connector} the Connector instance.
   */
  static create(anchorElement, model) {
    return new this(anchorElement, model);
  }
}

export default Connector;

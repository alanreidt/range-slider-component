import ViewController from './ViewController';

/**
 * This class represents API for Connector.
 * All interactions with Connector must happen only through it.
 */
class Connector {
  constructor(anchorElement, options) {
    this._viewController = new ViewController(anchorElement, options);

    this.constructor._anchorElementsMap.set(anchorElement, this);
  }

  /**
   * Create Connector instance.
   *
   * @param {HTMLElement} anchorElement An element the Connector instance to be inserted in.
   * @param {Object} options Connector options.
   *
   * @returns {Connector} the Connector instance.
   */
  static create(anchorElement, options) {
    return new this(anchorElement, options);
  }

  /**
   * Set Connector instance's elements with options.
   *
   * @param {HTMLElement} connectorElement An element the Connector instance was inserted in.
   * @param {Object} options Options to be set to the Connector instance elements.
   */
  static setElements(connectorElement, options) {
    this._anchorElementsMap.get(connectorElement).setElements(options);
  }

  /**
   * Set elements with options.
   *
   * @param {Object} options Options to be set to elements.
   */
  setElements(options) {
    this._viewController.setElements(options);
  }
}

Connector._anchorElementsMap = new WeakMap();

export default Connector;

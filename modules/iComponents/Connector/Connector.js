import ViewController from './ViewController';

/**
 * This class represents API for Connector.
 * All interactions with Connector must happen only through it.
 */
class Connector {
  constructor(anchorElement, options) {
    this._viewController = new ViewController(anchorElement, options);
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
}

export default Connector;

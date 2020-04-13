import ViewController from './ViewController';

/**
 * This class represents API for Scale.
 * All interactions with Scale must happen only through it.
 */
class Scale {
  constructor(anchorElement, model) {
    this._model = model;
    this._viewController = new ViewController(anchorElement, this._model);
  }

  /**
   * Create Scale instance.
   *
   * @param {HTMLElement} anchorElement An element the Scale instance to be inserted in.
   * @param {Model} model Model instance with Scale data.
   *
   * @returns {Scale} the Scale instance.
   */
  static create(anchorElement, model) {
    return new this(anchorElement, model);
  }
}

export default Scale;

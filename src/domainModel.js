export class DomainModel {
  constructor({
    min = 0,
    max = 100,
    values = [min, max],
    step = null,
    orientation = "horizontal",
    tooltips = false,
  } = {}) {
    // fix order
    this.options = {};
    let options = this.options;

    options.min = min;
    options.max = max;
    options.values = values;
    options.step = step;
    options.orientation = orientation;
    options.tooltips = tooltips;
  }
}

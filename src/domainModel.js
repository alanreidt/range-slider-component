export class DomainModel {
  constructor({
    boundaries = [0, 100],
    value = boundaries,
    step = null,
    orientation = "horizontal",
    tooltips = false,
  } = {}) {
    // fix order
    this.options = {};
    let options = this.options;

    options.boundaries = boundaries;
    options.value = value;
    options.step = step;
    options.orientation = orientation;
    options.tooltips = tooltips;
  }
}

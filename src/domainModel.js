export class DomainModel {
  constructor({
    boundaries = [0, 100],
    value = boundaries,
    step = null,
    orientation = "horizontal",
    tooltips = false,
  } = {}) {
    this.options = {
      boundaries,
      value,
      step,
      orientation,
      tooltips,
    };
  }
}

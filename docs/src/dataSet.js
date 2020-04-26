const dataSet = [
  {
    title: 'default example',
    options: {},
  },
  {
    title: 'custom example',
    options: {
      boundaries: [-200, 300],
      values: [-100, 200],
      step: 10,
      orientation: 'horizontal',
      hasTooltips: true,
      theme: 'modern',
    },
  },
  {
    title: 'vertical example',
    options: {
      boundaries: [-500, 500],
      values: [-300, -200, 200],
      step: 25,
      orientation: 'vertical',
      hasTooltips: true,
    },
  },
];

export default dataSet;

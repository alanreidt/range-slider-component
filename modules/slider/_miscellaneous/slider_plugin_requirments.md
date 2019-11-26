# Slider plugin requirements.

## Version 1:

### Decisions explanation:
#### Architecture:
"name of the slider" is a client-oriented: you pass values in the form that you'd like (no need to sort or to change type of the input) and get output only in one concrete form.
Slider is a ui-component. It means, that it doesn't have Domain Model, 'cause it's a part of application.
Nonetheless, I've decided to add facade to Slider's data and logic — it'd give the opportunity to swap Slider's modules, if needed.
Also, I've decided to decompose Slider plugin into two layers: Model and ViewController. The reason for that is that it's impossible to extract View and Controller from the Slider plugin, they very tight.

### Documentation:
  - Plugin should have github repository
  - Plugin should have demo-page
    - Demo-page should consist of 3 sliders with different initial parameters
    - Each slider shall have a configuration panel
    - Each slider shall have an display input
  - Plugin should be structured according to MVC
  - Plugin's architecture should have a documentation:
    - Plugin should have description in README.md
    - Plugin should have UML diagram
  - Plugin should be fulfilled with tests

### Features:
  - Plugin should have an API for its initiation on a page
  - Plugin should have a capability to be initialized multiple times
  - Plugin should have a customization interface for:
    - Changing value (values)
      - Changing quantity of values (1 or 2, for now)
    - Changing boundaries value
    - Changing step value
    - Changing orientation
    - Changing value (values) through code
    - Changin tooltips appearance

  #### Translation:
    - У вашего приложения должны быть четко разделенные слои приложения:
      - Нужно сделать отдельный слой управления данными (Model), который будет содержать бизнес-логику приложения и не производить никаких расчетов, которые нужны для отображения.
      - Отдельный слой для управления отображением (View) — здесь нельзя проводить никаких расчетов, относящихся к бизнес-логике. Слой должен содержать логику, связанную с отображением (например, для изменения положения ползунка слайдера на экране), а также реагировать на взаимодействие пользователя с приложением.
      - Отдельный слой для обновления модели и отображения (Controller или Presenter). Это - единственный слой среди трех, который может иметь зависимость от других слоев. Он будет:
      реагировать на сообщения от отображения о действиях пользователей и обновлять модель;
      реагировать на сообщения об обновлении модели и обновлять отображение.

    - Плагин должен иметь удобное API для подключения его к элементам на странице и соответствовать best practices по созданию плагинов для jQuery.
    - Плагин должен уметь работать независимо, если подключен несколько раз на странице, не должен ломать стили остальных элементов на странице.
    - Плагин должен быть максимально кастомизируемым, надо позволить настраивать:
      - исходное значение,
      - максимальное значение,
      - минимальное значение,
      - размер шага,
      - вертикальный/горизонтальный вид,
      - одиночное значение или интервал,
      - возможность на лету изменить значение "снаружи" javascript-ом,
      - возможность включать/отключать элемент над бегунком, который показывает значение и который ползает за - мышкой (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).

### Application Logic:

  #### Business logic (Domain model):
  - General:
    - integer
    - (value >= 0)
  - Boundaries:
    - Min/Max:
      - min < max
      - max > min
      - default: [0, 100]
  - Value(-s):
    - (min < value < max)
    - default: [min, max]
  - Step:
    - ( (max - min) % step === 0 ) || floor(step)
    - (step <= max)
    - default: null

- Business Logic:
  - in general:
    - should allow to define min/max distance between handles
    - should output made corrections
  - options:
    - default values:
      - boudaries: [0, 100],
      - value: ({boundaries(max)} - {boundaries(min)}) / 2,
      - step: null,
      - orientation: "horizontal",
      - tooltips: false,
    - boundaries:
      - shall accept array of numbers (+)
      - should also accept numbers (would change appropriate previous one) (+)
      - shall leave array with previous values instead of incorrect input
        ( isNaN( parseFloat(value) ) ) (+)
      - should assign previous values instead of each incorrect one (+)
      - shall correct {value} if it's out of {boundaries(range)} (+)
      - shall correct {step} if it's not correspond (boundaries % step !== 0) (+)
      - shall correct {step} to difference of {boundaries(range)} if passed value > than that (+)
      - should change direction (ltr or rtl) according to inputed value order
      - should accept not only "numbers" (colors)
    - value:
      - shall accept number or array of numbers — will result in mono-valued or multi-valued slider,
        accordingly (+)
      - shall assign previous value instead of incorrect input
        ( isNaN( parseFloat(value) ) ) (+)
      - should assign correct values and cut off incorred ones (+)
      - shall be equal to average of {boundaries}, if it isn't changed (+)
      - shall round value to the nearest possible, in order to correspond to {step} (+)
      - shall assign value to the nearest {boundaries(max)} or {boundaries(min)},
        if number is out of {boundaries} range (+)
      - should accept keywords: min(start), middle(center), max(end)
    - step:
      - shall accept only positive number (+)
      - shall round value to the nearest possible one if (boundaries % step !== 0) (+)
      - shall assign value to difference of {boundaries(range)} if passed value > than that
      - shall correct {value} in order to correspond to its value (+)
      - should accept quantity of steps somehow
      - should allow to skip some values
    - orientation:
      - shall accept only string "horizontal" or "vertical" (+)
      - shall assign default value if incorrect one is passed (+)
    - tooltips:
      - shall accept only boolean true or false (!) (+)
      - shall assign default value if incorrect one is passed (+)


  #### Presentation logic:
  - Handles:
    - quantity = values.length
  - Pips
    ???

  #### Controller logic:
    Add Event Listeners
    Add listener for Base
      Listen to MouseClick (MouseDown)
        Translate Position into Value
        Call Model
    Add listener for Handle-groups
      Listen to MouseDown
        Listen to Vertical or Horizontal MouseMove
          Translate Position into Value
          Call Model
        Listen to MouseUp
          Remove MouseMove, MouseUp Event Listeners

### Access Methods:
  - Model > DM
    - Connections:
      - setDataSource( source )
    - Customization:
      - Initialization:
        - create( element, {options} )
      - Access:
        - getValue( key )
        - setValue( key, newValue )
        - destruct()
  - Model > Controller:
    - Connections:
      - setValue( key, newValue )
  - View > Model
    - Connections:
      - Observer Pattern

## Version 2:

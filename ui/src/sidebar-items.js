import callbacks from './sidebar-callbacks';

const items = [
  {
    text: "Home",
    icon: "home",
    active: false,
    callback: callbacks.generateForItem("Home")
  },
  {
    text: "Calibrate",
    icon: "tools",
    active: true,
    callback: callbacks.generateForItem("Calibrate"),
    subitems: [
      {
        text: "Step 1",
        active: false,
        callback: callbacks.generateForItem("Calibrate", 0)
      },
      {
        text: "Step 2",
        active: true,
        callback: callbacks.generateForItem("Calibrate", 1)
      }
    ]
  },
  {
    text: "Measure",
    icon: "pulse",
    active: false,
    callback: callbacks.generateForItem("Measure"),
    subitems: [
      {
        text: "Step 1",
        active: false,
        callback: callbacks.generateForItem("Measure", 0)
      },
      {
        text: "Step 2",
        active: false,
        callback: callbacks.generateForItem("Measure", 1)
      }
    ]
  }
];

export default items;

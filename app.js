//Storage Controller

//Iten Controller
const ItemCtrl = (function () {
  console.log("hehehe");
  //item Constructor
  const Item = function (name, id, calories) {
    this.id = id;
    this.calories = calories;
    this.name = name;
  };

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: "steak dinner", calories: 900 },
      { id: 1, name: "egg", calories: 900 },
      { id: 2, name: "cookies", calories: 900 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  //public methods
  return {
    logData: function () {
      return data;
    },
  };
})();

//UI Controller
const UICrtl = (function () {
  // public method
  return {};
})();

//App Controller
const App = (function (ItemCtrl, UICrtl) {
  //public method
  return {
    init: function () {
      console.log("Init app...");
      console.log(ItemCtrl.logData());
    },
  };
})(ItemCtrl, UICrtl);

//Initilizing App

App.init();

//Storage Controller

//Iten Controller
const ItemCtrl = (function () {
  //item Constructor
  const Item = function (name, calories) {
    this.id = id.next().value;
    this.calories = calories;
    this.name = name;
  };

  function* genID() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }
  const id = genID();

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
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
    addItem: function (name, calories) {
      const newItem = new Item(name, parseInt(calories));
      data.items.push(newItem);
      return newItem;
    },
    getTotCalories: function () {
      let cal = 0;
      data.items.forEach((item) => {
        cal += item.calories;
      });
      data.totalCalories = cal;
      return data.totalCalories;
    },
  };
})();

//UI Controller
const UICrtl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  // public method
  return {
    populateItemList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}</strong> - <em>${item.calories} calories</em>
              <a href=3"" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    clearEditState: function () {
      UICrtl.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem(item) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}</strong> - <em>${item.calories} calories</em>
      <a href=3"" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i></a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInputs: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    statusList: function (status) {
      document.querySelector(UISelectors.itemList).style.display = status;
    },
    updateTotCalories: function (totalCal) {
      document.querySelector(UISelectors.totalCalories).innerHTML = totalCal;
    },
  };
})();

//App Controller
const App = (function (ItemCtrl, UICrtl) {
  //load event listener
  const loadEventListeners = function () {
    const UISelectors = UICrtl.getSelectors();

    //add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  //add item submit
  const itemAddSubmit = function (e) {
    //Get form input from UICtrl
    const input = UICrtl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //add item to the UI
      UICrtl.addListItem(newItem);

      //Get total calorie
      const totalCal = ItemCtrl.getTotCalories();

      //Update calorie.
      UICrtl.updateTotCalories(totalCal);

      // made list appeared
      UICrtl.statusList("block");

      //clear input fields
      UICrtl.clearInputs();
    }

    e.preventDefault();
  };

  //public method
  return {
    init: function () {
      //set ititial states
      UICrtl.clearEditState();

      //Fetch items from data structur
      const items = ItemCtrl.getItems();

      const totalCal = ItemCtrl.getTotCalories();
      //   update UI consequentlz to totCal
      UICrtl.updateTotCalories(totalCal);

      //Check if ther is any items
      if (items.length === 0) {
        UICrtl.statusList("none");
      } else {
        //Populate list with items
        UICrtl.populateItemList(items);
      }

      //load Event Listeneers
      loadEventListeners();
    },
  };
})(ItemCtrl, UICrtl);

//Initilizing App
App.init();

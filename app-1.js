function* genID(){
  let id= 0;
  while (true){
    yield id+++
  }
}

updateListItem: function (item) {
  console.log("ddd");
  const listItems = document.querySelectorAll(UISelectors.listItems);
  console.log(listItems);
  //   li.innerHTML = `
  //   <strong>${item.name}</strong> - <em>${item.calories} calories</em>
  //   <a href=3"" class="secondary-content">
  //   <i class="edit-item fa fa-pencil"></i></a>`;
},

const listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      console.log(listItems);
      listItems.forEach((li) => {
        const itemID = li.getAttribute("id");
        if (itemID === `item-${item.id}`) {
          li.innerHTML = `<strong>${item.name}</strong>
           - <em>${item.calories} calories</em>
           <a href=3"" class="secondary-content">
           <i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
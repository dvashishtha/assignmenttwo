(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOffService', ShoppingListServiceProvider);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getItems();

  list.bought = function (idx) {
    ShoppingListCheckOffService.update(idx);
  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtlist = this;
  boughtlist.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService(shoppingItems) {
  var service = this;
  var items = shoppingItems;
  var boughtItems = [];

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.update = function(idx) {
    var item = items[idx];
    items.splice(idx, 1);
    boughtItems.push(item);
  }
}


function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults =
      {shoppingItems: [
                        {
                          name: "cookies",
                          quantity: 10
                        },
                        {
                          name: "chips",
                          quantity: 5
                        },
                        {
                          name: "soda",
                          quantity: 5
                        },
                        {
                          name: "candies",
                          quantity: 10
                        },
                        {
                          name: "veggies",
                          quantity: 10
                        }
                      ]
      }


  provider.$get = function () {
    var shoppingList = new ShoppingListCheckOffService(provider.defaults.shoppingItems);

    return shoppingList;
  };
};

})();

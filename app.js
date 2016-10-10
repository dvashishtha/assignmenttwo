(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListService', ShoppingListServiceProvider);


ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.bought = function (idx) {
    ShoppingListService.update(idx);
  }

}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var boughtlist = this;
  boughtlist.items = ShoppingListService.getBoughtItems();
}

function ShoppingListService(shoppingItems) {
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
    var shoppingList = new ShoppingListService(provider.defaults.shoppingItems);

    return shoppingList;
  };
};

})();

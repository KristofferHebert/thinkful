'use strict'

// Constructor for Diner, take a array of prices
function Diner(dishesArray){

        // get Total for cost of dishes
        function getTotal(d){
            if(d === []) return 0
            return d.reduce(function(a, b){
                return a + b
            })
        }

        // add dish to dishes array, takes a number for price
        function addDish(price){
            dishes.push(price)
        }

        var dishes = dishesArray || []
        var total = getTotal(dishes)

        return {
            dishes: dishes,
            total: total,
            addDish: addDish,
            getTotal: getTotal
        }
}

var diner = Diner([15, 16, 17.50])

console.log(diner)
console.log('total', diner.total, diner.total === 48.5);

'use strict'

// Constructor for Diner, take a array of prices
function Diner(name, dishesArray){
        if(!name) console.log("Please provide name")

        // get total for cost of dishes
        var getTotal = function(d){
            if(d === []) return 0
            return d.reduce(function(a, b){
                return a + b
            })
        }

        // add dish to dishes array, takes a number for price
        var addDish = function(price){
            diner.dishes.push(price)
            diner.total = getTotal(diner.dishes)
        }

        var dishes = dishesArray || []
        var total = getTotal(dishes)

        var diner =  {
            name: name,
            dishes: dishes,
            total: total
        }

        diner.addDish = addDish
        diner.getTotal = getTotal

        return diner
}

function mealCalculator(dinersArray, tax, tip){
    function getTotalFromDiners(a, b){
            var mealTotal = a.total * tax
            var tip

            console.log('Total: Bill for ', a.name, mealTotal)
    }

    dinnesArray.reduce(getTotalFromDiners)

    console.log()
}


var diner = Diner('Jeff', [15, 16, 17.50])
console.log('Calulating total', diner.total, diner.total === 48.5);

console.log('Adding dish...')
diner.addDish(10)
diner.addDish(1)
diner.addDish(1)

console.log('Calulating total with new dishes', diner.total, diner.total === 60.5);

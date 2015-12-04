'use strict'

// Constructor for Diner, take a array of prices
function Diner(name, dishesArray) {
	if (!name) console.log("Please provide name")

	// get total for cost of dishes
	var getTotal = function(d) {
		if (d === []) return 0
		return d.reduce(function(a, b) {
			return a + b
		})
	}

	// add dish to dishes array, takes a number for price
	var addDish = function(price) {
		diner.dishes.push(price)
		diner.total = getTotal(diner.dishes)
	}

	var dishes = dishesArray || []
	var total = getTotal(dishes)

	var diner = {
		name: name,
		dishes: dishes,
		total: total
	}

	diner.addDish = addDish
	diner.getTotal = getTotal

	return diner
}

function prettyDollarAmount(number){
    return (Math.round(number*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)
}

function mealCalculator(dinersArray, tax, tip) {
		var length = dinersArray.length
		var index = -1
		var grandTotal = 0

		while (++index < length) {
			var dinnerMealTotal = dinersArray[index].total * (tax + 1)
            grandTotal+= dinnerMealTotal
			console.log('Total bill for', dinersArray[index].name, '$' + prettyDollarAmount(dinnerMealTotal))
		}

		console.log('=================================')
		var tipPerPerson = ((grandTotal * (tip + 1)) - grandTotal) / length 
		grandTotal = grandTotal * (tip + 1)
		console.log('Grand Total:', '$' + prettyDollarAmount(grandTotal), "with $" + prettyDollarAmount(tipPerPerson), "tip per person")

}


var diner = Diner('Jeff', [15, 16, 17.50])
var diner1 = Diner('Sue', [12, 17, 17.50])
var diner2 = Diner('Marie', [15, 16, 17.50])
var dinersArray = [diner, diner1, diner2]
console.log('Calulating total', diner.total, diner.total === 48.5);

console.log('Adding dish...')
diner.addDish(10)
diner.addDish(1)
diner.addDish(1)

console.log('Calulating total with new dishes', diner.total, diner.total === 60.5);

console.log('=================================')
mealCalculator(dinersArray, 0.10, 0.15)

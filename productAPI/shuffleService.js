const priorities = [1,2,3,4,5,6,7,8,9,10];

module.exports = function shufflePriorities(products) {
    const newPriorities = priorities.sort(() => Math.random() - 0.5);

    for(let i = 0; i < priorities.length; i++) {
        products[i].priority = newPriorities[i];
    }

    return products;
}

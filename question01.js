function createOrderManager() {
    let orders = [];
    return {
        addOrder(order){
            order.createdAt = new Date();
            orders.push(order);
        },
        updateOrder(id, newStatus){
            const order = orders.find(ord => ord.id === id);
            if(order) {
                order.status = newStatus;
            }
        },
        filterOrders(status){
            // return orders.filter(order => order.status === status);
            return JSON.stringify(orders.filter(order => order.status === status), null, 2);
        },
        sortOrders(by){
            return [...orders].sort((a, b) => {
                if(by === "date"){
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
                else if(by === "status"){
                    return a.status.localeCompare(b.status);
                }
                return 0;
            });
        },
        getTotalRevenue() {
            return orders.reduce((total, order) => {
                const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                return total + orderTotal;
            }, 0);
        },
        exportOrders() {
                
            return JSON.stringify(manager.filterOrders("pending")[0].items);
            // console.log(manager.filterOrders("pending")[0].items);
            // return console.log(JSON.stringify(orders, null, 2));
            // console.log(JSON.stringify(orders[0].items, null, 2));
            // console.dir(orders[0], {depth:null});
            // console.log(JSON.stringify(manager.filterOrders("pending"), null, 2));
            // console.log(manager.filterOrders("pending")[0].items[0]);
        }
    };
}


const manager = createOrderManager();
manager.addOrder({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrder({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
console.log(manager.filterOrders("pending"));
// console.log(manager.exportOrders());
console.log(manager.getTotalRevenue());
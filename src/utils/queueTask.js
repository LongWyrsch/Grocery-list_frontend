export const queueTask = async(queue, task, wait    ) => {
    queue.push(task)
    setTimeout(() => {
        if (queue.length > 0) {
            queue.pop().call()
            queue.length = 0 // Read bottom comment
        }
    }, wait);
}

// https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
// I initially tried with queue = [], which will set the variable queue to a new empty array. 
// If you have referenced this array from another variable or property, the original array will remain unchanged.
// So the full array was still being used by other function waiting in setTimeout.
// queue.length = 0 clears the EXISTING array. Following functions will get an empty array once their timeout is done.
class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(node, priority) {
        this.nodes.push({ node, priority });
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.nodes.shift().node;
    }

    isEmpty() {
        return !this.nodes.length;
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;

    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const current = pq.dequeue();

        for (let neighbor in graph[current]) {
            const distance = distances[current] + graph[current][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = current;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return { distances, previous };
}

function getPath(previous, end) {
    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return path;
}

// Exemple d'utilisation
const graph = {
    'A': { 'B': 1, 'C': 4 },
    'B': { 'A': 1, 'C': 2, 'D': 5 },
    'C': { 'A': 4, 'B': 2, 'D': 1 },
    'D': { 'B': 5, 'C': 1 }
};

const startNode = 'A';
const endNode = 'D';
const { distances, previous } = dijkstra(graph, startNode);
const shortestPath = getPath(previous, endNode);

console.log("Distances from", startNode, ":", distances);
console.log("Shortest path to", endNode, ":", shortestPath);

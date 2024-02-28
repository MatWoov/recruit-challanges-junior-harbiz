// Lista de entrenadores
const coaches = [
    { name: "A", reputation: 4.5, availableSlots: 1 },
    { name: "B", reputation: 3.2, availableSlots: 4 },
    { name: "C", reputation: 1.2, availableSlots: 3 },
    { name: "D", reputation: 3.4, availableSlots: 2 },
];

// Lista de clientes
const clients = [
    { name: "q", importanceOfReputation: 2.6 },
    { name: "r", importanceOfReputation: 3.7 },
    { name: "s", importanceOfReputation: 8.5 },
    { name: "t", importanceOfReputation: 9.7 },
    { name: "u", importanceOfReputation: 2.6 },
    { name: "v", importanceOfReputation: 4.7 },
    { name: "w", importanceOfReputation: 5.6 },
    { name: "x", importanceOfReputation: 3.7 },
    { name: "y", importanceOfReputation: 8.1 },
    { name: "z", importanceOfReputation: 2.5 },
];

// Función para calcular la satisfacción de un cliente con un entrenador
function calculateSatisfaction(client, coach) {
    return client.importanceOfReputation * coach.reputation;
}

// Función para encontrar el mejor entrenador para un cliente
function findBestCoach(client) {
    let bestCoach = null;
    let bestSatisfaction = 0;

    for (const coach of coaches) {
        if (coach.availableSlots > 0) {
            const satisfaction = calculateSatisfaction(client, coach);
            if (satisfaction > bestSatisfaction) {
                bestSatisfaction = satisfaction;
                bestCoach = coach;
            }
        }
    }
    return bestCoach;
}

// Función para asignar clientes a los entrenadores
function assignClients() {
    const unassignedClients = [...clients];
    const assignments = [];

    while (unassignedClients.length > 0) {
        const client = unassignedClients.pop();
        const bestCoach = findBestCoach(client);

        if (bestCoach) {
            bestCoach.availableSlots--;
            assignments.push({ client: client.name, coach: bestCoach.name});
        }
    }
    return assignments;
}

const assignments = assignClients();

// Imprime las asignaciones
for (const assignment of assignments) {
    console.log(`Cliente ${assignment.client} asignado a entrenador ${assignment.coach}`);
}

// Calcular la satisfacción individual de cada cliente
const individualSatisfaction = assignments.map(assignment => {
    const client = clients.find(client => client.name === assignment.client);
    const coach = coaches.find(coach => coach.name === assignment.coach);
    return calculateSatisfaction(client, coach);
});

// Calculo de satisfacción total
const totalSatisfaction = individualSatisfaction.reduce((a, b) => a + b, 0);

console.log(`Satisfacción total: ${totalSatisfaction}`);

let tareas = [];

const crearTarea = (tareaData) => {
    tareas.push(tareaData);
    return tareaData;
};

const obtenerTareas = () => {
    return tareas;
};

const obtenerTareaPorId = (id) => {
    
    return tareas.find(t => t.id === Number(id));
};

const actualizarTarea = (id, actualizacion) => {
    const index = tareas.findIndex(t => t.id === Number(id)); 
    if (index === -1) return null;
    tareas[index] = { ...tareas[index], ...actualizacion };
    return tareas[index];
};

const eliminarTarea = (id) => {
    const index = tareas.findIndex(t => t.id === Number(id)); 
    if (index === -1) return null;
    return tareas.splice(index, 1)[0];
};

module.exports = { crearTarea, obtenerTareas, obtenerTareaPorId, actualizarTarea, eliminarTarea };

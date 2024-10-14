const { crearTarea, obtenerTareas, obtenerTareaPorId, actualizarTarea, eliminarTarea } = require('../aplicacion/servicio');

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: La tarea ya existe
 */
exports.crearTarea = (req, res) => {
    try {
        const tareaExistente = obtenerTareaPorId(req.body.id);
        
        if (tareaExistente) {
            return res.status(400).json({ mensaje: "La tarea ya existe" });
        }

        const nuevaTarea = crearTarea(req.body);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       500:
 *         description: Error del servidor
 */
exports.obtenerTareas = (_req, res) => {
    try {
        const tareas = obtenerTareas();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

/**
 * @swagger
 * /tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
exports.obtenerTareaPorId = (req, res) => {
    const tarea = obtenerTareaPorId(req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: "Tarea no encontrada" });
    res.status(200).json(tarea);
};

/**
 * @swagger
 * /tareas/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
exports.actualizarTarea = (req, res) => {
    try {
        const tareaActualizada = actualizarTarea(req.params.id, req.body);
        if (!tareaActualizada) return res.status(404).json({ mensaje: "Tarea no encontrada" });
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
exports.eliminarTarea = (req, res) => {
    try {
        const tareaEliminada = eliminarTarea(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ mensaje: "Tarea no encontrada" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

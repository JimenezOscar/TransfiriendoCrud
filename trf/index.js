const express = require('express');
const cors = require('cors'); 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { crearTarea, obtenerTareas, obtenerTareaPorId, actualizarTarea, eliminarTarea } = require('./controlador/tareaControlador');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tareas',
            version: '1.0.0',
            description: 'API para gestionar tareas',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./controlador/tareaControlador.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.post('/tareas', crearTarea);
app.get('/tareas', obtenerTareas);
app.get('/tareas/:id', obtenerTareaPorId);
app.put('/tareas/:id', actualizarTarea);
app.delete('/tareas/:id', eliminarTarea);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const Usuario = require("../models/user");
const Impuesto = require("../models/impuestos");
const jwt = require("jsonwebtoken");

const secretKey = "secret_key";

const register = async (req, res) => {
    try {
        const { nombres,apellidos,correo,telefono, cedula, password } = req.body;
        const nuevoUsuario = new Usuario({ nombres,apellidos,correo,telefono, cedula, password  });
        await nuevoUsuario.save();
        const token = jwt.sign({ id: nuevoUsuario._id }, secretKey);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo, password });
        if (!usuario) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        const token = jwt.sign({ id: usuario._id }, secretKey);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token de autorización no proporcionado" });
    }
    
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }
        req.userId = decoded.id;
        next();
    });
};


const getImpuestos = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ cedula: req.body.cedula }).populate("impuestos");
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuario.impuestos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createImpuesto = async (req, res) => {
    try {
        const { cedula } = req.body;
        const { ingresoAnual, totalGastos, impuestoCalculado, fecha } = req.body;
        const usuario = await Usuario.findOne({ cedula });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const nuevoImpuesto = new Impuesto({
            ingresoAnual,
            totalGastos,
            impuestoCalculado,
            fecha,
            usuario: usuario._id
        });

        await nuevoImpuesto.save();
        usuario.impuestos.push(nuevoImpuesto);
        await usuario.save();

        res.status(201).json(nuevoImpuesto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateImpuesto = async (req, res) => {
    try {
        const { cedula } = req.params;
        const { id } = req.body;
        const { ingresoAnual, totalGastos, impuestoCalculado, fecha } = req.body;

        const usuario = await Usuario.findOne({ cedula });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const impuesto = await Impuesto.findOneAndUpdate(
            { _id: id, usuario: usuario._id },
            { ingresoAnual, totalGastos, impuestoCalculado, fecha },
            { new: true }
        );

        if (!impuesto) {
            return res.status(404).json({ error: "Impuesto no encontrado" });
        }

        res.status(200).json(impuesto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteImpuesto = async (req, res) => {
    try {
        const { cedula, id } = req.params;

        const usuario = await Usuario.findOne({ cedula });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const impuesto = await Impuesto.findOneAndDelete({ _id: id, usuario: usuario._id });
        if (!impuesto) {
            return res.status(404).json({ error: "Impuesto no encontrado" });
        }

        usuario.impuestos.pull(impuesto._id);
        await usuario.save();

        res.status(200).json({ message: "Impuesto eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
    authenticate,
    getImpuestos,
    createImpuesto,
    updateImpuesto,
    deleteImpuesto,
    getUsuarios
};

const mongoose = require('mongoose');

// Definición de sub-schema para direcciones
const direccionSchema = new mongoose.Schema({
    calle: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: 'La calle debe tener al menos 3 caracteres'
        }
    },
    ciudad: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: 'La ciudad debe tener al menos 3 caracteres'
        }
    },
    pais: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => v.length >= 3,
            message: 'El país debe tener al menos 3 caracteres'
        }
    },
    codigo_postal: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => /^\d{6}$/.test(v),
            message: 'El código postal debe ser un número de 6 dígitos'
        }
    }
}, { _id: false });

// Definición del schema principal con validaciones
const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    cedula: {
        type: Number,
        required: true,
        unique: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    fecha_creacion: { type: Date, default: Date.now },
    direcciones: {
        type: [direccionSchema],
        required: true,
    }
}, {
    timestamps: false,
    collection: 'usuarios',
});

// Transformar `_id` en `id` al convertir a JSON
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
    }
});

module.exports = mongoose.model('Usuario', userSchema);
const { car } = require("../models");

//get all data car
exports.getcars = async (req, res) => {
    try {
        const cars = await car.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                is_deleted: 0
            }
        });
        res.status(200).json({
            success: true,
            message: "List All Books",
            data: cars,
        });
    } catch (error) {
        console.log(error);
    }
};

//get data car by id
exports.getcarById = async (req, res) => {
    try {
        const id = req.params.id
        const cars = await car.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                is_deleted: 0,
                id: id
            }
        });
        res.status(200).json({
            success: true,
            message: "List car by id",
            data: cars,
        });
    } catch (error) {
        console.log(error);
    }
};

//get all data car yang terdelete (is_deleted = 0)
exports.getDeletedcars = async (req, res) => {
    try {
        const cars = await car.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                is_deleted: 1
            }
        });
        res.status(200).json({
            success: true,
            message: "List All Deleted cars",
            data: cars,
        });
    } catch (error) {
        console.log(error);
    }
};

// deleteCar
exports.deletecar = async (req, res) => {
    try {
        const id = req.params.id
        const tokenUser = req.user
        const { body } = req

        console.log(tokenUser.role);

        // validasi agar member tidak bisa melakukan operasi ini
        if (tokenUser.role === "member") {
            return res.status(200).json({
                success: false,
                message: "role member tidak boleh melakukan operasi API ini",

            });
        }

        body.is_deleted = 1 //set is_deleted = 1
        body.user_id = tokenUser.userId //set tokenUser yang login

        await car.update(body, {
            where: {
                id: id,
            },
        });

        //untuk nampilkan response
        const updatedDate = await car.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id: id }
        });

        res.status(200).json({
            success: true,
            message: "Delete Car berhasil",
            data: updatedDate,
        });
    } catch (error) {
        console.log(error);
    }
};

//updateBook
exports.updatecar = async (req, res) => {
    try {
        const id = req.params.id
        const tokenuser = req.user
        const { body } = req

        // validasi agar member tidak bisa melakukan operasi ini
        if (tokenuser.role === "member") {
            return res.status(200).json({
                success: false,
                message: "role member tidak boleh melakukan operasi API ini",

            });
        }

        body.user_id = tokenuser.userId //set tokenUser yang login untuk agar bisa tau siapa yang update book ini

        console.log(body);
        await car.update(body, {
            where: {
                id: id,
            },
        });

        //untuk nampilkan response
        const updatedDate = await car.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id: id }
        });

        res.status(200).json({
            success: true,
            message: "Update Car berhasil",
            data: updatedDate,
        });
    } catch (error) {
        console.log(error);
    }
};

//createCar
exports.createcar = async (req, res) => {
    try {
        const tokenuser = req.user
        const { body } = req

        if (tokenuser.role === "member") {
            return res.status(200).json({
                success: false,
                message: "role member tidak boleh melakukan operasi API ini",

            });
        }

        body.is_deleted = 0 // set is_deleted = 0
        body.user_id = tokenuser.userId //set tokenUser yang login untuk agar bisa tau siapa yang update car ini

        const createdData = await car.create(body);

        // const parsedData = JSON.stringify(createdData)
        res.status(200).json({
            success: true,
            message: "Car berhasil ditambahkan",
            data: createdData,
        });
    } catch (error) {
        console.log(error);
    }
};
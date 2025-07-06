// const Dynamic = require("../Module/DynamicModule/DynamicModule"); // Adjust the path as needed

// // Create a new Dynamic entry
// exports.createDynamic = async (req, res) => {
//     try {
//         const { DynamicName } = req.body;

//         if (!DynamicName) {
//             return res.status(400).json({ error: "DynamicName is required" });
//         }

//         const newDynamic = new Dynamic({ DynamicName });
//         const savedDynamic = await newDynamic.save();

//         res.status(201).json(savedDynamic);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get all Dynamic entries
// exports.getAllDynamics = async (req, res) => {
//     try {
//         const dynamics = await Dynamic.find();
//         res.status(200).json(dynamics);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get a single Dynamic entry by ID
// exports.getDynamicById = async (req, res) => {
//     try {
//         const dynamic = await Dynamic.findById(req.params.id);

//         if (!dynamic) {
//             return res.status(404).json({ error: "Dynamic not found" });
//         }

//         res.status(200).json(dynamic);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Update a Dynamic entry
// exports.updateDynamic = async (req, res) => {
//     try {
//         const { DynamicName } = req.body;

//         if (!DynamicName) {
//             return res.status(400).json({ error: "DynamicName is required" });
//         }

//         const updatedDynamic = await Dynamic.findByIdAndUpdate(
//             req.params.id,
//             { DynamicName },
//             { new: true, runValidators: true }
//         );

//         if (!updatedDynamic) {
//             return res.status(404).json({ error: "Dynamic not found" });
//         }

//         res.status(200).json(updatedDynamic);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Delete a Dynamic entry
// exports.deleteDynamic = async (req, res) => {
//     try {
//         const deletedDynamic = await Dynamic.findByIdAndDelete(req.params.id);

//         if (!deletedDynamic) {
//             return res.status(404).json({ error: "Dynamic not found" });
//         }

//         res.status(200).json({ message: "Dynamic deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const DynamicRoute = require("../Module/DynamicModule/DynamicModule");

// Get all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await DynamicRoute.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

// Create new route
exports.createRoute = async (req, res) => {
  try {
    const { DynamicName, path, element } = req.body;
    const newRoute = new DynamicRoute({ DynamicName, path, element });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create route", details: err.message });
  }
};

// Update route
exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { DynamicName, path, element } = req.body;
    const updated = await DynamicRoute.findByIdAndUpdate(
      id,
      { DynamicName, path, element },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Route not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update route", details: err.message });
  }
};

// Delete route
exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DynamicRoute.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Route not found" });
    res.json({ message: "Route deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete route" });
  }
};

const configModel = require('../models/config');


// Get all configurations
exports.getConfigs = async (req, res) => {
    try {
        const configs = await configModel.find();
        res.status(200).json({ status: 'success', message: 'Configurations fetched successfully', data: configs });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching configurations', error });
    }
};
// Create a new configuration
exports.createConfig = async (req, res) => {
    try {
        const newConfig = new configModel(req.body);
        const savedConfig = await newConfig.save();
        res.status(201).json({ status: 'success', message: 'Configuration created successfully', data: savedConfig });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error creating configuration', error });
    }
};

// Update a configuration
exports.updateConfig = async (req, res) => {
    try {
        const updatedConfig = await configModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedConfig) {
            return res.status(404).json({ status: 'error', message: 'Configuration not found' });
        }
        res.status(200).json({ status: 'success', message: 'Configuration updated successfully', data: updatedConfig });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating configuration', error });
    }
};
// Delete a configuration   
exports.deleteConfig = async (req, res) => {
    try {
        const deletedConfig = await configModel.findByIdAndDelete(req.params.id);
        if (!deletedConfig) {
            return res.status(404).json({ status: 'error', message: 'Configuration not found' });
        }
        res.status(200).json({ status: 'success', message: 'Configuration deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error deleting configuration', error });
    }
};
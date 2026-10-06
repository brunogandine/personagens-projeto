import MaintenanceService from "@/services/maintenance.service";
import { isAppError } from "@/utils/is-app-error.util";
import { RequestHandler } from "express";

class MaintenancenController {
    getSettings: RequestHandler = async (req, res) => {
        try {
            const result = await MaintenanceService.getSettings();

            return res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                return
            };
        };
    };
};

export default new MaintenancenController();
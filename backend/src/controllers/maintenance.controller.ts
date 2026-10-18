import MaintenanceService from "@/services/maintenance.service";
import { isAppError } from "@/utils/is-app-error.util";
import { RequestHandler } from "express";

class MaintenancenController {
    getSettings: RequestHandler = async (_req, res) => {
        try {
            const result = await MaintenanceService.getSettings();

            return res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
            };

            return res.status(500).json({message: "Erro Interno"});
        };
    };

    updateSettings: RequestHandler = async (req, res) => {
        try {
            const result = await MaintenanceService.updateSettings(req.body);

            return res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message, keys: err.keys});
                };
            };

            if(typeof err === "object" && err !== null && "successes" in err && "errors" in err) {
                return res.status(500).json({
                    message: "Ocorreu um erro interno ao atualizar as configurações de manutenção.",
                    successes: err.successes,
                    errors: err.errors
                });
            };

            return res.status(500).json({message: `Erro Interno`});
        };
    };
};

export default new MaintenancenController();
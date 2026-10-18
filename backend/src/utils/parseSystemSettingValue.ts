import type { SystemSettingsTypes } from "@prisma/client";

export const parseSystemSettingsValue = (value: string | null, dataType: SystemSettingsTypes) => {
    switch(dataType) {
        case "STRING":
            return value;

        case "NUMBER": {
            const number = Number(value);

            if(Number.isNaN(number))
                throw new Error("Invalid number setting.");

            return number;
        };

        case "BOOLEAN": {
            if(value !== "true" && value !== "false")
                throw new Error("Invalid boolean setting.");

            return value === "true";
        };
    };
};


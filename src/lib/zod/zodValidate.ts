import { z } from "zod";

export function validate<T extends z.ZodType>(schema: T, data: unknown) {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
            const path = issue.path[0];
            if (typeof path === "string") errors[path] = issue.message;
        });

        return { success: false, errors };
    }

    return { success: true, data: result.data };
}

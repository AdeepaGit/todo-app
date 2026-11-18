const validateTodo = (data) => {
    const errors = {};

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return {
            isValid: false,
            errors: {
                body: "Request body must be a valid object"
            }
        };
    }

    const { title, description } = data;

    if (typeof title !== "string" || !title.trim()) {
        errors.title = "Title is required and must be a valid string";
    }

    if (
        description !== undefined &&
        typeof description !== "string"
    ) {
        errors.description = "Description must be a string";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = validateTodo;